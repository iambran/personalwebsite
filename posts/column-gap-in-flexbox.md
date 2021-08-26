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

# Use case #2 - nav menu

Say we need to design a header, logo on the left and nav menu on the right, we will set up a markup like this:

html
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

And, with css

```css
header {
    display: flex;
    align-item: center;
    justify-content: space-between;
}

ul {
    display: flex;
    justify-content: flex-end;
    text-align: right;
}

li {
    margin-right: 15px;
}

li:last-of-type {
    margin-right: 0;
}
```

If we bring in gap
```css
header {
    display: flex;
    align-item: center;
    justify-content: space-between;
}

ul {
    display: flex;
    justify-content: flex-end;
    text-align: right;
    gap: 15px;
}

/* these two codes will not be needed
li {
    margin-right: 15px;
}

li:last-of-type {
    margin-right: 0;
}
*/
```