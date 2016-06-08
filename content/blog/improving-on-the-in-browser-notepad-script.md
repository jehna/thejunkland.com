---
title: Improving on the in-browser Notepad script
modified: 1465415731010
---

The in-browser Notepad script is a handy tool to have a quick place to paste
things from web. But how can we improve it further?

This blog post is about my journey on improving the
[Notepad life hack][notepad-life-hack] bookmarklet.

# The original script

I can't fully remember where I first stumbled upon the idea, but it's covered in
many publications around the Internet. The basic idea is simple - just
copy-paste a special URL to your address bar and ta-da! You have a notepad.

The full, original script is here:

```nohighlight
data:text/html, <html contenteditable>
```

Pasting that to your browser creates an empty web page with a `data:` URL that
has the HTML5 `contenteditable` attribute specified.

This allows the user to edit the content of the page, which is indicated by the
blinking cursor. You can start typing right away:

<img alt="Empty notepad" src="/images/hello-world-notepad.png" width="396" height="73">

# Bringing some styles to equation

After some time of using the script, I thought I'm not so happy using a tool
that uses *Times New Roman* as the font.

Including a big system like Bootstrap in a bookmarklet would've sure been an
overkill. I'd never use most of the CSS anyway. So initially I chose the
lightweight [Tacit CSS framework][tacit] to be included in the bookmarklet.

Since it was just a tool for myself, I added a simple `<link>` tag to the head
of the document and voilà: An instant better-looking Notepad for me!

```html
<html contenteditable="">
<head>
    <link rel="stylesheet" href="http://yegor256.github.io/tacit/tacit.min.css">
</head>
<body>
</body>
</html>
```

## How about line breaks?

Since there was a bunch of code now, including line breaks, I figured it would
be more intuitive to use a *base64 encoded* data URL.

After making the edits in the Chrome's developer tools, I used this quick script
to convert the whole website to base64 data URL:

```javascript
console.log('data:text/html;base64,' + btoa(document.documentElement.outerHTML));
```

This takes the content of the whole website, encodes it as a base64 string and
prints it in the base64 URL template.

# Going offline

Even though I live with a decent fibre connection, I often find myself hacking
things in the most obscure places with a poor Internet connection.

One example of these is the train I commonly use; while it has a shared 4G wifi
hotspot, there are unavoidable blind spots on the way that just block the whole
Internet for a minute or two.

Commonly I noticed the connection losses when I opened the notepad and witnessed
the absence of styles. I was back again with the Times New Roman.

So time for another update of the notepad script: Inlining the styles so I could
work fully offline whenever I wanted to.

# Saving the data

Like all the good projects, also this one was directed purely on the amount of
swearing occurred by the missing features.

One of the biggest issues of the design was, that there was no way to actually
save the data. If the browser crashed, the computer restarted, or I just ran out
of battery, it always meant my Notepad woke up with a blank page.

So hey, I'll just save the whole page to the `localStorage` and I'll be safe
whatever happens. Right?

## Browsers don't really work that way

Error after another error. The hard way I figured that browsers are build so
they use the URL of the page as an unique identifier for the data.

For a data URL, though, all the features using the URL as unique identifier were
a big no-no. Using cookies, localStorage or even the fresh
[File System API][filesystem-api] all just kicked the bucket.

Fortunately offering a decent bounty for a [StackOverflow question][so-question]
found a perfect solution for the problem:

> Just use the URL itself to store the data!

In its all simplicity - I change the URL every time I want to save the document.
The browser's history detects and saves the fresh URL, and even if the browser
crashes, I can just `cmd + shift + t` to have all the saved data restored.

To implement this, I just added a simple event listener to save the page each
time I left the tab:

```javascript
document.documentElement.addEventListener('blur', function (event) {
   window.location = 'data:text/html;base64,' + btoa(document.documentElement.outerHTML);
});
```

## What about the title?

Now that the page got saved in the browser's history, I needed an intuitive way
to search for the past documents. And this view wasn't actually helping:

<p>
<picture>
<source srcset="/images/history-tab-x2.png" media="(-webkit-min-device-pixel-ratio: 2) and (min-width: 702px)">
<img alt="So many similar histories" src="/images/history-tab.png" width="702" height="125">
</picture>
</p>

To make history searching more convenient, I figured adding a proper `<title>`
tag to the page would help. But how to customize the title for each different
notepad?

```javascript
document.body.addEventListener('blur', function (event) {
   var h1 = document.getElementsByTagName('h1');
   h1.length && (document.title = "Notepadlet - " + h1[0].innerText);
   window.location = 'data:text/html;base64,' + btoa(document.documentElement.outerHTML);
});
```

You guessed it: Just adding a simple `<h1>` tag that matches the title worked
like a charm. Now the browser history made a lot more sense - and the project
finally had a name!


<p>
<picture>
<source srcset="/images/history-with-names-x2.png" media="(-webkit-min-device-pixel-ratio: 2) and (min-width: 702px)">
<img alt="Now they have names!" src="/images/history-with-names.png" width="702" height="125">
</picture>
</p>

# A fresh UI

Since the `<h1>` tag made the layout look rather ugly, it was time to give the
project the layout it really deserved.

Being a coder, rather than a designer, I figured I'd be better off using some
ready components with my design. That led me to use the awesome
[CSS3 patterns by Lea Verou][css3-patterns]. And the result turned out prettier
than I had hoped:

<p>
<picture>
<source srcset="/images/notepadlet-with-css-x2.png" media="(-webkit-min-device-pixel-ratio: 2) and (min-width: 702px)">
<img alt="Now they have names!" src="/images/notepadlet-with-css.png" width="702" height="125">
</picture>
</p>

I also added styles for mobile devices, so with Chrome's instant history sync,
I always have my *Notepadlets* available when I change between devices.

# But wait, there's more

As with many free-time projects, I found myself coding like a madman at 2AM,
figuring out the next awesome feature I could add to the project.

This time it was the image upload.

Having a history with the [JavaScript drag & drop API][drag-and-drop-api], I
just absolutely wanted to solve the single most painful aspect of *wysiwyg
editors*: The image upload.

And here's the result: You can just drag & drop an image to the page and the
Notepadlet automatically reads it, converts it to base64-encoded image and
inserts it to the page. Simply awesome.

![Now they have names!](/images/drag-and-drop.png)

# Takeaway

Best of all, I open-sourced the code, so you can have
[your own copy of Notepadlet][notepadlet-url] installed in seconds.

The whole project is open-sourced and you can have a look at it at the
[Notepadlet's Github repository][notepalet-github].

If you have any improvements or suggestions, I'm always very happy to hear them.

As a takeaway I'd like to end with these words:

> Just keep hacking. Even your most insignificant project can some day extend to
> unimaginable proportions.

[notepad-life-hack]:http://lifehacker.com/5980134/turn-any-browser-window-into-a-quick-edit-notepad
[tacit]:http://yegor256.github.io/tacit/
[filesystem-api]:https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem
[so-question]:http://stackoverflow.com/a/37541068/2697279
[css3-patterns]:http://lea.verou.me/css3patterns/
[drag-and-drop-api]:https://developer.mozilla.org/en-US/docs/Web/Events/drop
[notepadlet-url]:http://jehna.github.io/notepadlet
[notepalet-github]:https://github.com/jehna/notepadlet
