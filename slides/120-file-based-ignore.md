---
notes: |
  so what is the benefit of this? well remember in our example when I said that all new files would need to conform to the new RULES document? well by setting up file-based ignores like this as a one-time thing when we enable our new rule that means that any new file we create won’t have these file-based ignores and they will need to conform to this new rule that we just configured.

  If you think it would be tedious to find all the files where we would need to add these ignores, and either create new ignore comments or add it to the existing ones I would tend to agree. And this is where the first feature of lint-to-the-future comes in. Let’s install it on our repo first:
---

# File based ignore

```hbs

{{!-- template-lint-disable first-rule second-rule --}}


```
<!-- .element class="white-text" style="font-size: .8em;" -->
