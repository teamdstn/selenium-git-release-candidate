class RubyMappings

  def add_all(fun)
    fun.add_mapping "ruby_library", RubyLibrary.new

    fun.add_mapping "ruby_test", CheckTestArgs.new
    fun.add_mapping "ruby_test", AddTestDefaults.new
    fun.add_mapping "ruby_test", RubyTest.new
    fun.add_mapping "ruby_test", AddTestDependencies.new

    fun.add_mapping "rubydocs", RubyDocs.new
    fun.add_mapping "rubygem",  RubyGem.new
  end

  class RubyLibrary < Tasks

    def handle(fun, dir, args)
      desc "Build #{args[:name]} in build/#{dir}"
      task_name = task_name(dir, args[:name])

      t = task task_name do
        puts "Preparing: #{task_name} in #{build_dir}/#{dir}"
        copy_sources dir, args[:srcs]
        copy_resources dir, args[:resources], build_dir if args[:resources]
        remove_svn_dirs
      end

      add_dependencies t, dir, args[:deps]
      add_dependencies t, dir, args[:resources]
    end

    def copy_sources(dir, globs)
      globs.each do |glob|
        Dir[File.join(dir, glob)].each do |file|
          destination = destination_for(file)
          mkdir_p File.dirname(destination)
          cp file, destination
        end
      end
    end

    def remove_svn_dirs
      Dir["#{build_dir}/rb/**/.svn"].each { |file| rm_rf file }
    end

    def destination_for(file)
      File.join build_dir, file
    end

    def build_dir
      "build"
    end

  end

  class CheckTestArgs
    def handle(fun, dir, args)
      raise "no :srcs specified for #{dir}" unless args.has_key? :srcs
      raise "no :name specified for #{dir}" unless args.has_key? :name
    end
  end

  class AddTestDefaults
    def handle(fun, dir, args)
      args[:include] = Array(args[:include])
      args[:include] << "#{dir}/spec"

      args[:command] = args[:command] || "rspec"
      args[:require] = Array(args[:require])

      # move?
      args[:srcs] = args[:srcs].map { |str|
        Dir[File.join(dir, str)]
      }.flatten
    end
  end

  class AddTestDependencies < Tasks
    def handle(fun, dir, args)
      task = Rake::Task[task_name(dir, "#{args[:name]}-test")]

      if Platform.jruby?
        # TODO: # Specifying a dependency here isn't ideal
        add_dependencies task, dir, ["//java/client/test/org/openqa/selenium/environment"]
      end

      if args.has_key?(:deps)
        add_dependencies task, dir, args[:deps]
      end
    end
  end

  class RubyTest < Tasks
    def handle(fun, dir, args)
      desc "Run ruby tests for #{args[:name]}"
      task task_name(dir, "#{args[:name]}-test") do
        STDOUT.sync = true
        puts "Running: #{args[:name]} ruby tests"

        add_jruby_requires(args) if Platform.jruby?

        ENV['WD_SPEC_DRIVER'] = args[:name]
        ENV['CI_REPORTS']     = "build/test_logs"

        ruby :include => args[:include],
             :require => args[:require],
             :command => args[:command],
             :args    => %w[--format CI::Reporter::RSpec],
             :debug   => !!ENV['DEBUG'],
             :files   => args[:srcs]
      end
    end

    def add_jruby_requires(args)
      jars = %w[
        json-jruby.jar
        rubyzip.jar
        childprocess.jar
        rack.jar
      ].map { |jar| File.join("third_party/jruby", jar) }

      args[:require] ||= []
      args[:require] += jars
    end
  end

  class RubyDocs
    def handle(fun, dir, args)
      files      = args[:files] || raise("no :files specified for rubydocs")
      output_dir = args[:output_dir] || raise("no :output_dir specified for rubydocs")

      # we define a wrapper task to avoid calling require "yard" at parse time
      desc 'Generate Ruby API docs'
      task "//#{dir}:docs" do |t|
        raise "yard is not installed, unable to generate docs" unless have_yard?
        t = YARD::Rake::YardocTask.new { |t|
          t.files = Array(files).map { |glob| Dir[glob] }.flatten
          t.options << "--verbose"
          t.options << "--readme" << args[:readme] if args.has_key?(:readme)
          t.options << "--output-dir" << output_dir
        }

        Rake::Task[t.name].invoke
      end
    end

    def have_yard?
      require 'yard'
      true
    rescue LoadError
      false
    end
  end # RubyDocs

  class RubyGem
    GEMSPEC_HEADER = "# Automatically generated by the build system. Edits may be lost.\n"

    def handle(fun, dir, args)
      raise "no :dir for rubygem" unless args[:dir]
      raise "no :version for rubygem" unless args[:version]

      define_spec_task      dir, args
      define_clean_task     dir, args
      define_build_task     dir, args
      define_release_task   dir, args

      define_gem_install_task dir, args
    end

    def define_spec_task(dir, args)
      gemspec = File.join(args[:dir], "#{args[:name]}.gemspec")

      file gemspec do
        mkdir_p args[:dir]
        Dir.chdir(args[:dir]) {
          File.open("#{args[:name]}.gemspec", "w") { |file|
            file << GEMSPEC_HEADER
            file << gemspec(args).to_ruby
          }
        }
      end

      task("clean_#{gemspec}") { rm_rf gemspec }
    end

    def define_build_task(dir, args)
      gemfile = File.join("build", "#{args[:name]}-#{args[:version]}.gem")
      gemspec = File.join(args[:dir], "#{args[:name]}.gemspec")

      deps = (args[:deps] || [])
      deps << "clean_#{gemspec}" << gemspec

      file gemfile => deps do
        require 'rubygems/builder'
        spec = eval(File.read(gemspec))
        file = Dir.chdir(args[:dir]) {
          Gem::Builder.new(spec).build
        }

        mv File.join(args[:dir], file), gemfile
      end

      desc "Build #{gemfile}"
      task "//#{dir}:gem:build" => gemfile
    end

    def define_clean_task(dir, args)
      desc 'Clean rubygem artifacts'
      task "//#{dir}:gem:clean" do
        rm_rf args[:dir]
        rm_rf "build/*.gem"
      end
    end

    def define_release_task(dir, args)
      desc 'Build and release the ruby gem to Gemcutter'
      task "//#{dir}:gem:release" => %W[//#{dir}:gem:clean //#{dir}:gem:build] do
        sh "gem push build/#{args[:name]}-#{args[:version]}.gem"
      end
    end

    def define_gem_install_task(dir, args)
      desc 'Install gem dependencies for the current Ruby'
      task "//#{dir}:install-gems" do
        dependencies = Array(args[:gemdeps]) + Array(args[:devdeps])
        dependencies.each do |dep|
          name, version = dep.shift
          sh "gem", "install", name, "--version", version, "--no-rdoc", "--no-ri"
        end
      end
    end

    def gemspec(args)
      Gem::Specification.new do |s|
        s.name        = args[:name]
        s.version     = args[:version]
        s.summary     = args[:summary]
        s.description = args[:description]
        s.authors     = args[:author]
        s.email       = args[:email]
        s.homepage    = args[:homepage]
        s.files       = Dir[*args[:files]]

        args[:gemdeps].each { |dep| s.add_dependency(*dep.shift) }
        args[:devdeps].each { |dep| s.add_development_dependency(*dep.shift) }
      end
    end

  end # RubyGem
end # RubyMappings

class RubyRunner

  def self.run(opts)
    cmd = ["ruby"]

    if Platform.jruby?
      require 'java'
      JRuby.runtime.instance_config.run_ruby_in_process = true
      cmd << "-J-Djava.awt.headless=true" if opts[:headless]
    end

    if opts[:debug]
      cmd << "-d"
    end

    if opts.has_key? :include
      cmd << "-I"
      cmd << Array(opts[:include]).join(File::PATH_SEPARATOR)
    end

    Array(opts[:require]).each do |f|
      cmd << "-r#{f}"
    end

    cmd << "-S" << opts[:command] if opts.has_key? :command
    cmd += Array(opts[:args]) if opts.has_key? :args
    cmd += Array(opts[:files]) if opts.has_key? :files

    puts cmd.join(' ')

    sh(*cmd)
  end
end

def ruby(opts)
  RubyRunner.run opts
end
