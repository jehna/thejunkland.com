---
title: "Let's build a frontend library — Part 3: Implementation"
modified: 1597164262274
description: ""
draft: true
---

## Minimal changes from the library

Let's say we would implement a library that only creates DOM nodes
declaratively. How would it look like? The most naive way would require that we
know where we'd mount and what to mount. Something like:

```typescript
type Component = (props: any, parent: Node) => void;
```

This way we could do a simple `div` component something like so:

```typescript
const div: Component = (props, parent) => {
  const el = document.createElement("div"); // Create element
  Object.entries(props).forEach(([key, value]) => ((el as any)[key] = value)); // Set props
  parent.appendChild(el); // Mount element
};
```

This way we could mount a simple `<div>` element with the following code:

```typescript
div({ innerText: "Hello world" }, document.getElementById("app")!);
```

Pretty good for a naive approach! But we'll need a declarative way of creating
nested components, so let's add a special `children` prop and revisit the
component type:

```typescript
type Component = (props: any) => MountFn;
type MountFn = (parent: Node) => void;

export const div: Component = ({ children = [], ...props }) => (parent) => {
  const el = document.createElement("div"); // Create element
  Object.entries(props).forEach(([key, value]) => ((el as any)[key] = value)); // Set props
  children.map((child: MountFn) => child(el)); // Mount children
  parent.appendChild(el); // Mount element
};
```

After this our declarative app looks like this:

```typescript
const mount = div({
  children: [
    div({ innerText: "First line" }),
    div({ innerText: "Second line" }),
  ],
});
mount(document.getElementById("app")!);
```

You can check out [an example
project](https://codesandbox.io/s/bold-river-jmytb?file=/src/index.ts) to test
out this approach. Note that the example project only implements a few HTML tags
and does not take state changes into account. We'll come back to state later,
but the mount function serves as a good starting point for implementing minimal
changes when state changes are detected.
