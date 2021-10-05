---
title: 'October CMS产品详情页相关产品区块'
date: '2021-10-05'
---

在[October CMS](https://octobercms.com/)中，我使用官方Builder Plugin插件构建的一个自定义的Product模型，假设我的产品详情页`product.htm`由两大区块组成，页面前半部分是该产品详情信息，底部是该产品的相关产品（related products），下面是`product.htm`页面的php代码：
```php

<?php
use Squarestudio\Products\Models\Product;

    function onStart() {
        // 获取与当前链接slug对应的产品信息
        $this['product'] = Product::where('slug', '=', $this->param('slug'))->first();

        // 获取该产品的产品类别id，产品(Product) 属于(Belongsto) 产品类别(Category)
        $this['category_id'] = $this['product']->category->id;

        // 获取当前产品在同类别下的其他相关产品3个
        $this['related_products'] = Product::where('slug', '!=', $this->param('slug'))
            ->where('category_id', '=', $this['category_id'])->take(3)->get();
    }

```

然后在html中通过以下代码将product和related products展示在网页前端：
```html

{% if related_products %}
<section>
    <h2>相关产品</h2>
    <div>
    {% for related_product in related_products %}
        <div>
            <img 
                src="{{ path|media }}{{ related_product.product_image }}"
                alt="{{ related_product.name }}"
            >
            <div>{{ related_product.model }}</div>
            <a href="/products/{{ product.category.slug }}/{{ related_product.slug }}"></a>
        </div>
    {% endfor %}
    </div>
</section>

{% endif %}

```

我这个产品暂时没有相关产品，这个related products的section部分还是在前端会显示，因为没有相关产品，所以只显示一个标题“相关产品”，这个显然不是我要达到的效果，我需要在没有相关产品的情形下使这个`section`的html代码不在前端加载。

我在php代码中增加了`dd($this['related_products']);`，网页前端显示的是一个空白的laravel collection `#item: []`，所以这个空白collection的boolean值应该是true，我在php网站上面找了一个测试boolean值的方法：
`dd((bool) $this['related_products']);`，果然在网页前端显示的是true值。

那么在我之前的html代码里面，就要将`{% if related_products %}`改成`{% if related_products.count %}`，count得出来的结果是零，那肯定boolean值就是false，这样没有相关产品的`section`就不会在前端加载了。

或者，测试有无相关产品的步骤我也可以在php代码先验证，有三种函数可以使用。

```php

    // 方法1
    $this['has_related_products'] = $this['related_products']->count();

    // 方法2
    $this['has_related_products'] = !$this['related_products']->isEmpty();

    // 方法3
    $this['has_related_products'] = $this['related_products']->isNotEmpty();

```

然后在html代码中将`{% if related_products %}`改成`{% if has_related_products %}`：
```html

    {% if has_related_products %}
        <section>里面内容不变</section>
    {% endif %}

```