---
title: 'Pods自定义文章类型使用CAST方法按照发布时间进行排序'
date: '2022-01-04'
description: '在wordpress中，使用pods插件创建的自定义文章类型，使用CAST方法按照发布时间进行排序'
tags: ['pods', 'wordpress', 'oxygen']
---

使用pods创建的自定义文章类型 (Custom Post Type)，默认的是按照标题首字母进行排序。如果需要按照发布的时间先后进行排序，那么需要用到MySQL的CAST方法。在Oxygen中添加一个Pods列表字段：ADD -> Wordpress -> Widgets -> Pods列表字段。然后排序（Order By）那里需要使用：

### 1. 如果发布时间是wordpress自带的字段(Wordpress built-in field)

```mysql

// 升序
CAST( t.post_date as DATETIME ) ASC

// 降序
CAST( t.post_date as DATETIME ) DESC

```

### 2. 如果发布时间是pods创建的字段

```mysql

// 升序
CAST( date_time_field.meta_value AS DATETIME ) ASC

// 降序
CAST( date_time_field.meta_value AS DATETIME ) DESC

```