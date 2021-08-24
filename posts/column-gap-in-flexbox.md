---
title: 'Column Gap in Flexbox'
date: '2021-08-25'
---

# Use case #1 - Button with an icon on the left or right side.

HTML
```html
<button>
    <i class="fas fa-arrow-left"></i>
    <span>Go back</span>
</button>
```

CSS
```css
button {
    display: flex;
    align-items: center;
    gap: 1rem;
}
```

# Use case #2 - Replace margin to set gap between flex item.

HTML
```
<main>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</main>
```

CSS (old ways)
```
main {
    display: flex;
    flex-wrap: wrap;
}

main > div {
    --columns-per-row: 4;
    --gaps-per-row: calc(var(--columns-per-row) - 1);
    --column-gap: 10px;
    --total-gaps-width: calc(var(--gaps-per-row) * var(--column-gap));
    width: calc(100%  * var(--total-gaps-width) / var(--columns-per-row));
    margin-bottom: var(--column-gap);
}

main > div:first-child {
    margin-right: 0;
}

/* c = var(--columns-per-row) 
   does this work?
*/
main > div:not(:nth-child(cn+1)) {
    margin-left: var(--column-gap);
}
```

CSS with gap
```
main {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
```