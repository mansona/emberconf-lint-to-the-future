---
notes: |
  Remember the bits that I said that we cared about in the AST explorer, let’s plug them into this example now. For the record this is using a “visitor pattern” that I don’t fully understand or wouldn’t be able to explain what it means very well but there is a helper in the readme that explains it a bit better than I probably could.

  First thing we do is we change the CommentNode here to be an ElementNode. This just means that every time the linting system comes across an Element in our template it will pass it to this function. So let’s start with a simple if statement that checks the name of the Element. essentially this bit in the template
---

# Custom Rule

```js
import { Rule } from 'ember-template-lint';

export default class NoFlex extends Rule {
  visitor() {
    return {
      ElementNode(node) {
      }
    };
  }
};
```
