Now I would suspect that everyone here at EmberConf will have picked up my very thin alegory but let’s just spell it out in case anybody missed it. Our Rules document is actually our linting rules. If you have ever worked on an Ember app you will have experience with using linting because a newly generated Ember app has a whole plethora of helpful rules enabled by default and automatically baked into the default testing process. What I mean by that is that if you generate a new Ember app and run `npm test` then you will automatically run all the pre-configured linting rules. And do you know what? The rule in my example, alt text on images, is one of the lint rules that is automatically enabled for you 🎉 Thanks to Mel Sumner and the amazing work by the Accessibility team there are a whole host of Accessibility rules enabled by default.

So far I haven’t told you anything new. I have just set the scene and hopefully made sure that everyone listening has a good foundational understanding of the purpose of a lint rule. But there are two examples in my little story that I suspect a lot of people listening don’t actually have embedded in their daily routines yet, and these are the two things that I said I wanted people to take away with them.

Firstly, I mentioned that our Developer “wrote a new rule in their rules document”. Sure our example happens to be of a “rule” that I already exists and comes with every new Ember app thanks to the ember-template-lint package. But what if I gave a different example? What if I gave a real example that I recently worked on with a client that I can not only guarantee that there isn’t a pre-written lint rule out there to cover this example, I will also say with some confidence that this rule won’t be that much use to anyone else.

This client has a simple button component that they call `<Ui::Button />` with almost perfect naming for a component 🧑‍🍳 💋 And as it turns out we needed to change the CSS on this button a little bit to make sure that it rendered properly everywhere in the app. To cut the long part of the story short, after this change it turns out that you can’t use the `flex`  class from tailwind on this button any more. Essentially this is now banned:  `<Ui::Button class=“flex” />` . So now the question is, how do we turn this “rule” in to a “linting rule”.

So what even is a linting rule? I’m not going to go super deep into the details here just because I’m not here for an hour long talk 😂 instead I’ll give you a bit of a conceptual overview and if you want to dig any deeper then I could recommend a workshop that a colleague of mine did for EmberConf 2 years ago. It’s all free and you can do it at your own pace 🎉

So I said earlier that if you’re an Ember developer you likely have lints baked into your testing infrastructure, and when you submit a pull request to your codebase you will likely have “broken the build” if your lints have failed. I think it’s an interesting thing that we’ve moved to be so rigid with linting in our daily development habits, it’s useful in some regard but it’s also a bit problematic. For example, the words that we use: “the build is broken because of linting”. This just doesn’t make sense. Linting is not a **functional** thing. You’re not testing functionality when you write a lint rule, you’re asking a tiny little program to read your code and tell you if it things it looks right or if it detects any mistakes. This is important because firstly it’s just a little computer program and it can get things wrong, and secondly linting rules **read** your **static** code, it doesn’t try to run anything so it can’t actually tell you when something is actually broken, it can just make suggestions when it things something doesn’t quite look right.

I think it’s important to know this distinction between functional tests and linting so you can categorise them correctly in your head. Also the fact that we’ve configured everything to explode when linting fails is important to our story, but we’ll get back to that in a little bit ;)

Right now we’re going to take a little detour and we’re going to very quickly look into how to write one of these lint rules because it’s a little bit different from writing things like tests. But before I do I want to partake in a little bit of audience participation (I can’t help myself whenever I’m doing a conference talk). So firstly, can everyone raise their hands if you have ever written a test.

Oh wait I can’t actually see your hands… so let’s try this a different way. Hey twitter people: have you ever written a test

-> pause then show screenshot of the first answer

Ok so that’s a pretty substantial margin of people. For the last few hold outs there, you gotta try it testing is epic.

now, next question, how many of you have ever written a custom lint rule that was specifically for your code?

-> show the second answer.

Wow ok so I’m impressed. I knew there was going to be significantly fewer people having written a custom lint rule but I’m impressed that it’s hanging out around the 30% mark! Hopefully I will inspire a few of you to try it out after this talk and maybe we can bump that figure a little.

So let’s write a slightly simplified example of a lint rule together. As I said earlier, there is that AST Workshop that will go into this in **way** more detail but for now we’re going to look at an absolutely crucial tool to use for writing linting rules:  AST Explorer.

-> Screenshot or video of the AST Explorer

This is an incredibly powerful tool that supports many languages so just make sure you are set to Handlebars templates and glimmer for now.

Now let’s drop in our example code from before `<Ui::Button class=“flex” />` and see what happens. The left hand side of the screen is where we put our template and this object you see on the right is the AST representation of that template. I’ll not go into too much detail there about what an AST really is (again, just do the workshop for that!!) but you’ll see why it’s useful now in a second. One of the best tricks of AST explorer is that you can just click the bit that you care about on the left and it highlights the AST representation of that bit on the right! so let’s click the class. Now there is a lot to see here but to skip ahead to the end… you can see that we’re in an ElementNode, that has attributes, that has an attribute named `class` with a value of `flex`. And that’s what we need to find with our lint rule.

Now let’s move on to writing a super quick example an ember-template-lint rule. You can follow the instructions in the readme on how to make a custom rule and I think this is explained a bit more in the AST workshop. But again skipping ahead let’s start with the example rule they have in the readmes:

screenshot of the example in the readme.

so for some reason this example starts with a comment statement. I guess it might be useful to be able to programatically read comments, but that’s not our game today! Remember the bits that I said that we cared about in the AST explorer, let’s plug them into this example now. For the record this is using a “visitor pattern” that I don’t fully understand or wouldn’t be able to explain what it means very well but there is a helper in the readme that explains it a bit better than I probably could.

First thing we do is we change the CommentNode here to be an ElementNode. This just means that every time the linting system comes across an Element in our template it will pass it to this function. So let’s start with a simple if statement that checks the name of the Element. essentially this bit in the template

-> image pointing at the name of the element node

and we only care if it’s a Ui::Button

```
if (node.tag === 'Ui::Button') {

}
```

next we look through the attributes and find any that are named `class`


```
if (node.tag === 'Ui::Button') {
let classAttribute = node.attributes.find(
  (attr) => attr.name === 'class'
);
}
```

next we check if that class attribute has any `flex` text in it

```
if (node.tag === 'Ui::Button') {
let classAttribute = node.attributes.find(
  (attr) => attr.name === 'class'
);

if( classAttribute && classAttribute.value.chars.includes('flex')) {
  // complain!!!
}
}
```

the last step here is that we need to add a message to the lint system. The exact api of this is different for every lint system but for ember-template-lint you call this.log()


```
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
```

and we need to make sure to pass in the node along side the message. This tells the linting system where to draw the red squiggly line in our editors and what the message should be.

And that’s it! I know this has been a bit of a whirlwind example, and I’m telling you now that it’s a bit of a simplification because it’s leaving out a few edge cases but hopefully at least one of you watching is saying to themselves “wow that’s more approachable than I expected”.  As I said earlier, this isn’t actually a master class on how to write lint rules, it’s more of a message of inspiration to encourage more people to **try** to write their own rules! If this talk has inspired you to try write a lint rule please let me know on twitter. I always like to hear when people try things that I have talked about.

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
