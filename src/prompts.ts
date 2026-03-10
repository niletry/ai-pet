import { openUrl } from '@tauri-apps/plugin-opener';

// 兜底数据 (当 API 无法连接时使用)
const FALLBACK_PROMPTS = [
  { title: "润色邮件", text: `作为一名字节跳动的资深产品经理，帮我润色以下邮件，使其更专业并且突出核心数据亮点：\n\n[在这里粘贴你的草稿]` },
  { title: "代码 Review", text: `作为一名前端技术专家，帮我Review下面这段代码，指出可以在哪些方面做性能优化和规范重构：\n\n[在这里粘贴代码]` }
];

const WORKER_URL = 'http://localhost:8787/api/prompts';
const KIMI_URL = 'https://kimi.moonshot.cn/';

console.log("prompts.ts script loaded!");

const promptList = document.getElementById('prompt-list');

async function loadPrompts() {
  if (!promptList) return;

  let prompts = FALLBACK_PROMPTS;

  try {
    // 尝试从 Cloudflare Worker 获取
    const response = await fetch(WORKER_URL);
    if (response.ok) {
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        prompts = result.data;
        console.log("Prompts loaded from Cloudflare Worker!");
      }
    }
  } catch (err) {
    console.warn("Failed to fetch from worker, using fallback prompts:", err);
  }

  // 渲染列表
  promptList.innerHTML = ''; // 清空加载状态
  
  prompts.forEach(p => {
    const li = document.createElement('li');
    li.className = 'prompt-item';
    li.innerHTML = `
      <div class="prompt-title">${p.title}</div>
      <div class="prompt-desc">${p.text.substring(0, 100)}...</div>
    `;
    
    li.addEventListener('click', async () => {
      try {
        // 1. 复制文字
        await navigator.clipboard.writeText(p.text);
        
        // 2. 视觉反馈
        const titleEl = li.querySelector('.prompt-title');
        const originalTitle = titleEl?.textContent ?? p.title;
        if (titleEl) {
          titleEl.textContent = '✅ 已复制！正在打开 Kimi...';
          li.style.backgroundColor = '#e6ffe6';
        }
        
        // 3. 打开外部连接
        await openUrl(KIMI_URL);
        
        // 4. 恢复状态
        setTimeout(() => {
          if (titleEl) {
            titleEl.textContent = originalTitle;
            li.style.backgroundColor = '';
          }
        }, 2000);
      } catch (err) {
        console.error("Click handler error:", err);
        window.open(KIMI_URL, '_blank');
      }
    });

    promptList.appendChild(li);
  });
}

loadPrompts();
