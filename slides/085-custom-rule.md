---
notes: |
  next we look through the attributes and find any that are named `class`
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
        }
      }
    };
  }
};
```
