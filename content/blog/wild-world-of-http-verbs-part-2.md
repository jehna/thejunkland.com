---
title: The Wild World of HTTP Verbs (Part 2)
modified: 1678474172793
description: "What other HTTP methods are there besides GET and POST? Are you sure you know all of them?"
---

If you’ve ever wondered what the other HTTP methods are besides GET and POST,
this blog post is for you! We’ll explore the most common ones, PUT and DELETE,
as well as some of the more obscure ones like TRACE and CONNECT. Plus, we have
an Easter egg for you at the end!

Also make sure to check out the [first part](./wild-world-of-http-verbs-part-1.html).

## PUT vs POST: The ones you confuse

Many developers stress over the difference between PUT and POST, as they are
quite similar. The most important difference is idempotency. PUT is idempotent,
which means you can repeat the request as many times as you want, but the side
effect is only done once. On the other hand, POST is not idempotent. This means
that if you repeat the exact same POST request twice, it will perform the thing
two times.

### PATCH the difference?

PATCH is a bit different from PUT: The main difference being that  PATCH is used
to update a part of a resource, while PUT is used to replace the whole resource.
Another difference is that PATCH is not necessarily idempotent, as some parts of
the resource may be e.g. auto-incremented on change.

### Exploiting PUT and PATCH

From a penetration tester's perspective, POST, PUT and PATCH are very similar.
They all have a request body, which means dangerous user input that needs to be
validated or sanitized. This leaves plenty of room for vulnerabilities like XSS,
SQL injection, and business logic flaws.

## Understanding DELETE Requests

DELETE requests are usually without any kind of a body and are idempotent.
However, if you DELETE a resource from the server twice, the resource gets
removed, and the latter response can either return the same response twice or
return a “not found” response, depending on the implementation.

The most important thing to look for from a penetration testing perspective is
the indirect object reference (IDOR); if you can delete something that’s not
belonging to your user account, or something that you shouldn’t be allowed to
delete, this is a major security issue.

## The ones without a body

Having the server send potentially a lot of sensitive data to us is not always
the best idea. There are two HTTP methods that are used to get information about
the resource without actually downloading the resource itself.

### What are my OPTIONS?

OPTIONS is the more commonly used of the two; every time you get that CORS
error, there has been a [preflight OPTIONS request][preflight] that probed the
server for what the browser is allowed to do.

[preflight]: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

The most common flaw with OPTIONS to look for is that the response's
`Access-Control-Allow-` headers are too permissive, so make sure to be on the
look out for that catch-all `*`.

### HEAD-ing for trouble

HEAD is very similar to OPTIONS; The OPTIONS response usually doesn't have any
body, and a HEAD response never does. The main difference is that OPTIONS probes
for allowed request conditions, while HEAD should always return the same headers
as a corresponding GET, but without the server returning the response body.

For a penetration tester, HEAD has one cool feature: The response has
`Content-Length` header, but the body is empty. This is a useful tool when
exploiting HTTP smuggling vulnerabilities.

## The More Obscure HTTP Methods

TRACE and CONNECT are some of the more obscure HTTP methods. TRACE is meant for
debugging and is usually used to reflect the request within the request body as
the application server received it. This can be used to disclose sensitive
information such as internal authorization headers.

CONNECT is specific for proxies and allows you to create a connection between
two servers. However, these methods are not commonly used and have limited
practical application in application development. Do look out for [discrepancies
in handling different HTTP methods][hacktricks-connect], as CONNECT is easy to
forget when implementing blacklisting.

[hacktricks-connect]: https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/golang#connect-method

## The Easter Egg: LINK and UNLINK

Did you know that LINK and UNLINK used to be valid HTTP methods? These methods
were part of the HTTP 1.0 specification and were probably meant to create
graph-like links between different entities. However, they are not part of the
commonly used HTTP 1.1 specification, and their practical application is
limited.

## Final Thoughts

HTTP 1.1 is a text-based protocol, so there's one more trick you can use: fuzzing
the HTTP method. Try out what happens if you put the word DEBUG there or a null
character, or even the string COOKIEMONSTER. The possibilities are endless, and
you never know what you might find. Happy hacking!