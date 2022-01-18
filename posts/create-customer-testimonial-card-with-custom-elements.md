---
title: 'HTML & CSS设计客户评价卡片并尝试使用Custom Elements做成一个独立的组件'
date: '2022-01-18'
description: 'HTML & CSS设计客户评价卡片并尝试使用Custom Elements做成一个独立的组件'
isPublished: ''
tags: ['CSS', 'JavaScript']
---

我今天这篇博客想通过HTML和CSS设计一个客户评价(Customer Testimonial)卡片，并尝试使用Web Components封装成一个独立的Custom Element(自定义标签)，比如`<customer-testimonial></customer-testimonial>`。

## UI部分

### HTML

我这里没有添加无障碍性(Accessibility)属性，因为我这方面的知识很欠缺。

```html

<div class="testimonial">
  <div class="testimonial__content">
    "“Brandon's CSS Grid tutorial is awesome. It covers so many details. Love that you use diagram from Figma to explain those details.”"
  </div>
  <div class="testimonial__footer">
    <img alt="avatar" src="./avartar.jpg" class="testimonial__avatar">
    <div>
      <div class="testimonial__name">
        Sienna Lee
      </div>
      <div class="testimonial__role">
        Web Administrator
      </div>
    </div>
  </div>
</div>

```

### CSS

我这里使用BEM命名规范，可以让我在脑海中有一个名称地图，在构建布局时不需要再去看HTML的结构，强烈推荐。

```CSS

.testimonial {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  cursor: pointer;
  padding: 4vmin 8vmin;
  border-radius: 20px;
  box-shadow: 0 2px 40px rgba(0 0 0 / 15%);
}

.testimonial__content {
  font-size: 25px;
  margin-bottom: 45px;
}

.testimonial__footer {
  display: flex;
  align-items: center;
}

.testimonial__avatar {
  display: block;
  max-width: 50px;
  max-height: 50px;
  margin-right: 15px;
  border-radius: 999px;
}

.testimonial__name {
  font-size: 14px;
  font-weight: bold;
}

.testimonial__role {
  font-size: 14px;
}

```

### 卡片效果
<div class="testimonial-wrap">
<div class="testimonial">
  <div class="testimonial__content">
    "Brandon's CSS Grid tutorial is awesome. It covers so many details. Love that you use diagram from Figma to explain those details."
  </div>
  <div class="testimonial__footer">
    <img alt="avatar" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.sKod7sWUm96BbYoiIzsLDgD6D6?pid=ImgDet&rs=1" class="testimonial__avatar" width="50" height="50">
    <div>
      <div class="testimonial__name">
        Sienna Lee
      </div>
      <div class="testimonial__role">
        Web Administrator
      </div>
    </div>
  </div>
</div>
</div>

<style>
  .testimonial-wrap {
    display: grid;
    place-content: center;
    margin-bottom: 8vmin;
  }

  /* Goes to Code Block */
  .testimonial {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    cursor: pointer;
    padding: 4vmin 8vmin;
    border-radius: calc(4 * var(--border-radius));
    box-shadow: 0 2px 40px rgba(0 0 0 / 15%);
  }

  .testimonial__content {
    font-size: 25px;
    margin-bottom: 45px;
  }

  .testimonial__footer {
    display: flex;
    align-items: center;
  }

  .testimonial__avatar {
    display: block;
    max-width: 50px;
    max-height: 50px;
    margin-right: 15px;
    border-radius: 999px;
  }

  .testimonial__name {
    font-size: 14px;
    font-weight: bold;
    
  }

  .testimonial__role {
    font-size: 14px;
  }
</style>

## 创建 Web Components

### 注册 Custom Elements

```javascript

class CustomerTestimonial extends HTMLElement {
  constructor() {
    // 必须首先调用super方法
    super();
    let self = this;
    self.template = template;
  }

  connectedCallback() {
    let self = this;
  }
}

// 注册一个自定义标签
customElements.define('customer-testimonial', CustomerTestimonial);

```