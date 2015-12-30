---
title: Improving on a 1950's technology&#58 VerbalExpressions
modified: 1451313195606
draft: true
---

Regular expressions can be used to search and match different complex parts of
text. But is there something we can do to improve the technology that's been
around from the 1950's?

# Regular expressions are hard

The language used to express the part of a text can get pretty hard to read
pretty fast, obfuscating the bigger view of what a person might have wanted to
accomplish.

Consider this, rather simple, regular expression:
```regex
/^\S+@\S+\.\S+$/
```

So what does it do? When we have a look with a magnificent tool called
[Regexper][regexper], we can begin to make some sense about it:

<div class="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" version="1.1" viewBox="0 0 665.9844360351562 53.5" width="665.9844360351562" height="53.5" style="padding-top: 15px;"><defs><style type="text/css">svg{background-color:#fff}text,tspan{font:12px Arial}path{fill-opacity:0;stroke-width:2px;stroke:#000}circle{fill:#6b6659;stroke-width:2px;stroke:#000}.anchor text,.any-character text{fill:#fff}.anchor rect,.any-character rect{fill:#6b6659}.escape text,.charset-escape text,.literal text{fill:#000}.escape rect,.charset-escape rect{fill:#bada55}.literal rect{fill:#dae9e5}.charset .charset-box{fill:#cbcbba}.subexp .subexp-label tspan,.charset .charset-label tspan,.match-fragment .repeat-label tspan{font-size:10px}.subexp .subexp-label tspan,.charset .charset-label tspan{dominant-baseline:text-after-edge}.subexp .subexp-box{stroke:#908c83;stroke-dasharray:6,2;stroke-width:2px;fill-opacity:0}.quote{fill:#908c83}</style></defs><metadata><rdf:rdf><cc:license rdf:about="http://creativecommons.org/licenses/by/3.0/"><cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"></cc:permits><cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"></cc:permits><cc:requires rdf:resource="http://creativecommons.org/ns#Notice"></cc:requires><cc:requires rdf:resource="http://creativecommons.org/ns#Attribution"></cc:requires><cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"></cc:permits></cc:license></rdf:rdf></metadata><desc>Created with Snap</desc><g transform="matrix(1,0,0,1,15,10)" class="root"><g transform="matrix(1,0,0,1,10,0)" class="regexp match"><path d="M70.6875,11.75H90.6875M188.0625,11.75H213.0625M243.21875,11.75H263.2188M360.5938,11.75H385.5938M406.9063,11.75H426.9063M524.2813,11.75H549.2813"></path><g class="label anchor" transform="matrix(1,0,0,1,0,0)"><rect width="70.6875" height="23.5"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan>Start of line</tspan></text></g><g transform="matrix(1,0,0,1,549.2813,0)" class="label anchor"><rect width="66.703125" height="23.5"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan>End of line</tspan></text></g><g class="match-fragment" transform="matrix(1,0,0,1,80.6875,0)"><path d="M10,11.75q-10,0 -10,10v1.75q0,10 10,10h97.375q10,0 10,-10v-1.75q0,-10 -10,-10M117.375,26.75l5,-5m-5,5l-5,-5"></path><g class="escape" transform="matrix(1,0,0,1,10,0)"><g class="label"><rect width="97.375" height="23.5" rx="3" ry="3"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan>non-white space</tspan></text></g></g></g><g class="match-fragment literal" transform="matrix(1,0,0,1,213.0625,0)"><g class="label"><rect width="30.15625" height="23.5" rx="3" ry="3"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan class="quote">“</tspan><tspan>@</tspan><tspan class="quote">”</tspan></text></g></g><g class="match-fragment" transform="matrix(1,0,0,1,253.2188,0)"><path d="M10,11.75q-10,0 -10,10v1.75q0,10 10,10h97.375q10,0 10,-10v-1.75q0,-10 -10,-10M117.375,26.75l5,-5m-5,5l-5,-5"></path><g class="escape" transform="matrix(1,0,0,1,10,0)"><g class="label"><rect width="97.375" height="23.5" rx="3" ry="3"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan>non-white space</tspan></text></g></g></g><g class="match-fragment literal" transform="matrix(1,0,0,1,385.5938,0)"><g class="label"><rect width="21.3125" height="23.5" rx="3" ry="3"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan class="quote">“</tspan><tspan>.</tspan><tspan class="quote">”</tspan></text></g></g><g class="match-fragment" transform="matrix(1,0,0,1,416.9063,0)"><path d="M10,11.75q-10,0 -10,10v1.75q0,10 10,10h97.375q10,0 10,-10v-1.75q0,-10 -10,-10M117.375,26.75l5,-5m-5,5l-5,-5"></path><g class="escape" transform="matrix(1,0,0,1,10,0)"><g class="label"><rect width="97.375" height="23.5" rx="3" ry="3"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan>non-white space</tspan></text></g></g></g></g><path d="M10,11.75H0M625.984425,11.75H635.9844360351562"></path><circle cx="0" cy="11.75" r="5"></circle><circle cx="635.9844360351562" cy="11.75" r="5"></circle></g></svg></div>

Ok, this looks a bit more readable. You might even start to tell that the
expression has something to do with emails.

But you might want to be able to make the regular expressions readable without
needing to copy-paste them to a website. VerbalExpressions to the rescue!

# How to use VerbalExpressions?

Thinking that there should be an easier and more expressive way to write regular
expressions, I spent originally few hours making the JavaScript implementation
of VerbalExpressions.

VerbalExpressions is [a small library][verbalexpressions-github] that you can
include to your project so you can use more expressive language. For example the
previous line could be expressed like this:

```javascript
VerEx().startOfLine()
       .somethingBut(' ')
       .then('@')
       .somethingBut(' ')
       .then('.')
       .somethingBut(' ')
       .endOfLine();
```

This helps you to understand what is going on, because the script chains up the
regular expression nicely as you read it line by line.

# Converting to RegExp

Using VerbalExpressions can help if you're trying to learn to use the "real"
regular expressions, because the VerEx object is just an extension of the
underlying `RegExp` object (in JavaScript).

You can do everything with the `VerEx` object you'd do with a regular `RegExp`
object; you can find, test, replace etc.

You can even convert the `VerEx` object to a regular `RegExp` object by calling
the `toRegExp()` method:

```javascript
var fooFinder = VerEx().find('foo').toRegExp();
console.log(fooFinder); /* Prints /(?:foo)/gm */
```

So you can just start coding and see how the underlying regular expression
grows.

# The rest is history

After publishing the initial version of VerbalExpressions, I posted it to a
couple of places in hope that it'd get some interest from developers struggling
with learning regular expressions.

Fortunately things worked out much better. With the help of
[Juho, a fellow developer][juho-tweet], we got a big publicity after *the Smashing
magazine* tweeted about the library:

<blockquote class="twitter-tweet" data-cards="hidden" lang="en"><p lang="en" dir="ltr">Interesting: VerbalExpressions is a JS librarty that helps to construct hard regular expressions: <a href="https://t.co/hb55xgJAxp">https://t.co/hb55xgJAxp</a> (via <a href="https://twitter.com/luotojesse">@luotojesse</a>)</p>&mdash; Smashing Magazine (@smashingmag) <a href="https://twitter.com/smashingmag/status/359034140269625344">July 21, 2013</a></blockquote><script>window.loadTwitter = true;</script>

This got a nice boost of a publicity for a weekend project; I instantly saw
rising number of stars in the GitHub repository.

## Snowball effect

Sometimes all it takes is a little nudge to get something started. In few hours
there was enough stars for the project to rise to the GitHub's
daily [trending repositories][github-trending], and eventually to the weekly
trending list, where more and more people started to get familiar with the
repository.

In a few days the repository had grown from a tiny weekend project to a full,
active open source library. But only after people started
[porting the library to other languages][verbalexpressions-github-io-page],
the project needed to become its own [GitHub organization][github-organization].

From there on things just grew wildly organically. Someone made a logo, someone
crafted a [github.io page][verbalexpressions-github-io-page]. And other people kept
porting the library to different languages.

Fast-forward to late 2015, the VerbalExpressions has been ported to 23
languages, including common ones like [Java][java] and [Python][python], but
also to less-common languages like [Qt][qt] and [Racket][racket].

## Future of VerbalExpressions?

As I love making tools for developers, I think VerbalExpressions has been one of
my most successful projects so far. But as the number of ports grew explosively,
the maintenance of the whole project became a monster.

Like most of the personal projects, VerbalExpressions has been left, for now, to
its current state because of the lack of personal time.

If you'd like to team up to brainstorm about the future of the project, go ahead
and [send me a tweet][send-jesse-a-tweet]; it would be great to change thoughts
about the direction of the project!

[regexper]:http://regexper.com/#%2F%5E%5CS%2B%40%5CS%2B%5C.%5CS%2B%24%2F
[verbalexpressions-github]: https://github.com/verbalexpressions/jsverbalexpressions
[juho-tweet]:https://twitter.com/lehtuska/status/359026547069427712
[github-trending]:https://github.com/trending
[verbalexpressions-github-io-page]:http://verbalexpressions.github.io/
[github-organization]:https://github.com/verbalexpressions/
[verbalexpressions-logo]:/images/verbalexpressions-logo.png
[java]:https://github.com/VerbalExpressions/JavaVerbalExpressions
[python]:https://github.com/VerbalExpressions/PythonVerbalExpressions
[qt]:https://github.com/VerbalExpressions/QtVerbalExpressions
[racket]:https://github.com/VerbalExpressions/RacketVerbalExpressions
[send-jesse-a-tweet]:https://twitter.com/intent/tweet?text=Hey%20%40luotojesse,%20let's%20brainstorm%20the%20next%20version%20of%20%23VerbalExpressions%20a%20bit!
