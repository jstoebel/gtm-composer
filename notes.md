# Development Notes

## First Iteration

For my first iteration of this project, I've chosen to use a redux store to store state. Since we
need a way for a component to know about the state of the rest of the world in order to have
idempotent behavior, we need to keep the state of the world in a single place, and have the
component tree update whenever that state changes.

Another choice I made was to have components pass data about their children to a render prop
function. So for example an `Account` component will look up its containers and then pass them down
to a function. The user gets to decide how to use that data

```
<Account accountId=1>
  {(containers) => containers.map((container) => <Container containerId={container.id}></Container>)}
</Account>
```

This seemed like a good idea at first, but I turns out to be a little too brittle. What if a user
wants to do something like this:

```
<Account accountId=1>
  <Container containerId=1>
    ...
  </Container>
</Account>
```

Under the current API, they can't. I want to give users the freedom to express their desired GTM
state and the CLI takes care of the rest. Render prop function doesn't seem like the right way. I
think its back to the drawing board... 