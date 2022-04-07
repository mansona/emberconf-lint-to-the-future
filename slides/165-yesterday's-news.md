---
notes: |
  Now if you take another look inside the `data.json` file in our output folder you will see that it’s gone and downloaded “yesterday’s” data and merged that json with the output of the `list` command 🎉 I think this is a pretty neat trick to allow you to keep track of your data using only a http server and not needing a database! It means that you can even host your lint-to-the-future dashboards on GitHub pages without needing any other infrastructure. And to top it all of I’ve built a “reusable GitHub action” that does the lion’s share of the work for you so all you need is this little snippet in a workflow document:
---

# Yesterday's News

```sh

npx lint-to-the-future output -o lttf
  --previous-results https://ember-learn.github.io/ember-styleguide/data.json


```
<!-- .element class="white-text" style="font-size: 1em;" -->


take a peek if you're interested <br> [https://ember-learn.github.io/ember-styleguide/data.json](https://ember-learn.github.io/ember-styleguide/data.json)

<!-- .element class="fragment" style="font-size: .8em;" -->
