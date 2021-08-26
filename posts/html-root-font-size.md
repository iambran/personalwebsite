---
title: 'HTML Root Font Size'
date: '2021-08-25'
---

# HTML Root font size
After spending last few days reading [Sara Soueidan](https://www.sarasoueidan.com/)'s blog, I decide to open the developer tool and check out Sara's codes under the hood. I'm sure that I will learn a lot just by looking at them.

She sets a `font-size: calc(15px + 0.25vw)` on `html` element and sets `body` font size as `1rem`, then I check the computed output, the font size on body is `18.6px` on 1440px width screen.

`rem` values are relative to the root `html` element.

```css
html {
    font-size: calc(15px + 0.25vw);
    /* 100vw = 1440px (screen width, mine is 1440px wide)
       1vw = 1440px / 100
       0.25vw = 1440px * 0.25 / 100
    */
}

body {
    font-size: 1rem; 
    /* 1rem equals to calc(15px + 0.25vw) */
}

h1 {
    font-size: calc(1.5rem + 3vw);
    line-height: 1.3;
}
```
