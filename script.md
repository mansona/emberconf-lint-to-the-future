



Now we covered one of the things that I wanted you all to take away from this talk today. The other thing is the part in our developer’s story where I said “they wrote a list of all the places in the code that need to be changed and even put together a graph”…

This is where a little tool I built comes into the picture, and happens to be the namesake of this talk.

-> screenshot of lint to the future

lint to the future!

Lint to the future was built to solve a very specific problem and it’s a remarkably simple tool. Let’s talk about the problem first and then we’ll get into what the tool does once we understand the problem.

So let’s imagine that we have just written our “don’t use flex class on buttons” lint rule and we wanted to enable it in our massive code base. We put it in the right place and configure it correctly and suddenly our CI system explodes and tells us that it has found 10 thousand lint errors across half the files in a giant code base. Turns out buttons are quite common in web apps, who knew!?

I know I said earlier that lints don’t actually **break** things but for better or worse our CI is setup to explode if even a single lint rule fails so we can’t just turn on this rule. And this rule isn’t something that we can blindly fix in all the buttons because someone added the flex class for a reason, we need to go and manually check each of the buttons before we just remove the class. So what do we do!?

One method that we might have done in the past would be to add the rule but either configure our system to ignore it, or tell it that it’s just a “warning” and not an error. But neither of these situations helps us because we might as well not have added a lint rule that we instantly configure our system to ignore because it doesn’t do anything, and if we’re setting it as a warning we’ve just polluted our logs with 10 thousand lines of unactionable or unmanageable warnings. Turns out there is a better way. What if we could prevent any new files from being added with the lint error but temporarily ignore the errors in the existing files? Well when you’re configure a new rule you can either set your lint system to ignore it “globally” or you can make use of special comment formats that can ignore a particular rule in a particular file. Every linting system I have come across supports ignoring rules for a specific file, it’s just a matter of figuring out how the comment needs to be formatted. With ember-template lint it needs to look like this:

```
{{!-- template-lint-disable first-rule second-rule --}}
```

so what is the benefit of this? well remember in our example when I said that all new files would need to conform to the new RULES document? well by setting up file-based ignores like this as a one-time thing when we enable our new rule that means that any new file we create won’t have these file-based ignores and they will need to conform to this new rule that we just configured.

If you think it would be tedious to find all the files where we would need to add these ignores, and either create new ignore comments or add it to the existing ones I would tend to agree. And this is where the first feature of lint-to-the-future comes in. Let’s install it on our repo first:

```
npm install lint-to-the-future lint-to-the-future-ember-template
```

This installs the main lint-to-the-future and the ember-template-lint plugin so that when we run any commands against lint-to-the-future it will know how to deal with files covered by ember-template-lint.

Now that we have installed lint-to-the-future, we need to make sure that we configure our rules so that the ones we want to ignore are currently failing. So in our case we will add our custom rule to our config and we check our code using `npm test`

-> animation of it failing

perfect. So as I said before, you most likely have your CI system setup that this would fail if we committed this and pushed it now. So if we run `npx lint-to-the-future ignore` it will automatically add those file based ignores to each of the files that failed when we checked.

Now you are ready to commit and push your work!!

This is a great first step along the journey to enabling a new lint rule in your codebase. If the codebase is still growing then all the new files from this point will be just that little bit better than they were before. Now we need something for the existing files, and this is where the the second and final feature of lint-to-the-future comes in: the dashboard.

In our example from before we talked about a big list of files that still need to be fixed. Essentially the fact that we are using file-based ignores for ember-template-lint is all that we need to tell the system what files still need to be improved. So lint-to-the-future has a little command that asks each of the plugins to list the files that have file-based ignores and what the rules they are ignoring.

```
npx lint-to-the-future list --stdout
```

now this command is kinda cool but It’s also not the fancy graphs that I was hinting at in our example at the start of this talk. but there is one thing to note in this output: it is structured by the date, then by the plugin and then by the rule. And these little arrays that you can’t really see in this screenshot: they are just a list of files that have the file-based ignores for that rule at the top.

There is one more command that is interesting and the one that actually does the hard work for us building our lovely graphs

```
npx lint-to-the-future output -o lttf
```

that `-o` just tells the command where to put the folder that it generates for you. If you look in that folder you’ll see a static web app built for you and you’ll also notice a little `data.json` that happens to be the output of our list command from before.

If you booted this static site up you would see a set of graphs with exactly one data point, because it only knows about today. If you want this app to do what it’s supposed to do and allow you to track things over time you need to tell it where it can find “yesterday’s” data by just passing it a link to the previous results:

```
npx lint-to-the-future output -o lttf --previous-results https://empress.github.io/guidemaker-default-template/data.json
```

Now if you take another look inside the `data.json` file in our output folder you will see that it’s gone to get “yesterday’s” data, run the `list` command again to get today’s data and merged the two json together 🎉 I think this is a pretty neat trick to allow you to keep track of your data using only a http server and not needing a database! It means that you can even host your lint-to-the-future dashboards on GitHub pages without needing any other infrastructure. And to top it all of I’ve built a “reusable GitHub action” that does the lion’s share of the work for you so all you need is this little snippet in a workflow document:

-> image of the snippet

So I have to show you what this dashboard actually looks like before I sign off the talk. Here is a little demo I recorded just moving through the dashboard and showing it off. Firstly you will notice the awesome styling of this dark mode. Major props to Anne-Greeth for this. And a little birdy tells me that she will be talking a little bit about designing for dark-mode so watch this space.

You’ll see that we have a graph for each of the rules that are failing. In this demo you can see that I’m not doing very well at improving the situation, it’s for one of my lesser contributed-to projects. But you can see that we have a contiguous graph from our first data point until “today”, this is actually filling in any gaps that you might have if you haven’t actually built it every day. You can also switch to week view and month view. You’ll see that everything on this graph started out in month view, it does this automatically once something crosses a certain threshold (and Anne-Greeth also contributed the month view so thanks again for that).

Other than the graphs you can click this link here to see the list of all the files that still need to be improved. This is just here in case you wanted to cross reference or something, but really this app is all about the graphs!!  

So that’s it for my talk. I hope I have given you all nice foundational perspective on what lints are, how useful they can be and how unlocking the skill of writing your own lint rules can be an incredibly powerful tool to gradually improve your codebase in a way that you personally design. And don’t forget to try out lint-to-the-future and setup your dashboard, never underestimate the power of a nice graph.
