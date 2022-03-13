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