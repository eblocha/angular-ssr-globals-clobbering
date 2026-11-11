# p-queue + Angular SSR repro

```sh
pnpm i
pnpm start
```

## Explanation

Angular patches `globalThis` with symbols from `domino` to emulate a browser environment when the platform is created.

This is problematic for libraries like `p-queue`, which extend `EventTarget`. When `PQueue` calls `this.dispatchEvent` with a `new CustomEvent`, node throws a `TypeError` because `CustomEvent` is `domino`'s constructor, not the intrinsic.
