# The Dojo

A collection of small, arbitrary practice programs.

Each is generally focused on a small, bite-size problem, and can be completed
in a few hours while using an unfamiliar concept, language, or design practice.
They'd be quicker if the goal was to race through, but the idea is to be
thoughtful, hopefully to make realizations about a practice or language.

For example:

* Why is this practice/language helpful?
* What issues does it help solve?
* Can this be applied elsewhere, even indirectly?

By and large these will probably be pulled from external practice problem sources,
as noted in each program. There might be some unique things eventually, though!

## The Practices

Generally these projects arose from a desire to practice something. These are some
of the things I've looked at.

### TDD

The first idea was TDD - practicing TDD in a legacy embedded codebase ranges from
hard to impossible. This is especially true when it's not possible to run code
locally, or without an extended compilation process. It's fine in the corporate,
QA-heavy, relatively slow environment of legacy embedded software, but not for solo
developers writing more general software!

After starting work on something of my own, I also noticed this was affecting my
other projects. I'd seen TDD in action before, and made reasonably good, if imperfect use of
it myself. Still, I couldn't seem to create effective tests any more! This also made project was incredibly fragile,
and somewhat frustrating to work on. I was out of practice, and clearly not making progress or refreshing
my TDD muscle memory and thought patterns.
This was at least partly because I was using unfamiliar frameworks and platforms, which dragged
me away from design, down into the minutiae of making the framework and platform work.

Enter the dojo! Occasionally dropping all of that to do a fully tested, all-TDD
mini-project helps keep testing at the front of my mind, even when I am learning
new framework boilerplate, fighting CSS GUI layout, or otherwise doing something
that doesn't lend itself to a fully-tested implementation. Hopefully this will
carry over into other things, making effective and useful automated test setups.
