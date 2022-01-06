---
title: 'Pods自定义文章类型按发布时间进行排序'
date: '2021-10-04'
description: '在wordpress中，使用pods插件创建的自定义文章类型，使用CAST方法按照发布时间进行排序'
tags: ['pods', 'wordpress', 'oxygen']
---

使用pods创建的自定义文章类型 (Custom Post Type)，默认的是按照标题首字母进行排序。如果需要按照发布的时间先后进行排序，那么需要用到MySQL的CAST方法。在Oxygen中添加一个Pods列表字段：ADD -> Wordpress -> Widgets -> Pods - List Items。然后排序（Order By）那里需要使用：

### 1. 如果发布时间是wordpress自带的字段(Wordpress built-in field)

```mysql

// 升序（默认升序）
post_date

// 降序
post_date DESC

```

### 2. 如果发布时间是pods创建的字段，比如publish_date

```mysql

// 升序
CAST( publish_date.meta_value AS DATETIME ) ASC

// 降序
CAST( publish_date.meta_value AS DATETIME ) DESC

```

### 更新(2022.1.5)

测试了直接使用publish_date也是可以排序的，不需要使用CAST方法。看了下MySQL数据库wp_postmeta表格中，publish_date的meta_value已经是时间格式了`2022-01-05 00:00:00`。

```mysql

// 升序（默认升序）
publish_date
// 或者
publish_date.meta_value


// 降序
publish_date DESC
// 或者
publish_date.meta_value DESC

```