---
title: Create Beautiful Blog Posts from Speech with OpenAI's Whisper and GPT-3
modified: 1678044806157
description: Today I created a tool that can take spoken text input and create a beautiful blog post out of it.
socialMediaImage: /images/just-do-it.jpg
---

Today I created a tool called
[babble2blog](https://github.com/jehna/babble2blog) to take spoken text input
and create a beautiful blog post out of it.

This tool uses OpenAI's Whisper API to transcribe the spoken words into text
that can be fed to their GPT-3 model. Can GPT-3 handle the complexities of
transcribing and formatting spoken text into a blog post? Let's find out!

<p><img alt="Sometimes doing tools for yourself is more enjoyable than the task itself?" src="/images/just-do-it.jpg" data-dontoptimize width="900" height="600" /></p>

## Transcribing Speech to Text

The first step in this process is transcribing raw speech into a text format
that the GPT-3 model can use. I'm using OpenAI's Whisper API to do this, but it
is not without its challenges; when transcribing spoken words, some intention
of the spoken words is lost. For example, when speaking, one may use filler
words and mannerisms to emphasize their point but when transcribed, these
nuances are lost.

## Formatting Text into Blog Posts

The next step is formatting the text into a blog post. This is no easy task as
traditional text-to-speech applications are not designed to produce blog posts
with correctly formatted paragraphs, ingress, and conclusions. As such, the
GPT-3 model must be able to not only recognize the content but also the
structure of the blog post.

Fortunately this issue can be solved by using [good old prompt
engineering][prompt-engineering].

[prompt-engineering]:https://github.com/jehna/babble2blog/blob/f5fe182aa7b70c2492b214a799830e9e976b3a76/src/gpt3.ts#L21-L33

## Did it work?

See for yourself! This blog post was created using the tool I created, with only
minor finalizing edits (and the meme, obviously) to GPT-3's output.

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
