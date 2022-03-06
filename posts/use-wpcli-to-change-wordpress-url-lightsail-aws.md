---
title: '使用WP-CLI命令行工具修改aws lightsail搭建的wordpress实例中的url'
date: '2022-03-06'
description: '如何使用WP-CLI命令行工具修改aws lightsail搭建的wordpress实例中的url，将http替换成https'
tags: ['wordpress']
published: ''
---

今天尝试了WP-CLI命令行工具，可以快速的将我在AWS Lightsail中搭建的WordPress网站的http网址修改成https。在Lightsail搭建Wordpress网站的时候，bitnami已经默认会安装WP-CLI工具。

首先需要登录到Lightsail的后台，找到想要修改的WordPress实例，点击“使用SSH链接”通过基于浏览器的SSH客户端连接实例。

![SSH连接](https://res.cloudinary.com/brandonzhang/image/upload/v1646582748/brandonzhang.cn/lightsail-ssh_mbrhq2.jpg)

连接成功后，在终端输入：

```bash

sudo wp cli info

```

如果返回到结果类似下面这样，证明这个实例中是已经安装有WP-CLI工具。

```bash

OS:Linux 4.19.0-17-cloud-amd64 #1 SMP Debian 4.19.194-3 (2021-07-18) x86_64
Shell:/bin/bash
PHP binary:/opt/bitnami/php/bin/php
PHP version:7.4.22
php.ini used:/opt/bitnami/php/lib/php.ini
MySQL binary:/opt/bitnami/mariadb/bin/mysql
MySQL version:mysql  Ver 15.1 Distrib 10.3.31-MariaDB, for Linux (x86_64) using readline 5.1
SQL modes:
WP-CLI root dir:phar://wp-cli.phar/vendor/wp-cli/wp-cli
WP-CLI vendor dir:phar://wp-cli.phar/vendor
WP_CLI phar path:/home/bitnami
WP-CLI packages dir:/opt/bitnami/wp-cli/.packages/
WP-CLI global config:/opt/bitnami/wp-cli/conf/wp-cli.yml
WP-CLI project config:
WP-CLI version:2.5.0

```

> **===> 操作下面这些命令前，请先备份网站数据！！！**

接下来可以运行这行命令，`--skip-columns=guid`告诉WP-CLI不要对特定的列进行替换，这里指不要替换`guid`这个列，`--dry-run`告诉WP-CLI仅仅运行整个搜索/替换操作并显示报告，但不保存对数据库的修改。这两个参数可以参数WordPress官方文档[https://developer.wordpress.org/cli/commands/search-replace/](https://developer.wordpress.org/cli/commands/search-replace/)。

```bash

sudo wp search-replace 'http://example.com' 'https://example.com' --skip-columns=guid --dry-run

```

上面这行命令返回的结果告诉我有15处可以替换的地方。

![wpcli返回的结果](https://res.cloudinary.com/brandonzhang/image/upload/v1646582748/brandonzhang.cn/lightsail-wpcli_avcjvv.jpg)


如果确认这些都是需要修改的，接下来可以把`--dry-run`去掉，正式执行我们的搜索/替换操作。

```bash

sudo wp search-replace 'http://example.com' 'https://example.com' --skip-columns=guid

```

如果替换成功，终端会返回一个Success消息，并告知修改的数量。

> **===> 如果是使用Oxygen建站的朋友不要使用这个方法，替换后会导致网站部分section消失！**