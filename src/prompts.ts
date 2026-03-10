import { openUrl } from '@tauri-apps/plugin-opener';

const PROMPTS = [
  { title: "润色邮件", text: `作为一名字节跳动的资深产品经理，帮我润色以下邮件，使其更专业并且突出核心数据亮点：\n\n[在这里粘贴你的草稿]` },
  { title: "代码 Review", text: `作为一名前端技术专家，帮我Review下面这段代码，指出可以在哪些方面做性能优化和规范重构：\n\n[在这里粘贴代码]` },
  { title: "会议总结", text: `根据以下会议纪要提取出：1. 核心讨论点；2. 关键决议；3. 每个人的后续 Action Items (待办事项)：\n\n[在这里粘贴会议内容]` },
  { title: "爆款标题", text: `为一篇关于"AI桌面宠物开发"的技术分享文章，起5个吸引技术宅眼球的爆款标题：` },
  { title: "中英文本翻译", text: `你是一个精通中英互译的信达雅翻译官。请把以下文本翻译为流畅自然的英文，并提供几个不同的口吻（商务/日常/学术）：\n\n[在这里粘贴中文]` }
];

const KIMI_URL = 'https://kimi.moonshot.cn/';

console.log("prompts.ts script loaded!");

const promptList = document.getElementById('prompt-list');

if (promptList) {
  PROMPTS.forEach(p => {
    const li = document.createElement('li');
    li.className = 'prompt-item';
    li.innerHTML = `
      <div class="prompt-title">${p.title}</div>
      <div class="prompt-desc">${p.text.substring(0, 100)}...</div>
    `;
    li.addEventListener('click', async () => {
      console.log(">>> CLICKED prompt:", p.title);
      
      try {
        // 1. Copy prompt text to clipboard
        await navigator.clipboard.writeText(p.text);
        console.log("Prompt text copied to clipboard!");
        
        // 2. Show visual feedback on the clicked item
        const titleEl = li.querySelector('.prompt-title');
        const originalTitle = titleEl?.textContent ?? p.title;
        if (titleEl) {
          titleEl.textContent = '✅ 已复制！正在打开 Kimi...';
          li.style.backgroundColor = '#e6ffe6';
        }
        
        // 3. Open Kimi homepage in default browser
        await openUrl(KIMI_URL);
        console.log("Kimi opened in browser!");
        
        // 4. Restore title after a short delay
        setTimeout(() => {
          if (titleEl) {
            titleEl.textContent = originalTitle;
            li.style.backgroundColor = '';
          }
        }, 2000);
        
      } catch (err) {
        console.error("Error:", err);
        // Fallback: try to copy and open anyway
        try {
          await navigator.clipboard.writeText(p.text);
        } catch (_) { /* ignore */ }
        window.open(KIMI_URL, '_blank');
      }
    });
    promptList.appendChild(li);
  });
}
