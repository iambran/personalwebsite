---
title: '如何使用JavaScript生成随机id字符串'
date: '2022-04-06'
description: '如何使用JavaScript生成随机id字符串'
isPublished: ''
tags: ['JavaScript']
---

我这两天在考虑开发开源的web components组件，使用web compoents的小伙伴只需添加所需的`slot`元素即可。我的第一个组件的想法是设计一个看上去还可以的tabs组件，那么就需要用到随机的字符串来作为tab标题和内容的`id`。

```JavaScript

const id = () => {
  return Math.random() // 1. Math.random()
    .toString(36)      // 2. toString
    .substring(2, 10); // 3. substring
}

```

1. `Math.random()`会生成一个随机的介于0到1之间的小数。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

```JavaScript

console.log(Math.random()); // 0.6735264369083678
console.log(Math.random()); // 0.900367016973092
console.log(Math.random()); // 0.18772715055921663
console.log(Math.random()); // 0.7509508236810944

```

2. `toString(36)`将小数转为字符串。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)

```javaScript

console.log(Math.random().toString(36)); // 0.zapftfzrz8
console.log(Math.random().toString(36)); // 0.hzc5q1ttd3l
console.log(Math.random().toString(36)); // 0.uabhtdfncg
console.log(Math.random().toString(36)); // 0.g87lbuzjic7

```

3. `substring(2, 10)`取小数点后面的8个字符，如果只需要6位字符，可以改成`substring(2, 8)`。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring)

```javaScript

console.log(Math.random().toString(36).substring(2, 10)); // zapftfzr
console.log(Math.random().toString(36).substring(2, 10)); // hzc5q1tt
console.log(Math.random().toString(36).substring(2, 10)); // uabhtdfn
console.log(Math.random().toString(36).substring(2, 10)); // g87lbuzj

```
