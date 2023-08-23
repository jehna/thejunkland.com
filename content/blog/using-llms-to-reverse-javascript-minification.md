---
title: Using LLMs to reverse JavaScript variable name minification
modified: 1692817106862
description: A novel way to reverse Javascript minification using LLMs.
---

This blog introduces a novel way to reverse minified Javascript using large
language models (LLMs) like ChatGPT and llama2 while keeping the code
semantically intact. The code is open source and available at
[Github project Humanify](https://github.com/jehna/humanify).

## What is minification?

Minification is a process of reducing the size of a Javascript file in order to
optimize for fast network transfer. Looking from the reverse engineering
standpoint, there are a few different categories of minification that present
increasing challenges:

### Lossless minification

Most minification is lossless; There's no data lost when `true` is converted to
its minified alternative `!0`. It's straightforward to [write a Babel
transformation][babel-book] to reverse this process. There are [many][revtool1]
[tools][revtool2] that are specifically designed to reverse these kind of
lossless transformations.

[babel-book]: https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md
[revtool1]: https://www.npmjs.com/package/babel-plugin-transform-beautifier
[revtool2]: https://www.npmjs.com/package/debundle
### Unimportant data loss

Some data is lost during the minification, but that data may be trivial to
recreate. A good example is whitespace; it's trivial to use
[Prettier](https://prettier.io) (or a similar tool) to reformat minified code's
indentation and whitespace to a human-readable format. Most of the time the
developers have used similar tools with the original code too, so the whitespace
data can be recreated with high confidence.

### Variable names

The most important information that's lost during the minification process is
the loss of variable and function names. When you run a minifier, it completely
replaces all possible variable and function names to save bytes.

Until now, there has not been any good way to reverse this process; when you
rename a variable from `crossProduct` to `a`, there's not much you can do to
reverse that process.

## How would a human reverse minification?

Many reverse engineers train their eyes to recognize some heuristics from the
context of the code so that they form educated guesses about the code's purpose.
Let's have a look at a simple example:

```js
function a(b) {
  return b * b;
}
```

How would you rename the function `a`? Given the context, we can make a pretty
good guess that the original name was something like `square`. But this requires
the knowledge of the internal workings of the function.

Let's try to codify the process of renaming the function:

1. Read the function's body
2. Describe what the function does
3. Try to come up with a name that fits that description

For a classical computer program it would be very difficult to make the leap
from "multiply `b` with itself" to "squaring a number". Fortunately recent
advances in LLMs have made this leap not only possible, but almost trivial.

Essentially the step 2. is called "rephrasing" (or "translating" if you consider
Javascript as its own natural language), and LLMs are known to be very good at
that.

Another task where LLMs really shine is summarization, which is pretty much what
we're doing in step 3. The only specialization here is that the output needs to be
short enough and formatted to the camel case.

## Controlling LLMs

The issue with using output from LLMs is that they are not deterministic. In a
nutshell a LLM is a very complex markov chain; it tries its best to guess the
next word in a text based on the previous words.

This means that even if we have a good prompt like:

```text
Are all roses red? Please answer only "Yes" or "No".
```

An LLM might still answer "No, but ...", "I don't know" or the famous "I'm
sorry, but as an AI language model I cannot...".

This used to be a problem, but fortunately there are now ways to control the
LLM's output like [guidance](guidance.readthedocs.io/) and
[outlines](https://github.com/normal-computing/outlines). These tools use
different techniques to ensure that the LLM's output matches a desired format.

Fortunately Javascript variables can only have a specific format, so can match
the output with a regular expression to ensure that the output is a valid
Javascript variable name.

## Don't let AI touch the code

Now while LLMs are very good at rephrasing and summarizing, they are not very
good at coding (yet). They have inherent randomness, which makes them unsuitable
for performing the actual renaming and modification of the code.

Fortunately renaming a Javascript variable within its scope is a solved problem
with traditional tools like Babel. Babel first parses the code into an abstract
syntax tree (AST, a machine representation of the code), which is easy to modify
using well behaving algorithms.

This is much better than letting the LLM modify the code on a text level; it
ensures that only very specific transformations are carried out so the code's
functionality does not change after the renaming. The code is guaranteed to have
the original functionality and to be runnable by the computer.

## Putting it all together

So, how do we un-minify Javascript? Let's put it all together:

1. Unbundle webpack bundles with [webcrack](https://github.com/j4k0xb/webcrack)
2. Run the code through
   [transform-beautifier](https://www.npmjs.com/package/babel-plugin-transform-beautifier)
   and a few custom Babel plugins that reverse lossless minification
3. Loop through all variables in the code, asking LLM to describe their intent
   and generate a better name based on that description
4. Rename the variables using Babel
5. Run a final round of [Prettier](https://prettier.io/) to ensure nice whitespace

And that's it! Given the following code:

```js
function a(e,t){var n=[];var r=e.length;var i=0;for(;i<r;i+=t){if(i+t<r){n.push(e.substring(i,i+t))}else{n.push(e.substring(i,r))}}return n}
```

The tool outputs the following:

```js
function chunkedString(inputStringToBeSliced, chunk) {
  var chunkBuffer = [];
  var sliceSize = inputStringToBeSliced.length;
  var currentCharIndex = 0;
  for (; currentCharIndex < sliceSize; currentCharIndex += chunk) {
    if (currentCharIndex + chunk < sliceSize) {
      chunkBuffer.push(
        inputStringToBeSliced.substring(
          currentCharIndex,
          currentCharIndex + chunk
        )
      );
    } else {
      chunkBuffer.push(
        inputStringToBeSliced.substring(currentCharIndex, sliceSize)
      );
    }
  }
  return chunkBuffer;
}
```

## Try it yourself!

The tool is called [Humanify and it's available at
Github](https://github.com/jehna/humanify). Do check it out and see if it works
for you!