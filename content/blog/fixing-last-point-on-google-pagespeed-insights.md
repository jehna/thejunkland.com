---
title: Fixing the last point on Google PageSpeed Insights
draft: true
modified: 1451262042692
---

If you've tried to build your site to 100/100 in the Google PageSpeed Insights,
you might have bumped in the following warning:

> Leverage browser caching<br />
> Setting an expiry date or a maximum age in the HTTP headers for static
> resources instructs the browser to load previously downloaded resources from
> local disk rather than over the network. Leverage browser caching for the
> following cacheable resources:<br />
> http://www.google-analytics.com/analytics.js (2 hours)

As you might want to use GA in your site, the 99/100 PageSpeed score might get
frustrating. Especially because Google itself has stated
[it won't fix the issue][analytics-js-wontfix].

# Fixing the issue

This is why I created [GA-Lite][ga-lite], a small subset of Google Analytics
that uses the [Google Analytics Measurement Protocol REST API][ga-rest-api]. The
library can be easily downloaded from the Github and hosted on your own server,
fixing the "Leverage browser caching" warning.

If you trust me, you can also use the [a CDN][cdn] to load the library. This
automatically sets the appropriate headers to the script so you can get the
remaining GA issue solved.

# How to install?

The easiest way to install the script is to include the CDN version to you HTML
code:

```HTML
<script src="https://cdn.jsdelivr.net/ga-lite/1.0.0/ga-lite.min.js" async></script>
<script>
var galite = galite || {};
galite.UA = 'UA-XXXXXX'; // Insert your tracking code here
</script>
```

This adds the library to your webpage and starts sending the page views to the
Google Analytics servers.

# Why not to just copy the analytics.js to my server?

If you've done googling like I have, you probably have stumbled to many other
solutions. Commonly they suggest that you either download the `anlytics.js` file
to your own server or use some proxy in the between.

If you'd just copy the `analytics.js` file to your own server, it would
potentially break at any minute. This is, because Google *wants* to change
things often and thus keep the ownership of the file.

So if Google changes something, that leaves your website hanging with the *old*
version of the `analytics.js`, potentially breaking the analytics tracking.

## What about a proxy?

The next logical step would be to use [a proxy][proxy] that keeps up the most
current version of the script, but sets the "correct" headers for you.

This is heavily discouraged for two big reasons:

1. Google wants to keep the ownership of the script. So if they make a breaking
   change, every single `analytics.js` will be up-to-date within 2 hours. But
   your proxy will still keep the old script cached for longer times, breaking
   your site's analytics.
2. Can you really trust an [outside vendor][outside-vendor]? Even if they are
   not evil and inject your script with spam, they could stop updating/serving
   the script at any time.

As a rule of thumb, you should not include any code to your website/product that
you have not gone trough or use a vendor that you don't trust.

The good thing about *ga-lite* is, that anyone can easily go through all the
source code and build it themselves. And you can compare the built source code
to the one in the CDN and see that they match.

# Technical definition

There are a few things why *ga-lite* has "lite" in its name. Currently the
script only tracks the page views and tries to keep the
[time spent on page][understanding-ga-timings].

The script first generates a [random identifier][random-id] for the user and
saves it to the `localStorage` variable.

It then [sends][pageview-send] a `pageview` event to the Google's servers with
0.1 second delay after the page has been loaded. The sending is done through
a well-documented [Analytics Measurement Protocol REST API][ga-rest-api].

Since the Google Analytics [uses events][understanding-ga-timings] to calculate
the time spent on page, the script tries to send additional ping to Google's
servers on browser's `unload` event, which fires
[right after the user closes the page][user-closes-page].

Since sending a regular, blocking request on the `unload` event is discouraged,
*ga-lite* uses the new [Navigator.sendBeacon][send-beacon] API whenever it's
available.

## What's next?

The above walkthrough pretty much describes the *ga-lite*'s whole functionality
as it is (was) at late 2015.

Next steps will include that the script will be slowly improved to have more of
the features from the full `analytics.js`, as they are needed by users.

If you want to request a feature, please [fill in an issue][ga-lite-issue], or
fork the repo and create a pull request.

[analytics-js-wontfix]:https://code.google.com/p/analytics-issues/issues/detail?id=101
[cdn]:https://cdn.jsdelivr.net/ga-lite/1.0.0/ga-lite.min.js
[ga-lite]:https://github.com/jehna/ga-lite/
[proxy]:http://diywpblog.com/leverage-browser-cache-optimize-google-analytics/
[ga-rest-api]:https://developers.google.com/analytics/devguides/collection/protocol/v1/reference
[understanding-ga-timings]:http://cutroni.com/blog/2012/02/29/understanding-google-analytics-time-calculations/
[random-id]:https://github.com/jehna/ga-lite/blob/c27c9c2698e3d8ddf29bd5a68f412b9e8e901c45/src/ga-lite.js#L9
[pageview-send]:https://github.com/jehna/ga-lite/blob/c27c9c2698e3d8ddf29bd5a68f412b9e8e901c45/src/ga-lite.js#L67
[user-closes-page]:https://github.com/jehna/ga-lite/blob/c27c9c2698e3d8ddf29bd5a68f412b9e8e901c45/src/ga-lite.js#L74-L84
[send-beacon]:https://github.com/jehna/ga-lite/blob/c27c9c2698e3d8ddf29bd5a68f412b9e8e901c45/src/ga-lite.js#L44
[ga-lite-issue]:https://github.com/jehna/ga-lite/issues/new
[outside-vendor]:http://sourceforge.net/projects/schedule-analytics/
