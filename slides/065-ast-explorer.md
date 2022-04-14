---
notes: |
  This is an incredibly powerful tool that supports many languages so just make sure you are set to Handlebars templates and glimmer for now.

  You can see i've added our example from before `<Ui::Button class=“flex” />` to the left hand side of the screen and this object you see on the right is the AST representation of that template. I’ll not go into too much detail there about what an AST really is (again, there's a workshop for that!) but you’ll see why it’s useful now in a second. One of the best tricks of AST explorer is that you can just click the bit that you care about on the left and it highlights the AST representation of that bit on the right! so let’s click the class. Now there is a lot to see here but to skip ahead to the end… you can see that we’re in an ElementNode, that has attributes, that has an attribute named `class` with a value of `flex`. And that’s what we need to find with our lint rule.
---

# AST Explorer

![AST Explorer](/images/astexplorer.webp)
