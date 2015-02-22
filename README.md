# flow-adts
## Type checking state in React components with Flow

Flow is a static analysis tool for JavaScript. It lets you gradually add type annotations, and will check that you adhere to the type constraints you’ve added. I’ve never used this in production code, but here’s what I learned trying to use this to enforce constraints on a React component’s state. Specifically, I wanted to see if Flow would support encoding algebraic data types in JavaScript and help catch mistakes I made when using them

[Read more...](https://medium.com/@krob/type-checking-state-in-react-components-with-flow-f1f1ec84f395)

## Running locally
```
$ npm install
$ npm run-script build   # long-lived process to watch and build

# in another terminal:
$ flow check
```

If you're running this locally, I also see unrelated [two type errors](doc/bug.png) that I couldn't figure out.  If you can help me figure these out that'd be awesome, but for the purposes of the blog post they're safe to ignore.

