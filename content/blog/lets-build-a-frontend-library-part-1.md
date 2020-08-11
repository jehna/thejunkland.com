---
title: "Let's build a frontend library — Part 1: Templating"
modified: 1597164262274
description: ""
draft: true
---

Different tools make different trade-offs about building user interfaces. What
if we looked into modern approaches and combined the best into one single
library?

# For the reader

This blog post is the author's opinionated view on what different approaches do
well and what they don't.

This is intended to be a living document hosted at the [Github
repository](https://github.com/jehna/thejunkland.com/tree/master/content/blog/lets-build-a-frontend-library-part-1).
All feedback is welcomed, please use the Twitter handle
[@luotojesse](https://twitter.com/luotojesse) to let me know what you think or
open an issue/pull request directly to the repository.

# Framework vs library

Let's start by defining a bit of the scope; why didn't I title this blog post as
"Let's build a frontend _framework_"?

Framework implies that it's an opinionated way of building software. Most
frameworks give you basic components that you'll learn and then use those
building blocks to create whatever it is you're doing.

It's great that a framework has an answer to all common problems — you probably
need a bunch of stuff like templating, routing and HTTP requests from the get-go,
so why should you waste your time figuring out these common building blocks
every time you start a new project?

The flip side of the coin is that using a framework usually forces you to accept
everything it offers, so you're taking a huge bet to get everything right on one
first try.

Take React and Angular as an example. With React you're free to use any routing
library you please — in the end it's _just a view library_. But with Angular
you'll probably end up using Angular's own routing, and that probably covers 80%
of use cases very well, and additional 10% of use cases moderately.

But how about that last 10%? Sometimes you find yourself fighting against the
framework. We've all been there. The framework's assumptions just don't match
the domain of your problem. It might be awkward or even impossible to do what
you want.

The worst thing is, that this eventually happens with all projects, sooner or
later. And I'd rather swap a single library than rewrite the whole app with
another framework.

# Templating language vs. host language

A website, static or not, is essentially structured with HTML and styled with
CSS. While you could type out all needed HTML and CSS in a single file and
upload it to a static website host, you probably have some recurring elements on
your page that you'd like to reuse. This brings us to templating.

The naive way of doing templating would be to split reusable parts of the
website to their own HTML files and create a simple way of parsing those files
together.

As an example, here's how you could implement a basic website using a simple
template:

```
<my-header />
<p>
  Hello world!
</p>
<my-footer />
```

Using this template you could replace `<my-header />` and `<my-footer />` with
the shared HTML from some other template file. This way you'd avoid making
changes to multiple places when something needs to be changed. Simple enough,
right?

But here's where things get complicated: You probably need to do loops and
conditionals at some point of your template. Now how do you handle that?

The naive way would be to go extend our templating language — much like how e.g.
Angular, Vue, Svelte and Polymer have done it. You introduce new tags like
`<if>` and `<foreach>` that accept arguments as attributes, and you keep
extending your naive templating language until most cases are possible.

But there's another way that's being used by e.g. React, SwiftUI and Flutter:
They use the host language for this stuff. If you think about it, why on earth
would you start crafting your own competing language when you already have an
established, turing-complete language at your disposal? Javascript, Dart and
Swift all have their own implementations of loops, conditionals and variables.

For example with SwiftUI you'd do conditionals in your templates just as you'd
do them outside of your templates:

```swift
if someConditionIsTrue {
  TabView()
} else {
  LoginView()
}
```

## JSX vs. plain functions

You can use React without JSX, and you'll end up with a monstrosity called
`React.createElement(type, [props], [...children])`. While you certainly _could_
use this API, you don't see it used that much over JSX. Why? The developer
experience is just unacceptable.

You'll end up repeating the useless `React.createElement` chant over and over
again, and the lack of named variables and either-pass-in-function-or-a-string
API are just confusing.

And again: Why would you create **a new language** (jsx) just because you have a
verbose API? Why are developers so keen on creating new languages?

Fortunately there's a better way that does not involve creating a new
programming language, and that's called _renaming_.

Yep, both Flutter and SwiftUI essentially use the language's own structures for
representing the element hierarchy and it doesn't feel awkward at all.

Here's an example component hierarchy from Flutter:

```
class MyComponent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Text(
          'Hello World',
          textDirection: TextDirection.ltr,
          style: TextStyle(
            fontSize: 32,
            color: Colors.black87,
          ),
        ),
      ),
    );
  }
}
```

There's no clutter compared to using `React.createElement`, and you have the
same verbosity as with JSX, only the open and close characters switch places
from `<Component>` to `Component()`.

## Function Components vs. OOP Components

Each frontend library and framework have their own way of describing components.
Tools that don't use a templating language have two primary approaches that I'm
going to compare: OOP Components (e.g. Angular, `React.Component` and Flutter)
and React's Function Components.

Class components are a naive solution to holding state, but we'll cover state
handling later. If we only look at constructing DOM hierarchies (basically
stitching HTML together), I'd argue there's no need to use an OOP Component.

The beauty of having a Function Components is that you provide one input that
always returns the same output (not accounting for the React's `useState` hook
monstrosity). Some more academic people refer to this as seeing UI as the
function of the state.

Using classes introduces all the shortcomings of object oriented programming.
You're faced with the inheritance vs. composition question which is ruled as
"just don't do that" at the React community. Testing becomes harder when you
have to use more effort to set the world into a certain state. And in practice
I've seen and experienced more friction in splitting OOP Components into smaller
ones than with Function Components.

# Virtual DOM or the real one?

Creating and destroying DOM is slow. Or at least that's what we have been told.
But slow compared to _what_? Svelte doesn't use virtual DOM and it claims to be
faster than any framework implementing virtual dom. So what's going on here?

# Apples and oranges

React brought the concept of virtual DOM to the wide audience, and it was deemed
as "the fast way of doing DOM". But the baseline was very skewed; they always
compared the speed of virtual DOM to creating **and removing** dom nodes every
time the state changes.

This means that the baseline was so `React.createElememt` would always create
the full DOM element every time something changed, and that they would throw all
existing DOM out of the window. You can see why this was probably quite a slow
approach.

Virtual DOM is indeed the naive solution for this problem: Instead of creating
the real DOM elements, let's create a minimal intermediate representation of a
DOM element instead. It's still relatively slow to create huge trees of plain JS
objects and diff them to find out the minimal changeset, but at least it's less
work than the baseline.

Of course there are more advanced optimizations to this approach like
`shouldComponentUpdate`, `React.memo`, React Fibers and better diffing
algorithms, but essentially you're still doing a lot of extra work to calculate
the actual changeset.

Svelte beats most benchmarks compared to virtual DOM, because it calculates the
needed changes without using an intermediate object hierarchy. Svelte uses
clever tricks to generate some intermediate code at compile time that stitches
and pokes DOM when something changes.

But why on earth does it need **a new programming language** for doing that?
What's the matter with developers nowadays? And yes, Svelte is very much a new
programming language although it tries to hide it at the marketing material. It
has its own syntax for reactive statements and it implements a custom templating
language.

But why does it need a new programming language to do this? Couldn't we have
that intermediate dom-handling code as a library and achieve the same end result
— fast apps without virtual DOM? We'll get back to this later when we start
implementing the library.

# Server-side rendering

Is server-side rendering still a thing in 2020? I'd argue that it very much is,
based on two things:

## 1. SEO / crawlers

Yes, there's a lot of content out there that only renders with Javascript and
Google indexes it just fine. But there's some debate over different kinds of
Google crawlers and serving the other search engines, so if you want to be on
the safe side, you want to use a server-side rendered site.

There's also other kind of crawlers that may be accessing your site like
Internet Archive's Wayback Machine, article readers and bots that are trying to
make sense of the world (like GPT-3 is using Common Crawl datasets for
training which are sourced by reading good old HTML pages).

I very much believe that the Internet should be free (as in "free speech", not
as in "free beer"), and server-side rendering of the main content keeps the
content easily accessible for everyone.

## What if you don't need a dynamic site?

Some sites (like this blog) don't change content, perform calculations or A/B
tests, nor load 100s of kilobytes worth of code just to display a static HTML
page.

I have several blogs, and all of them are built either on my own laptop or at a
CI server. I love that I can do this and use whatever static hosting to serve
the lightweight html files.

Some CMS providers like Contentful and Netlify have seen this opportunity and
provide tools to pre-build the website once the content changes. This creates
lightning-fast static websites that are a competitive asset in a world where
every fraction of a second saved means more sales.

# What's next?

We haven't yet considered the elephan in the room: State management. It's a big
topic worthy of its own blog post, so stay tuned.
