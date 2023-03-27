---
title: How you can trust a hotel's sketchy wifi
modified: 1679937820751
description: How do we ensure that our messages aren't intercepted by malicious third parties? The answer lies in encryption and trust.
---

Let's talk about the Internet, a vast and interconnected network that many of us
use daily without giving a second thought to how it works. We browse web pages,
download documents, and share information through this digital landscape. But
have you ever wondered how we can trust the security of the websites we visit?

## A Web of Connections

The Internet is built on a complex system of links between web pages, made
possible by HTTP (Hypertext Transfer Protocol) and HTML (Hypertext Markup
Language). These connections create an organic, ever-growing web of information.
However, there's a catch: The Internet's structure allows for intermediate
servers, like CDNs (Content Delivery Networks) and VPNs (Virtual Private
Networks) and hotel wifis to stand between you and the content. This can be
great for efficiency, but it also opens the door for bad actors to intercept and
steal your personal data.

## The Encryption Solution

To protect our information, we need encryption – a way to secure the
communication between trusted servers and the devices we use. There are two main
types of encryption: *symmetric* and *asymmetric*. Symmetric encryption requires
both parties to know a shared password, but this can be problematic if the
password is intercepted or discovered.

Enter the world of asymmetric encryption. With this method, each service (like
[google.com](https://google.com)) has a public key that's hosted on their web
server. When we connect, we take that public key and encrypt our traffic with
it. This ensures that only the intended recipient, with the corresponding
private key, can read our messages. However, this still doesn't protect us from
bad actors who might create fake public keys, tricking us into thinking we're
securely connected when in reality, our data is being intercepted.

## Trust Issues: The Hotel Example

Imagine you're staying at a hotel with free wifi. How do you know that the
wifi isn't compromised and listening to all your traffic? What if the hotel is
hosting their own [google.com](google.com) and using their own private and
public keys to intercept your messages? Encryption alone isn't enough to solve
this problem - we need a reliable way to establish trust.

## Enter: SSL/TLS Certificates

To solve this trust issue, we need a third party to verify the legitimacy of
public keys. This is where SSL/TLS (Secure Socket Layer) certificates come in.
SSL/TLS certificates are issued by trusted Certificate Authorities (CAs) –
organizations whose business model revolves around selling trust. These CAs
create *root certificates*, which can be installed in client applications like
web browsers.

When a public key is signed with the private key of a trusted CA, it becomes a
verified SSL certificate. When you connect to a website, your browser checks the
signature on the site's public key against the root certificates installed on
your device. If the signature is valid and matches one of the trusted
authorities, you can be sure that you're connecting to the legitimate website,
not an impostor.

> This is, of course, a simplified explanation; in reality you can have *trust
chains* that begin from a root certificate and can have multiple intermediate CA
certificates before the final website certificate.

## A Safer Internet

Thanks to SSL certificates and the trusted CAs that issue them, we can browse
the web with confidence, knowing that our data is protected from bad actors,
middlemen and sketchy hotel wifis. By creating a system of trust and
encryption, we can enjoy the vast interconnected network that is the Internet,
without compromising our security.
