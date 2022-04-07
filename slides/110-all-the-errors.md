---
notes: |
  I know I said earlier that lints don’t actually **break** things but for better or worse our CI is setup to explode if even a single lint rule fails so we can’t just turn on this rule. And this rule isn’t something that we can blindly fix in all the buttons because someone added the flex class for a reason, we need to go and manually check each of the buttons before we just remove the class. So what do we do!?

  One method that we might have done in the past would be to add the rule but either configure our system to ignore it, but this doesn't really help us because we might as well not have added a lint rule that we instantly configure our system to ignore it!

  Ok so let's try another approach, what if we set the system to report them as warnings and not errors:
---

# All the errors

![Errors](/images/errors.png)
