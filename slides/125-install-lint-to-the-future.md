---
notes: |
  This installs the main lint-to-the-future package and the ember-template-lint plugin so that when we run any commands against lint-to-the-future it will know how to deal with files covered by ember-template-lint.

  Now that we have installed lint-to-the-future, we need to make sure that we configure our rules so that the ones we want to ignore are currently failing. So in our case we will add our custom rule to our config and we check our code using `npm test`
---

# Install Lint to the Future

```sh

npm install lint-to-the-future lint-to-the-future-ember-template


```
<!-- .element class="white-text" style="font-size: .7em;" -->
