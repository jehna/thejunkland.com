---
title: IoT and thingies
draft: true
modified: 1450851959480
---

# Analogy

Imagine if you could change the dim of your bedroom's lights from your cellphone
or Skype to your mother through your TV.

Imagine the easiness of opening your front door by flashing your cellphone or
opening your garage door automatically when **your** car enters the driveway.

This is all reality today, as the manufacturers have started to let you interact
with your devices through the Internet. It's conveniently called *the Internet
of Things*, or **IoT**.

## What if things went wrong

Now take a short time to think what this means if you're a *bad guy*.
Potentially you could remotely shut down lights, take a look at the living room
and even open doors from an unaware victim's house, without leaving a trace.

All this is also reality, since we don't yet take precautions for the new, shiny
devices we plug in our network like we do on our computers. You cannot install
an antivirus app to your garage door or smart TV.

This was the very point of famous antivirus company F-Secure's
[Samu Konttinen][samu] when he stood on stage of Slush 2015, preaching about the
security of tomorrow. And it seems F-Secure, among few others, already have
a solution this problem. But how good is it?

# Diagram

The solution to this problem seems to be a gadget that sits in between your
devices and the endless void of Internet.

The device scans through the bits of data that your device is sending to the
outer world and tries it's best to detect if something out-of-the ordinary
happens.

![How IoT gets secured][securing-iot-image]

It turns out that computers have gotten pretty good detecting irregularities in
the last few years. And, unless there are bad guys watching, the traffic to and
from your gadgets should remain pretty constant from day to day.

# Example

There have been two major releases of this kind of security boxes in the 2015:
[F-Secure Sense][sense-main-page] and [Dojo][dojo-main-page].

...

# Plain english

## Design

When we talk about a physical consumer product, it is clear that a big issue
comes up: Where do I put this thing?

While mostly static, sometimes these things need your attention. That's why it
might be bad to just shove it to your closet with your modem.

And if you have to have it somewhere in plain sight, it needs to fit in your
decor. And this is something F-Secure has clearly missed.

![Dojo's design vs. Sense][dojo-vs-sense-design]

Dojo looks like something very natural, as Sense is rather a modern remake of
your gray modem box.

On the other hand I can imagine the thought process at F-Secure's office:
Someone came in with a gray box and said that it needs to be something "sexy".
So what do you do? You slap a display to it! Done and done. But no matter how
sleek you think the Sense's design is, you still have to plug those ugly cables
to the back of the thing; making it actually look more like this:

![Ugly wires behind modem](/images/modem-wires-ugly.jpg)

But hey, what would you expect from a company filled with old Nokia's employees?

Dojo, in the other hand, has taken a much better approach to design; making
something highly technical look instantly natural.

![Dojo Wireless Security](/images/dojo.jpg)

Just look at it: I'm urged to pick it up and make friends with it.

# Technical definition

I've been in close contact with computers since my childhood and now make a
living of programming them. So I know a bunch of stuff about a lot of stuff.

What gets me every time, though, is when I *don't* understand something that I
should. And that's specifically what happened with Sense:

> Sense claims to protect all my devices, even when I'm not home.

And I have absolutely no idea how it would be possible for a device that sits
in my closet, in my private network, to anyhow "secure" my cellphone or iPad
when I'm at the other side of the world. But hey, details.

Fortunately Dojo keeps it simple: It explains very clearly what the product
does. The pebble scans for the traffic and reports irregularities, making the
base idea simple enough that you could explain it to your mother-in-law.

### Tone of voice

If five years of working in the advertising industry has taught me anything,
it is that you should get *really worried* when someone only uses fancy words.
And this this phrase comes uncensored from Sense's website:

> Cloud based behavior analysis using Artificial Intelligence

Right. So if I try to translate this, I believe it somehow sends bits of your
internet traffic to F-Secure's computers, aka. *the cloud*, so F-Secure can
use all this data <del>to track you</del> ***&lowast;ahem&lowast;*** to try to
keep the bad guys out of your network.




[securing-iot-image]:/images/...
[sense-main-page]:http://
[dojo-main-page]:http://
