---
notes: |
  and we only care if it’s a Ui::Button
---

# Custom Rule

```js
import { Rule } from 'ember-template-lint';

export default class NoFlex extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        if (node.tag === 'Ui::Button') {

        }
      }
    };
  }
};
```
