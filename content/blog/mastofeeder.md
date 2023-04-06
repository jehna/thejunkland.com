---
title: "Using Mastodon as a RSS reader"
modified: 1680783106970
description:
---

I have just created [**Mastofeeder.com**](https://mastofeeder.com), a proxy from
any RSS feed to Mastodon (or ActivityPub) that requires no extra logins or
accounts.

Mastofeeder allows you to search your favorite websites with an RSS feed
directly from Mastodon. Let's say you're a fan of [xkcd.com](https://xkcd.com).
All you have to do is search for the handle `@xkcd.com@mastofeeder.com`. If an
RSS feed is found using the search logic, Mastofeeder will create a virtual RSS
feed user on Mastofeeder server, which starts posting all items from the RSS
feed within the next hour. It's that simple!

Mastofeeder was developed using TypeScript and is open-source, so feel free to
check out [the project](https://github.com/jehna/mastofeeder/) to learn more
about it or even contribute to its development.

## Building Mastofeeder

The protocol that joins Mastodon servers to each other is called
[ActivityPub](https://www.w3.org/TR/activitypub/). It's a simple protocol that
defines a few common actions that _actors_ (users) can perform and how servers
send them to each other. For this blog post I'll concentrate mainly on the
[_server to server_][s2s] commnunication part.

[s2s]:https://www.w3.org/TR/activitypub/#server-to-server-interactions

### Finding a user

Servers have both active and passive parts; you can use a standard HTTP server
to answer when another server looks up a username on your server:

```
GET /.well-known/webfinger?resource=acct:@jesse@jessesownserver.com
```

```
HTTP 200 OK

{
  "subject": "acct:@jesse@@jessesownserver.com",
  "links": [
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://jessesownserver.com/users/jesse"
    }
  ]
}
```

This is called [WebFinger][webfinger] and it's used to find out where the user's
profile is located. This kind of request is sent every time you search for a
user at Mastodon.

[webfinger]:https://tools.ietf.org/html/rfc7033

But this is not enugh; Mastodon also needs to know where the user's inbox is.
This is done by looking up the user's profile:

```
GET /users/jesse
```

```
HTTP 200 OK

{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://jessesownserver.com/users/jesse",
  "type": "Person",
  "inbox": "https://jessesownserver.com/users/jesse/inbox"
}
```

And this information is enough for Mastodon to show the user's profile in the
search results; it can send messages like "follow" and to the user's inbox.

### Following a user

When you follow a user, a two-way communication needs to be established between
the two servers holding the users. This is done by sending a "follow" message to
the user's inbox:

```
POST /users/jesse/inbox

{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://johnsserver.com/users/john-the-follower/<<some unique id>>",
  "type": "Follow",
  "actor": "https://johnsserver.com/users/john-the-follower",
  "object": "https://jessesownserver.com/users/jesse",
}
```

The user's server will then send a "Accept" message back to the follower's
inbox:

```
POST /users/john-the-follower/inbox

{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://jessesownserver.com/users/jesse/<<some unique id>>",
  "type": "Accept",
  "actor": "https://jessesownserver.com/users/jesse",
  "object": {
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": "https://johnsserver.com/users/john-the-follower/<<id of the previous message>>",
    "type": "Follow",
    "actor": "https://johnsserver.com/users/john-the-follower",
    "object": "https://jessesownserver.com/users/jesse",
  }
}
```

Before this message is sent, the user interface shows a "pending" status for the
follow request.

### Creating a new post

Now that we have a follower relationship established, we can send a new post to
the follower's inbox:

```
POST /users/john-the-follower/inbox

{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://jessesownserver.com/users/jesse/<<some unique id>>",
  "type": "Create",
  "actor": "https://jessesownserver.com/users/jesse",
  "object": {
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": "https://jessesownserver.com/users/jesse/<<some unique id>>",
    "type": "Note",
    "attributedTo": "https://jessesownserver.com/users/jesse",
    "content": "Hello world!"
  }
}
```

And this message will pop up in the follower's timeline.

## Wrapping up

Understanding the concepts in this blog post should be enough to be able to
create a simple ActivityPub proxy server for RSS, Twitter or any other service
that has an API.

The real world is a bit more complex, as you need to handle signing your own
messages, but there are plenty of libraries that can help you with that (or you
can chceck [my implementation][crypto-impl]).

[crypto-impl]:https://github.com/jehna/mastofeeder/blob/3b2d19a300e985fdb42d9a8b3583d0d50ffe6b3a/src/send.ts#L13-L35