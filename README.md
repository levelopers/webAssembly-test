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


#### reference:

> webassembly compatibility: https://developer.mozilla.org/zh-CN/docs/WebAssembly

> compile C/C++ to wasm: https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm

> AutoCAD website: https://www.autodesk.com/products/autocad-web-app/overview

> AutoCAD Web App blog: https://blogs.autodesk.com/autocad/autocad-web-app-google-io-2018/

> AutoCAD written in C++: https://www.quora.com/What-programming-language-is-used-for-AutoCAD

#### screenshots

<details>
  <summary>autoCAD website</summary>
  
  ![autoCAD](https://user-images.githubusercontent.com/38830527/140081085-51bce7b4-9947-43f0-83b5-0eec1a4ac4b0.PNG)
</details>

