---
title: 'Next.js博客网站添加Mailchimp文章订阅功能'
date: '2022-03-13'
description: 'Next.js博客网站添加Mailchimp文章订阅功能'
tags: ['next.js']
---

和很多互联网企业一样，[Mailchimp](https://mailchimp.com/pricing/marketing/)也支持免费的一个起步套餐，这篇博客我想跟着Lee Robinson的这篇博客[https://leerob.io/blog/mailchimp-next-js](https://leerob.io/blog/mailchimp-next-js)尝试借助Mailchimp也在我的博客上面添加一个文章订阅功能。

## 注册Mailchimp账号

访问[Mailchimp](https://login.mailchimp.com/signup/)网站并注册一个账号。

登陆跳转到后台之后，api区域比较不好找，可以直接在域名后面添加/account/api/访问api设置页面。找到"Your API keys"模块，点击"Create a Key"创建一个api。

需要用到这3个数据：

- API Key: 前面创建的api
- API server region: 后台域名最开始的部分，例如我的api服务器是`us14`（https://us14.admin.mailchimp.com/）
- Audience ID: 左侧竖向菜单栏中Audience -> Audience Dashboard新建一个Audience，然后找到All Contacts -> Settings -> Audience names and default，可以找到Audience ID。（Some plugins and integrations may request your Audience ID. Typically, this is what they want: f78c0975c2.）

## 添加本地环境变量 (environment variables)

在`.env.local`文件中添加这三个变量 (请注意需要将`.env.local`添加到`.gitignore`文件中，我们并不想把这个变量提交到代码仓库中)。

```javascript

MAILCHIMP_API_KEY="29c3629967ec17d41f422d84-us14"
MAILCHIMP_API_SERVER="us14"
MAILCHIMP_AUDIENCE_ID="f78c0975c2"

```


## 安装Mailchimp Marketing库

我们还需要安装一个Mailchimp Marketing库。

```bash

npm install @mailchimp/mailchimp_marketing

```


## 创建api route

在`pages/api`中新建一个文件`subscribe.js`，并添加以下代码。

```javascript

import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER // e.g. us1
});

export default async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed'
    });

    return res.status(201).json({ error: '' });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

```


## 创建文章订阅UI组件

我们现在需要添加一个文章订阅的组件到我们的博客中，有兴趣的读者可以选择提交他们的邮箱来获取文章订阅。新建一个`Subscribe.js`组件，并添加以下代码。

```javascript

import React, { useRef, useState } from 'react';

export default function Subscribe() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();

    // 3. Send a request to our API with the user's email address.
    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const { error } = await res.json();

    if (error) {
      // 4. 如果出现错误，将错误信息渲染到输入框中。
      setMessage(error);

      return;
    }

    // 5. 清除输入框文字并展示订阅成功消息提示
    inputEl.current.value = '';
    setMessage('订阅成功! 🎉 感谢您订阅我的博客。');
  };

  return (
    <form onSubmit={subscribe}>
      <label htmlFor="email-input">{'邮箱'}</label>
      <input
        id="email-input"
        name="email"
        placeholder="you@awesome.com"
        ref={inputEl}
        required
        type="email"
      />
      <div>
        {message
          ? message
          : `我只推送我写的最好的博客，不会频繁推送。`}
      </div>
      <button type="submit">{'✨ 订阅博客 💌'}</button>
    </form>
  );
}

```


## 本地测试

我是将博客订阅组件放在我的文章底部，`npm run dev`运行本地服务器后可以在前端输入一个邮箱测试一下，如果提示订阅成功，可以回到Mailchip后台Audience那边看一下，可以看到邮箱列表中新增了一个刚刚用来获取订阅的邮箱，然后邮箱获取来源(source)那里展示的是API。


## 添加Netlify生产服务器环境变量

我的博客是部署到[Netlify](https://www.netlify.com/)，可以登陆到Netlify网站后台添加环境变量。但我安装有他们的命令行工具[Netlify CLI](https://cli.netlify.com/)，我可以使用Netlify CLI添加环境变量。

```bash

Listing environment variables for site: kind-kirch-823d9bb
.--------------------------------------------------------------------------------------.
|                                Environment variables                                 |
|--------------------------------------------------------------------------------------|
|               Key               |                       Value                        |
|---------------------------------|----------------------------------------------------|
| FIREBASE_CLIENT_EMAIL           | ************************************************** |
| FIREBASE_PRIVATE_KEY            | ************************************************** |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | ************************************************** |
'--------------------------------------------------------------------------------------'
? Show values? (y/N) 

```

上面是运行`netlify env:list`返回的结果，这是我现有的三个环境变量，是之前使用谷歌Firebase数据库来添加文章阅读统计的一个小功能。

现在使用`env`这个命令来添加博客订阅的三个环境变量。

```bash

netlify env:set MAILCHIMP_API_KEY 29c3629967ec17d41f422d84-us14

```

```bash

netlify env:set MAILCHIMP_API_SERVER us14 

```

```bash

netlify env:set MAILCHIMP_AUDIENCE_ID f78c0975c2 

```

如果您也是使用Netlify服务器，当使用上述方法添加环境变量后，可以登陆到Netlify后台，找到Site settings -> Build & deploy -> Environment，如果看到刚刚的3个环境变量已经被添加到这里，那说明操作成功了。

现在可以将代码提交到Github，自动部署到Netlify，再到线上网站测试下订阅功能，如果订阅成功那就可以了。最后一步就是写一些CSS来美化我们刚刚所创建的这个文章订阅的组件就搞定了，这里我就省略了。
