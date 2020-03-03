🍀🌼🍄🍂🐌🐛🐜

响应式
数据如何确保响应的问题

``` js
// reactive state
const state = reactive({
  count: 0,
  double: computed(() => state.count * 2),
})
```


### ArrayBuffer
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

`arraybuffer.byteLength`  
`arraybuffer.slice(begin[, end])`

`typedarray.buffer`  
`typedarray.byteLength`  
`typedarray.byteOffset`  
`typedarray.length`  
`typedarray.set(array [,offset])`  
`typedarray.set(typedarray [,offset])`  
`typedarray.subarray([begin [,end]])`  
`typedarray.slice([begin[, end]])`  
`TypedArray.of(element0[, element1[, ...[, elementN]]])`  
`TypedArray.from(source[, mapFn[, thisArg]])`

`new TextEncoder().encode(string)`  
`window.crypto.getRandomValues(new Uint8Array(12))`  
`window.crypto.getRandomValues(new Uint32Array(1))[0]`  

### Flex

`display: flex;`  
`flex-direction: row | row-reverse | column | column-reverse;`  
`flex-wrap: nowrap | wrap | wrap-reverse;`  
`flex-flow: <flex-direction> || <flex-wrap>;`  
`justify-content: flex-start | flex-end | center | space-between | space-around;`  
`align-items: flex-start | flex-end | center | baseline | stretch;`  
`align-content: flex-start | flex-end | center | space-between | space-around | stretch;`  

`order: <integer>;`  
`flex-grow: <number>;`  
`flex-shrink: <number>;`  
`flex-basis: <length> | auto;`  
`flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];`  
`align-self: auto | flex-start | flex-end | center | baseline | stretch;`  
