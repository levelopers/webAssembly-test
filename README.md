# webAssembly test case

### generate .wasm file

- run `npx asc fibonacci.ts -b fibonacci.wasm`

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




#### WebAssembly是什么？
---

WebAssembly是一种运行在现代网络浏览器中的新型代码，并且提供新的性能特性和效果。它设计的目的不是为了手写代码而是为诸如C、C++和Rust等低级源语言提供一个高效的编译目标。

对于网络平台而言，这具有巨大的意义——这为客户端app提供了一种在网络平台以接近本地速度的方式运行多种语言编写的代码的方式；在这之前，客户端app是不可能做到的。

而且，你在不知道如何编写WebAssembly代码的情况下就可以使用它。WebAssembly的模块可以被导入的到一个网络app（或Node.js）中，并且暴露出供JavaScript使用的WebAssembly函数。JavaScript框架不但可以使用WebAssembly获得巨大性能优势和新特性，而且还能使得各种功能保持对网络开发者的易用性。

---
#### WebAssembly如何适应网络平台？
---
网络平台可以被想象成拥有两个部分：

一个运行网络程序（Web app）代码——比如，给你的程序提供能力的JavaScript——的虚拟机
一系列网络程序能够调用从而控制网络浏览器/设备功能，并且能够让事物发生变化的网络API（DOM、CSSOM、WebGL、IndexedDB、Web Audio API等）。
从历史角度讲，虚拟机过去只能加载JavaScript。这对我们而言足够了，因为JavaScript足够强大从而能够解决人们在当今网络上遇到的绝大部分问题。尽管如此，当试图把JavaScript应用到诸如3D游戏、虚拟现实、增强现实、计算机视觉、图像/视频编辑以及大量的要求原生性能的其他领域的时候，我们遇到了性能问题（参考 WebAssembly 使用案例 获取更多细节）。

<details>
  <summary>autoCAD website</summary>
  
  ![autoCAD](https://user-images.githubusercontent.com/38830527/140081085-51bce7b4-9947-43f0-83b5-0eec1a4ac4b0.PNG)
</details>

而且，下载、解析以及编译巨大的JavaScript应用程序的成本是过高的。移动平台和其他资源受限平台进一步放大了这些性能瓶颈。

WebAssembly是一门不同于JavaScript的语言，但是，它不是用来取代JavaScript的。相反，它被设计为和JavaScript一起协同工作，从而使得网络开发者能够利用两种语言的优势：

JavaScript是一门高级语言。对于写网络应用程序而言，它足够灵活且富有表达力。它有许多优势——它是动态类型的，不需要编译环节以及一个巨大的能够提供强大框架、库和其他工具的生态系统。
WebAssembly是一门低级的类汇编语言。它有一种紧凑的二进制格式，使其能够以接近原生性能的速度运行，并且为诸如C++和Rust等拥有低级的内存模型语言提供了一个编译目标以便它们能够在网络上运行。（注意，WebAssembly有一个在将来支持使用了垃圾回收内存模型的语言的高级目标。）
随着WebAssembly出现在了浏览器中，我们前面提到的虚拟机将会加载和运行两种类型的代码——JavaScript和WebAssembly。

不同类型的代码能够按照需要进行相互调用——WebAssembly的JavaScript API使用能够被正常调用的JavaScript函数封装了导出的WebAssembly代码，并且WebAssembly代码能够导入和同步调用常规的JavaScript函数。事实上，WebAssembly代码的基本单元被称作一个模块，并且WebAssembly的模块在很多方面都和ES2015的模块是等价的。

<details>
  <summary>how webassembly works</summary>
  
  ![flowchart](https://media.prod.mdn.mozit.cloud/attachments/2017/02/15/14647/b5965e58a92d6d4b99a1b5a435253290/emscripten-diagram.png)
</details>

---
#### WebAssembly的目标
---

- 快速、高效、可移植——通过利用常见的硬件能力，WebAssembly代码在不同平台上能够以接近本地速度运行。
- 可读、可调试——WebAssembly是一门低阶语言，但是它有确实有一种人类可读的文本格式（其标准即将得到最终版本），这允许通过手工来写代码，看代码以及调试代码。
- 保持安全——WebAssembly被限制运行在一个安全的沙箱执行环境中。像其他网络代码一样，它遵循浏览器的同源策略和授权策略。
- 不破坏网络——WebAssembly的设计原则是与其他网络技术和谐共处并保持向后兼容。

---
#### 示例
---

<details>
  <summary>代码截屏index.html</summary>
  
  ![index.html](https://user-images.githubusercontent.com/38830527/140651225-ce28577e-3b07-40ee-813d-d45cb7fc4e79.PNG)
</details>
<details>
  <summary>代码index.html</summary>

```javascript
  概念：
 
      模块：表示一个已经被浏览器编译为可执行机器码的WebAssembly二进制代码。一个模块是无状态的，并且像一个二进制大对象（Blob）一样能够被缓存到IndexedDB中或者在windows和workers之间进行共享（通过postMessage() (en-US)函数）。一个模块能够像一个ES2015的模块一样声明导入和导出。
  
      内存：ArrayBuffer，大小可变。本质上是连续的字节数组，WebAssembly的低级内存存取指令可以对它进行读写操作。
   
      表格：带类型数组，大小可变。表格中的项存储了不能作为原始字节存储在内存里的对象的引用（为了安全和可移植性的原因）。
   
      实例：一个模块及其在运行时使用的所有状态，包括内存、表格和一系列导入值。一个实例就像一个已经被加载到一个拥有一组特定导入的特定的全局变量的ES2015模块。
  //fibonacci.ts
  // 语言assemblyscript: https://www.assemblyscript.org/
  export function fibonacci(n: i32): i32{
    return n<=1
        ?1
        :n<=2
            ?1
            :fibonacci(n-1)+fibonacci(n-2)
  }

  //  index.html
  //  胶水代码
    async function getWASM() {
      const env = {
        memoryBase: 0,
        tableBase: 0,
        memory: new WebAssembly.Memory({
          initial: 256
        }),
        table: new WebAssembly.Table({
          initial: 0,
          element: 'anyfunc'
        })
      }
      const fetchResult = await fetch('./fibonacci.wasm')
      const typedArray = await fetchResult.arrayBuffer(fetchResult)
      const result = await WebAssembly.instantiate(typedArray, {
        env: env
      })
      return result.instance.exports.fibonacci
    }
    (async () => {
      const fibonacciScript = n => 
        n <= 1 ? 1 : n <= 2 ? 1 : fibonacciScript(n - 1) + fibonacciScript(n - 2)
      const fibonacciWASM = await getWASM()
      console.time('javascript')
      fibonacciScript(35)
      console.timeEnd('javascript')
      console.time('webassembly')
      fibonacciWASM(35)
      console.timeEnd('webassembly')
    })()
// javascript: 64.222900390625 ms
//  webassembly: 55.152099609375 ms
```
</details>


---
#### 参考:
---

> webassembly concept: https://developer.mozilla.org/zh-CN/docs/WebAssembly/Concepts
>
> webassembly compatibility: https://developer.mozilla.org/zh-CN/docs/WebAssembly
>
> assemblyscript: A TypeScript-like language for WebAssembly. https://www.assemblyscript.org/
>
> compile C/C++ to wasm: https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm
>
> AutoCAD website: https://www.autodesk.com/products/autocad-web-app/overview
>
> AutoCAD Web App blog: https://blogs.autodesk.com/autocad/autocad-web-app-google-io-2018/
>
> AutoCAD written in C++: https://www.quora.com/What-programming-language-is-used-for-AutoCAD
