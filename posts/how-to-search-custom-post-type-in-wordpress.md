---
title: '如何使Wordpress搜索功能支持自定义内容类型(Custom Post Type)'
date: '2021-10-19'
keywords: 'wordpress搜索自定义内容类型，wordpress搜索custom post type'
content: '在Wordpress网站里面增加PHP代码，从而可以搜索自定义内容类型(Custom Post Type)'
isPublished: ''
---

Wordpress默认的搜索功能只能搜索页面和文章，这些数据是储存在数据库wp_posts表格里面。而自定义内容类型(Custom Post Type)的数据是储存在wp_postmeta这个表格里面，是不会被搜到的。如果需要自定义内容类型被搜索到，需要增加一段自定义的PHP代码到functions.php里面。但是通常很多网站都是使用别人开发的theme，那么我们可以安装[Code Snippets](https://wordpress.org/plugins/code-snippets/)这个插件来添加PHP代码。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634627819/brandonzhang.cn/codesnippets%E6%8F%92%E4%BB%B6_reeoyn.jpg" alt="安装Code Snippets插件" style="border: 1px solid #ddd;">

启用Code Snippets插件以后，进入插件界面，增加一个代码片段，然后把下面的PHP代码Copy进去，这段PHP代码来自Adam Balée的[博客](https://adambalee.com/search-wordpress-by-custom-fields-without-a-plugin/)，不是我的原创。

```php

/**
 * Extend WordPress search to include custom fields
 *
 * https://adambalee.com
 */

/**
 * Join posts and postmeta tables
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_join
 */
function cf_search_join( $join ) {
    global $wpdb;

    if ( is_search() ) {    
        $join .=' LEFT JOIN '.$wpdb->postmeta. ' ON '. $wpdb->posts . '.ID = ' . $wpdb->postmeta . '.post_id ';
    }

    return $join;
}
add_filter('posts_join', 'cf_search_join' );

/**
 * Modify the search query with posts_where
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_where
 */
function cf_search_where( $where ) {
    global $pagenow, $wpdb;

    if ( is_search() ) {
        $where = preg_replace(
            "/\(\s*".$wpdb->posts.".post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
            "(".$wpdb->posts.".post_title LIKE $1) OR (".$wpdb->postmeta.".meta_value LIKE $1)", $where );
    }

    return $where;
}
add_filter( 'posts_where', 'cf_search_where' );

/**
 * Prevent duplicates
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_distinct
 */
function cf_search_distinct( $where ) {
    global $wpdb;

    if ( is_search() ) {
        return "DISTINCT";
    }

    return $where;
}
add_filter( 'posts_distinct', 'cf_search_distinct' );


```