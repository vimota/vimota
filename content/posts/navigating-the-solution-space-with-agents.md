The “read the code vs don’t read the code" debate has [been](https://x.com/mitchellh/status/2072738025344565262) [raging](https://x.com/bendee983/status/2081117964414435367?s=20) lately ([@dexhorthy](https://x.com/@dexhorthy) has the best take on it). But I think it's missing an important framing: The job we are doing isn’t merely about reading or writing code - it’s navigating the solution space. Coding agents have dramatically lowered the cost of exploring that space, but they’re still incredibly path dependent and poor at deciding where in it you should end up.

## False Dichotomy

The debate is a false dichotomy for two reasons.

**First of all, it's clearly context dependent**: scrutiny should scale with risk. So the first principle to use in my opinion is of concentric circles of risk - the closer you are to the "core" (where changes have a large blast radius) the more you need to understand what's going on. The further away you are to broad impact, the more you can accept risk and less maintainable code with the goal of moving faster.

**Second, “reading the code” can mean wildly different things.** If any one means literally not reading a single line of code and only interacting through the agent - I can't understand how they'd be building any consequential software at that altitude. There's some amount of "understanding the territory" that can't avoid looking at code. Perhaps we'll get to a point of needing to soon, but we are not even close right now.

If they mean understanding the existing architecture, reviewing diffs critically, asking questions, digging into suspicious areas... well then I'd still call that "reading the code" (just with augmentation).

## Reward Hacks

Any one that's actively working on long term projects with coding agents will immediately notice a couple of things: models tend to be purely additive rarely refactoring, they tend to be overly conservative and maintain awkward backwards compatibility, and ultimately they love to reward hack.

If you understand how models are rewarded, you'll understand how they work. The benchmarks that models are trained on tend to be short horizon and don't adequately evaluate how maintainable the code they produce are long term. They will tend to learn to produce the simplest possible code changes that are sufficient to pass the narrow tests of the evals they're hillclimbing. In the context of real-world projects, these changes tend to be local optima.

To top it off, plenty of benchmarks that form the foundation of modern coding agents, are [flat out broken](https://openai.com/index/separating-signal-from-noise-coding-evaluations/) and [prone to reward hacking](https://cursor.com/blog/reward-hacking-coding-benchmarks?utm_campaign=ALL_ENG_Cursor-Blog-June-2026&utm_content=ALL_ENG_EM_Cursor-Digest-June-2026&utm_medium=email&utm_source=customerio). We probably need [new benchmarks](https://x.com/dexhorthy/status/2081797628552270027).

![Coding benchmark results](https://pbs.twimg.com/media/HOQ6g_TXoAAo1_V?format=png&name=medium)

![Coding benchmark comparison](https://pbs.twimg.com/media/HOQ6EHyWkAAQcCJ?format=jpg&name=medium)

## A real world example

Just last night, I worked on a change that required 10+ rounds of iterations with Sol (other models were worse, I tried) to get to a net ~200 LOC that I was finally satisfied with.

- The initial prompt was straightforward: "Right now when the backend deployed is down the frontend just hangs in loading state forever".
- Right away I noticed the model was doing a bunch of work to maintain the "legacy" feature flag structure we had that I was able to tell it to remove altogether (all of our deployed apps since late last year have that endpoint - code cleanup!)
- While asking the model about how the AbortSignal mechanism it introduced worked, it also suggested combining it with ReactQuery's own abort signal (why didn't it do that initially? but at least I got to learn more about how AbortSignals work!)
- Then I realized that this change introduced rendering of visual components to a `FeatureFlagProvider` where it previously didn't exist. The agent tried injecting rendering logic to a React provider that previously was only about managing state. This added a much more complex set of rending states than we had before.
- Only by looking at the code I realized we could actually push that down to the children and keep a similar rendering chain as we had before, simplifying things drastically, and making the user experience better (users can switch to a deployed app that isn't having an error, or logout)
- Even tests require reading - during these changes the agent introduced some weird test scaffolding `FeatureFlagState` that rendered different texts based on the feature flag the provider provided. This was super awkward - rather than rendering a fake visual component the app will never have, we can just use renderHook to assert the state computed directly
- Finally - I noticed that the model had produced a new AppUnavailable component for rendering that specific error state. **We already had an Error component** for other error states, why not just use that and preserve visual consistency? The model had also exposed a bunch of machinery in the `FeatureFlagProvider` coupled to that AppUnavailable component. Nudging the model to consolidate let us cut down a few more hundreds of lines of code.

That example is useful because it's a simple problem to fix but if I had stopped at any point along the iterations, the code and product would've been much worse off.

The models are extremely path dependent and tend to want to only add and special case things, never remove/simplify/question abstractions. At the same time, without the coding agent I probably would've produced much worse code myself (or never gotten around to doing it).

## Guiding the ship

The best mental model I've come up with for where we're at is that **coding agents are amazing tools to help us traverse the solution space really rapidly.** They drastically bring down the cost of us trying things out, comparing results, asking lots of questions and learning along the way.

But ultimately, there's still **a lot of judgement and understanding necessary to guide them to a globally optimal location in the solution space**. And perhaps equally as important, taking an active role in that process is what lets you build a rich mental model of the solution - which compounds over time.
