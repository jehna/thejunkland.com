var cb = function() {
    var l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = '/delayed.458fed76.css';
    var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
    
    if (window.loadTwitter === true) {
        function loadTwit() {
            var s = document.createElement('script');
            s.src = '//platform.twitter.com/widgets.js';
            var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(s, h);
        }
        var tweet = document.getElementsByClassName('twitter-tweet')[0];
        function bindScroll() {
            if(document.body.scrollTop + window.innerHeight > tweet.offsetTop - window.innerHeight) {
                window.removeEventListener('scroll', bindScroll);
                loadTwit();
            }
        }
        window.addEventListener('scroll', bindScroll);
        bindScroll();
    }
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);

var galite = {};
galite.UA = "UA-32702642-1";
