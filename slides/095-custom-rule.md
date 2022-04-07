---
notes: |
  and we need to make sure to pass in the node along side the message. This tells the linting system where to draw the red squiggly line in our editors and what the message should be.

  And that’s it! I know this has been a bit of a whirlwind example, and I’m telling you now that it’s a bit of a simplification because it’s leaving out a few edge cases but hopefully at least one of you watching is saying to themselves “wow that’s more approachable than I expected”.  As I said earlier, this isn’t actually a master class on how to write lint rules, it’s more of a message of inspiration to encourage more people to **try** to write their own rules! If this talk has inspired you to try write a lint rule please let me know on twitter. I always like to hear when people try things that I have talked about.
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
            this.log({
              message: `You can't provide the 'flex' class to a Ui::Button.`,
              node: node,
            })
          }
        }
      }
    };
  }
};
```
