---
title: 'JavaScript Event Delegation事件委托'
date: '2022-03-03'
description: 'JavaScript Event Delegation事件委托'
tags: ['javascript']
published: true
---

`event`在冒泡阶段会从目标元素传递至祖先元素，如果我们需要为很多相似的元素添加事件处理程序，可以将该事件处理程序添加在这些元素的祖先元素上，这样就可以省去为每个元素都分配一个处理程序。

## 菜单按钮

```html

<ul class="nav-list">
  <li class="nav-item active">
    <a>Architetural Patterns</a>
  </li>
  <li class="nav-item">
    <a>Design & User Experience</a>
  </li>
  <li class="nav-item">
    <a>Media & VR</a>
  </li>
  <li class="nav-item">
    <a>Performance</a>
  </li>
  <li class="nav-item">
    <a>Security</a>
  </li>
  <li class="nav-item">
    <a>Base Techinologies</a>
  </li>
</ul>

```

<style>
  .nav-item {
    list-style: none;
    padding: 0;
  }
  .nav-item a {
    text-decoration: none;
    cursor: pointer;
    display: block;
  }
  .nav-item a.active {
    color: orange;
  }
</style>
<!-- 
<script>
  document.querySelectorAll('.nav-item a')
  .forEach(item => item.addEventListener('click', (e) => {
    e.target.closest('.nav-list')
      .querySelector('.nav-item a.active').classList.remove('active');
    e.target.classList.add('active');
  }));
</script> -->

```javascript

document.querySelectorAll('.nav-item a')
.forEach(item => item.addEventListener('click', (e) => {
  e.target.closest('.nav-list')
    .querySelector('.nav-item a.active').classList.remove('active');
  e.target.classList.add('active');
}));

```

现在点击下面这些按钮会增加一个`active`类，颜色变橙色。

<ul class="nav-list0">
  <li class="nav-item">
    <a class="active">Architetural Patterns</a>
  </li>
  <li class="nav-item">
    <a>Design & User Experience</a>
  </li>
  <li class="nav-item">
    <a>Media & VR</a>
  </li>
  <li class="nav-item">
    <a>Performance</a>
  </li>
  <li class="nav-item">
    <a>Security</a>
  </li>
  <li class="nav-item">
    <a>Base Techinologies</a>
  </li>
</ul>

与其使用forEach方法给每个按钮添加一个点击事件的处理函数，我们可以在`<ul class="nav-list">`上面增加一个处理函数。

```javascript

let activeItem = document.querySelector('.nav-list a.active');

document.querySelector('.nav-list').addEventListener('click', (e) => {
  let target = e.target;
  highLight(target);
});

function highLight(item) {
  if (activeItem) { // 如果已有item拥有active类，移除该类
    activeItem.classList.remove('active');
  }
  activeItem = item;
  activeItem.classList.add('active');
}

```


如果按钮元素`a`里面还有其他元素，比如`strong`或者图标，类似下面这样的结构，那么实际被点击的元素有可能不是`a`，如果鼠标点击`strong`元素，则不会给该按钮增加一个`active`类，而是将`active`增加到了`strong`上面，因为此时`e.target`是`strong`元素。

<ul class="nav-list">
  <li class="nav-item">
    <a class="active">Architetural <strong>Patterns</strong></a>
  </li>
  <li class="nav-item">
    <a>Design & User <strong>Experience</strong></a>
  </li>
  <li class="nav-item">
    <a>Media & <strong>VR</strong></a>
  </li>
  <li class="nav-item">
    <a>Performance</a>
  </li>
  <li class="nav-item">
    <a>Security</a>
  </li>
  <li class="nav-item">
    <a>Base <strong>Techinologies</strong></a>
  </li>
</ul>

那么我们需要优化下我们之前的代码。

```javascript

let activeItem = document.querySelector('.nav-list a.active');

document.querySelector('.nav-list').addEventListener('click', (e) => {
  let target = e.target.closest('a'); // 找到目标元素最近的a元素，包含a元素自身
  highLight(target);
});

function highLight(item) {
  if (activeItem) { // 如果已有item拥有active类，移除该类
    activeItem.classList.remove('active');
  }
  activeItem = item;
  activeItem.classList.add('active');
}

```

现在再点击`strong`元素则是将`active`类增加到`a`元素上面了。

<ul class="nav-list2">
  <li class="nav-item">
    <a class="active">Architetural <strong>Patterns</strong></a>
  </li>
  <li class="nav-item">
    <a>Design & User <strong>Experience</strong></a>
  </li>
  <li class="nav-item">
    <a>Media & <strong>VR</strong></a>
  </li>
  <li class="nav-item">
    <a>Performance</a>
  </li>
  <li class="nav-item">
    <a>Security</a>
  </li>
  <li class="nav-item">
    <a>Base <strong>Techinologies</strong></a>
  </li>
</ul>



<script>
let activeItem0 = document.querySelector('.nav-list0 a.active');

document.querySelector('.nav-list0').addEventListener('click', (e) => {
  let target = e.target; // 实际被点击的元素
  highLight0(target);
});

function highLight0(item) {
  if (activeItem0) { // 如果已有item拥有active类，移除该类
    activeItem0.classList.remove('active');
  }
  activeItem0 = item;
  activeItem0.classList.add('active');
}

let activeItem = document.querySelector('.nav-list a.active');

document.querySelector('.nav-list').addEventListener('click', (e) => {
  let target = e.target; // 实际被点击的元素
  highLight(target);
});

function highLight(item) {
  if (activeItem) { // 如果已有item拥有active类，移除该类
    activeItem.classList.remove('active');
  }
  activeItem = item;
  activeItem.classList.add('active');
}


let activeItem2 = document.querySelector('.nav-list2 a.active');

document.querySelector('.nav-list2').addEventListener('click', (e) => {
  let target = e.target.closest('a');
  highLight1(target);
});

function highLight1(item) {
  if (activeItem2) { // 如果已有item拥有active类，移除该类
    activeItem2.classList.remove('active');
  }
  activeItem2 = item;
  activeItem2.classList.add('active');
}
</script>