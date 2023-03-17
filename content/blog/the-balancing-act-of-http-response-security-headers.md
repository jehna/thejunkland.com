---
title: The Balancing Act of HTTP Response Security Headers
modified: 1679086889719
description: A personal dive into the world of HTTP response headers
---

In this blog post, we'll dive into the challenges developers face with HTTP
response headers and how to approach these issues with the right tools and
mindset.

## The Problem with Browsers

Browser wars have played a significant role in how security measures are
implemented. With browsers competing for the largest market share, they can't
afford to break even a small but essential part of the internet. Users don't
generally care about security until it becomes a problem, so browsers tend to
implement security measures with a "disabled by default" approach. This is, of
course, less than ideal from a developer's perspective.

## Implementing Security Measures

In order to create secure web services, developers must implement a myriad of
measures that help mitigate the historical baggage of browser security. One
helpful tool in this journey is [Mozilla Observatory][observatory], a tool that
can help developers identify which headers they should be implementing to secure
their website. These [most important security
headers][important-security-headers] describe how your website should work and
mitigate possible vulnerabilities, such as clickjacking (`X-Frame-Options`), XSS
(`X-XSS-Protection`, `Content-Type`, `Content-Security-Policy`),  and MIME
confusion attacks (`X-Content-Type-Options`).

[observatory]: https://observatory.mozilla.org/
[important-security-headers]: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html

## The Importance of HTTP Response Security Headers

HTTP response security headers are important because they tell the browser how
your website should work and what kind of functionalities the browser needs to
display the page. By limiting the browser's features for that specific site, the
browser can close up all the other features that may be lacking in security. For
example, allowing the page to be displayed via HTTP instead of HTTPS (HSTS
header).

## The Absurdity of Explicitly Disabling Browser Features

With the `Permissions-Policy` header, the developers need to explicitly disable
all browser features that are not in use on their website; instead of having a
whitelist, developers must specify every single feature they don't want to be
used. This can be a laborious and time-consuming process.

## Using Middleware to Implement Security Measures

Fortunately, there are tools like [Helmet](https://helmetjs.github.io/), a
middleware for the Express server, designed to help developers implement strict
security headers by default. It allows developers to approach security with a
"closed by default" mindset and create a small whitelist within their
application for necessary features.

## Conclusion

HTTP response security headers are an essential part of internet security for
developers to create secure web services. By utilizing tools like Mozilla
Observatory and Helmet, and understanding the power and limitations of HTTP
headers, developers can tackle the challenges of modern web development head-on.

