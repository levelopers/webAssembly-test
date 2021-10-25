# webAssembly test case

### generate .wasm file

- run `npx asc fibonacci.ts -b fibonacci.was`

### run html

- run `node server.js`
- open browser to http://localhost:8181

>javascript: 83.938720703125 ms
>
>webassembly: 51.537841796875 ms

### run node

- run `node index.js`

> javascript x 2,162,727 ops/sec ±0.30% (94 runs sampled)
>
> webassembly x 3,113,525 ops/sec ±0.28% (88 runs sampled)
>
> Fastest is webassembly