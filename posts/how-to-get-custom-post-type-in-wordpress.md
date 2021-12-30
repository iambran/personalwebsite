---
title: '如何在Wordpress中通过PHP代码获取自定义内容类型'
date: '2021-11-07'
description: '通过PHP代码get_post()获取自定义内容类型'
tags: ['wordpress', 'pods']
---

## 背景介绍

我最近在搭建的一个B2B Wordpress网站，通过Pods Framework插件(2.7.31版本)新增了两个自定义内容类型：产品“product”和产品属性“feature”。其中product有一个自定义字段(custom field)是叫产品品牌(product_brand)，该字段类型为relationship，关联到Wordpress自带的分类(category)。feature自定义内容类型则是通过高级选项->Build-in Taxonomies中勾选分类(category)也关联到Wordpress自带的分类(category)。最终的效果就是说product和feature都能关联到分类(category)。
那么我需要解决的问题是：在一个产品页面时，假设这个产品的品牌为A，那么我需要同时列出品牌也为A的所有产品属性feature。以下PHP代码可以达到我要的结果：

```php

<?php

// https://docs.pods.io/code/pods/find/#page-header-1347
$current_product = pods('product', get_the_id());
$brand = $current_product->field('product_brand')['slug'];

$args = array(
    'post_type' => 'feature',
    'category_name' => $brand,
);

// https://developer.wordpress.org/reference/functions/get_posts/
$features = get_posts($args);

if ($features)

    // https://developer.wordpress.org/reference/functions/setup_postdata/
    foreach($features as $feature): setup_postdata($feature); ?>

    <h3>
        <?php echo $feature->post_title; ?>
    </h3>

    // https://developer.wordpress.org/reference/functions/get_post_meta/
    // 通过get_post_meta()函数获取当前feature的封面照片(feature_img)，
    // 该封面照片也是一个自定义字段，是储存在数据库wp_postmeta表格中
    <?php 
        $feature_meta = get_post_meta($feature->ID, 'feature_img', true); 
    ?>

    <img 
        src="<?php echo $feature_meta['guid']; ?>" 
        alt="<?php echo $feature->post_title; ?>" 
    >
    
    <?php endforeach;

    wp_reset_postdata();
endif;

?>
```