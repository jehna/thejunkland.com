---
title: "From Speech to Blog Post: Testing OpenAI's Whisper API"
modified: 1678044806157
description: Today I created a tool that can take spoken text input and create a beautiful blog post out of it.
socialMediaImage: /images/just-do-it.jpg
---

Have you ever wished for a tool that could transcribe your spoken words into a
beautifully crafted blog post? Well, OpenAI's Whisper API might just be the
answer!

Today I created a tool called
[babble2blog](https://github.com/jehna/babble2blog) that takes spoken text input
and creates a beautiful blog post out of it. But, is it really that simple?
Let's explore the process and potential challenges of using this technology.

<p><img alt="Sometimes doing tools for yourself is more enjoyable than the task itself?" src="/images/just-do-it.jpg" data-dontoptimize width="900" height="600" /></p>

## The Process

OpenAI's [Whisper
API](https://platform.openai.com/docs/api-reference/audio/create) takes spoken
text and converts it into a text format that can be fed into their [GPT-3
model](https://platform.openai.com/docs/api-reference/chat/create). Once
prompted, the model generates a full blog post from the text that was inputted.
While this technology is impressive, there are a few challenges that need to be
addressed.

## The Challenges

One of the biggest challenges is losing the nuances of spoken language when it
is transcribed into text. Intonation, repetition, and mannerisms are all lost in
the process. Additionally, spoken language is not typically in a blog post
format; it can be difficult to convert raw spoken language into a properly
formatted and structured blog post. However, if successful, this tool could
greatly decrease the time it takes to write a blog post.

## The Verdict

Did it work? See for yourself! This blog post was created using the tool I
created, with only minor finalizing edits (and the meme, obviously) to GPT-3's
output.

Listen to the original audio recording of the blog post:

<p>
  <audio controls src="/audio/blog-post-audio.m4a">
    <a href="/audio/blog-post-audio.m4a" download>Download audio (6.4mb)</a>
  </audio>
</p>

(Note the super bad quality – this was recorded with my Macbook's built-in mic
while recovering from a cold)

You can also try out the tool yourself by visiting the Github repository:

https://github.com/jehna/babble2blog

Let me know what you think! Please tweet or leave an issue on Github if you have
any feedback.
