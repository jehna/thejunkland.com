---
title: Git difftool to stash
draft: true
modified: 1449473991183
---

Here's the scenario: You've coded for a whole day and not done a single `git
commit` yet. How do you avoid 500+ line commits and break up your work to
logical commits?

# Copy your workflow from XCode

If you've ever done a commit with XCode, you know that there is one thing the
Apple's developers got right: The Version Editor that's shown before you do your
commit.

![Xcode version editor](/imges/xcode-version-editor.png)

The point is that before you make your commit, you can briefly go trough every
file and *choose* whether to include that specific change or not.

# How to apply this workflow to command line?

Your regular "time to do a commit" workflow probably looks like this:

```bash
git add .
git commit
```

The bad this is, that you automatically commit everything that you've touched
since the last commit. So how could we change this workflow to have the same
effect as with the XCode's version editor?

## Introducing stash diff

The good news is, that you can do a trick with the `git stash` that pretty much
mimics the workflow from XCode. This trick is, that you can do a `git diff` also
to the most recent `stash`:

```bash
git diff stash
```

So this line of code shows the diff to the current stash. We can take it a step
further and launch the interactive `difftool` (I'm using OpenDiff) to go trough
the diffs, one by one.

## Taking it all together

So the whole workflow to make a commit goes like this:

```bash
git add -A  # Adds all modified and added files to stash
git stash  # Pushes the changes to stash
git difftool -y stash  # Go trough all the changes one by one
git commit -a  # Commit all changes
git stash pop  # Bring the remaining changes back to the stage
```
