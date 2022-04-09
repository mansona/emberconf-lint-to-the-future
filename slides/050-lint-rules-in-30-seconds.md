---
notes: |
  So I said earlier that if you’re an Ember developer you likely have lints baked into your testing infrastructure, and when you submit a pull request to your codebase you will likely have “broken the build” if your lints have failed. I think it’s an interesting thing that we’ve moved to be so rigid with linting in our daily development habits, it’s useful in some regard but it’s also a bit problematic. For example, the words that we use: “the build is broken because of linting”. This just doesn’t make sense. Linting is not a **functional** thing. You’re not testing functionality when you write a lint rule, you’re asking a tiny little program to read your code and tell you if it things it looks right or if it detects any mistakes. This is important because firstly it’s just a little computer program and it can get things wrong, and secondly linting rules **read** your **static** code, it doesn’t try to run anything so it can’t actually tell you when something is actually broken, it can just make suggestions when it things something doesn’t quite look right.

  I think it’s important to know this distinction between functional tests and linting so you can categorise them correctly in your head. Also the fact that we’ve configured everything to explode when linting fails is important to our story, but we’ll get back to that in a little bit ;)
---

# Lint rules in 30 seconds

<video data-autoplay muted playsinline style="height: 500px;" src="/images/listening.webm"></video>
