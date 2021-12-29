---
title: '在Oxygen中通过Dynamic Data获取pods自定义字段中的图片URL'
date: '2021-10-07'
description: '在wordpress中，通过pods插件添加了一个图片自定义字段，怎么在oxygen中通过dynamic data获取该图片的url'
---

Wordpress网站中，我使用pods插件添加了一个Custom Post Type叫“products”，然后添加了一个自定义字段叫“产品图片”（product_photo），如下图所示。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1640767133/brandonzhang.cn/product_photo_field_mqaty0.jpg" alt="产品图片自定义字段">

现在，需要到Products这个内容类型添加一个测试产品，然后需要在产品图片字段中插入一张图片，添加好了保存。

接着到Oxygen Template创建一个模版，我给的名称是“Product Single”，然后INHERIT DESIGN FROM OTHER TEMPLATE这里选择我的主模版（main），然后WHERE DOES THIS TEMPLATE APPLY? 这里选择Singular -> Products。

打开Oxygen编辑器后，可以先添加一个Code Block，然后在Code Block的php代码中添加以下代码：

```php

<?php
	echo pods()->field('product_photo._src');
?>

```

这里field()的用法可以参考pods的[官网文档](https://docs.pods.io/code/pods/field/field-notation-options/)。当添加完这行代码，点击Apply Code，如果之前操作没有错误，那么Oxygen编辑器里就会出现一个产品图片的url地址，或者查看前端也会显示一个图片的url地址，说明这个方法是可行的。


那么，接下来需要安装[Code Snippets](https://wordpress.org/plugins/code-snippets/)插件，激活插件后，到Snippets -> Add New，起一个名称比如“ Get Pods Field Data”，然后添加代码：

```php

// 开头的ss只是我随意添加的，为了保证不和其他代码冲突
function ss_get_pod_field_data( $field_name, $property ) {
	return pods()->field( "{$field_name}" . '._' . "{$property}" );
}

```

默认的选项“Run snippet everywhere”不用修改，然后点击Save Changes and Activate.

返回到Oxygen编辑器里，删除刚刚添加到那个Code Block了，添加一个Image组件，点击进入Image URL右侧的data，选择Advanced -> PHP Function Return Value。

Function Name: 这里把刚刚在Code Snippets添加的函数名称`ss_get_pod_field_data`添加进来。

Function Arguments: `product_photo,src`（两个之间不要有空格）。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1640767314/brandonzhang.cn/Screenshot_2021-12-29_at_4.41.18_PM_anwyq6.png" alt="oxygen php function return value">

然后点击Insert就可以看到product_photo的图片已经成功添加进来了。