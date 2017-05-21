https://segmentfault.com/a/1190000008402872?from=timeline
`emcc math.c -Os -s WASM=1 -s SIDE_MODULE=1 -o math.wasm`

https://segmentfault.com/a/1190000003977393


WebAssembly is an intermediate representation.
用于其它语言到web平台，与javascript无关。



asm.js：an extraordinarily optimizable, **low-level** subset of JavaScript


WebAssembly 汇编
like `LLVM IR`

- Emscripten: An LLVM-to-JavaScript Compiler.
用于静态类型语言编译到asm.js。

- Never underestimate the V8 compiler. 
手写很复杂，而且结果不一定快