---
notes: |
  This client has a simple button component that they call `<Ui::Button />` with almost perfect naming for a component 🧑‍🍳 💋 And as it turns out we needed to change the CSS on this button a little bit to make sure that it rendered properly everywhere in the app. To cut the long part of the story short, after this change it turns out that you can’t use the `flex`  class from tailwind on this button any more. Essentially this is now banned:  `<Ui::Button class=“flex” />` . So now the question is, how do we turn this “rule” in to a “linting rule”.
---

# Real world example

```hbs

<Ui::Button />


```

<br>
<br>
<br>

```hbs

<Ui::Button class=“flex” />


```
<!-- .element class="fragment" -->

![Banned](/images/banned.webp) <!-- .element class="fragment" style="position: absolute; left: 400px; bottom: 50px;" -->
