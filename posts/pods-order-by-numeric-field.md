---
title: 'Pods框架中通过Numeric Field排序'
date: '2021-10-09'
description: 'Pods框架中通过Numeric Field排序'
---

我是用[Pods插件](https://cn.wordpress.org/plugins/pods/)增加了一个自定义内容类型，单数标签：Product，复述标签：Products。然后添加一个字段，`标签：价格`，`名称：price`【pods简码或者php代码中会使用这个名称，另一个命名参数：product_price】，字段类型选择`Plain Number`。

因为我只是为了测试通过这个数值进行排序，所以没有添加更多的字段。

接着，我在刚刚创建的自定义内容类型“Products”里面添加了6个产品，价格分别是：1，2，7，10，17，24。

要用pods的简码（shortcode）来展示这个自定义内容类型并且使用价格字段来排序，我还需要去Pods > Pods Template里面增加一个模版，我增加的模版名称是“Product List”，模版内容是：
```html

<div>
	<h1>{@post_title}</h1>
	<p>{@price}</p>
<div>

```
然后在gutenberg编辑器里添加一个简码区块：

```html

[pods name="product" orderby="price" template="Product List"]

```

>name="product"：自定义内容类型的单数标签；orderby="price"：让它通过价格排序；template="Product List"：使用这个模版在前端展示。

如果使用orderby="price"，在前端的排序是：1，10，17，2，24，7。显然这个排序是不对的，这个排序结果是因为wordpress是将price这个字段的数值以string的方式储存mysql到数据库里面。

那么就需要将string转换成十进制数（decimal），Pods已经有自带了这个一个函数，[官方文档](https://docs.pods.io/code-snippets/order-by-numeric-field-in-shortcode/)。

```php

add_filter( 'pods_shortcode_findrecords_params', 'slug_orderby_by_number_pods_shortcode', 10, 2 );

function slug_orderby_by_number_pods_shortcode( $params, $pod ) {
    if ( isset( $params[ 'orderby' ] ) && strpos($params[ 'orderby' ], '.meta_value_num') ) {
        $params[ 'orderby' ] = 'CAST(' . str_replace('.meta_value_num', '.meta_value', $params[ 'orderby' ]) . ' AS DECIMAL)';
    }

    return $params;
}

```

那么我的简码修改成这个，前端就可以按价格从小到大正常的排序了。
```html

[pods name="product" orderby="price.meta_value_num" template="Product List"]

```

有时我们可能需要在某些页面展示几个主打产品（featured product），我们就可以返回Pods > Product中添加一个新的字段，`标签：是否主打产品？`，`名称：is_featured_product`，`字段类型：Yes / No`。

此时再添加新产品或者修改现有产品时，会在价格底部出现一个刚刚添加的字段“是否主打产品”，勾选后会储存is_featured_product值为1到数据库中。

现在，如果要只展示主打产品，可以在我们之前的shortcode中增加一个where的过滤函数：
```html

[pods name="product" where="is_featured_product.meta_value='1'" orderby="price.meta_value_num" template="Product List"]

```

我想到mysql数据库中看下到底这个is_featured_product是储存在那个表格里面，我用的是[local](https://localwp.com/)本地部署的wordpress网站，打开local，选择网站，在DATABASE标签中点击OPEN ADMINDER即可进入该wordpress网站的数据库。点击`wp_postmeta`这个数据表格，再点击select data，这个表格的数据很多，我刚刚添加的is_featured_product应该会是在最后一页，我在最后一页的最后一行看到了这个is_featured_product的数据。
<table>
    <thead>
        <tr>
            <th>post_id</th>
            <th>meta_key</th>
            <th>meta_value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>7</td>
            <td>is_featured_product</td>
            <td>1</td>
        </tr>
    </tbody>

</table>

>所以在shortcode里面一定要增加这个meta_value，否则where这个过滤函数无法生效。

其中post_id就是这个is_featured_product相对应的product的post_id，在`wp_posts`数据表格中可以找到。
<style>
    table {
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #ccc;
        padding: 0.4rem 1rem;
        text-align: center
    }
    th {
        background-color: #ddf;
        font-size: 90%
    }
    td {
        font-size: 80%;
    }
</style>