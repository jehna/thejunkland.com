---
title: The Wild World of HTTP Verbs (Part 1)
modified: 1678453172568
description: "HTTP is the backbone of the internet, and understanding how it works is essential for penetration testers. One critical aspect of HTTP is its use of verbs, which dictate the way in which users interact with servers. In this blog post, we will explore the most commonly used HTTP verbs: GET and POST."
---

HTTP is the backbone of the internet, and understanding how it works is
essential for penetration testers. One critical aspect of HTTP is its use of
verbs, which dictate the way in which users interact with servers. In this blog
post, we will explore the most commonly used HTTP verbs: GET and POST.

## Understanding the Basics

HTTP stands for Hypertext Transfer Protocol and is a text-based protocol used
for communication between web servers and clients. When making a request, you
provide a URI (Uniform Resource Identifier) which is translated to `Host` header
(domain name) and the path part of the message. The HTTP verb, or method, is
used to specify the type of interaction you want to have with the server.

A minimal example of a GET request on protocol level:
```
GET /path HTTP/1.1
Host: example.com


```
### GET Requests

The most commonly used HTTP verb is GET. GET requests should not have any side
effects on the server and are designed for retrieving information. Because of
the caching property of GET requests, they are often used for serving static
resources, so developers need to be careful not to cache sensitive information
that should only be accessible to authorized users.

### POST Requests

By contrast, POST requests are designed for submitting data to a server and they
usually have side effects. POST requests often have a request body that contains
unsanitized user inputs, making them a prime target for penetration testing. Be
sure to look out for vulnerabilities caused by unhandled user inputs or
assumptions made by the server about the input being received.

## The Importance of HTTP Verbs in Penetration Testing

Understanding the different HTTP verbs and their properties is crucial for
effective penetration testing. By knowing the limitations and risks associated
with each verb, testers can identify potential vulnerabilities and test them
accordingly.

### Caching Issues with GET Requests

GET requests are often cached to improve performance, but caching the wrong
information can lead to security breaches. Penetration testers should look out
for cache invalidation issues that can allow unauthorized access to sensitive
information.

### Vulnerabilities in POST Requests

POST requests can be vulnerable to a wide range of attacks, such as SQL
injection, cross-site scripting (XSS), and more. Testers should focus on
identifying vulnerabilities related to unsanitized user inputs and assumptions
made by the server about the input being received.

## Conclusion

HTTP verbs are a fundamental part of web communication, and understanding their
properties and limitations is essential for effective penetration testing. By
keeping an eye out for potential vulnerabilities associated with each verb,
testers can identify and address security issues before they can be exploited.
Stay tuned for our next blog post where we explore some of the less commonly
used HTTP verbs!