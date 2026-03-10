import { openUrl } from '@tauri-apps/plugin-opener';

// 3. Setup Prompts
const PROMPTS = [
  { title: "润色邮件", text: "作为一名字节跳动的资深产品经理，帮我润色以下邮件，使其更专业并且突出核心数据亮点：\n\n[在这里粘贴你的草稿]" },
  { title: "代码 Review", text: "作为一名前端技术专家，帮我Review下面这段代码，指出可以在哪些方面做性能优化和规范重构：\n\n[在这里粘贴代码]" },
  { title: "会议总结", text: "根据以下会议纪要提取出：1. 核心讨论点；2. 关键决议；3. 每个人的后续 Action Items (待办事项)：\n\n[在这里粘贴会议内容]" },
  { title: "爆款标题", text: "为一篇关于“AI桌面宠物开发”的技术分享文章，起5个吸引技术宅眼球的爆款标题：" },
  { title: "中英文本翻译", text: "你是一个精通中英互译的信达雅翻译官。请把以下文本翻译为流畅自然的英文，并提供几个不同的口吻（商务/日常/学术）：\n\n[在这里粘贴中文]" }
];

window.addEventListener('DOMContentLoaded', () => {
  const promptList = document.getElementById('prompt-list');
  if (promptList) {
    PROMPTS.forEach(p => {
      const li = document.createElement('li');
      li.className = 'prompt-item';
      li.innerHTML = `
        <div class="prompt-title">${p.title}</div>
        <div class="prompt-desc">${p.text.substring(0, 100)}...</div>
      `;
      li.addEventListener('click', () => {
        // Build the Kimi URL. Kimi supports ?q= in search to initiate a chat
        // (URL encode the text so safe to pass in URL)
        const targetUrl = `https://kimi.moonshot.cn/?q=${encodeURIComponent(p.text)}`;
        console.log("Opening URL in external browser:", targetUrl);
        
        // Use Tauri's open plugin to safely open in system default browser 
        openUrl(targetUrl).catch(err => {
            console.error("Failed to open URL:", err);
            // Fallback
            window.open(targetUrl, '_blank');
        });
      });
      promptList.appendChild(li);
    });
  }
});
