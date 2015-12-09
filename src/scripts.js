var cb = function() {
    var l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = '/delayed.css';
    var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);

var galite = {};
galite.UA = "UA-32702642-1";
!function(a,b,c,d,e,f){a.addEventListener("load",function(){var g=(new Date).getTime();a.galite=a.galite||{};var h=new XMLHttpRequest,i="http://www.google-analytics.com/collect?cid="+(b.uid=b.uid||Math.random()+"."+Math.random())+"&v=1&tid="+galite.UA+"&dl="+f(location)+"&ul=en-us&de=UTF-8",j=function(a){var b="";for(var c in a){if(void 0===a[c])return!1;b+=f(a[c])}return b},k={dt:[e.title],sd:[d.colorDepth,"-bit"],sr:[d.availHeight,"x",d.availWidth],vp:[innerWidth,"x",innerHeight],dr:[e.referrer]};for(var l in k){var m=l+"="+j(k[l]);m&&(i+="&"+m)}var n=function(a){c.sendBeacon?c.sendBeacon(a):(h.open("GET",a,!1),h.send())},o=function(a,b){var c="";for(var d in b)c="&"+d+"="+f(b[d]);return function(){n(i+c+"&t="+f(a)+"&z="+(new Date).getTime())}};setTimeout(o("pageview"),100),a.addEventListener("unload",o("timing",{utc:"JS Dependencies",utv:"unload",utt:(new Date).getTime()-g}))})}(window,localStorage,navigator,screen,document,encodeURIComponent);
