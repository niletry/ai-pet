import { openUrl } from '@tauri-apps/plugin-opener';

interface Prompt {
  id?: number;
  title: string;
  text: string;
  category: string;
}

const WORKER_URL = 'http://localhost:8787/api/prompts';
const KIMI_URL = 'https://kimi.moonshot.cn/';

const promptList = document.getElementById('prompt-list');
const statusMsg = document.getElementById('status-msg');

function showStatus(text: string) {
  if (!statusMsg) return;
  statusMsg.textContent = text;
  statusMsg.style.display = 'block';
  setTimeout(() => { statusMsg.style.display = 'none'; }, 2000);
}

// 1. 加载提示词
async function loadPrompts() {
  if (!promptList) return;

  try {
    const response = await fetch(WORKER_URL);
    const result = await response.json();
    
    if (result.success && Array.isArray(result.data)) {
      renderList(result.data);
    }
  } catch (err) {
    console.error("Load error:", err);
    promptList.innerHTML = '<li style="text-align: center; color: red; padding: 20px;">无法连接服务器，请检查 Worker 是否启动</li>';
  }
}

// 2. 渲染列表
function renderList(prompts: Prompt[]) {
  if (!promptList) return;
  promptList.innerHTML = '';
  
  prompts.forEach(p => {
    const li = document.createElement('li');
    li.className = 'prompt-item';
    li.innerHTML = `
      <div class="prompt-title">${p.title}</div>
      <div class="prompt-desc">${p.text.substring(0, 100)}...</div>
      <span class="category-tag">${p.category || 'general'}</span>
    `;
    
    // 点击复制并打开
    li.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(p.text);
        showStatus('✅ 已复制提示词，正在跳转 Kimi...');
        await openUrl(KIMI_URL);
      } catch (err) {
        console.error("Action error:", err);
        window.open(KIMI_URL, '_blank');
      }
    });

    promptList.appendChild(li);
  });
}

loadPrompts();
