---
title: How to get 100/100 in Google PageSpeed Insights
modified: 1449180000000
description: A blog post about how this site got 100/100 points in Google PageSpeed Insights benchmark.
---

You know your website should be fast. But *how* fast should it be? You know,
it really depends how image-heavy the designer made the layout in the first
place.

And what do you compare the website to? Competitors? Ha! Their sites suck even
more than yours!

Building a website that loads outstandingly fast should be the de-facto on the
industry (much like using https), but it rather seldom delivers to do so.

I decided to make this website my first 100/100 website, no matter what it
takes. And here's my journey.

# A very different mindset

As I mentioned before, designers might not be aware of the performance
consequences of their work. Therefore it might be impossible for the developer to
salvage the outcome when the front page's images alone take 20MiB to download.

This is where a *performance budget* becomes handy. As Tim Kadlec explains in
his [blog post about performance][perf-budget], the performance is something
that can be designed, agreed on, and purposely delivered to the final product.

> Performance should be brought up early and often to emphasize its importance.

Thus we should clearly constraint the negative effects of some visual decisions
that can bloat into some serious performance issues later on.

## Setting the constraints

Before the designer starts their work, you should decide on the real-life
scenario that you want to target. As an example the site should:

* Load in 0.5 seconds with a desktop computer in Paris
* Be usable in 0.5 seconds with a mobile 3G connection from UK
* Load faster than 90% of the competitors

Deciding on the target early on makes it easy to calculate the exact constraints
that your performance budget cannot exceed. In the example above, we could
roughly translate the budget as follows:

* Target: 0.5sec for site to be usable in 3G connection
* Looking at [UK average 3G load statistics][3g-charts] we can estimate that:
  * Average download speed with 3G in London is **4.1Mbit/s**
  * **80ms** on network latency should be a safe guess
* **150ms** for the browser parsing and rendering
* That leaves us **350ms** on the actual site download
* **Max 3 different file downloads** before first render, each reducing the
  total downloadable amount via latency
* Absolute max size **0.5Mbit**, including photos

Agreeing on the performance budget *before* the design has even started changes
the whole mindset; suddenly the performance isn't anymore only the programmer's
problem, but rather both the programmer and designer work hand-in-hand to
deliver the agreed performance.

# A traditional approach

Most of the times, like with this website, you unfortunately have some kind of
existing site that you have to start improving. So the first thing you do is
to fire up the [Google PageSpeed Insights][pagespeed] and see what score you'll
end up with.

> Mobile: *84/100*, Desktop: *94/100*

Hmm, not that bad. Now we know where we're at, so starting on the technical
improvements should be pretty straightforward.

Since the desktop seems to be "nearly perfect", we'll start from there.

## Eliminate render-blocking JavaScript and CSS in above-the-fold content

Ok, so the page needs to *wait* for an unnecessary request before it can be
rendered. The flow goes somewhat like this:

1. The browser connects to the server and performs low-level networking
   handshakes to open a connection _~50ms_
2. HTML file starts downloading _~50ms_
3. The file gets parsed _~30ms_
4. Parsing finds a *render-blocking* css file from `<link rel="stylesheet">`
5. Rendering is halted until the CSS file gets downloaded
6. CSS file connection and download _~100m_
7. CSS file parsing and document rendering _~10ms_

So this extra round-trip to download the CSS file nearly doubles the time needed
to render the first image to the user. Therefore it makes sense to actually
inline some of the CSS so we can save at least the network latency on the first
load.

### Inlining the CSS

So, let's inline some of the CSS and copy-paste the lazy load code from Google's
[CSS optimization page][google-css-opt]:
```javascript
var cb = function() {
    var l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'style.css';
    var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);
```

To get the wanted result, we have to inline a subset of the CSS (I
inlined the loader part) and lazy-load the rest of the CSS. I used a simple
`grunt-contrib-replace` plugin to do the dirty job. Deploy, fire up PageSpeed
and see how we did:

> Mobile: *79/100*, Desktop: *92/100*

Alrighty then... The score actually got worse. A quick inspection on the result
revealed that PageSpeed skipped my page loader (I know, I know, loaders are for
poor flash sites) and told me the brutal reality:

> ...your page could [not] be rendered without waiting for the ... resources
  to load.

So now my loader loaded quickly, but that made the *actual* content on the site
load slower.

### Get rid of that loader

Ok, it was bad design anyway. What I did was that I changed my strategy a bit:
Inline the main CSS and lazy-load the unnecessary CSS. And get rid of that
loader at the start.

I still needed the loader to *exist*, since the in-site links used it to smooth
out the page loads (and to avoid unnecessary redraws and parsing). But rather
than making it the *first* thing to be loaded, I moved it to be the *last* thing
that would be lazy-loaded within the CSS. The result?

> Mobile: *98/100*, Desktop: *98/100*

That's what I'm talking about!

## Leverage browser caching

The last thing Google wanted me to do was to set expiration dates for my .css
and .js files.

The bad thing about setting protocol-level expiration is, that you cannot be
really sure that who caches it where. There can be a lonely router somewhere
between your cell phone and the actual server that decided to forcefully hang
on to that resource. What if you need to do an emergency patch? Do you need to
wait until the very last cache somewhere expires?

### Around the cache

Before we go to the answer, I'd like to share a good mindset: Always seek for
better practices.

This is why I like [Yeoman](http://yeoman.io/). It is basically all the greatest
minds working together to bring the best practices for everyone, easily.

For example the [webapp generator][webapp-gen] is pure genius: It sets up all
the shiny toys for you with zero configuration: Babel, SASS, Bower, Mocha,
Grunt, Livereload, etc. etc.

I happened to remember that the webapp generator used grunt-usemin
plugin that in turn uses [grunt-filerev][grunt-filerev] plugin to create an
extra hash to filenames, which gets dynamically injected to the code.

> [The plugin] will revision your files based on its contents. You should then
  set the files to expire far into the future for better caching and it will
  only update when it changes.

What this means in practice is that the filename `style.css` will be renamed to
`style.59bcc3ad.css`. The `59bcc3ad` is the compiled hash of that file, which
means that the filename changes only if the file's content changes.

This pretty much gets us around the cache, but also leverages the content
caching whenever it is possible. So a perfect solution for us!

### Setting cache headers in Apache

After the hashed filenames, setting cache headers for the files was quite
trivial task. Just throw `.htaccess` file to the folder and we're done!

```
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</IfModule>
```

After deploying the changes, the feeling was unbearable: Would this be the first
time I'd get to brag with a _100/100_ site?

> Mobile: *100/100*, Desktop: *100/100*

Success! Finally! My first personal _100/100_ site was built!


[perf-budget]:https://timkadlec.com/2013/01/setting-a-performance-budget/
[3g-charts]:http://media.ofcom.org.uk/news/2014/3g-4g-bb-speeds/
[pagespeed]:https://developers.google.com/speed/pagespeed/insights/
[google-css-opt]:https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#example
[webapp-gen]:https://github.com/yeoman/generator-webapp
[grunt-usemin]:https://www.npmjs.com/package/grunt-usemin
[grunt-filerev]:https://github.com/yeoman/grunt-filerev
