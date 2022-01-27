---
title: 'Web Components #3 - 重复使用Custom Elements'
date: '2022-01-24'
description: 'Web Components #3 - 重复使用Custom Elements，这篇博客我需要自定义标签里面的html内容变成动态的，从自定义标签上面的属性获取数据，这样使用自定义标签的开发者可以根据不同的客户提供不同的客户评价内容。'
isPublished: ''
tags: ['JavaScript', 'Web Components']
---

现在我们需要将shadow DOM里面的html元素内容变成动态的数据，也就是将里面的数据从目前的静态数据转成从自定义标签上面获取动态数据。

这是到目前为止web components的代码。

```javascript

class CustomerTestimonial extends HTMLElement {
  constructor() {
    // 必须首先调用super方法
    super();
    let self = this;

    // 附加一个shadow root
    self.attachShadow({ mode: 'open' });

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

    self.shadowRoot.appendChild(self.styles);
    // console.log(self.styles.isConnected);
    self.shadowRoot.appendChild(self.template.content);
  }
}

// 注册一个自定义标签
customElements.define('customer-testimonial', CustomerTestimonial);

```

再回顾下我们的这个客户评价卡片的UI。

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

显然，我们需要将这些内容变成动态的，根据需要传入不同的内容。

* 客户评价内容
* 客户头像
* 客户姓名
* 客户职位

想象这样的一个html结构。

```html

<customer-testimonial
  data-testimonial="Brandon's CSS Grid tutorial is awesome. It covers so many details. Love that you use diagram from Figma to explain those details."
  data-avatar="./avatar.jpg"
  data-name="Sienna Lee"
  data-position="Web Administrator"
>

</customer-testimonial>

```


`connectedCallback()`这个生命周期函数在`<customer-testimonial>`被插入到html文档中时会被触发，现在我们可以将`template`和`style`转移到这个函数中。

```javascript

class CustomerTestimonial extends HTMLElement {
  constructor() {
    // 必须首先调用super方法
    super();
    let self = this;

    // 附加一个shadow root
    self.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
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
    
    self.styles = document.createElement('style');
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

    self.shadowRoot.appendChild(self.styles);
    // console.log(self.styles.isConnected);
    self.shadowRoot.appendChild(self.template.content);
  }
}

// 注册一个自定义标签
customElements.define('customer-testimonial', CustomerTestimonial);

```

那么在`connectedCallback()`函数里我们可以使用JavaScript获取自定义标签上面的data属性数据，然后在我们的template当中接收他们。

```html

<customer-testimonial
  data-testimonial="Brandon's CSS Grid tutorial is awesome. It covers so many details. Love that you use diagram from Figma to explain those details."
  data-avatar="./avatar.jpg"
  data-name="Sienna Lee"
  data-position="Web Administrator"
>

</customer-testimonial>

```

```javascript

class CustomerTestimonial extends HTMLElement {
  constructor() {
    // 已有代码
  }

  connectedCallback() {
    let self = this;

    let testimonial = self.dataset.testimonial;
    let avatar = self.dataset.avatar;
    let name = self.dataset.name;
    let position = self.dataset.position;

    self.template = document.createElement('template');
    self.template.innerHTML = `
       <div class="testimonial">
        <div class="testimonial__content">
          ${testimonial}
        </div>
        <div class="testimonial__footer">
          <img alt="avatar" src="${avatar}" class="testimonial__avatar" width="50" height="50">
          <div>
            <div class="testimonial__name">
              ${name}
            </div>
            <div class="testimonial__role">
              ${position}
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 已有styles代码

    self.shadowRoot.appendChild(self.styles);
    // console.log(self.styles.isConnected);
    self.shadowRoot.appendChild(self.template.content);
  }
}

// 注册一个自定义标签
customElements.define('customer-testimonial', CustomerTestimonial);

```

如果不出错误，那么前端渲染出来的效果是和之前一样的，也可以用开发者工具检查一下。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1643268460/brandonzhang.cn/Screenshot_2022-01-27_at_3.27.17_PM_r0xw70.png" alt="web components重复使用custom elements">

那么现在就可以重复使用这个自定义标签，在data属性上面提供不同的数据即可。
