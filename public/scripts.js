var cb = function() {
    var l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = '/delayed.css';
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

    window.addEventListener('scroll', loadImages)
};

function loadImages() {
    window.removeEventListener('scroll', loadImages)
    var lli = Array.prototype.slice.call(document.getElementsByClassName('lazyloadimage'))
    var llr
    for(var i = 0; i < lli.length; i++) {
        llr = document.createElement("div")
        llr.innerHTML = lli[i].textContent;
        lli[i].parentElement.insertBefore(llr, lli[i])
        lli[i].parentElement.removeChild(lli[i])
    }
}

var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);

(function(e,t,n,i,s,a,c){e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)}
;a=t.createElement(i);c=t.getElementsByTagName(i)[0];a.async=true;a.src=s
;c.parentNode.insertBefore(a,c)
})(window,document,"galite","script","/ga-lite.min.js");

galite('create', 'UA-32702642-1', 'auto');
galite('send', 'pageview');
