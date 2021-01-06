---
title: What React gets wrong
modified: 1609966643103
description: "React is the de-facto tool for web development, but what does it get wrong what would a frontend rendering library created in 2021 look like?"
---

React is the de-facto tool for frontend web development. It has a rich ecosystem and a well-known company to back it up. Despite all of this, I think they still get a ton of stuff wrong. This post is about my personal views and things I think React is already a too slow-moving giant to fix.

## The syntax

React has such an awful API that they needed to create a whole new programming language syntax to overcome it: The `React.createElement` API. Most of the time it's hidden behind JSX that's transpiled onto `React.createElement` calls.

You either only ever write JSX when working with React, or you get frustrated with the amount of clutter that gets to your codebase from all that repetition that provides no value to the reader.

```javascript
Reat.createElement('html', null,
  React.createElement('body', null,
    React.createElement('div', null,
      React.createElement(...)
    )
  )
)
```

I think a much better way is to follow what SwiftUI and Flutter are doing: Move the element's name from argument to be the function's name:

```javascript
html(
  body(
    div(...)
  )
)
```

This does not only remove unnecessary clutter, but removes the need for any compilation step.

## create-react-app

Next up us a monstrosity that's nowadays accepted by many to be a "best practice" for getting started with a React project. The problem being, that React ecosystem is such a complex beast that they created a bootstrap project so you can get anything done in a meaningful time. Just pray that you don't need to eject it any time soon.

Just to give you an idea of the absurdness of this situation: create-react-app creates a "hello world" project for you that downloads **2.5 million lines of Javascript code** to your machine. For a hello world app.

![Screenshot of scc ran on empty create-react-app, which shows 2.5 million lines of Javascript code and estimated cost of $100000000](/images/empty-create-react-app.png)

I have strong feelings about fighting complexity by adding more complexity, and this sure smells like something you should not be doing in 2021.

Instead we should be thinking about where our browsers and server ecosystems are nowadays and if we could make the bootstrapping _simpler_. Browsers [know how to handle imports nowadays](https://caniuse.com/es6-module), and the module format is [also part of Node.js](https://nodejs.org/api/esm.html) without any preprocessing, so you don't necessarily need a build step to get those working.

Modern browsers are really good with on-the-fly compression like gzip [and even brotli](https://caniuse.com/brotli), so minification is not so much of an issue. Your CDN should anyways be optimizing compression of your static assets.

Another point being that React is over 100kb when minified (including React DOM because you can't do that much without it). Imagine how much unminified code you could fit in 100kb if you used something that doesn't need to be built at all.

## React is not just a view rendering library anymore

React used to be only a good frontend rendering library with JSX. Nowadays you're signing up for a framework with its own plugin ecosystem, hooks, fibers, suspense, and other obscure future features like [server components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html).

We've changed from doing _model-view-controller_ to using all-consuming views that perform both business logic and create side effects. Views have become the top-level entity that controls everything else.

Remember the old saying "UI is a function of state"? React used to be a good implementation of this, but nowadays it's more of "UI that handles your state".

I think a good view rendering library should do just one thing well: Render the UI based on the app's state. It should not care where the state is, and most importantly it should not handle the state itself. Otherwise we'll end up with things like bloated class components or _"suddenly global state and black magic is fine"_ type of hooks inside otherwise pure functions.

Instead you should be handling your business logic, side effects and data gathering some place else, and use proper separation of concerns to model your application's logic.

## Imagine a better world

So how would a better React alternative look in 2021? I made a small prototype library called [Longwood](https://www.npmjs.com/package/longwood) based on above principles, and a hello world looks like this:

```html
<html>
  <body>
    <div id="app"></div>
    <script type="module">
      import { div, text } from 'https://cdn.skypack.dev/longwood'

      const render = div(text('Hello world!'))
      render(document.getElementById('app'))
    </script>
  </body>
</html>
```

[▶️ Try it out at CodeSandbox.io](https://codesandbox.io/s/unruffled-star-xs16e?file=/index.html)

That's all the code you need. No precompilation, no build steps, no downloading of 2.5 million lines of code to get started. You can open a text editor, save the code as an `index.html` file, open it in a browser and it works.

You have the same power of Javascript to compose your views as with React, and there's a [separate state management library](https://www.npmjs.com/package/longwood-usestate) to get started if you're coming from React. But moreover _it's okay to handle your state however you want_. It's just a rendering library. It can be used for just a small portion of your site if you want. It even supports server-side rendering out of the box (with jsdom).

Since you're going to ask, here are a couple of examples:

* [React style Todo app](https://codesandbox.io/s/competent-swartz-beoub?file=/src/TodoComponent.ts)
* [Rendering 1000+ rows of data with Longwood](https://links.thejunkland.com/)
  * [Same example done with create-react-app](https://links.thejunkland.com/react/)

## To wrap up

We’ve come a long way since the web 2.0 times. jQuery made the world a better place by making DOM manipulation easier. AngularJS made the world a better place by introducing data binding to the masses. But all great increments seem to fade at some point to welcome better alternatives.

Will the future be bright for Longwood? I have no idea, it’s a single-person project and at the moment has one production site running on it. But I hope it demonstrates a point that we can do things even better in the future if we keep innovating and cherry-picking the good stuff from others.

Happy hacking.
