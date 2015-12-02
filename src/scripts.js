var cb = function() {
    var l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = '/delayed.css';
    var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);

window.addEventListener("load", function() {
    var s=screen,d=document,l=localStorage,i=new XMLHttpRequest();
    var url = "http://www.google-analytics.com/collect?" + 
              "uid=" + (l.uid = l.uid || Math.random()+"."+Math.random())+
              "&v=1"+
              "&tid=UA-32702642-1"+
              "&t=pageview"+
              "&dl="+encodeURIComponent(location)+
              "&ul=en-us"+
              "&de=UTF-8"+
              "&dt="+d.title+
              "&sd="+s.colorDepth+"-bit"+
              "&sr="+s.availHeight+"x"+s.availWidth+
              "&vp="+innerWidth+"x"+innerHeight+
              "&z="+new Date().getTime();
    window.addEventListener("unload", function() {
        if(navigator.sendBeacon) {
            navigator.sendBeacon(url);
        } else {
            i.open("GET", url, false)
            i.send();
        }
    });
});
