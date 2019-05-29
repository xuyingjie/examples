
# 前端面试题
- 计时40分钟

- 维度：基础；主动性；
- 解决问题


- 知识点
js基础（闭包；bind，apply；）
css（移动端适配）
es6（箭头函数，this绑定；promise异步和setTimeout异步区别；class有哪些改进；proxy使用场景）
http（Cache-Control用处；什么情况会发出option请求；常见的返回状态码）
vue（子组件data为何用函数返回；虚拟dom主要解决了什么问题；vue-router怎么实现的）
webpack（异步加载；多页应用）
解决问题思路：
    - 同时发出三个Ajax请求，然后对都请求到的数据进行处理。
    - 数组去重的几种方法，哪种更快。
    - 同时打开多个 github 页面，其中一个页面登录了，其它页面都显示已登陆请手动刷新。怎么实现这种效果。
    - 节流函数






描述介绍下最近项目
- 现在项目里用的 vue 版本是多少？
- 习惯用什么开发环境？（工具）
- 如何保证写出可维护性的代码?（工具）

- 你最近遇到过什么技术挑战？你是如何解决的？
- 最近有学习什么吗？（主动）


## HTML
- 请描述 cookies、sessionStorage 和 localStorage 的区别。
- 请说出三种减少页面加载时间的方法。

- 你会用什么工具来查找代码中的性能问题？
- 请解释 layout、painting 和 compositing 的区别。


## CSS
- 请描述你曾经使用过的 CSS 预处理器的优缺点。
- 说说常用的伪元素 (pseudo-elements)。
- 请解释 * { box-sizing: border-box; } 的作用, 有什么好处吗？
- position属性的值，并有什么区别 （relative、fixed、absolute 和 static 元素）
- 垂直居中的几种方法；flex 子元素空间不足时会缩小，如何避免。
- 页面用了 flex 或者 transform，如何加前缀。
- 请解释 CSS 动画和 JavaScript 动画的优缺点。

- 常用z-index改变层叠顺序，还有其它方法吗？(stacking context)


## Javascript
- vue组件data为何用函数生成
<!-- - 请解释事件代理 (event delegation)。 -->
- 什么是闭包 (closure)，如何使用它，为什么要使用它？（作用域）

- let相对于var有何改进。（声明提升 (hoisting)；暂时性死区；重复声明；块级作用域）
- 箭头函数的区别；如果不用箭头函数如何绑定this（bind,apply,call）
- es6 proxy 的使用场景

- 虚拟dom解决了什么问题 diff
- vue react 的差异

- 单页面和多页面优缺点
    - webpack 多页面
    - 如何实现异步加载组件


## 网络
- Cache-Control Expires
- 请尽可能完整得描述从输入 URL 到整个网页加载完毕及显示在屏幕上的整个流程。
- 什么是 HTTP method？请罗列出你所知道的所有 HTTP method，并给出解释。


## Node（工具）
- placehold
- mock


## 代码题：
1. 实现以下代码
[1,2,3,4,5].duplicator(); // [1,2,3,4,5,1,2,3,4,5]

2. 问题：如何实现以下函数？
add(2, 5); // 7
add(2)(5); // 7

<!-- 2. 生成数组[1,2,3,4,5]，然后将其乱序。 -->

2. 实现一个Event类，包含on/off/trigger方法。

3. 同时发出三个Ajax请求，然后对都请求到的数据进行处理。

4. 快速排序

5. 函数节流

```javascript
// - 介绍下：microtask queue; macrotask queue
(function test() {
    setTimeout(function() {console.log(4)}, 0);
    new Promise(function executor(resolve) {
        console.log(1);
        for( var i=0 ; i<10000 ; i++ ) {
            i == 9999 && resolve();
        }
        console.log(2);
    }).then(function() {
        console.log(5);
    });
    console.log(3);
})()
```

- 问题：foo.x的值是什么？
```javascript
var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};
```








## react
- setState

解释 有的跨域POST请求会先发送OPTIONS预检请求
简单请求，预检请求（OPTIONS请求）
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

解释 层叠上下文
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context





