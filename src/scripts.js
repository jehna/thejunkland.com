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
