---
title: 'CSS Grid auto-fill'
date: '2021-09-26'
---

# Use CSS Grid auto-fill to create a responsive layout

HTML
```html

<section>
    <div></div>
    <div></div>
    <div></div>
</section>

```

Let's say we are targeting screensize less than 1920px, if we want this `section` to have three `div`s align horizontally, and when the sreensize gets wider, these three `div`s will ajust their position automatically, we can use below CSS code to achieve that.

CSS
```css

section {
    display: grid;
    gap: 40px;
    padding: 20px;
    grid-template-columns: repeat(auto-fill, minmax(441px, 3fr));
}

@media (max-width: 400px) {
    section {
        grid-template-columns: 1fr;
    }
}

```

If I want to have three columns on 1920px screen, I need to calculate the width of each column when there are 4 columns horizontally:

1920px - (3x40px)[section padding] - (2x20px)[grid gap] = 1760px;
1760px / 4 = 440px;

In this case, it's 440px, then the minmax value I will set to `minmax(441px, 1fr)`, doing this will prevent the 3 columns changes to 2 columns inmediately after resizing the screen.




