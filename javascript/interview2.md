

> 主要参考：https://www.infoq.cn/article/WIOR4Ua7MOGNL_CxlO20

- 基本的 JavaScript 问题
    > **《JavaScript高级程序设计》**(第3章--第7章，第13章)
    - 作用域；引用类型；面向对象编程（基于原型的继承）；函数表达式（闭包）；
    - 事件；ajax；
    > **《深入理解ES6》**（对整体有个概念）
    - let; 箭头函数；对象结构；数组结构；class；Promise；
    - https://github.com/alivebao/clean-code-js (js风格建议和es6的实践)
- JavaScript 前端应用程序设计问题
    - 解释MVP、MVVM 和 MV*
    - TypeScript有什么优势
- 前端基础和理论相关问题
    - css
    - html
- http协议
    > **《图解HTTP》**
    - HTTP状态码
    - 常用的首部字段，Cache-Control，last-modified
    - 自己搭建个node服务器，学习修改首部字段，设置cookie
- 算法
    > **《算法图解》**（第1章--第4章）
    - 大概解释各种排序算法；实现一样快速排序
    - 解释大O时间
    进阶《算法（第四版）》




## 基本的 JavaScript 问题

1. 让下面的代码可以运行：

```javascript
const a = [1, 2, 3, 4, 5];
// Implement this
a.multiply();
console.log(a); // [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]
```

2. 以下代码会返回false，解释为什么会这样：

```javascript
// false
0.2 + 0.1 === 0.3
```

3. JavaScript 中有哪些不同的数据类型？
提示：JavaScript 中只有两种类型——主要数据类型和引用类型（对象），其中有六种主要数据类型。

4. 解决以下异步代码问题。
获取并计算属于某个班级（假设 ID 为 75）的每个学生的平均分数。每个学生在一年内可以参加一门或多门课程。以下 API 可用于获取所需的数据。

```javascript
// GET LIST OF ALL THE STUDENTS
GET /api/students
Response:
[{
    "id": 1,
    "name": "John",
    "classroomId": 75
}]
// GET COURSES FOR GIVEN A STUDENT
GET /api/courses?filter=studentId eq 1
Response:
[{
   "id": "history",
   "studentId": 1
}, {
   "id": "algebra",
   "studentId": 1
},]
// GET EVALUATION FOR EACH COURSE
GET /api/evaluation/history?filter=studentId eq 1
Response:
{
    "id": 200,
    "score": 50,
    "totalScore": 100
}
```

编写一个以班级 ID 作为参数的函数，你将使用这个函数计算该班级中每个学生的平均分数。这个函数的最终输出应该是带有平均分数的学生列表：

```javascript
[
  { "id": 1, "name": "John", "average": 70.5 },
  { "id": 3, "name": "Lois", "average": 67 },
]
```

使用普通回调、promises、observables、generator 或 async-wait 编写所需的函数。尝试使用至少 3 种不同的技术解决这个问题。

5. 使用 JavaScript 代理实现简单的数据绑定

提示：ES Proxy 允许你拦截对任何对象属性或方法的调用。首先，每当底层绑定对象发生变更时，都应更新 DOM。



节流函数
实现一个Event类，包含on/off/trigger方法。
同时打开多个 github 页面，其中一个页面登录了，其它页面都显示已登陆请手动刷新。怎么实现这种效果。

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

- 什么是闭包 (closure)，如何使用它，为什么要使用它？（作用域）
- let相对于var有何改进。（声明提升 (hoisting)；暂时性死区；重复声明；块级作用域）
- 箭头函数的区别；如果不用箭头函数如何绑定this（bind,apply,call）


## JavaScript 前端应用程序设计问题
- 单向数据流架构适合用在 MVC 的哪些方面？
  随着软件越来越复杂，有哪些工程方案？
  MVC 拥有大约 50 年的悠久历史，并已演变为 MVP、MVVM 和 MV*。两者之间的相互关系是什么？如果 MVC 是架构模式，那么单向数据流是什么？这些模式是否能解决同样的问题？
  - https://blog.csdn.net/uwenhao2008/article/details/79557969 （jquery vs react）
  - https://github.com/fouber/blog/issues/10（关于组件化历史发展）
- webpack 解决了什么问题？具体说明。
  开发是组件化、模块化，但部署又追求极致性能。
  - https://github.com/fouber/blog/issues/6 （部署优化历史）
  - https://fe.pessoa.cn/web/web-performance-optimizations.html（页面加载性能优化）
    - 请说出三种减少页面加载时间的方法。
    - 你会用什么工具来查找代码中的性能问题？
- HTTP2 将如何影响 JavaScript 应用程序打包？
- TypeScript
大型应用程序是否应该使用静态类型？
TypeScript 或 Flow 与 Elm、ReasonML 或 PureScript 之间有什么区别？它们的优点和缺点是什么？
选择特定类型系统的主要标准是什么？
什么是类型推断？
静态类型语言和强类型语言之间有什么区别？在这方面 JavaScript 的本质是什么？

- Fetch API 相对于传统的 Ajax 有哪些改进？
使用 Fetch API 是有任何缺点或痛点吗？
有哪些 Ajax 可以做但 fetch 做不到的事情吗？

- Vue && React
  - 子组件data为何用函数返回；
  - vue react 的差异
  - 虚拟dom主要解决了什么问题；vue-router怎么实现的
  - setState

  [Vue 性能优化：如何实现延迟加载和代码拆分？](https://www.infoq.cn/article/9ihyy7HW00ij8suTh*zN)



## 前端基础和理论相关问题
- https://www.infoq.cn/article/WIOR4Ua7MOGNL_CxlO20
- 请描述 cookies、sessionStorage 和 localStorage 的区别。
- 请解释 layout、painting 和 compositing 的区别。
- 请描述你曾经使用过的 CSS 预处理器的优缺点。
- 说说常用的伪元素 (pseudo-elements)。
- 请解释 * { box-sizing: border-box; } 的作用, 有什么好处吗？
- position属性的值，并有什么区别 （relative、fixed、absolute 和 static 元素）
- 垂直居中的几种方法。
- 层叠上下文 https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context




## http协议
- 常见的返回状态码（https://fe.pessoa.cn/web/http.html）
- 常见的http头：Cache-Control Expires
- 什么情况会发出option请求
  - 简单请求，预检请求（OPTIONS请求）https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
- 请尽可能完整得描述从输入 URL 到整个网页加载完毕及显示在屏幕上的整个流程。

## 算法
- 常见排序：快速排序
- 数组去重的几种方法，哪种更快。


##
- 描述介绍下最近项目
- 现在项目里用的 vue 版本是多少？
- 习惯用什么开发环境？（工具）
- 如何保证写出可维护性的代码?（工具）

- 你最近遇到过什么技术挑战？你是如何解决的？
- 最近有学习什么吗？（主动）

















- 维度：基础；主动性；
- 解决问题

- 知识点
js基础（闭包；bind，apply；）
css（移动端适配）
es6（箭头函数，this绑定；promise异步和setTimeout异步区别；class有哪些改进；proxy使用场景）


