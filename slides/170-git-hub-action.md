---
notes: |
  I know that probably looks a little small but I couldn't zoom in any more because of the massive link to the dashboard.yml. Maybe I should abreviate the repo name to make this look a bit cleaner.

  So that's all you need to get started in with the lint to the future dashboard! And if you have gotten this far what exactly does that give you? I've teased you all with a screenshot, now let's do a quick demo to show you some of the features.
---

# GitHub action

```yaml
name: Lint to the Future
on:
  push:
    branches:
      - master

jobs:
  deploy:
    uses: mansona/lint-to-the-future-dashboard-action/.github/workflows/dashboard.yml@main
```
<!-- .element style="width: 100%" -->
