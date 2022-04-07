---
notes: |
  lint to the future!

  Lint to the future was built to solve a very specific problem and it’s a remarkably simple tool. Let’s talk about the problem first and then we’ll get into what the tool does once we understand the problem.

  So let’s imagine that we have just written our “don’t use flex class on buttons” lint rule and we wanted to enable it in our massive code base. We put it in the right place and configure it correctly and suddenly our CI system explodes and tells us that it has found 10 thousand lint errors across half the files in a giant code base. Turns out buttons are quite common in web apps, who knew!?
---

# Lint to the Future

![lttf](/images/lttf.png)
