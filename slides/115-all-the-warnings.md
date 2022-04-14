---
notes: |
  well now we’ve just polluted our logs with 10 thousand lines of unactionable or unmanageable warnings. Turns out there is a better way. What if we could prevent any new files from being added with the lint error but temporarily ignore the errors in the existing files? Well when you’re configure a new rule you can either set your lint system to ignore it “globally” or you can make use of special comment formats that can ignore a particular rule in a particular file. Every linting system I have come across supports ignoring rules for a specific file, it’s just a matter of figuring out how the comment needs to be formatted. With ember-template lint it needs to look like this:
---

# All the warnings

![warnings](/images/warnings.webp)
