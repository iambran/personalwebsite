---
title: '在repeat()里面的minmax()函数中使用min()函数 | CSS Grid'
date: '2022-01-02'
description: '在css grid的repeat中，可以在minmax()函数中再使用min()函数，可以省去一个媒体查询'
tags: ['css']
---

使用CSS Grid构建一个灵活的轨道数量，我们需要结合repeat()和minmax()两个函数。

```CSS

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

```

但如果只定义这个网格轨道规则，当屏幕宽度小于400px时，网格轨道将会溢出(overflow)，需要再增加一个媒体查询。

```css

@media (max-width: 400px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

```

我们可以在minmax()函数里使用一个min()函数，可以省去这个媒体查询。

```CSS

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
}

```

当屏幕宽度大于400px时，min(400px, 100%)值为400px（400px < 100%），和刚开始定义的网格轨道一样；当屏幕宽度小于400px时，min(400px, 100%)值为100%（400px > 100%），即`grid-template-columns: repeat(auto-fit, minmax(100%, 1fr))`，100%和1fr是一样的，所以就等同于`grid-template-columns: 1fr`。