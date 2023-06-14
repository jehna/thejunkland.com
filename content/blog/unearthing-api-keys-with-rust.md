---
title: "Unearthing API Keys with Rust"
modified: 1686765581146
description: Finding API keys from archive.org using Rust
---

Finding API keys from archive.org using [**RAD**][rad] – the Rust Archive.org
Downloader

[rad]: https://github.com/jehna/rust-archive-org-downloader

I recently got into bug bounties, and one of the most interesting new targets in
2023 has definitely been the [OpenAI Bug Bounty][openai]. This bug bounty is
especially interesting because it rewards you for finding leaked OpenAI API
keys. It's not so much hacking, but more of an open-source intelligence kind of
task.

[openai]: https://openai.com/blog/bug-bounty-program

After going through the obvious places like GitHub search for leaked API keys, I
realized that there was a goldmine of information in the archive.org project:
They have been brute-forcing all the Pastebin pages for several years now,
gathering gigabytes of data. However, there weren't many existing tools to help
me sift through this massive amount of data efficiently.

## Building a Streaming Service with Rust

I began building my own tool using Typescript but soon realized that the amount
of data I needed to process required a more efficient solution – the node.js
libraries for unpacking enormous packages on the fly just devoured too much
overhead resources. I needed a tool that would efficiently unpack and scour
through these archives for leaked API keys.

Rust seemed like the obvious solution for this task. It has excellent memory
management and allows for [easy parallelization of tasks][rayon]. With Rust, I
was able to stream 100 different Pastebin packages in real-time on my MacBook
while still having enough juice to browse the web. In the end, it only took a
few hours to go through all the Pastebin archives.

[rayon]: https://github.com/rayon-rs/rayon#parallel-iterators-and-more

## Releasing My Tool to the Public

Having successfully used my tool to scour the Pastebin archives for OpenAI
tokens, I want to give back to the community by [releasing it to the
public][rad]. If you have a use for it, you can now go ahead and use it as
efficiently as I did.

Please let me know what you think and have fun unearthing gems from the depths
of archive.org!
