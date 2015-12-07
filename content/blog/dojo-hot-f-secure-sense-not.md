---
title: Why Dojo is hot, but F&#8209;Secure Sense is not
draft: true
modified: 1449180000000
---

The latest big boom? [Internet of Shitty things][internet-of-shit]. Because why
wouldn't you want to spend your money on things that can be remotely hijacked?

At least this was the very point of F-Secure's [Samu Konttinen][samu] when he stood
on stage of Slush 2015, preaching about the security of tomorrow. And what do you
know? It seems F-Secure already had a solution for the problem of shitty things!

# Revealing the Sense

![F-Secure Sense](/images/sense-promo-pic.jpg)

I pity for the F-Secure's marketing department. I believe some engineer just
busted in with an ugly modem box from the 90's and declared that it should be 
made into something "sexy".

So what does a corporation filled with old Nokia's experts do? They put a
LCD display on it; Now that's what I call design!

## It's BS and you know it

As I stood next to computer security expert [Mikko Hyppönen][mikko-hypponen] while
watching the product launch, I couldn't help my inner child from getting excited
for just a little bit.

> What if, despite of it's design, this is the next "big thing"?

As a person interested in all the buzzwords associated with the product, I
believe I'd be one of the [first 10% of people][diffusion-of-innovation] to
actually try this product, although it resembles a $10 coffee machine.

But, as a tech-savvy person (whatever that means), I need to know *how* things
work. And here's the problem: I still have absolutely no idea how Sense works. All
I've got is fancy words like **cloud**, **artificial intelligence** and **smart**.

And if five years of working in the advertising industry has taught me anything,
it is that you should get *really worried* when someone only uses fancy words.

## Sense in between

So OK, sense has a bunch of ugly RJ45 connectors slapped in the back of it.
One of them says `WAN`, so that probably means I should replace my router with
this thing.

![WAN port on Sense](/images/wan-port-sense.jpg)

Now that I imagine this thingie sitting in between my devices and my Internet
connection, I can guess that some thingie inside this **magical WLAN router**
should keep me private and block viruses. But after that things get tricky.

### [Butt](cloud-to-butt)-enabled security

Get your bullshit bingo cards ready, because this phrase comes uncensored from
Sense's website:

> Cloud based behavior analysis using Artificial Intelligence

Right. So if I try to translate this, I believe it somehow sends bits of your
internet traffic to F-Secure's computers, aka. *the cloud*, so F-Secure can
use all this data <del>to track you</del> ***&lowast;ahem&lowast;*** to try to keep the bad guys
out of your network.

The most baffling thing, though, is that Sense claims to protect all my devices,
even when I'm not home. And I have absolutely no idea how it would be possible
for a device that sits in my closet, in my private network, to anyhow "secure"
my cellphone or iPad when I'm at the other side of the world.

> *Pfft*, details. I probably should just blindly trust them.

Sense also says you could use a VPN to surf anonymously. Only
[VPNs have nothing to do with your router][hidemyass].

### One more thing

Oh yeah, and no matter how sleek you think the design is, you still have to
plug those ugly cables to the back of the thing. Making it actually look more
like this:

![Ugly wires behind modem](/images/modem-wires-ugly.jpg)

# Meet Dojo

Today I stumbled upon [Dojo][dojo]. Although it looks a bit plastic, I instantly
fell in love with the design; making something highly technical look instantly
natural.

![Dojo Wireless Security](/images/dojo.jpg)

Just look at it: I'm urged to pick it up and make friends with it.

## How it works

Looking at [Dojo's product video][dojo-video], I kind of instantly understood
how it essentially works.

It probably creates a new Wifi hotspot which I can connect to. I'd guess that it
could even connect to my existing Wifi, making those RJ45 wires obsolete.

After that it starts to listen to traffic coming and going to connected devices.
For example your general IoT gadget should probably have a pretty consistent
traffic from day to day; so if it changes radically, you could have a problem.
And turns out computers are quite good detecting this kind of changes.

## Communicating with _you_, not the Cloud

Well, what happens when this pebble confronts an error? Does it "just work"? No.
Like natural things, it *communicates* to you. Like a person.

![Dojo sending a message](/images/dojo-sending-message.jpg)

This is indeed a growing trend, but it's a good one. For example the chat
application Slack [uses natural communication][slack-onboarding] when you start
using it; the app just casually chats with you.

Yet again, best interface is no interface.

## A humane partner

If you just updated your internet-connected thingy, it might behave a bit
differently and Dojo might pick it up as a threat. But it would be bad to
automatically block things when they change. That's why dojo *asks* before it
acts.

> Dojo serves you, rather than controls you.

And how do you know when something is wrong? Your phone might be dead or your
aunt could be watching the house. So how does a technical gadget inform that
there's something wrong? By displaying an error in LCD display? No. Dojo
communicates so even your bad-sighted aunt knows something's wrong:

![Dojo error message](http://i.imgur.com/GLfTV52.gif)

## On the go

Rather than leaving it lying to a closet, you can take Dojo's pebble with
you. Don't worry if you forgot to change batteries, because it charges itself
wirelessly from the dock.

And if it really acts as a Wifi hotspot, it means you can take it with you
wherever you go. And have it protect you from your pocket, without any hocus-pocus.

### Disclaimer

As Dojo and Sense are not yet available for public, the following details in this
blog post are subject to my interpretation of the limited information that's
available:
* Sense sending something to cloud; it could be just one-way updates from cloud
  to your machine.
* Dojo's wifi hotspot; It could be that it needs to connect to your `WAN` cable
  like Sense does. But what would be the point in carrying it around then?

[internet-of-shit]:https://twitter.com/internetofshit
[samu]:https://twitter.com/KonttinenSamu
[mikko-hypponen]:https://twitter.com/mikko
[diffusion-of-innovation]:http://andreivanchuk.com/blog/2010/05/law-of-diffusion-of-innovation/
[sense-video]:https://www.youtube.com/watch?v=N33ESDJAmoc
[cloud-to-butt]:https://chrome.google.com/webstore/detail/cloud-to-butt-plus/apmlngnhgbnjpajelfkmabhkfapgnoai?hl=en
[hidemyass]:https://www.hidemyass.com/how-vpn-works
[dojo]:http://www.amazon.com/dp/B017VTR1ZE/
[dojo-video]:https://www.youtube.com/watch?v=TsS142K2idE
[slack-onboarding]:http://www.outbound.io/blog/slack-kills-at-onboarding-heres-how-they-do-it
