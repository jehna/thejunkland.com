---
title: "TCP Three-Way Handshake: The Good, the Bad, and the Not Funny"
modified: 1679431411350
description: "What could go wrong with a TCP handshake?"
---

When we talk about the TCP three-way handshake, it sounds like the start of a
joke. But in reality, it’s the foundation for a two-way connection between
computers that is essential for internet communication. But like all good
things, there are some mischievous ways it can go wrong.

### The Good: Establishing a Connection

The handshake starts with a SYN package sent from the originator (your computer)
to the server, specifying an IP address and port number. The server responds
with a SYN-ACK message, and the originator sends another SYN message to confirm
the connection. This three-step process is the basis for building a reliable
connection between two devices.

### The Bad: Stealth Scanning

But what if there's a security loophole in this handshake? If the third part of
the handshake, the final SYN message, isn't sent, some defensive systems may not
register the connection attempt. This is what nmap, a popular network scanning
tool, [uses to perform "stealth scanning"][stealth-scan]. By dropping the last
part of the handshake, nmap can gather information about a server without
raising any alarms.

[stealth-scan]: https://nmap.org/book/synscan.html

### The Not Funny: SYN Flood Attacks

The [SYN flood attack](https://en.wikipedia.org/wiki/SYN_flood) takes advantage
of the handshake system in a more sinister way. Since servers have a limited
number of connections they can maintain, an attacker can send numerous SYN
packages without completing the handshake, leaving the server's connections
hanging until they timeout. This can lead to a denial of service (DDoS) attack,
which overwhelms the server and prevents it from responding to legitimate
requests.

The interesting twist is that the attacker doesn't even need to use their own IP
address when sending the SYN packages. They can spoof any IP address they want,
and the server will still respond with SYN-ACK packages, making the attack even
harder to trace.

### In Conclusion

The TCP three-way handshake is an essential component of internet communication,
but as with most things, it has its quirks and vulnerabilities. From stealth
scanning for reconnaissance to SYN flood attacks for causing mayhem, the
handshake has proven that it’s not just a boring technical process – it’s also a
source of some good, bad, and not funny stories in the world of networking.
