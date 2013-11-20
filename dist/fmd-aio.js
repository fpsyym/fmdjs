/*! fmd.js v0.2.0 | http://fmdjs.org/ | MIT */
(function(e){if(!e.fmd){var n={},t=function(e){return n[e]},r=function(e,r,i){if(!n[e]){if(i||(i=r,r=[]),"function"==typeof i){for(var o=[],u=0,a=r.length;a>u;u++)o.push(t(r[u]));i=i.apply(null,o)}n[e]=i||1}};r.version="0.2.0",r.cache={},r("global",e),r("require",function(){return t}),r("env",function(){return r}),r("cache",function(){return r.cache}),e.fmd=r}})(this),fmd("lang",function(){var e={}.toString,n=Array.prototype,t={isFunction:function(n){return"[object Function]"===e.call(n)},isArray:Array.isArray||function(n){return"[object Array]"===e.call(n)},isString:function(e){return"string"==typeof e},forEach:n.forEach?function(e,n,t){e.forEach(n,t)}:function(e,n,t){for(var r=0,i=e.length;i>r;r++)n.call(t,e[r],r,e)},map:n.map?function(e,n,t){return e.map(n,t)}:function(e,n,r){var i=[];return t.forEach(e,function(e,t,o){i.push(n.call(r,e,t,o))}),i},inArray:n.indexOf?function(e,n){return e.indexOf(n)}:function(e,n){for(var t=0,r=e.length;r>t;t++)if(e[t]===n)return t;return-1}};return t}),fmd("event",["env","cache"],function(e,n){var t=n.events={},r=[].slice,i={on:function(e,n){var r=t[e]||(t[e]=[]);r.push(n)},emit:function(e){var n,i=r.call(arguments,1),o=t[e],u=0;if(o)for(;n=o[u++];)n.apply(null,i)},off:function(e,n){var r=t[e];if(r)if(n)for(var i=r.length-1;i>=0;i--)r[i]===n&&r.splice(i,1);else delete t[e]}};return e.on=i.on,e.off=i.off,i}),fmd("config",["env","cache","lang"],function(e,n,t){var r=n.config={},i=n.configRules={},o="_rule_",u=0,a=function(e,n,o){var u,a=!1;for(var c in i){if(a)break;u=i[c],a=t.inArray(u.keys,n)>-1&&void 0===u.rule.call(r,e,n,o)}return a},c={get:function(e){return r[e]},set:function(e){for(var n in e){var t=r[n],i=e[n];a(t,n,i)||(r[n]=i)}},register:function(e){var n;return t.isFunction(e.rule)&&(e.name||(e.name=o+u++),n=i[e.name]={rule:e.rule,keys:[]}),n||(n=i[e.name]),n&&e.keys&&(t.isArray(e.keys)?n.keys=n.keys.concat(e.keys):n.keys.push(e.keys)),this}};return c.register({name:"object",rule:function(e,n,t){if(!e)return!1;for(var r in t)e[r]=t[r]}}).register({name:"array",rule:function(e,n,t){e?e.push(t):this[n]=[t]}}),e.config=function(e){return t.isString(e)?c.get(e):(c.set(e),void 0)},c}),fmd("module",["global","env","cache","lang","event"],function(e,n,t,r,i){var o,u="",a=[],c="_!_fmd_anonymous_",f=0,l=t.modules={},s={require:function(e){return e.require||d.makeRequire(e),i.emit("makeRequire",e.require,e),e.require},exports:function(e){return e.exports},module:function(e){return e.module={id:e.id,exports:e.exports},e.module}},d=function(e,n,t){var r=this;r.id=e,r.deps=n||[],r.factory=t,r.exports={},r.unnamed()&&(e=c+f,f++),r.uid=e};d.prototype={unnamed:function(){return this.id===u},extract:function(){var e=this,n=e.deps,t=[];return r.isArray(n)&&r.forEach(n,function(n){var r,i;(i=s[n])?r=i(e):(e.require||d.makeRequire(e),r=e.require(n)),t.push(r)}),t},compile:function(){var e=this;try{if(r.isFunction(e.factory)){var n=e.extract(),t=e.factory.apply(null,n);t!==o?e.exports=t:e.module&&e.module.exports&&(e.exports=e.module.exports),e.module&&delete e.module}else e.factory!==o&&(e.exports=e.factory);i.emit("compiled",e)}catch(u){i.emit("compileFailed",u,e)}},autocompile:function(){this.unnamed()&&this.compile()}},d.get=function(e){return l[e]},d.has=function(e,n){if(s[e])return!0;var t={id:e};return n&&i.emit("alias",t),l[t.id]?!0:!1},d.save=function(e){l[e.uid]=e,i.emit("saved",e),e.autocompile()},d.require=function(e){var n=d.get(e);return n?(n.compiled||(n.compiled=!0,n.compile()),i.emit("required",n),n.exports):(i.emit("requireFailed",{id:e}),null)},d.makeRequire=function(e){e.require=function(n){var t={id:n};return i.emit("relative",t,e),i.emit("alias",t),d.require(t.id)}},d.define=function(e,n,t){var o=arguments.length;return 1===o?(t=e,e=u):2===o&&(t=n,n=a,r.isString(e)||(n=e,e=u)),d.has(e,!0)?(i.emit("existed",{id:e}),null):(d.save(new d(e,n,t)),void 0)};var m=e.define;return n.noConflict=function(){e.define=m},n.define=e.define=d.define,d}),fmd("relative",["lang","event","module"],function(e,n){var t=/.*\//,r=/\/\.\//,i=/[^\/]+\/\.\.\//,o={cwd:function(e){return e.match(t)[0]},isDotStart:function(e){return"."===e.charAt(0)},hasSlash:function(e){return e.lastIndexOf("/")>0},resolve:function(e,n){for(var t=(e+n).replace(r,"/");t.match(i);)t=t.replace(i,"");return t}};return n.on("relative",function(e,n){o.isDotStart(e.id)&&n&&o.hasSlash(n.id)&&(n._cwd||(n._cwd=o.cwd(n.id)),e.id=o.resolve(n._cwd,e.id))}),o}),fmd("alias",["config","event"],function(e,n){var t="alias";e.register({keys:t,name:"object"}),n.on(t,function(n){var r,i=e.get(t);i&&(r=i[n.id])&&(n.id=r)})}),fmd("id2url",["global","event","config"],function(e,n,t){var r=/^https?:\/\//i,i=(new Date).getTime(),o="resolve",u="stamp";t.set({baseUrl:function(){var n=/(?:[\w]+)\:\/\/(?:[\w|\.|\:]+)\//i,t=e.document.getElementsByTagName("script"),r=t[t.length-1],i=(r.hasAttribute?r.src:r.getAttribute("src",4)).match(n);return i[0]}()}),t.register({keys:o,name:"array"}).register({keys:u,name:"object"});var a=function(e){var n,r=t.get(o);if(r)for(var i=0,u=r.length;u>i&&(n=r[i](e.id),n===e.id);i++);e.url=n?n:e.id},c=function(e){r.test(e.url)||(e.url=t.get("baseUrl")+e.url)},f=function(e){var n=e.url;n.lastIndexOf(".")<n.lastIndexOf("/")&&(e.url+=".js")},l=function(e){var n=t.get("hasStamp")?i:null,r=t.get(u);if(r)for(var o in r)if(RegExp(o).test(e.id)){n=r[o];break}n&&(e.url+="?fmd.stamp="+n)},s=function(e){n.emit(o,e),c(e),f(e),n.emit(u,e)};n.on(o,a),n.on(u,l),n.on("id2url",s)}),fmd("assets",["cache","lang","event","config","module"],function(e,n,t,r,i){var o=e.assets={},u={},a={make:function(e,n){var r={id:e};return t.emit("analyze",r),t.emit("relative",r,n),t.emit("alias",r),u[r.id]?o[u[r.id]]:(i.has(r.id)?r.url=r.id:t.emit("id2url",r),u[r.id]=r.url,o[r.url]=r)},group:function(e){return n.map(e.deps,function(n){return a.make(n,e)})}};return a}),fmd("when",function(){var e=function(){},n=function(n){var t=this,r=[],i=0,o=0;n=n||0;var u=function(){i+o===n&&a()},a=function(){t.then=o?function(e,n){n&&n()}:function(e){e&&e()},a=e,c(o?1:0),c=e,r=[]},c=function(e){for(var n,t,i=0;n=r[i++];)t=n[e],t&&t()};this.then=function(e,n){r.push([e,n])},this.resolve=function(){i++,u()},this.reject=function(){o++,u()},u()},t=function(){for(var e,t=arguments.length,r=new n(t),i=0;e=arguments[i++];)e(r);return r};return t}),fmd("request",["global","config","event"],function(e,n,t){var r=e.document,i=e.setTimeout,o=/\.css(?:\?|$)/i,u=/loaded|complete/,a=/security|denied/i,c="requested",f="charset",l=536>1*e.navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/,"$1"),s=r&&(r.head||r.getElementsByTagName("head")[0]||r.documentElement),d=function(e,i){var o;return i?(o=r.createElement("link"),o.rel="stylesheet",o.href=e.url):(o=r.createElement("script"),o.async=!0,o.src=e.url),n.get(f)&&(o.charset=n.get(f)),t.emit("createNode",o,e),o},m=function(e,n,r){var o,u,f=!1;try{o=e.sheet,o&&(u=o.cssRules,f=u?u.length>0:void 0!==u)}catch(l){f=a.test(l.message)}i(function(){f?(n&&n(),t.emit(c,r)):m(e,n,r)},20)},p=function(e,r,i,o,a){function f(){e.onload=e.onreadystatechange=e.onerror=null,a||n.get("debug")||e.parentNode&&e.parentNode.removeChild(e),e=void 0,r&&r()}i?(e.onload=function(){f(),t.emit(c,o)},e.onerror=function(){f(),t.emit("requestError",o)}):e.onreadystatechange=function(){u.test(e.readyState)&&(f(),t.emit(c,o))}},g=function(e,n,t,r){return l||!t?(i(function(){m(e,n,r)},1),void 0):(p(e,n,t,r,!0),void 0)},v=function(e,n){var t=o.test(e.url),r=d(e,t),i="onload"in r;t?g(r,n,i,e):p(r,n,i,e),s.appendChild(r)};return v}),fmd("loader",["global","event","config","request"],function(e,n,t,r){var i="loading",o="loaded",u="requestComplete",a=function(){};t.set({timeout:1e4}),n.on(u,function(e){var n,t;for(e.state=o,t=e.onload;n=t.shift();)n()});var c=function(c,f){return f||(f=a),c.state===o?(f(),void 0):c.state===i?(c.onload.push(f),void 0):(c.state=i,c.onload=[f],n.emit("request",c,f),c.requested||(c.timer=e.setTimeout(function(){n.emit("requestTimeout",c)},t.get("timeout")),r(c,function(){e.clearTimeout(c.timer),n.emit(u,c)})),void 0)};return c}),fmd("remote",["lang","event","module","assets","when","loader"],function(e,n,t,r,i,o){var u={};return u.bring=u.get=function(n,r){i.apply(null,e.map(n,function(e){return function(n){t.has(e.id)?n.resolve():o(e,function(){n.resolve()})}})).then(r)},u.fetch=function(o,a){var c=r.group(o);n.emit("fetch",c),u.bring(c,function(){i.apply(null,e.map(c,function(e){return function(n){var r=t.get(e.id);r&&!r.compiled&&r.deps.length?u.fetch(r,function(){n.resolve()}):n.resolve()}})).then(function(){a.call(null,c)})})},u}),fmd("use",["lang","event","module","remote"],function(e,n,t,r){n.on("makeRequire",function(n,i){n.use=function(n,o){e.isArray(n)||(n=[n]),r.fetch({id:i.id,deps:n},function(n){var r=e.map(n,function(e){return t.require(e.id)});o&&o.apply(null,r)})}})}),fmd("async",["config","module","remote"],function(e,n,t){var r=n.prototype.autocompile,i=function(){var e=this;e.unnamed()&&t.fetch(e,function(){e.compile()})};e.register({keys:"async",rule:function(e,t,o){o=!!o,e!==o&&(this.async=o,n.prototype.autocompile=o===!0?i:r)}}).set({async:!0})}),fmd("logger",["global","require","env","config","assets","loader","console"],function(e,n,t,r,i,o,u){var a=t.log=function(){},c=e.console,f=function(e){t.log=e?c&&c.warn?function(e,n){c[n||"log"](e)}:function(e,t){u?u(e,t):o&&o(i.make("fmd/console"),function(){u||(u=n("console")),u(e,t)})}:a};r.register({keys:"debug",rule:function(e,n,t){f(t),this.debug=t}})}),fmd("plugin",["cache","lang","event","config","when","remote"],function(e,n,t,r,i,o){var u=e.plugin={},a=/(.+)!(.+)/,c="analyze",f={defaultPlugin:"async",register:function(e,n){u[e]=n},sorting:function(e){var t,r,i=[],o={};return n.forEach(e,function(e){o[e.plugin]>-1?r=i[o[e.plugin]]:(t=o[e.plugin]=i.length,r=i[t]={group:[],execute:u[e.plugin]}),r.group.push(e)}),i}};f.register(f.defaultPlugin,function(e){o.get(this.group,e)});var l=function(e){var n=e.id.match(a);n&&(e.plugin=n[1],e.id=n[2]),!u[e.plugin]&&(e.plugin=f.defaultPlugin)},s=function(e,t){i.apply(null,n.map(f.sorting(e),function(e){return function(n){e.execute?e.execute(function(){n.resolve()}):n.resolve()}})).then(t)};return r.register({keys:"plugin",rule:function(e,n,r){r=!!r,e!==r&&(this.plugin=r,r===!0?(t.on(c,l),o.bring=s):(t.off(c,l),o.bring=o.get))}}).set({plugin:!0}),f}),fmd("preload",["global","lang","event","when","request","loader"],function(e,n,t,r,i,o){var u=e.document,a="async"in u.createElement("script")||"MozAppearance"in u.documentElement.style||e.opera,c="text/cache-javascript",f="preloading",l="preloaded";t.on("createNode",function(e,n){n.isPreload&&(e.async=!1,e.defer=!1,!a&&(e.type=c))}),t.on("request",function(e,n){e.preState&&(e.preState===f?(e.onpreload.push(function(){o(e,n)}),delete e.state,e.requested=!0):(delete e.requested,delete e.isPreload))});var s=function(e){e.preState||(e.preState=f,e.onpreload=[],i(e,function(){e.preState=l,n.forEach(e.onpreload,function(e){e()})}))},d=function(e,t){r.apply(null,n.map(e,function(e){return function(n){e.isPreload=!0,o(e,function(){n.resolve()})}})).then(t)},m=function(e,t){var r=e.slice(1);r.length?(n.forEach(e,function(e){e.isPreload||(e.isPreload=!0,s(e))}),o(e[0],function(){p(r,t)})):o(e[0],t)},p=function(e,n){p=a?d:m,p(e,n)};return p}),fmd("non",["plugin","preload"],function(e,n){e.register("non",function(e){n(this.group,e)})});