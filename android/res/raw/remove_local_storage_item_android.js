function(){return function(){var h=void 0,i=null,n,o=this;function p(){}
function q(a){var b=typeof a;if(b=="object")if(a){if(a instanceof Array)return"array";else if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if(c=="[object Window]")return"object";if(c=="[object Array]"||typeof a.length=="number"&&typeof a.splice!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("splice"))return"array";if(c=="[object Function]"||typeof a.call!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if(b=="function"&&typeof a.call=="undefined")return"object";return b}function aa(a){var b=q(a);return b=="array"||b=="object"&&typeof a.length=="number"}function t(a){return typeof a=="string"}function ba(a){a=q(a);return a=="object"||a=="array"||a=="function"}function v(a){return a[ca]||(a[ca]=++da)}var ca="closure_uid_"+Math.floor(Math.random()*2147483648).toString(36),da=0,ea=Date.now||function(){return+new Date};
function w(a,b){function c(){}c.prototype=b.prototype;a.v=b.prototype;a.prototype=new c};function fa(a){for(var b=1;b<arguments.length;b++)var c=String(arguments[b]).replace(/\$/g,"$$$$"),a=a.replace(/\%s/,c);return a}
function ga(a,b){for(var c=0,d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),f=String(b).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(d.length,f.length),g=0;c==0&&g<e;g++){var j=d[g]||"",l=f[g]||"",k=RegExp("(\\d*)(\\D*)","g"),u=RegExp("(\\d*)(\\D*)","g");do{var m=k.exec(j)||["","",""],r=u.exec(l)||["","",""];if(m[0].length==0&&r[0].length==0)break;c=x(m[1].length==0?0:parseInt(m[1],10),r[1].length==0?0:parseInt(r[1],10))||x(m[2].length==0,r[2].length==0)||x(m[2],r[2])}while(c==
0)}return c}function x(a,b){if(a<b)return-1;else if(a>b)return 1;return 0};function ha(){return o.navigator?o.navigator.userAgent:i}var ia=o.navigator,ja=(ia&&ia.platform||"").indexOf("Mac")!=-1;var y=window;function z(a){this.stack=Error().stack||"";if(a)this.message=String(a)}w(z,Error);z.prototype.name="CustomError";function ka(a,b){var c={},d;for(d in a)b.call(h,a[d],d,a)&&(c[d]=a[d]);return c}function la(a,b){var c={},d;for(d in a)c[d]=b.call(h,a[d],d,a);return c}function ma(a,b){for(var c in a)if(b.call(h,a[c],c,a))return c};function A(a,b){z.call(this,b);this.code=a;this.name=B[a]||B[13]}w(A,z);var B,na={NoSuchElementError:7,NoSuchFrameError:8,UnknownCommandError:9,StaleElementReferenceError:10,ElementNotVisibleError:11,InvalidElementStateError:12,UnknownError:13,ElementNotSelectableError:15,XPathLookupError:19,NoSuchWindowError:23,InvalidCookieDomainError:24,UnableToSetCookieError:25,ModalDialogOpenedError:26,NoModalDialogOpenError:27,ScriptTimeoutError:28,InvalidSelectorError:32},oa={},C;for(C in na)oa[na[C]]=C;
B=oa;A.prototype.toString=function(){return"["+this.name+"] "+this.message};function D(a,b){b.unshift(a);z.call(this,fa.apply(i,b));b.shift();this.C=a}w(D,z);D.prototype.name="AssertionError";function pa(a,b){if(!a){var c=Array.prototype.slice.call(arguments,2),d="Assertion failed";if(b){d+=": "+b;var f=c}throw new D(""+d,f||[]);}};var qa=Array.prototype;function ra(a,b){if(t(a)){if(!t(b)||b.length!=1)return-1;return a.indexOf(b,0)}for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1}function E(a,b){for(var c=a.length,d=Array(c),f=t(a)?a.split(""):a,e=0;e<c;e++)e in f&&(d[e]=b.call(h,f[e],e,a));return d};var F;function G(){sa&&(H[v(this)]=this)}var sa=!1,H={};G.prototype.p=!1;G.prototype.h=function(){if(!this.p&&(this.p=!0,this.d(),sa)){var a=v(this);if(!H.hasOwnProperty(a))throw Error(this+" did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");delete H[a]}};G.prototype.d=function(){};function I(a,b){G.call(this);this.type=a;this.currentTarget=this.target=b}w(I,G);I.prototype.d=function(){delete this.type;delete this.target;delete this.currentTarget};I.prototype.m=!1;I.prototype.A=!0;function J(a,b){a&&this.j(a,b)}w(J,I);n=J.prototype;n.target=i;n.relatedTarget=i;n.offsetX=0;n.offsetY=0;n.clientX=0;n.clientY=0;n.screenX=0;n.screenY=0;n.button=0;n.keyCode=0;n.charCode=0;n.ctrlKey=!1;n.altKey=!1;n.shiftKey=!1;n.metaKey=!1;n.z=!1;n.q=i;
n.j=function(a,b){var c=this.type=a.type;I.call(this,c);this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(!d)if(c=="mouseover")d=a.fromElement;else if(c=="mouseout")d=a.toElement;this.relatedTarget=d;this.offsetX=a.offsetX!==h?a.offsetX:a.layerX;this.offsetY=a.offsetY!==h?a.offsetY:a.layerY;this.clientX=a.clientX!==h?a.clientX:a.pageX;this.clientY=a.clientY!==h?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||
0;this.charCode=a.charCode||(c=="keypress"?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.z=ja?a.metaKey:a.ctrlKey;this.state=a.state;this.q=a;delete this.A;delete this.m};n.d=function(){J.v.d.call(this);this.relatedTarget=this.currentTarget=this.target=this.q=i};function ta(){}var ua=0;n=ta.prototype;n.key=0;n.f=!1;n.n=!1;n.j=function(a,b,c,d,f,e){if(q(a)=="function")this.r=!0;else if(a&&a.handleEvent&&q(a.handleEvent)=="function")this.r=!1;else throw Error("Invalid listener argument");this.k=a;this.u=b;this.src=c;this.type=d;this.capture=!!f;this.w=e;this.n=!1;this.key=++ua;this.f=!1};n.handleEvent=function(a){if(this.r)return this.k.call(this.w||this.src,a);return this.k.handleEvent.call(this.k,a)};function K(a,b){G.call(this);this.s=b;this.b=[];if(a>this.s)throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");for(var c=0;c<a;c++)this.b.push(this.a?this.a():{})}w(K,G);K.prototype.a=i;K.prototype.o=i;K.prototype.getObject=function(){if(this.b.length)return this.b.pop();return this.a?this.a():{}};function L(a,b){a.b.length<a.s?a.b.push(b):va(a,b)}function va(a,b){if(a.o)a.o(b);else if(ba(b))if(q(b.h)=="function")b.h();else for(var c in b)delete b[c]}
K.prototype.d=function(){K.v.d.call(this);for(var a=this.b;a.length;)va(this,a.pop());delete this.b};var wa,xa=(wa="ScriptEngine"in o&&o.ScriptEngine()=="JScript")?o.ScriptEngineMajorVersion()+"."+o.ScriptEngineMinorVersion()+"."+o.ScriptEngineBuildVersion():"0";var M,N,O,ya,P,Q,R,S;
(function(){function a(){return{c:0,e:0}}function b(){return[]}function c(){function a(b){return g.call(a.src,a.key,b)}return a}function d(){return new ta}function f(){return new J}var e=wa&&!(ga(xa,"5.7")>=0),g;ya=function(a){g=a};if(e){M=function(a){L(j,a)};N=function(){return l.getObject()};O=function(a){L(l,a)};P=function(){L(k,c())};Q=function(a){L(u,a)};R=function(){return m.getObject()};S=function(a){L(m,a)};var j=new K(0,600);j.a=a;var l=new K(0,600);l.a=b;var k=new K(0,600);k.a=c;var u=new K(0,
600);u.a=d;var m=new K(0,600);m.a=f}else M=p,N=b,Q=P=O=p,R=f,S=p})();var T={},U={},V={},za={};function Aa(a,b,c,d){if(!d.i&&d.t){for(var f=0,e=0;f<d.length;f++)if(d[f].f){var g=d[f].u;g.src=i;P(g);Q(d[f])}else f!=e&&(d[e]=d[f]),e++;d.length=e;d.t=!1;e==0&&(O(d),delete U[a][b][c],U[a][b].c--,U[a][b].c==0&&(M(U[a][b]),delete U[a][b],U[a].c--),U[a].c==0&&(M(U[a]),delete U[a]))}}function Ba(a){if(a in za)return za[a];return za[a]="on"+a}
function Ca(a,b,c,d,f){var e=1,b=v(b);if(a[b]){a.e--;a=a[b];a.i?a.i++:a.i=1;try{for(var g=a.length,j=0;j<g;j++){var l=a[j];l&&!l.f&&(e&=Da(l,f)!==!1)}}finally{a.i--,Aa(c,d,b,a)}}return Boolean(e)}
function Da(a,b){var c=a.handleEvent(b);if(a.n){var d=a.key;if(T[d]){var f=T[d];if(!f.f){var e=f.src,g=f.type,j=f.u,l=f.capture;e.removeEventListener?(e==o||!e.B)&&e.removeEventListener(g,j,l):e.detachEvent&&e.detachEvent(Ba(g),j);e=v(e);j=U[g][l][e];if(V[e]){var k=V[e],u=ra(k,f);u>=0&&(pa(k.length!=i),qa.splice.call(k,u,1));k.length==0&&delete V[e]}f.f=!0;j.t=!0;Aa(g,l,e,j);delete T[d]}}}return c}
ya(function(a,b){if(!T[a])return!0;var c=T[a],d=c.type,f=U;if(!(d in f))return!0;var f=f[d],e,g;F===h&&(F=!1);if(F){var j;if(!(j=b))a:{j="window.event".split(".");for(var l=o;e=j.shift();)if(l[e]!=i)l=l[e];else{j=i;break a}j=l}e=j;j=!0 in f;l=!1 in f;if(j){if(e.keyCode<0||e.returnValue!=h)return!0;a:{var k=!1;if(e.keyCode==0)try{e.keyCode=-1;break a}catch(u){k=!0}if(k||e.returnValue==h)e.returnValue=!0}}k=R();k.j(e,this);e=!0;try{if(j){for(var m=N(),r=k.currentTarget;r;r=r.parentNode)m.push(r);g=
f[!0];g.e=g.c;for(var s=m.length-1;!k.m&&s>=0&&g.e;s--)k.currentTarget=m[s],e&=Ca(g,m[s],d,!0,k);if(l){g=f[!1];g.e=g.c;for(s=0;!k.m&&s<m.length&&g.e;s++)k.currentTarget=m[s],e&=Ca(g,m[s],d,!1,k)}}else e=Da(c,k)}finally{if(m)m.length=0,O(m);k.h();S(k)}return e}d=new J(b,this);try{e=Da(c,d)}finally{d.h()}return e});function Ea(){}
function Fa(a,b,c){switch(typeof b){case "string":Ga(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(b==i){c.push("null");break}if(q(b)=="array"){var d=b.length;c.push("[");for(var f="",e=0;e<d;e++)c.push(f),Fa(a,b[e],c),f=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],typeof e!="function"&&(c.push(d),Ga(f,c),c.push(":"),Fa(a,e,c),d=","));
c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Ha={'"':'\\"',"\\":"\\\\","/":"\\/","\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\u000b":"\\u000b"},Ia=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;function Ga(a,b){b.push('"',a.replace(Ia,function(a){if(a in Ha)return Ha[a];var b=a.charCodeAt(0),f="\\u";b<16?f+="000":b<256?f+="00":b<4096&&(f+="0");return Ha[a]=f+b.toString(16)}),'"')};function W(a){switch(q(a)){case "string":case "number":case "boolean":return a;case "function":return a.toString();case "array":return E(a,W);case "object":if("nodeType"in a&&(a.nodeType==1||a.nodeType==9)){var b={};b.ELEMENT=Ja(a);return b}if("document"in a)return b={},b.WINDOW=Ja(a),b;if(aa(a))return E(a,W);a=ka(a,function(a,b){return typeof b=="number"||t(b)});return la(a,W);default:return i}}
function Ka(a,b){if(q(a)=="array")return E(a,function(a){return Ka(a,b)});else if(ba(a)){if(typeof a=="function")return a;if("ELEMENT"in a)return La(a.ELEMENT,b);if("WINDOW"in a)return La(a.WINDOW,b);return la(a,function(a){return Ka(a,b)})}return a}function Ma(a){var a=a||document,b=a.$wdc_;if(!b)b=a.$wdc_={},b.l=ea();if(!b.l)b.l=ea();return b}function Ja(a){var b=Ma(a.ownerDocument),c=ma(b,function(b){return b==a});c||(c=":wdc:"+b.l++,b[c]=a);return c}
function La(a,b){var a=decodeURIComponent(a),c=b||document,d=Ma(c);if(!(a in d))throw new A(10,"Element does not exist in cache");var f=d[a];if("document"in f){if(f.closed)throw delete d[a],new A(23,"Window has been closed.");return f}for(var e=f;e;){if(e==c.documentElement)return f;e=e.parentNode}delete d[a];throw new A(10,"Element is no longer attached to the DOM");};var Na,Oa="",Pa=/Android\s+([0-9.]+)(?:.*Version\/([0-9.]+))?/.exec(ha());Na=Oa=Pa?Pa[2]||Pa[1]:"";function Qa(a){if(ha())return ga(Na,a)>=0;return!1};var Ra=Qa(4)&&!Qa(5);
function Sa(){var a=y||y;switch("local_storage"){case "appcache":return a.applicationCache!=i;case "browser_connection":return a.navigator!=i&&a.navigator.onLine!=i;case "database":if(Ra)return!1;return a.openDatabase!=i;case "location":return a.navigator!=i&&a.navigator.geolocation!=i;case "local_storage":return a.localStorage!=i;case "session_storage":return a.sessionStorage!=i&&a.sessionStorage.clear!=i;default:throw new A(13,"Unsupported API identifier provided as parameter");}};function X(a){this.g=a}X.prototype.getItem=function(a){return this.g.getItem(a)};X.prototype.removeItem=function(a){var b=this.g.getItem(a);this.g.removeItem(a);return b};X.prototype.clear=function(){this.g.clear()};X.prototype.key=function(a){return this.g.key(a)};function Ta(a){if(!Sa())throw new A(13,"Local storage undefined");return(new X(y.localStorage)).removeItem(a)};function Ua(a){var a=[a],b=Ta,c;try{var d=b,b=t(d)?new y.Function(d):y==window?d:new y.Function("return ("+d+").apply(null,arguments);");var f=Ka(a,y.document),e=b.apply(i,f);c={status:0,value:W(e)}}catch(g){c={status:"code"in g?g.code:13,value:{message:g.message}}}f=[];Fa(new Ea,c,f);return f.join("")}var Y="_".split("."),Z=o;!(Y[0]in Z)&&Z.execScript&&Z.execScript("var "+Y[0]);for(var $;Y.length&&($=Y.shift());)!Y.length&&Ua!==h?Z[$]=Ua:Z=Z[$]?Z[$]:Z[$]={};; return this._.apply(null,arguments);}.apply({navigator:typeof window!='undefined'?window.navigator:null}, arguments);}
