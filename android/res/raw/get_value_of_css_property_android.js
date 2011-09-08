function(){return function(){function g(a){throw a;}var h=void 0,i=null;function n(a){return function(){return this[a]}}function o(a){return function(){return a}}var p,r=this;function aa(a){for(var a=a.split("."),b=r,c;c=a.shift();)if(b[c]!=i)b=b[c];else return i;return b}function ba(){}
function s(a){var b=typeof a;if(b=="object")if(a){if(a instanceof Array)return"array";else if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if(c=="[object Window]")return"object";if(c=="[object Array]"||typeof a.length=="number"&&typeof a.splice!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("splice"))return"array";if(c=="[object Function]"||typeof a.call!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if(b=="function"&&typeof a.call=="undefined")return"object";return b}function ca(a){var b=s(a);return b=="array"||b=="object"&&typeof a.length=="number"}function u(a){return typeof a=="string"}function da(a){return s(a)=="function"}function x(a){a=s(a);return a=="object"||a=="array"||a=="function"}function ea(a){return a[fa]||(a[fa]=++ga)}var fa="closure_uid_"+Math.floor(Math.random()*2147483648).toString(36),ga=0,ha=Date.now||function(){return+new Date};
function y(a,b){function c(){}c.prototype=b.prototype;a.u=b.prototype;a.prototype=new c};function ia(a){for(var b=1;b<arguments.length;b++)var c=String(arguments[b]).replace(/\$/g,"$$$$"),a=a.replace(/\%s/,c);return a}function ja(a){if(!ka.test(a))return a;a.indexOf("&")!=-1&&(a=a.replace(la,"&amp;"));a.indexOf("<")!=-1&&(a=a.replace(ma,"&lt;"));a.indexOf(">")!=-1&&(a=a.replace(na,"&gt;"));a.indexOf('"')!=-1&&(a=a.replace(oa,"&quot;"));return a}var la=/&/g,ma=/</g,na=/>/g,oa=/\"/g,ka=/[&<>\"]/;
function pa(a,b){for(var c=0,d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=String(b).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),f=Math.max(d.length,e.length),j=0;c==0&&j<f;j++){var k=d[j]||"",l=e[j]||"",m=RegExp("(\\d*)(\\D*)","g"),t=RegExp("(\\d*)(\\D*)","g");do{var q=m.exec(k)||["","",""],v=t.exec(l)||["","",""];if(q[0].length==0&&v[0].length==0)break;c=qa(q[1].length==0?0:parseInt(q[1],10),v[1].length==0?0:parseInt(v[1],10))||qa(q[2].length==0,v[2].length==0)||qa(q[2],v[2])}while(c==
0)}return c}function qa(a,b){if(a<b)return-1;else if(a>b)return 1;return 0}var ra=Math.random()*2147483648|0;var z,sa,ta,ua=r.navigator;ta=ua&&ua.platform||"";z=ta.indexOf("Mac")!=-1;sa=ta.indexOf("Win")!=-1;var A=ta.indexOf("Linux")!=-1,va,wa="",xa=/WebKit\/(\S+)/.exec(r.navigator?r.navigator.userAgent:i);va=wa=xa?xa[1]:"";var ya={};var za=window;function B(a){this.stack=Error().stack||"";if(a)this.message=String(a)}y(B,Error);B.prototype.name="CustomError";function Aa(a,b){for(var c in a)b.call(h,a[c],c,a)}function Ba(a,b){var c={},d;for(d in a)b.call(h,a[d],d,a)&&(c[d]=a[d]);return c}function Ca(a,b){var c={},d;for(d in a)c[d]=b.call(h,a[d],d,a);return c}function Da(a,b){for(var c in a)if(b.call(h,a[c],c,a))return c};function C(a,b){B.call(this,b);this.code=a;this.name=Ea[a]||Ea[13]}y(C,B);var Ea,Fa={NoSuchElementError:7,NoSuchFrameError:8,UnknownCommandError:9,StaleElementReferenceError:10,ElementNotVisibleError:11,InvalidElementStateError:12,UnknownError:13,ElementNotSelectableError:15,XPathLookupError:19,NoSuchWindowError:23,InvalidCookieDomainError:24,UnableToSetCookieError:25,ModalDialogOpenedError:26,NoModalDialogOpenError:27,ScriptTimeoutError:28,InvalidSelectorError:32},Ga={},Ha;
for(Ha in Fa)Ga[Fa[Ha]]=Ha;Ea=Ga;C.prototype.toString=function(){return"["+this.name+"] "+this.message};function Ia(a,b){b.unshift(a);B.call(this,ia.apply(i,b));b.shift();this.Ta=a}y(Ia,B);Ia.prototype.name="AssertionError";function Ja(a,b){if(!a){var c=Array.prototype.slice.call(arguments,2),d="Assertion failed";if(b){d+=": "+b;var e=c}g(new Ia(""+d,e||[]))}}function Ka(a){g(new Ia("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1)))};function D(a){return a[a.length-1]}var E=Array.prototype;function F(a,b){if(u(a)){if(!u(b)||b.length!=1)return-1;return a.indexOf(b,0)}for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1}function La(a,b){for(var c=a.length,d=u(a)?a.split(""):a,e=0;e<c;e++)e in d&&b.call(h,d[e],e,a)}function G(a,b){for(var c=a.length,d=Array(c),e=u(a)?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(h,e[f],f,a));return d}
function Ma(a,b,c){for(var d=a.length,e=u(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1}function Na(a,b,c){for(var d=a.length,e=u(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0}function Oa(a,b){var c;a:{c=a.length;for(var d=u(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(h,d[e],e,a)){c=e;break a}c=-1}return c<0?i:u(a)?a.charAt(c):a[c]}function Pa(){return E.concat.apply(E,arguments)}
function Qa(a){if(s(a)=="array")return Pa(a);else{for(var b=[],c=0,d=a.length;c<d;c++)b[c]=a[c];return b}}function Ra(a,b,c){Ja(a.length!=i);return arguments.length<=2?E.slice.call(a,b):E.slice.call(a,b,c)};var Sa;function Ta(a){var b;b=(b=a.className)&&typeof b.split=="function"?b.split(/\s+/):[];var c=Ra(arguments,1),d;d=b;for(var e=0,f=0;f<c.length;f++)F(d,c[f])>=0||(d.push(c[f]),e++);d=e==c.length;a.className=b.join(" ");return d};function Ua(a){return a?new Va(H(a)):Sa||(Sa=new Va)}function Wa(a,b){Aa(b,function(b,d){d=="style"?a.style.cssText=b:d=="class"?a.className=b:d=="for"?a.htmlFor=b:d in Xa?a.setAttribute(Xa[d],b):a[d]=b})}var Xa={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",height:"height",width:"width",usemap:"useMap",frameborder:"frameBorder",maxlength:"maxLength",type:"type"};function Ya(a){return a?a.parentWindow||a.defaultView:window}
function Za(a,b,c){function d(c){c&&b.appendChild(u(c)?a.createTextNode(c):c)}for(var e=2;e<c.length;e++){var f=c[e];ca(f)&&!(x(f)&&f.nodeType>0)?La($a(f)?Qa(f):f,d):d(f)}}function I(a){return a&&a.parentNode?a.parentNode.removeChild(a):i}function J(a,b){if(a.contains&&b.nodeType==1)return a==b||a.contains(b);if(typeof a.compareDocumentPosition!="undefined")return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a}
function ab(a,b){if(a==b)return 0;if(a.compareDocumentPosition)return a.compareDocumentPosition(b)&2?1:-1;if("sourceIndex"in a||a.parentNode&&"sourceIndex"in a.parentNode){var c=a.nodeType==1,d=b.nodeType==1;if(c&&d)return a.sourceIndex-b.sourceIndex;else{var e=a.parentNode,f=b.parentNode;if(e==f)return bb(a,b);if(!c&&J(e,b))return-1*cb(a,b);if(!d&&J(f,a))return cb(b,a);return(c?a.sourceIndex:e.sourceIndex)-(d?b.sourceIndex:f.sourceIndex)}}d=H(a);c=d.createRange();c.selectNode(a);c.collapse(!0);d=
d.createRange();d.selectNode(b);d.collapse(!0);return c.compareBoundaryPoints(r.Range.START_TO_END,d)}function cb(a,b){var c=a.parentNode;if(c==b)return-1;for(var d=b;d.parentNode!=c;)d=d.parentNode;return bb(d,a)}function bb(a,b){for(var c=b;c=c.previousSibling;)if(c==a)return-1;return 1}
function db(){var a,b=arguments.length;if(b){if(b==1)return arguments[0]}else return i;var c=[],d=Infinity;for(a=0;a<b;a++){for(var e=[],f=arguments[a];f;)e.unshift(f),f=f.parentNode;c.push(e);d=Math.min(d,e.length)}e=i;for(a=0;a<d;a++){for(var f=c[0][a],j=1;j<b;j++)if(f!=c[j][a])return e;e=f}return e}function H(a){return a.nodeType==9?a:a.ownerDocument||a.document}
function $a(a){if(a&&typeof a.length=="number")if(x(a))return typeof a.item=="function"||typeof a.item=="string";else if(da(a))return typeof a.item=="function";return!1}function Va(a){this.t=a||r.document||document}p=Va.prototype;p.fa=n("t");p.ea=function(){var a=this.t,b=arguments,c=b[1],d=a.createElement(b[0]);if(c)u(c)?d.className=c:s(c)=="array"?Ta.apply(i,[d].concat(c)):Wa(d,c);b.length>2&&Za(a,d,b);return d};p.createElement=function(a){return this.t.createElement(a)};p.createTextNode=function(a){return this.t.createTextNode(a)};
p.ta=function(){return this.t.parentWindow||this.t.defaultView};p.appendChild=function(a,b){a.appendChild(b)};p.removeNode=I;p.contains=J;var K="StopIteration"in r?r.StopIteration:Error("StopIteration");function eb(){}eb.prototype.next=function(){g(K)};eb.prototype.D=function(){return this};function fb(a){if(a instanceof eb)return a;if(typeof a.D=="function")return a.D(!1);if(ca(a)){var b=0,c=new eb;c.next=function(){for(;;)if(b>=a.length&&g(K),b in a)return a[b++];else b++};return c}g(Error("Not implemented"))};function L(a,b,c,d,e){this.o=!!b;a&&M(this,a,d);this.z=e!=h?e:this.q||0;this.o&&(this.z*=-1);this.Da=!c}y(L,eb);p=L.prototype;p.p=i;p.q=0;p.ma=!1;function M(a,b,c,d){if(a.p=b)a.q=typeof c=="number"?c:a.p.nodeType!=1?0:a.o?-1:1;if(typeof d=="number")a.z=d}
p.next=function(){var a;if(this.ma){(!this.p||this.Da&&this.z==0)&&g(K);a=this.p;var b=this.o?-1:1;if(this.q==b){var c=this.o?a.lastChild:a.firstChild;c?M(this,c):M(this,a,b*-1)}else(c=this.o?a.previousSibling:a.nextSibling)?M(this,c):M(this,a.parentNode,b*-1);this.z+=this.q*(this.o?-1:1)}else this.ma=!0;(a=this.p)||g(K);return a};
p.splice=function(){var a=this.p,b=this.o?1:-1;if(this.q==b)this.q=b*-1,this.z+=this.q*(this.o?-1:1);this.o=!this.o;L.prototype.next.call(this);this.o=!this.o;for(var b=ca(arguments[0])?arguments[0]:arguments,c=b.length-1;c>=0;c--)a.parentNode&&a.parentNode.insertBefore(b[c],a.nextSibling);I(a)};function gb(a,b,c,d){L.call(this,a,b,c,i,d)}y(gb,L);gb.prototype.next=function(){do gb.u.next.call(this);while(this.q==-1);return this.p};function hb(a,b){var c=(a.currentStyle||a.style)[b];if(c!="inherit")return c!==h?c:i;for(c=a.parentNode;c&&c.nodeType!=1&&c.nodeType!=9&&c.nodeType!=11;)c=c.parentNode;return(c=c&&c.nodeType==1?c:i)?hb(c,b):i};var ib;var jb={};function N(a,b,c){x(a)&&(a=a.c);a=new kb(a,b,c);if(b&&(!(b in jb)||c))jb[b]={key:a,shift:!1},c&&(jb[c]={key:a,shift:!0})}function kb(a,b,c){this.code=a;this.Ca=b||i;this.Ua=c||this.Ca}N(8);N(9);N(13);N(16);N(17);N(18);N(19);N(20);N(27);N(32," ");N(33);N(34);N(35);N(36);N(37);N(38);N(39);N(40);N(44);N(45);N(46);N(48,"0",")");N(49,"1","!");N(50,"2","@");N(51,"3","#");N(52,"4","$");N(53,"5","%");N(54,"6","^");N(55,"7","&");N(56,"8","*");N(57,"9","(");N(65,"a","A");N(66,"b","B");N(67,"c","C");
N(68,"d","D");N(69,"e","E");N(70,"f","F");N(71,"g","G");N(72,"h","H");N(73,"i","I");N(74,"j","J");N(75,"k","K");N(76,"l","L");N(77,"m","M");N(78,"n","N");N(79,"o","O");N(80,"p","P");N(81,"q","Q");N(82,"r","R");N(83,"s","S");N(84,"t","T");N(85,"u","U");N(86,"v","V");N(87,"w","W");N(88,"x","X");N(89,"y","Y");N(90,"z","Z");N(sa?{e:91,c:91,opera:219}:z?{e:224,c:91,opera:17}:{e:0,c:91,opera:i});N(sa?{e:92,c:92,opera:220}:z?{e:224,c:93,opera:17}:{e:0,c:92,opera:i});
N(sa?{e:93,c:93,opera:0}:z?{e:0,c:0,opera:16}:{e:93,c:i,opera:0});N({e:96,c:96,opera:48},"0");N({e:97,c:97,opera:49},"1");N({e:98,c:98,opera:50},"2");N({e:99,c:99,opera:51},"3");N({e:100,c:100,opera:52},"4");N({e:101,c:101,opera:53},"5");N({e:102,c:102,opera:54},"6");N({e:103,c:103,opera:55},"7");N({e:104,c:104,opera:56},"8");N({e:105,c:105,opera:57},"9");N({e:106,c:106,opera:A?56:42},"*");N({e:107,c:107,opera:A?61:43},"+");N({e:109,c:109,opera:A?109:45},"-");N({e:110,c:110,opera:A?190:78},".");
N({e:111,c:111,opera:A?191:47},"/");N(144);N(112);N(113);N(114);N(115);N(116);N(117);N(118);N(119);N(120);N(121);N(122);N(123);N({e:107,c:187,opera:61},"=","+");N({e:109,c:189,opera:109},"-","_");N(188,",","<");N(190,".",">");N(191,"/","?");N(192,"`","~");N(219,"[","{");N(220,"\\","|");N(221,"]","}");N({e:59,c:186,opera:59},";",":");N(222,"'",'"');function O(){lb&&(mb[ea(this)]=this)}var lb=!1,mb={};O.prototype.pa=!1;O.prototype.M=function(){if(!this.pa&&(this.pa=!0,this.l(),lb)){var a=ea(this);mb.hasOwnProperty(a)||g(Error(this+" did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call"));delete mb[a]}};O.prototype.l=function(){};function nb(a){return ob(a||arguments.callee.caller,[])}
function ob(a,b){var c=[];if(F(b,a)>=0)c.push("[...circular reference...]");else if(a&&b.length<50){c.push(pb(a)+"(");for(var d=a.arguments,e=0;e<d.length;e++){e>0&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=pb(f))?f:"[fn]";break;default:f=typeof f}f.length>40&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(ob(a.caller,b))}catch(j){c.push("[exception trying to get caller]\n")}}else a?
c.push("[...long stack...]"):c.push("[end]");return c.join("")}function pb(a){a=String(a);if(!qb[a]){var b=/function ([^\(]+)/.exec(a);qb[a]=b?b[1]:"[Anonymous]"}return qb[a]}var qb={};function P(a,b,c,d,e){this.reset(a,b,c,d,e)}P.prototype.Ma=0;P.prototype.sa=i;P.prototype.ra=i;var rb=0;P.prototype.reset=function(a,b,c,d,e){this.Ma=typeof e=="number"?e:rb++;this.Va=d||ha();this.P=a;this.Ia=b;this.Sa=c;delete this.sa;delete this.ra};P.prototype.Aa=function(a){this.P=a};function Q(a){this.Ja=a}Q.prototype.aa=i;Q.prototype.P=i;Q.prototype.da=i;Q.prototype.ua=i;function sb(a,b){this.name=a;this.value=b}sb.prototype.toString=n("name");var tb=new sb("WARNING",900),ub=new sb("CONFIG",700);Q.prototype.getParent=n("aa");Q.prototype.Aa=function(a){this.P=a};function vb(a){if(a.P)return a.P;if(a.aa)return vb(a.aa);Ka("Root logger has no level set.");return i}
Q.prototype.log=function(a,b,c){if(a.value>=vb(this).value){a=this.Fa(a,b,c);r.console&&r.console.markTimeline&&r.console.markTimeline("log:"+a.Ia);for(b=this;b;){var c=b,d=a;if(c.ua)for(var e=0,f=h;f=c.ua[e];e++)f(d);b=b.getParent()}}};
Q.prototype.Fa=function(a,b,c){var d=new P(a,String(b),this.Ja);if(c){d.sa=c;var e;var f=arguments.callee.caller;try{var j;var k=aa("window.location.href");if(u(c))j={message:c,name:"Unknown error",lineNumber:"Not available",fileName:k,stack:"Not available"};else{var l,m,t=!1;try{l=c.lineNumber||c.Ra||"Not available"}catch(q){l="Not available",t=!0}try{m=c.fileName||c.filename||c.sourceURL||k}catch(v){m="Not available",t=!0}j=t||!c.lineNumber||!c.fileName||!c.stack?{message:c.message,name:c.name,
lineNumber:l,fileName:m,stack:c.stack||"Not available"}:c}e="Message: "+ja(j.message)+'\nUrl: <a href="view-source:'+j.fileName+'" target="_new">'+j.fileName+"</a>\nLine: "+j.lineNumber+"\n\nBrowser stack:\n"+ja(j.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+ja(nb(f)+"-> ")}catch(w){e="Exception trying to expose exception! You win, we lose. "+w}d.ra=e}return d};var wb={},xb=i;
function yb(a){xb||(xb=new Q(""),wb[""]=xb,xb.Aa(ub));var b;if(!(b=wb[a])){b=new Q(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=yb(a.substr(0,c));if(!c.da)c.da={};c.da[d]=b;b.aa=c;wb[a]=b}return b};function zb(){O.call(this)}y(zb,O);yb("goog.dom.SavedRange");function Ab(a){O.call(this);this.ca="goog_"+ra++;this.Y="goog_"+ra++;this.N=Ua(a.fa());a.V(this.N.ea("SPAN",{id:this.ca}),this.N.ea("SPAN",{id:this.Y}))}y(Ab,zb);Ab.prototype.l=function(){I(u(this.ca)?this.N.t.getElementById(this.ca):this.ca);I(u(this.Y)?this.N.t.getElementById(this.Y):this.Y);this.N=i};function R(){}function Bb(a){if(a.getSelection)return a.getSelection();else{var a=a.document,b=a.selection;if(b){try{var c=b.createRange();if(c.parentElement){if(c.parentElement().document!=a)return i}else if(!c.length||c.item(0).document!=a)return i}catch(d){return i}return b}return i}}function Cb(a){for(var b=[],c=0,d=a.G();c<d;c++)b.push(a.A(c));return b}R.prototype.H=o(!1);R.prototype.fa=function(){return H(this.b())};R.prototype.ta=function(){return Ya(this.fa())};
R.prototype.containsNode=function(a,b){return this.w(Db(Eb(a),h),b)};function S(a,b){L.call(this,a,b,!0)}y(S,L);function T(){}y(T,R);T.prototype.w=function(a,b){var c=Cb(this),d=Cb(a);return(b?Ma:Na)(d,function(a){return Ma(c,function(c){return c.w(a,b)})})};T.prototype.insertNode=function(a,b){if(b){var c=this.b();c.parentNode&&c.parentNode.insertBefore(a,c)}else c=this.g(),c.parentNode&&c.parentNode.insertBefore(a,c.nextSibling);return a};T.prototype.V=function(a,b){this.insertNode(a,!0);this.insertNode(b,!1)};function Fb(a,b,c,d,e){var f;if(a){this.f=a;this.i=b;this.d=c;this.h=d;if(a.nodeType==1&&a.tagName!="BR")if(a=a.childNodes,b=a[b])this.f=b,this.i=0;else{if(a.length)this.f=D(a);f=!0}if(c.nodeType==1)(this.d=c.childNodes[d])?this.h=0:this.d=c}S.call(this,e?this.d:this.f,e);if(f)try{this.next()}catch(j){j!=K&&g(j)}}y(Fb,S);p=Fb.prototype;p.f=i;p.d=i;p.i=0;p.h=0;p.b=n("f");p.g=n("d");p.O=function(){return this.ma&&this.p==this.d&&(!this.h||this.q!=1)};p.next=function(){this.O()&&g(K);return Fb.u.next.call(this)};var Gb,Hb=(Gb="ScriptEngine"in r&&r.ScriptEngine()=="JScript")?r.ScriptEngineMajorVersion()+"."+r.ScriptEngineMinorVersion()+"."+r.ScriptEngineBuildVersion():"0";function Ib(){}Ib.prototype.w=function(a,b){var c=b&&!a.isCollapsed(),d=a.a;try{return c?this.n(d,0,1)>=0&&this.n(d,1,0)<=0:this.n(d,0,0)>=0&&this.n(d,1,1)<=0}catch(e){g(e)}};Ib.prototype.containsNode=function(a,b){return this.w(Eb(a),b)};Ib.prototype.D=function(){return new Fb(this.b(),this.j(),this.g(),this.k())};function Jb(a){this.a=a}y(Jb,Ib);p=Jb.prototype;p.C=function(){return this.a.commonAncestorContainer};p.b=function(){return this.a.startContainer};p.j=function(){return this.a.startOffset};p.g=function(){return this.a.endContainer};p.k=function(){return this.a.endOffset};p.n=function(a,b,c){return this.a.compareBoundaryPoints(c==1?b==1?r.Range.START_TO_START:r.Range.START_TO_END:b==1?r.Range.END_TO_START:r.Range.END_TO_END,a)};p.isCollapsed=function(){return this.a.collapsed};
p.select=function(a){this.ba(Ya(H(this.b())).getSelection(),a)};p.ba=function(a){a.removeAllRanges();a.addRange(this.a)};p.insertNode=function(a,b){var c=this.a.cloneRange();c.collapse(b);c.insertNode(a);c.detach();return a};
p.V=function(a,b){var c=Ya(H(this.b()));if(c=(c=Bb(c||window))&&Kb(c))var d=c.b(),e=c.g(),f=c.j(),j=c.k();var k=this.a.cloneRange(),l=this.a.cloneRange();k.collapse(!1);l.collapse(!0);k.insertNode(b);l.insertNode(a);k.detach();l.detach();if(c){if(d.nodeType==3)for(;f>d.length;){f-=d.length;do d=d.nextSibling;while(d==a||d==b)}if(e.nodeType==3)for(;j>e.length;){j-=e.length;do e=e.nextSibling;while(e==a||e==b)}c=new Lb;c.I=Mb(d,f,e,j);if(d.tagName=="BR")k=d.parentNode,f=F(k.childNodes,d),d=k;if(e.tagName==
"BR")k=e.parentNode,j=F(k.childNodes,e),e=k;c.I?(c.f=e,c.i=j,c.d=d,c.h=f):(c.f=d,c.i=f,c.d=e,c.h=j);c.select()}};p.collapse=function(a){this.a.collapse(a)};function Nb(a){this.a=a}y(Nb,Jb);Nb.prototype.ba=function(a,b){var c=b?this.g():this.b(),d=b?this.k():this.j(),e=b?this.b():this.g(),f=b?this.j():this.k();a.collapse(c,d);(c!=e||d!=f)&&a.extend(e,f)};function Ob(a,b){this.a=a;this.Pa=b}y(Ob,Ib);yb("goog.dom.browserrange.IeRange");function Pb(a){var b=H(a).body.createTextRange();if(a.nodeType==1)b.moveToElementText(a),U(a)&&!a.childNodes.length&&b.collapse(!1);else{for(var c=0,d=a;d=d.previousSibling;){var e=d.nodeType;if(e==3)c+=d.length;else if(e==1){b.moveToElementText(d);break}}d||b.moveToElementText(a.parentNode);b.collapse(!d);c&&b.move("character",c);b.moveEnd("character",a.length)}return b}p=Ob.prototype;p.Q=i;p.f=i;p.d=i;p.i=-1;p.h=-1;
p.r=function(){this.Q=this.f=this.d=i;this.i=this.h=-1};
p.C=function(){if(!this.Q){var a=this.a.text,b=this.a.duplicate(),c=a.replace(/ +$/,"");(c=a.length-c.length)&&b.moveEnd("character",-c);c=b.parentElement();b=b.htmlText.replace(/(\r\n|\r|\n)+/g," ").length;if(this.isCollapsed()&&b>0)return this.Q=c;for(;b>c.outerHTML.replace(/(\r\n|\r|\n)+/g," ").length;)c=c.parentNode;for(;c.childNodes.length==1&&c.innerText==(c.firstChild.nodeType==3?c.firstChild.nodeValue:c.firstChild.innerText);){if(!U(c.firstChild))break;c=c.firstChild}a.length==0&&(c=Qb(this,
c));this.Q=c}return this.Q};function Qb(a,b){for(var c=b.childNodes,d=0,e=c.length;d<e;d++){var f=c[d];if(U(f)){var j=Pb(f),k=j.htmlText!=f.outerHTML;if(a.isCollapsed()&&k?a.n(j,1,1)>=0&&a.n(j,1,0)<=0:a.a.inRange(j))return Qb(a,f)}}return b}p.b=function(){if(!this.f&&(this.f=Rb(this,1),this.isCollapsed()))this.d=this.f;return this.f};p.j=function(){if(this.i<0&&(this.i=Sb(this,1),this.isCollapsed()))this.h=this.i;return this.i};
p.g=function(){if(this.isCollapsed())return this.b();if(!this.d)this.d=Rb(this,0);return this.d};p.k=function(){if(this.isCollapsed())return this.j();if(this.h<0&&(this.h=Sb(this,0),this.isCollapsed()))this.i=this.h;return this.h};p.n=function(a,b,c){return this.a.compareEndPoints((b==1?"Start":"End")+"To"+(c==1?"Start":"End"),a)};
function Rb(a,b,c){c=c||a.C();if(!c||!c.firstChild)return c;for(var d=b==1,e=0,f=c.childNodes.length;e<f;e++){var j=d?e:f-e-1,k=c.childNodes[j],l;try{l=Eb(k)}catch(m){continue}var t=l.a;if(a.isCollapsed())if(U(k)){if(l.w(a))return Rb(a,b,k)}else{if(a.n(t,1,1)==0){a.i=a.h=j;break}}else if(a.w(l)){if(!U(k)){d?a.i=j:a.h=j+1;break}return Rb(a,b,k)}else if(a.n(t,1,0)<0&&a.n(t,0,1)>0)return Rb(a,b,k)}return c}
function Sb(a,b){var c=b==1,d=c?a.b():a.g();if(d.nodeType==1){for(var d=d.childNodes,e=d.length,f=c?1:-1,j=c?0:e-1;j>=0&&j<e;j+=f){var k=d[j];if(!U(k)&&a.a.compareEndPoints((b==1?"Start":"End")+"To"+(b==1?"Start":"End"),Eb(k).a)==0)return c?j:j+1}return j==-1?0:j}else return e=a.a.duplicate(),f=Pb(d),e.setEndPoint(c?"EndToEnd":"StartToStart",f),e=e.text.length,c?d.length-e:e}p.isCollapsed=function(){return this.a.compareEndPoints("StartToEnd",this.a)==0};p.select=function(){this.a.select()};
function Tb(a,b,c){var d;d=d||Ua(a.parentElement());var e;b.nodeType!=1&&(e=!0,b=d.ea("DIV",i,b));a.collapse(c);d=d||Ua(a.parentElement());var f=c=b.id;if(!c)c=b.id="goog_"+ra++;a.pasteHTML(b.outerHTML);(b=u(c)?d.t.getElementById(c):c)&&(f||b.removeAttribute("id"));if(e){a=b.firstChild;e=b;if((d=e.parentNode)&&d.nodeType!=11)if(e.removeNode)e.removeNode(!1);else{for(;b=e.firstChild;)d.insertBefore(b,e);I(e)}b=a}return b}p.insertNode=function(a,b){var c=Tb(this.a.duplicate(),a,b);this.r();return c};
p.V=function(a,b){var c=this.a.duplicate(),d=this.a.duplicate();Tb(c,a,!0);Tb(d,b,!1);this.r()};p.collapse=function(a){this.a.collapse(a);a?(this.d=this.f,this.h=this.i):(this.f=this.d,this.i=this.h)};function Ub(a){this.a=a}y(Ub,Jb);Ub.prototype.ba=function(a){a.collapse(this.b(),this.j());(this.g()!=this.b()||this.k()!=this.j())&&a.extend(this.g(),this.k());a.rangeCount==0&&a.addRange(this.a)};function V(a){this.a=a}y(V,Jb);function Eb(a){var b=H(a).createRange();if(a.nodeType==3)b.setStart(a,0),b.setEnd(a,a.length);else if(U(a)){for(var c,d=a;(c=d.firstChild)&&U(c);)d=c;b.setStart(d,0);for(d=a;(c=d.lastChild)&&U(c);)d=c;b.setEnd(d,d.nodeType==1?d.childNodes.length:d.length)}else c=a.parentNode,a=F(c.childNodes,a),b.setStart(c,a),b.setEnd(c,a+1);return new V(b)}
V.prototype.n=function(a,b,c){if(ya["528"]||(ya["528"]=pa(va,"528")>=0))return V.u.n.call(this,a,b,c);return this.a.compareBoundaryPoints(c==1?b==1?r.Range.START_TO_START:r.Range.END_TO_START:b==1?r.Range.START_TO_END:r.Range.END_TO_END,a)};V.prototype.ba=function(a,b){a.removeAllRanges();b?a.setBaseAndExtent(this.g(),this.k(),this.b(),this.j()):a.setBaseAndExtent(this.b(),this.j(),this.g(),this.k())};function U(a){var b;a:if(a.nodeType!=1)b=!1;else{switch(a.tagName){case "APPLET":case "AREA":case "BASE":case "BR":case "COL":case "FRAME":case "HR":case "IMG":case "INPUT":case "IFRAME":case "ISINDEX":case "LINK":case "NOFRAMES":case "NOSCRIPT":case "META":case "OBJECT":case "PARAM":case "SCRIPT":case "STYLE":b=!1;break a}b=!0}return b||a.nodeType==3};function Lb(){}y(Lb,R);function Db(a,b){var c=new Lb;c.L=a;c.I=!!b;return c}p=Lb.prototype;p.L=i;p.f=i;p.i=i;p.d=i;p.h=i;p.I=!1;p.ga=o("text");p.Z=function(){return W(this).a};p.r=function(){this.f=this.i=this.d=this.h=i};p.G=o(1);p.A=function(){return this};function W(a){var b;if(!(b=a.L)){b=a.b();var c=a.j(),d=a.g(),e=a.k(),f=H(b).createRange();f.setStart(b,c);f.setEnd(d,e);b=a.L=new V(f)}return b}p.C=function(){return W(this).C()};p.b=function(){return this.f||(this.f=W(this).b())};
p.j=function(){return this.i!=i?this.i:this.i=W(this).j()};p.g=function(){return this.d||(this.d=W(this).g())};p.k=function(){return this.h!=i?this.h:this.h=W(this).k()};p.H=n("I");p.w=function(a,b){var c=a.ga();if(c=="text")return W(this).w(W(a),b);else if(c=="control")return c=Vb(a),(b?Ma:Na)(c,function(a){return this.containsNode(a,b)},this);return!1};p.isCollapsed=function(){return W(this).isCollapsed()};p.D=function(){return new Fb(this.b(),this.j(),this.g(),this.k())};p.select=function(){W(this).select(this.I)};
p.insertNode=function(a,b){var c=W(this).insertNode(a,b);this.r();return c};p.V=function(a,b){W(this).V(a,b);this.r()};p.la=function(){return new Wb(this)};p.collapse=function(a){a=this.H()?!a:a;this.L&&this.L.collapse(a);a?(this.d=this.f,this.h=this.i):(this.f=this.d,this.i=this.h);this.I=!1};function Wb(a){this.Ba=a.H()?a.g():a.b();this.Na=a.H()?a.k():a.j();this.Ea=a.H()?a.b():a.g();this.Qa=a.H()?a.j():a.k()}y(Wb,zb);Wb.prototype.l=function(){Wb.u.l.call(this);this.Ea=this.Ba=i};function Xb(){}y(Xb,T);p=Xb.prototype;p.a=i;p.m=i;p.U=i;p.r=function(){this.U=this.m=i};p.ga=o("control");p.Z=function(){return this.a||document.body.createControlRange()};p.G=function(){return this.a?this.a.length:0};p.A=function(a){a=this.a.item(a);return Db(Eb(a),h)};p.C=function(){return db.apply(i,Vb(this))};p.b=function(){return Yb(this)[0]};p.j=o(0);p.g=function(){var a=Yb(this),b=D(a);return Oa(a,function(a){return J(a,b)})};p.k=function(){return this.g().childNodes.length};
function Vb(a){if(!a.m&&(a.m=[],a.a))for(var b=0;b<a.a.length;b++)a.m.push(a.a.item(b));return a.m}function Yb(a){if(!a.U)a.U=Vb(a).concat(),a.U.sort(function(a,c){return a.sourceIndex-c.sourceIndex});return a.U}p.isCollapsed=function(){return!this.a||!this.a.length};p.D=function(){return new Zb(this)};p.select=function(){this.a&&this.a.select()};p.la=function(){return new $b(this)};p.collapse=function(){this.a=i;this.r()};function $b(a){this.m=Vb(a)}y($b,zb);
$b.prototype.l=function(){$b.u.l.call(this);delete this.m};function Zb(a){if(a)this.m=Yb(a),this.f=this.m.shift(),this.d=D(this.m)||this.f;S.call(this,this.f,!1)}y(Zb,S);p=Zb.prototype;p.f=i;p.d=i;p.m=i;p.b=n("f");p.g=n("d");p.O=function(){return!this.z&&!this.m.length};p.next=function(){if(this.O())g(K);else if(!this.z){var a=this.m.shift();M(this,a,1,1);return a}return Zb.u.next.call(this)};function ac(){this.v=[];this.R=[];this.W=this.K=i}y(ac,T);p=ac.prototype;p.Ha=yb("goog.dom.MultiRange");p.r=function(){this.R=[];this.W=this.K=i};p.ga=o("mutli");p.Z=function(){this.v.length>1&&this.Ha.log(tb,"getBrowserRangeObject called on MultiRange with more than 1 range",h);return this.v[0]};p.G=function(){return this.v.length};p.A=function(a){this.R[a]||(this.R[a]=Db(new V(this.v[a]),h));return this.R[a]};
p.C=function(){if(!this.W){for(var a=[],b=0,c=this.G();b<c;b++)a.push(this.A(b).C());this.W=db.apply(i,a)}return this.W};function bc(a){if(!a.K)a.K=Cb(a),a.K.sort(function(a,c){var d=a.b(),e=a.j(),f=c.b(),j=c.j();if(d==f&&e==j)return 0;return Mb(d,e,f,j)?1:-1});return a.K}p.b=function(){return bc(this)[0].b()};p.j=function(){return bc(this)[0].j()};p.g=function(){return D(bc(this)).g()};p.k=function(){return D(bc(this)).k()};p.isCollapsed=function(){return this.v.length==0||this.v.length==1&&this.A(0).isCollapsed()};
p.D=function(){return new cc(this)};p.select=function(){var a=Bb(this.ta());a.removeAllRanges();for(var b=0,c=this.G();b<c;b++)a.addRange(this.A(b).Z())};p.la=function(){return new dc(this)};p.collapse=function(a){if(!this.isCollapsed()){var b=a?this.A(0):this.A(this.G()-1);this.r();b.collapse(a);this.R=[b];this.K=[b];this.v=[b.Z()]}};function dc(a){this.za=G(Cb(a),function(a){return a.la()})}y(dc,zb);dc.prototype.l=function(){dc.u.l.call(this);La(this.za,function(a){a.M()});delete this.za};
function cc(a){if(a)this.J=G(bc(a),function(a){return fb(a)});S.call(this,a?this.b():i,!1)}y(cc,S);p=cc.prototype;p.J=i;p.X=0;p.b=function(){return this.J[0].b()};p.g=function(){return D(this.J).g()};p.O=function(){return this.J[this.X].O()};p.next=function(){try{var a=this.J[this.X],b=a.next();M(this,a.p,a.q,a.z);return b}catch(c){if(c!==K||this.J.length-1==this.X)g(c);else return this.X++,this.next()}};function Kb(a){var b,c=!1;if(a.createRange)try{b=a.createRange()}catch(d){return i}else if(a.rangeCount)if(a.rangeCount>1){b=new ac;for(var c=0,e=a.rangeCount;c<e;c++)b.v.push(a.getRangeAt(c));return b}else b=a.getRangeAt(0),c=Mb(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset);else return i;b&&b.addElement?(a=new Xb,a.a=b):a=Db(new V(b),c);return a}
function Mb(a,b,c,d){if(a==c)return d<b;var e;if(a.nodeType==1&&b)if(e=a.childNodes[b])a=e,b=0;else if(J(a,c))return!0;if(c.nodeType==1&&d)if(e=c.childNodes[d])c=e,d=0;else if(J(c,a))return!1;return(ab(a,c)||b-d)>0};function X(a,b){O.call(this);this.type=a;this.currentTarget=this.target=b}y(X,O);X.prototype.l=function(){delete this.type;delete this.target;delete this.currentTarget};X.prototype.ka=!1;X.prototype.La=!0;function ec(a,b){a&&this.ha(a,b)}y(ec,X);p=ec.prototype;p.target=i;p.relatedTarget=i;p.offsetX=0;p.offsetY=0;p.clientX=0;p.clientY=0;p.screenX=0;p.screenY=0;p.button=0;p.keyCode=0;p.charCode=0;p.ctrlKey=!1;p.altKey=!1;p.shiftKey=!1;p.metaKey=!1;p.Ka=!1;p.qa=i;
p.ha=function(a,b){var c=this.type=a.type;X.call(this,c);this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(!d)if(c=="mouseover")d=a.fromElement;else if(c=="mouseout")d=a.toElement;this.relatedTarget=d;this.offsetX=a.offsetX!==h?a.offsetX:a.layerX;this.offsetY=a.offsetY!==h?a.offsetY:a.layerY;this.clientX=a.clientX!==h?a.clientX:a.pageX;this.clientY=a.clientY!==h?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||
0;this.charCode=a.charCode||(c=="keypress"?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.Ka=z?a.metaKey:a.ctrlKey;this.state=a.state;this.qa=a;delete this.La;delete this.ka};p.l=function(){ec.u.l.call(this);this.relatedTarget=this.currentTarget=this.target=this.qa=i};function fc(){}var gc=0;p=fc.prototype;p.key=0;p.T=!1;p.na=!1;p.ha=function(a,b,c,d,e,f){da(a)?this.va=!0:a&&a.handleEvent&&da(a.handleEvent)?this.va=!1:g(Error("Invalid listener argument"));this.ia=a;this.ya=b;this.src=c;this.type=d;this.capture=!!e;this.Ga=f;this.na=!1;this.key=++gc;this.T=!1};p.handleEvent=function(a){if(this.va)return this.ia.call(this.Ga||this.src,a);return this.ia.handleEvent.call(this.ia,a)};function Y(a,b){O.call(this);this.wa=b;this.B=[];a>this.wa&&g(Error("[goog.structs.SimplePool] Initial cannot be greater than max"));for(var c=0;c<a;c++)this.B.push(this.s?this.s():{})}y(Y,O);Y.prototype.s=i;Y.prototype.oa=i;Y.prototype.getObject=function(){if(this.B.length)return this.B.pop();return this.s?this.s():{}};function hc(a,b){a.B.length<a.wa?a.B.push(b):ic(a,b)}function ic(a,b){if(a.oa)a.oa(b);else if(x(b))if(da(b.M))b.M();else for(var c in b)delete b[c]}
Y.prototype.l=function(){Y.u.l.call(this);for(var a=this.B;a.length;)ic(this,a.pop());delete this.B};var jc,kc,lc,mc,nc,oc,pc,qc;
(function(){function a(){return{F:0,S:0}}function b(){return[]}function c(){function a(b){return j.call(a.src,a.key,b)}return a}function d(){return new fc}function e(){return new ec}var f=Gb&&!(pa(Hb,"5.7")>=0),j;mc=function(a){j=a};if(f){jc=function(a){hc(k,a)};kc=function(){return l.getObject()};lc=function(a){hc(l,a)};nc=function(){hc(m,c())};oc=function(a){hc(t,a)};pc=function(){return q.getObject()};qc=function(a){hc(q,a)};var k=new Y(0,600);k.s=a;var l=new Y(0,600);l.s=b;var m=new Y(0,600);
m.s=c;var t=new Y(0,600);t.s=d;var q=new Y(0,600);q.s=e}else jc=ba,kc=b,oc=nc=lc=ba,pc=e,qc=ba})();var rc={},Z={},sc={},tc={};function uc(a,b,c,d){if(!d.$&&d.xa){for(var e=0,f=0;e<d.length;e++)if(d[e].T){var j=d[e].ya;j.src=i;nc(j);oc(d[e])}else e!=f&&(d[f]=d[e]),f++;d.length=f;d.xa=!1;f==0&&(lc(d),delete Z[a][b][c],Z[a][b].F--,Z[a][b].F==0&&(jc(Z[a][b]),delete Z[a][b],Z[a].F--),Z[a].F==0&&(jc(Z[a]),delete Z[a]))}}function vc(a){if(a in tc)return tc[a];return tc[a]="on"+a}
function wc(a,b,c,d,e){var f=1,b=ea(b);if(a[b]){a.S--;a=a[b];a.$?a.$++:a.$=1;try{for(var j=a.length,k=0;k<j;k++){var l=a[k];l&&!l.T&&(f&=xc(l,e)!==!1)}}finally{a.$--,uc(c,d,b,a)}}return Boolean(f)}
function xc(a,b){var c=a.handleEvent(b);if(a.na){var d=a.key;if(rc[d]){var e=rc[d];if(!e.T){var f=e.src,j=e.type,k=e.ya,l=e.capture;f.removeEventListener?(f==r||!f.Oa)&&f.removeEventListener(j,k,l):f.detachEvent&&f.detachEvent(vc(j),k);f=ea(f);k=Z[j][l][f];if(sc[f]){var m=sc[f],t=F(m,e);t>=0&&(Ja(m.length!=i),E.splice.call(m,t,1));m.length==0&&delete sc[f]}e.T=!0;k.xa=!0;uc(j,l,f,k);delete rc[d]}}}return c}
mc(function(a,b){if(!rc[a])return!0;var c=rc[a],d=c.type,e=Z;if(!(d in e))return!0;var e=e[d],f,j;ib===h&&(ib=!1);if(ib){f=b||aa("window.event");var k=!0 in e,l=!1 in e;if(k){if(f.keyCode<0||f.returnValue!=h)return!0;a:{var m=!1;if(f.keyCode==0)try{f.keyCode=-1;break a}catch(t){m=!0}if(m||f.returnValue==h)f.returnValue=!0}}m=pc();m.ha(f,this);f=!0;try{if(k){for(var q=kc(),v=m.currentTarget;v;v=v.parentNode)q.push(v);j=e[!0];j.S=j.F;for(var w=q.length-1;!m.ka&&w>=0&&j.S;w--)m.currentTarget=q[w],f&=
wc(j,q[w],d,!0,m);if(l){j=e[!1];j.S=j.F;for(w=0;!m.ka&&w<q.length&&j.S;w++)m.currentTarget=q[w],f&=wc(j,q[w],d,!1,m)}}else f=xc(c,m)}finally{if(q)q.length=0,lc(q);m.M();qc(m)}return f}d=new ec(b,this);try{f=xc(c,d)}finally{d.M()}return f});function yc(){}
function zc(a,b,c){switch(typeof b){case "string":Ac(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(b==i){c.push("null");break}if(s(b)=="array"){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),zc(a,b[f],c),e=",";c.push("]");break}c.push("{");d="";for(e in b)Object.prototype.hasOwnProperty.call(b,e)&&(f=b[e],typeof f!="function"&&(c.push(d),Ac(e,c),c.push(":"),zc(a,f,c),d=","));
c.push("}");break;case "function":break;default:g(Error("Unknown type: "+typeof b))}}var Bc={'"':'\\"',"\\":"\\\\","/":"\\/","\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\u000b":"\\u000b"},Cc=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;function Ac(a,b){b.push('"',a.replace(Cc,function(a){if(a in Bc)return Bc[a];var b=a.charCodeAt(0),e="\\u";b<16?e+="000":b<256?e+="00":b<4096&&(e+="0");return Bc[a]=e+b.toString(16)}),'"')};function Dc(a){switch(s(a)){case "string":case "number":case "boolean":return a;case "function":return a.toString();case "array":return G(a,Dc);case "object":if("nodeType"in a&&(a.nodeType==1||a.nodeType==9)){var b={};b.ELEMENT=Ec(a);return b}if("document"in a)return b={},b.WINDOW=Ec(a),b;if(ca(a))return G(a,Dc);a=Ba(a,function(a,b){return typeof b=="number"||u(b)});return Ca(a,Dc);default:return i}}
function Fc(a,b){if(s(a)=="array")return G(a,function(a){return Fc(a,b)});else if(x(a)){if(typeof a=="function")return a;if("ELEMENT"in a)return Gc(a.ELEMENT,b);if("WINDOW"in a)return Gc(a.WINDOW,b);return Ca(a,function(a){return Fc(a,b)})}return a}function Hc(a){var a=a||document,b=a.$wdc_;if(!b)b=a.$wdc_={},b.ja=ha();if(!b.ja)b.ja=ha();return b}function Ec(a){var b=Hc(a.ownerDocument),c=Da(b,function(b){return b==a});c||(c=":wdc:"+b.ja++,b[c]=a);return c}
function Gc(a,b){var a=decodeURIComponent(a),c=b||document,d=Hc(c);a in d||g(new C(10,"Element does not exist in cache"));var e=d[a];if("document"in e)return e.closed&&(delete d[a],g(new C(23,"Window has been closed."))),e;for(var f=e;f;){if(f==c.documentElement)return e;f=f.parentNode}delete d[a];g(new C(10,"Element is no longer attached to the DOM"))};function Ic(a,b){var c=[a,b],d=hb,e;try{var f=d,d=u(f)?new za.Function(f):za==window?f:new za.Function("return ("+f+").apply(null,arguments);");var j=Fc(c,za.document),k=d.apply(i,j);e={status:0,value:Dc(k)}}catch(l){e={status:"code"in l?l.code:13,value:{message:l.message}}}c=[];zc(new yc,e,c);return c.join("")}var Jc="_".split("."),$=r;!(Jc[0]in $)&&$.execScript&&$.execScript("var "+Jc[0]);for(var Kc;Jc.length&&(Kc=Jc.shift());)!Jc.length&&Ic!==h?$[Kc]=Ic:$=$[Kc]?$[Kc]:$[Kc]={};; return this._.apply(null,arguments);}.apply({navigator:typeof window!='undefined'?window.navigator:null}, arguments);}
