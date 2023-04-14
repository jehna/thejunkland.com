---
title: "The Sneaky Session Fixation Attack: A Blast from the PHP Past"
modified: 1681495388267
description: Some personal thoughts about Session Fixation attacks
---

This blog post visits a sneaky vulnerability called [session
fixation][session-fixation], which is I think is one of those odd
vulnerabilities that you don't think about as a developer.

[session-fixation]: https://owasp.org/www-community/attacks/Session_fixation

## Personal Home Pages

Remember the good old days of _PHP_ session management? About 10 years ago,
creating a simple login/logout system was a breeze, thanks to PHP's built-in
session functionality. But as we look back, we realize that those seemingly
convenient sessions came with a significant security flaw: session fixation
attacks. Let's dive into how it worked and why it was especially bad with the
old way of doing PHP websites.

## PHP Sessions: A Simpler Time

To refresh your memory, here's a quick recap of how PHP sessions worked back
then. When a user opened up a website, PHP would set a cookie called
`PHPSESSID`, containing a random string (the session ID). This session ID would
be stored on the server side, acting as a key for a key-value storage where you
could store any value you wanted.

Creating a session was as simple as adding this code block:

```php
<?php
session_start();
?>
```

For a basic login form, you would have something like:

```php
<?php
session_start();
if (!$_SESSION['username']) {
?>
<form>
    Username: <input name="username">
    Password: <input name="password" type="password">
    <button type="submit">Log in!</button>
</form>
<?php
} else {
    echo "Welcome, " . $_SESSION['username'];
}
?>
```

## The Sinister Side of Sessions

Everything seems fine and dandy, right? But there's a security issue lurking in
the shadows: _session fixation attacks_. The problem arises from starting a new
session before the user logs in.

An attacker can exploit this vulnerability by creating a session for themselves
and injecting their own session ID into the victim's browser. This can be done
through an XSS attack, or even by briefly accessing the victim's computer:

1. The attacker visits the site on their own machine, obtaining a valid `PHPSESSID`.
2. They then set the victim's computer's `PHPSESSID` cookie to the attacker's session ID.
4. The attacker and the victim now share the same PHP session, but both are logged out.
5. When the victim logs in, the attacker is also logged in as the victim on their own computer.

Sneaky, right?

## Defending Against Session Fixation

There are [some ways to mitigate session fixation
attacks][session-fixation-protection], such as creating a new session every time
the user logs in:

[session-fixation-protection]: https://owasp.org/www-community/controls/Session_Fixation_Protection

```php
<?php
session_start();
if ($_POST['username'] && $_POST['password']) {
    session_regenerate_id();
    if (checkPassword($_POST['username'], $_POST['password']) {
      $_SESSION['username'] = $_POST['username'];
    }
}
```

This way the attacker's session is never upgraded to a logged-in session.

## Final thoughts

Session fixation attack is the type of a vulnerability that you need to know to
guard against, and I think it's not that well known since you'll need to be able
to set the session cookie in the first place. The attack doesn't work all by
itself; you'll need some initial access to set the victim's cookie to fixate the
session.

This can be a good improvement for bug bounty severity if you have a super
narrow attack that only allows to set a cookie (or even only the session
cookie), but otherwise there are more straightforward attacks if you already
have an XSS or physical access to the victim's computer.