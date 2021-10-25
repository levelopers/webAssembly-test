import fs from 'fs'
import Benchmark from 'benchmark'

async function getWASM(){
  var source = fs.readFileSync('./fibonacci.wasm');
  var typedArray = new Uint8Array(source);
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
  const result= await WebAssembly.instantiate(typedArray, {
    env: env
  })
  return result.instance.exports.fibonacci
}

(async () => {
  const fibonacciScript = n => n <= 1 ? 1 : n <= 2 ? 1 : fibonacciScript(n - 1) + fibonacciScript(n - 2)
  const fibonacciWASM = await getWASM()

  var suite = new Benchmark.Suite;

  suite
    .add('javascript', function () {
      fibonacciScript(10)
    })
    .add('webassembly', function () {
      fibonacciWASM(10)
    })
    // add listeners
    .on('cycle', function (event) {
      console.log(String(event.target));
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });
})()


