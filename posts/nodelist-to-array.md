---
title: 'JavaScript querySelectorAll返回的NodeList对象转为数组(Array)'
date: '2021-10-11'
keywords: 'querySelectorAll, javascript NodeList节点, javascript Array数组'
description: 'JavaScript querySelectorAll返回的节点集合(NodeList)转为数组(Array)，然后通过foreach()方法对数组的每个元素执行一次给定的函数'
isPublished: 'false'
---

```html

<div class="container">
    <div class="item">item</div>
    <div class="item">item</div>
    <div class="item">item</div>
</div>

```

<div class="container">
    <div class="item">item</div>
    <div class="item">item</div>
    <div class="item">item</div>
</div>

<style>
    .container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #f1f1f1;
        margin-block: 2rem;
        padding: 4rem;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .item {
        width: 20%;
        min-height: 50px;
        background-color: orange;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
    }
</style>

```javascript

const items = document.querySelectorAll('.item');

// querySelectorAll返回的是一个NodeList对象
console.log(items);

// [...items]可将该NodeList对象转为数组Array
console.log([...items]);

// 不过，NodeList和Array都可以通过forEach()方法对里面的元素执行特定的函数
// 下面两个都可以可行的
items.forEach(item => {
    item.addEventListener('click', () => {
        item.style.backgroundColor = 'coral';
    });
});

[...items].forEach(item => {
    item.addEventListener('click', () => {
        item.style.backgroundColor = 'coral';
    });
});

```

<script>

    const items = document.querySelectorAll('.item');

    console.log(items);
    console.log([...items]);

    items.forEach(item => {
        item.addEventListener('click', () => {
            item.style.backgroundColor = 'coral';
        })
    })
</script>
