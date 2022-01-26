---
title: 'Web Components #2 - 使用shadow DOM'
date: '2022-01-24'
description: 'Web Components #2 - 使用shadow DOM。web components的一个重要属性是可以将自定义元素封装起来，与页面上的其他代码隔离开来，那么不同的开发者或团队可以仅考虑开发各自的组件，不用去考虑代码是否会影响到其他成员的组件，最后只需要提供一个公开的api接口供其他团队使用即可。'
isPublished: ''
tags: ['JavaScript', 'Web Components']
---

继[Web Components #1 - 注册自定义标签](/posts/web-components-define-custom-elements)之后，这篇博客我将开始介绍shadow DOM。web components的一个重要属性是可以将自定义元素封装起来，与页面上的其他代码隔离开来，那么不同的开发者或团队可以仅考虑开发各自的组件，不用去考虑代码是否会影响到其他成员的组件，最后提供一个公开的api供其他团队使用，来构建一个完整的应用。要达到这个代码相互独立的目的，我们需要引入shadow DOM这个概念。

首先我们可以在constructor()函数里面使用[attachShadow()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow)函数来给我们这个自定义标签里面附加一个shadow root，同时需要传入一个对象`{ mode: 'open' }`。

```javascript

class CustomerTestimonial extends HTMLElement {
  constructor() {
    // 必须首先调用super方法
    super();
    let self = this;
    // 其他代码

    // 附加一个shadow root
    self.attachShadow({ mode: 'open' });
  }
}

// 注册一个自定义标签
customElements.define('customer-testimonial', CustomerTestimonial);

```

那么现在打开开发者工具，检查下我们的这个`<customer-testimonial></customer-testimonial>`自定义元素，里面多了一个shadow root。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1643040047/brandonzhang.cn/Screenshot_2022-01-24_at_11.38.53_PM_qpahqx.png" alt="shadow被我们添加到自定义标签里面 - codepen截图">

那么接下来再把我之前提到的template和style添加到这个shadow root里面。

```javascript

class CustomerTestimonial extends HTMLElement {
  constructor() {
    // 必须首先调用super方法
    super();
    let self = this;
    // 其他代码

    // 附加一个shadow root
    self.attachShadow({ mode: 'open' });

    // self.appendChild(self.styles); 改成
    self.shadowRoot.appendChild(self.styles);

    // self.appendChild(self.template.content); 改成
    self.shadowRoot.appendChild(self.template.content);
  }
}

// 注册一个自定义标签
customElements.define('customer-testimonial', CustomerTestimonial);

```

现在，再打开开发者工具，可以看到我们的`<style>`和卡片的html已经附加到了这个shadow root上面。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1643040049/brandonzhang.cn/Screenshot_2022-01-24_at_11.52.19_PM_nzrpiy.png" alt="template和style添加到shadow root里面 - codepen截图">

或者也可以使用[`isConnected`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isConnected)属性测试下`<style>`是否有被成功附加到shadow root里面。

```javascript

// 会返回true
console.log(self.styles.isConnected);

```

和上一篇[Web Components #1 - 注册自定义标签](/posts/web-components-define-custom-elements)里面一样，我们可以添加一个全局的css代码，看看是否会渗透到我们这个shadow root里面。

```css

.testimonial {
  background-color: orange;
} 

```

结果是，被我们封装在shadow root里面的卡片样式不会受到全局css代码的影响，yay!

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1643040048/brandonzhang.cn/Web-Components-2_l1ur1k.jpg" alt="全部css不会渗透到shadow dom - codepen截图">