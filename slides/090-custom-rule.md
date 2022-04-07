---
notes: |
  next we check if that class attribute has any `flex` text in it

  the last step here is that we need to add a message to the lint system. The exact api of this is different for every lint system but for ember-template-lint you call this.log()
---

# Custom Rule

```js
import { Rule } from 'ember-template-lint';

export default class NoFlex extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        if (node.tag === 'Ui::Button') {
          let classAttribute = node.attributes.find(
            (attr) => attr.name === 'class'
          );

          if( classAttribute && classAttribute.value.chars.includes('flex')) {
            // complain!!!
          }
        }
      }
    };
  }
};
```
