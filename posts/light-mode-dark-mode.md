---
title: 'HTML CSS JavaScript实现明暗模式切换'
date: '2022-01-08'
description: '如何使用html css javascript实现网站明暗模式切换，会使用到css自定义属性'
tags: ['css', 'javascript']
---

## 第1步：HTML

添加一个切换按钮的html组件，一般是放在网站`header`上面。我这里使用到BEM的命名方式。

```html

<div class="mode-switch">
  <!-- 明亮模式emoji -->
  <span>🌞</span>
  <div class="mode-switch__toggle">
    <div class="mode-switch__circle">
      </div>
    </div>
  <!-- 暗黑模式emoji -->
  <span>🌑</span>
</div>

```

## 第2步：CSS

```css

.mode-switch {
  display: flex;
  align-items: center;
  /* 假设你在header上面使用的是flex，
     margin-left: auto可以将切换按钮置于header最右侧 */
  margin-left: auto; 
  gap: 5px;
}

.mode-switch__toggle {
  background-color: purple;
  height: 100%;
  width: 70px;
  padding: 5px;
  border-radius: 100px;
  cursor: pointer;
}

.mode-switch__circle {
  width: 25px;
  height: 25px;
  border-radius: 100px;
  background-color: #fff;
  transition: transform 0.3s ease;
  /* pointer-events: none这里是让圆圈不接收鼠标点击事件，
     上面的toggle接收就可以了 */
  pointer-events: none;
}

/* 可以暂时使用hover来测试circle这个圆圈的transition效果 */
.mode-switch__toggle:hover .mode-switch__circle {
  /* 70px - 10px(左右padding) - 25px = 35px */
  transform: translateX(35px);
}

```

下面是上面代码HTML和CSS代码呈现的效果。目前圆圈向右滑动还只是通过鼠标悬停来实现的，接下来我们需要添加JavaScript，当鼠标点击切换按钮时，圆圈向右移动35px。

<div class="switch-wrap">
<div class="mode-switch1">
  <!-- 明亮模式太阳表情 -->
  <span>🌞</span>
  <div class="mode-switch__toggle1">
    <div class="mode-switch__circle1">
      </div>
    </div>
  <!-- 暗黑模式月亮表情 -->
  <span>🌑</span>
</div>
</div>

<style>
.switch-wrap {
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--dark-theme-border-color, #e2e2e2);
}

.mode-switch1 {
  display: flex;
  align-items: center;
  margin: auto; /*假设你在header上面使用的是flex，margin-left auto可以将切换按钮置于header最右侧 */
  gap: 5px;
}

.mode-switch__toggle1 {
  background-color: purple;
  height: 100%;
  width: 70px;
  padding: 5px;
  border-radius: 100px;
  cursor: pointer;
}

.mode-switch__circle1 {
  width: 25px;
  height: 25px;
  border-radius: 100px;
  background-color: #fff;
  transition: transform 0.3s ease;
  pointer-events: none;
}

/* 可以暂时使用hover来测试circle这个圆圈的transition效果 */
.mode-switch__toggle1:hover .mode-switch__circle1 {
  transform: translateX(35px);
}
</style>

## 第3步：JavaScript

```javascript

window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.mode-switch__toggle').addEventListener('click', function() {
    
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }

  });
});

```

当点击toggle按钮的时候，如果body上面有`dark-mode`类，则在body上面移除"dark-mode"类，反之则在body上面增加一个`dark-mode`类。

## 第4步：添加自定义属性

当body上面有`dark-mode`类的时候，往body上面增加一些自定义属性。然后将这些自定义属性通过`var()`函数添加到相应的元素当中，具体需要增加多少自定义属性需要根据网站具体的结构而定。

```css

body.dark-mode {
  --dark-mode-header-bg: #1a1f25;
  --dark-mode-header-border: #1f2332;
  --dark-mode-text-color: #9e9e9e;
  --dark-mode-body-bg: #111418;
  --dark-mode-toggle-translate: 35px;
}

body {
  background-color: var(--dark-mode-body-bg, #F8F9FA);
  color: var(--dark-mode-text-color, #333);
  // 别忘了增加transition
}

header {
  background-color: var(--dark-mode-header-bg, #fff);
  border-bottom: 1px solid var(--dark-mode-header-border, #d2d3d7);
  // 别忘了增加transition
}

```

同时取消hover的这个CSS代码片段，因为现在是通过点击移动圆圈，不是hover了。再往`.mode-switch__circle`增加一行代码。

```CSS

/* 可以暂时使用hover来测试circle这个圆圈的transition效果 */
/* .mode-switch__toggle1:hover .mode-switch__circle1 {
  transform: translateX(35px);
}
*/

.mode-switch__circle {
  // 已有代码

  /* 当--dark-mode-toggle-translate存在的时候，
     也就是暗黑模式下，圆圈向右滑动35px，
     如果切换回明亮模式，
     --dark-mode-toggle-translate属性不存在，
     则向左滑动返回初始位置 */
  transform: translateX(var(--dark-mode-toggle-translate, 0));
}

```

最终效果可以访问：[https://light-dark-mode-switch.glitch.me/](https://light-dark-mode-switch.glitch.me/)