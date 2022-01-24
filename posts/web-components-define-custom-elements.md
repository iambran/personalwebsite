---
title: 'Web Components #1 - 注册自定义标签'
date: '2022-01-18'
description: 'Web Components #1 - 注册自定义标签，设计一个简答的客户评价卡片，并使用web components构建一个自定义标签(custom elements)'
isPublished: ''
tags: ['CSS', 'JavaScript', 'Web Components']
---

我想尝试一个关于Web Components的系列博客，对我自己所掌握的Web Components知识做一个总结和提炼，如果有幸能帮助到其他朋友学习Web Components，那就更好了。

系列中的第一篇博客，也就是今天这篇，我想通过HTML和CSS设计一个客户评价(Customer Testimonial)卡片，并使用Web Components封装成一个Custom Element(自定义标签)，比如`<customer-testimonial></customer-testimonial>`，然后添加到我们的HTML文档中。

## UI部分

### HTML

首先暂时不考虑Web Components，我需要用HTML和CSS先设计一个简单的客户评价卡片。我这里HTML元素没有考虑无障碍性(Accessibility)属性，因为我这方面的知识很欠缺。

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

CSS中我使用BEM命名规范，这样我在脑海中有一个清晰的class地图，在构建布局时不需要再去看HTML的结构，可以很大的提高我们的效果，而且不容易出错，再有选择器的优先级(CSS Specificity)很低，很多团队和网站都是使用BEM这个命名规范，强烈推荐。

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

    self.template = document.createElement('template');
    self.template.innerHTML = `
       <div class="testimonial">
        <div class="testimonial__content">
          "Brandon's CSS Grid tutorial is awesome. It covers so many details. Love that you use diagram from Figma to explain those details."
        </div>
        <div class="testimonial__footer">
          <img alt="avatar" src="./avartar.jpg" class="testimonial__avatar" width="50" height="50">
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
    `;
    
    // 不可以使用self.style，因为console.log(self.style) 会返回CSSStyleDeclaration,
    // 它不是node，不能被附加到其他节点中
    self.styles = document.createElement('style');
    // self.styles.textContent 也可以
    self.styles.innerHTML = `
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
    `;

    self.appendChild(self.styles);
    self.appendChild(self.template.content);
  }
}

// 注册一个自定义标签
customElements.define('customer-testimonial', CustomerTestimonial);

```

然后在.html文档中我们需要放置客户评价卡片的地方添加这个自定义标签即可，这就是最简单的一个Web Components.

```html

<customer-testimonial></customer-testimonial>

```

当我们把这个自定义标签添加到html文档后，打开开发者工具检查下可以发现这个Custom Elements已经被我们成功添加到页面中。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1643009916/brandonzhang.cn/Screenshot_2022-01-24_at_3.38.10_PM_q3qoxy.png" alt="web components 自定义标签 custom elements被添加到html页面中了">

但是现在这个自定义标签，如果我们增加一个global样式来改变卡片的背景颜色，这个样式会透过自定义标签，影响到里面的卡片元素。

```css

.testimonial {
  background-color: orange;
} 

```

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1643009914/brandonzhang.cn/Web-Components%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B-1-without-shadowRoot_kglwvo.jpg" alt="全局css样式影响到了自定义标签里面的元素">

那么，即然我们使用web components技术创建一个独立的custom elements，那么我们就是想它的样式只能由自定义标签内部的样式表来决定的，外面的css样式不能渗透进来，那么在下节会提到的shadow DOM可以帮助我们解决这个问题。