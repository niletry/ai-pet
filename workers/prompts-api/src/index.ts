export interface Env {
  DB: D1Database;
}

export interface Prompt {
  id?: number;
  title: string;
  text: string;
  category: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const SERVICES = [
      { id: 'kimi', name: 'Kimi (Moonshot)', url: 'https://kimi.moonshot.cn/', icon: 'https://www.moonshot.cn/favicon.ico' },
      { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com/', icon: 'https://static.deepseek.com/favicon.png' },
      { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', icon: 'https://openai.com/favicon.ico' },
      { id: 'tongyi', name: '通义千问', url: 'https://chat.qwen.ai/', icon: 'https://img.alicdn.com/tfs/TB1.6_vSpXXXXXlXFXXXXXXXXXX-64-64.png' },
      { id: 'claude', name: 'Claude', url: 'https://claude.ai/', icon: 'https://claude.ai/favicon.ico' },
      { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', icon: 'https://www.gstatic.com/lamda/images/favicon_v1_150160d1.svg' }
    ];

    // --- GET /api/services: List all supported AI services ---
    if (url.pathname === '/api/services' && request.method === 'GET') {
      return new Response(JSON.stringify({ success: true, data: SERVICES }), { headers: corsHeaders });
    }

    // --- Serve Admin Dashboard (Management UI) ---
    if ((url.pathname === '/' || url.pathname === '/admin') && request.method === 'GET') {
      return new Response(getAdminHTML(), {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' }
      });
    }

    // --- GET /api/prompts: List all ---
    if (url.pathname === '/api/prompts' && request.method === 'GET') {
      try {
        const { results } = await env.DB.prepare(
          "SELECT id, title, text, category FROM prompts ORDER BY id DESC"
        ).all<Prompt>();
        return new Response(JSON.stringify({ success: true, data: results }), { headers: corsHeaders });
      } catch (error: any) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: corsHeaders });
      }
    }

    // --- POST /api/prompts: Add new ---
    if (url.pathname === '/api/prompts' && request.method === 'POST') {
      try {
        const body: Prompt = await request.json();
        if (!body.title || !body.text) {
          return new Response(JSON.stringify({ success: false, message: 'Missing fields' }), { status: 400, headers: corsHeaders });
        }
        const category = body.category || 'general';
        await env.DB.prepare(
          "INSERT INTO prompts (title, text, category) VALUES (?, ?, ?)"
        ).bind(body.title, body.text, category).run();
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      } catch (error: any) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: corsHeaders });
      }
    }

    // --- DELETE /api/prompts/:id: Delete ---
    if (url.pathname.startsWith('/api/prompts/') && request.method === 'DELETE') {
      try {
        const id = url.pathname.split('/').pop();
        await env.DB.prepare("DELETE FROM prompts WHERE id = ?").bind(id).run();
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      } catch (error: any) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: corsHeaders });
      }
    }

    return new Response(JSON.stringify({ success: false, message: 'Not Found' }), { status: 404, headers: corsHeaders });
  },
};

function getAdminHTML() {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>AI Pet Prompt 管理后台</title>
    <style>
        :root { --p: #4f46e5; --bg: #f3f4f6; }
        body { font-family: system-ui; background: var(--bg); padding: 40px; margin: 0; color: #1f2937; }
        .container { max-width: 900px; margin: 0 auto; }
        header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 30px; }
        h1 { margin: 0; color: var(--p); }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .full { grid-column: span 2; }
        label { display: block; font-weight: 600; margin-bottom: 8px; font-size: 14px; }
        input, textarea, select { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box; }
        button { background: var(--p); color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: opacity 0.2s; }
        button:hover { opacity: 0.9; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { text-align: left; padding: 12px; border-bottom: 2px solid #e5e7eb; font-size: 14px; }
        td { padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; vertical-align: top; }
        .tag { display: inline-block; padding: 2px 8px; border-radius: 99px; background: #e0e7ff; color: #4338ca; font-size: 12px; }
        .del-btn { background: #fee2e2; color: #b91c1c; padding: 6px 12px; border-radius: 4px; font-size: 12px; }
        .status { position: fixed; top: 20px; right: 20px; padding: 10px 20px; border-radius: 6px; color: white; display: none; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>AI Pet Prompt 管理</h1>
            <div id="api-status">API: Loading...</div>
        </header>

        <section class="card">
            <h3>录入新提示词</h3>
            <div class="form-grid">
                <div>
                    <label>标题</label>
                    <input type="text" id="title" placeholder="例如: 邮箱润色">
                </div>
                <div>
                    <label>分类</label>
                    <select id="category">
                        <option value="general">通用</option>
                        <option value="work">工作</option>
                        <option value="dev">开发</option>
                        <option value="marketing">市场</option>
                    </select>
                </div>
                <div class="full">
                    <label>提示词正文</label>
                    <textarea id="text" rows="4" placeholder="输入具体的 AI 提示词内容..."></textarea>
                </div>
            </div>
            <button id="add-btn" style="margin-top:20px;width:100%">保存到 D1 数据库</button>
        </section>

        <section class="card">
            <h3>当前库中提示词</h3>
            <table id="prompt-table">
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>分类</th>
                        <th>正文内容预览</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="list-body"></tbody>
            </table>
        </section>
    </div>

    <div id="toast" class="status"></div>

    <script>
        const API = '/api/prompts';
        
        function msg(text, isErr=false) {
            const t = document.getElementById('toast');
            t.textContent = text;
            t.style.background = isErr ? '#ef4444' : '#10b981';
            t.style.display = 'block';
            setTimeout(() => t.style.display='none', 2000);
        }

        async function fetchPrompts() {
            try {
                const res = await fetch(API);
                const json = await res.json();
                const body = document.getElementById('list-body');
                body.innerHTML = '';
                json.data.forEach(p => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = \`
                        <td><strong>\${p.title}</strong></td>
                        <td><span class="tag">\${p.category}</span></td>
                        <td style="color:#6b7280">\${p.text.substring(0, 50)}...</td>
                        <td><button class="del-btn" onclick="deletePrompt(\${p.id})">删除</button></td>
                    \`;
                    body.appendChild(tr);
                });
                document.getElementById('api-status').textContent = 'API: OK';
            } catch (e) {
                document.getElementById('api-status').textContent = 'API: Error';
            }
        }

        document.getElementById('add-btn').onclick = async () => {
            const title = document.getElementById('title').value;
            const text = document.getElementById('text').value;
            const category = document.getElementById('category').value;
            if(!title || !text) return alert('请填全内容');

            const res = await fetch(API, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title, text, category})
            });
            if(res.ok) {
                msg('保存成功');
                document.getElementById('title').value = '';
                document.getElementById('text').value = '';
                fetchPrompts();
            } else { msg('保存失败', true); }
        };

        window.deletePrompt = async (id) => {
            if(!confirm('确定删除吗？')) return;
            const res = await fetch(\`\${API}/\${id}\`, { method: 'DELETE' });
            if(res.ok) { msg('已删除'); fetchPrompts(); }
        };

        fetchPrompts();
    </script>
</body>
</html>
  `;
}
