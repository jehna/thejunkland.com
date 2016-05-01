---
title: How to write good README and why you should care
modified: 1462127618806
---

Your project's README tells a lot about your project. How to make sure it's
as good as your great project deserves?

<a href="https://github.com/jvnk/game" rel="nofollow" target="_blank" x="_">
![Does your awesome project's Github site look like this?](/images/readme-screenshot.png)
</a>

I've struggled with writing READMEs for my projects from the day I started
to learn developing.

This post includes a list of good practices collected from many great
open-source projects' READMEs and a tool to add to your existing process to
help you to create a good README for your every project.

# Who is the README for?

Thinking you're the only person ever reading the file might act as a
motivation to neglect the writing of a good README.

No matter how big or small your project is, you should always take pride in the
hours you put in to writing code; you'll never know who's having a look at it
in the next weeks, months or even years.

You might want to show your project to your friend. Or your future employer
might want to check your existing Github projects. Switching between projects in
your work is common, let alone that you might need to poke at your own previous
projects from time to time.

# What do you want to know about the project?

Depending which role you're playing, you can have various reasons to open the
README file of a project. Let's look at some of them.

## What is the project?

A few weeks back I was searching through open-source games under active
development at Github.

Even a simple README describing what the project does (or was supposed to do)
would have be good in this situation. This would greatly help the random
prospective contributor to get an idea of the project.

As a disappointment I found that only 1 in 10 recently updated game projects at
Github even had a README describing what kind of game it was.

## What does it do?

When shuffling through many projects it would be great to even have a few key
points that describe the main features of the project.

What makes the project unique? What are the main features you're implementing?

This helps to quickly compare other projects with yours and to give an idea that
why the project exists in the first place.

## How to install the project?

I recently switched jobs and received a new, fresh laptop. Even though it was
only a few weeks from my last blog post, I had no recollection about how I
actually built this site, let alone how to install it on a fresh machine.

The installer might be you, your co-worker, an interested open-source
contributor or a new subcontractor. Nevertheless, it's a total waste of both
of your resources to start figuring out how to just get started with the
project.

The best thing you can do is to just write up the installation instructions when
you first do them yourself, and you'll quickly save countless hours of work in
the future.

## Switches and latches

Especially when your project grows up and more people jump in, the complexity
increases within the amount of options you can tweak when using it.

Is there a hidden switch for debug mode? How to change those global variables?
What can you change in your config file? These should be listed as simple
points that a user can glance through to find all the different results they can
achieve with your project.

## Building and deploying

After the project is installed and ready to be developed, you still in most
cases need to take some extra steps to get the code built, published or
deployed.

Take this blog as an example: I might work on a few ideas for a blog post and
forget the whole blog for a few weeks. After working on different projects,
languages and CMS' in the between, I always find myself questioning how things
worked on each individual project.

Making clear and preferably *copy-pasteable* instructions on building and
deploying you can make sure that you and other contributors keep up with the
project when time passes by.

## Contributing

Every project tends to have their own best practices, based on the team of
developers working on them.

README is the best place to include a quick intro about the conventions of the
project, e.g.:

- What kind of code style to use?
- How to write commits and do branching?
- How to keep in touch with the team (irc, mailing lists, slack, etc.)?

At best this is a couple of short sentences and a link to code styling guide.
That's all that you need.

## Licensing

There's been a lot of concern about the licensing of open-source projects, as
well as the lack thereof.

One of the key points when searching for a new project to contribute on is the
ownership of the code: Can I use, modify and contribute to the project? Can I
use the resulting code in my work/hobby projects?

The best practice is to just answer to these questions by simply stating which
license the project is licensed with. It saves the time of the contributors to
search through your project and figure out if there's something that could
backfire in the future.

# Where to go next?

While these are good pointers to building your own perfect README, it can be
painful to try to remember all the aspects when writing one.

Unfortunately a README is seen as an evil necessity that you *should* do, but
it can take too much time and effort to do properly. There are deadlines,
exhausting coding sprees and all the other environmental variables that
commonly keep you from building the perfect project.

## A request for the common good

After struggling through the same problem with all my projects, I decided to
craft myself a template README.md file that I could easily copy-paste to my
projects.

Over time the template has matured and it's become a regular part of my
development process. You can find the [whole project on Github][readme-github], 
or just add the template  to your project by running a simple shell command in
your project folder:

```bash
curl https://raw.githubusercontent.com/jehna/readme-best-practices/master/README-default.md > README.md
```

This fetches the copy of the README template to your project and saves it as
`README.md` file. Just open the file and follow simple instructions to write a
good, compact README for your project. In most cases you won't be needing all
the parts, so just delete the sections that don't fit your project.

I would be glad to see the project evolving into better template for projects
beyond my own scope. If you feel it's missing anything you find best practice
yourself, please feel free to open a pull request or an issue to help on
improving the template.

I hope this will inspire you to include a good README file for all your
projects, helping you and others to maintain and contribute your projects in the
future.

[readme-github]:https://github.com/jehna/readme-best-practices
