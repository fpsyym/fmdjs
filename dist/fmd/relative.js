fmd("relative",["lang","event","module"],function(e,n){var t=/.*\//,r=/\/\.\//,i=/[^\/]+\/\.\.\//,o={cwd:function(e){return e.match(t)[0]},isDotStart:function(e){return"."===e.charAt(0)},hasSlash:function(e){return e.lastIndexOf("/")>0},resolve:function(e,n){for(var t=(e+n).replace(r,"/");t.match(i);)t=t.replace(i,"");return t}};return n.on("relative",function(e,n){o.isDotStart(e.id)&&n&&o.hasSlash(n.id)&&(n._cwd||(n._cwd=o.cwd(n.id)),e.id=o.resolve(n._cwd,e.id))}),o});