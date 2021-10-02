---
title: 'Flexbox子元素间的间距gap'
date: '2021-08-25'
---


假设我需要设计一个导航栏，html代码如下：

```html

<header>
    <div>Logo</div>
    <nav>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Product</li>
            <li>Blog</li>
            <li>Contact</li>
        </ul>
    </nav>
</header>

```

如果需要均匀的分布这些菜单链接且与我们的页面右对齐，我通常会这样写CSS代码：

```css

ul {
    text-align: right;
}

li {
    display: inline-block;
    margin-right: 1rem;
}

li:last-child {
    margin-right: 0;
}

```

或者 
```css

ul {
    text-align: right;
}

li {
    display: inline-block;
    margin-left: 1rem;
}

li:first-child {
    margin-left: 0;
}
```


如果引入flexbox和gap，CSS代码可以简化如下：

```css

ul {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

```

但需要注意浏览器的兼容性，目前我知道的是qq浏览器还不支持gap这个属性。