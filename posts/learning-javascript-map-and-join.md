---
title: '学习使用map()和join()方法渲染HTML元素'
date: '2022-01-18'
description: '学习使用map()和join()方法渲染HTML元素，并应用在Custom Elements中'
isPublished: ''
tags: ['javascript']
---

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWERwpB" data-user="brandonzhang" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/brandonzhang/pen/MWERwpB">
  Learning Map() and Join()</a> by Brandon (<a href="https://codepen.io/brandonzhang">@brandonzhang</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```html

<main id="app">
</main>

```

```javascript

const $app = document.getElementById('app');

const buttons = [
  {
    text: 'Button One',
    color: 'LightGreen',
  },
  {
    text: 'Button Two',
    color: 'LightSeaGreen',
  },
  {
    text: 'Button Three',
    color: 'MediumSeaGreen',
  }
];

function renderButton(button) {
  return `
    <button class="button" type="button" style="background-color: ${button.color}">
    </button>
  `;
}

function renderPage() {
  $app.innerHTML = `
    <div class="buttons">
      ${buttons.map(renderButton)}
    </div>
  `;
}

renderPage();

```

`console.log(buttons.map(renderButton))`返回：

```javascript

// [object Array] (3)
["
  <button class='button' type='button' style='background-color: LightGreen'>
  </button>
","
  <button class='button' type='button' style='background-color: LightSeaGreen'>
  </button>
","
  <button class='button' type='button' style='background-color: MediumSeaGreen'>
  </button>
"]

```

前端渲染结果：

```html

<main id="app">
  <div class="buttons">
    <button class="button" type="button" style="background-color: LightGreen">
    </button>
    ,
    <button class="button" type="button" style="background-color: LightSeaGreen">
    </button>
    ,
    <button class="button" type="button" style="background-color: MediumSeaGreen">
    </button>
  </div>
</main>

```

需要使用`Array.prototype.join()`来去除这里的“，”号，在`renderPage()`里面添加[`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)方法。

```javascript

function renderPage() {
  $app.innerHTML = `
    <div class="buttons">
      ${buttons.map(renderButton).join('')}
    </div>
  `;
}

```

前端渲染结果：

```html

<main id="app">
  <div class="buttons">
    <button class="button" type="button" style="background-color: LightGreen">
    </button>
    <button class="button" type="button" style="background-color: LightSeaGreen">
    </button>
    <button class="button" type="button" style="background-color: MediumSeaGreen">
    </button>
  </div>
</main>

```


