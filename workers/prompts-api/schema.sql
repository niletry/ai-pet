-- Create prompts table
DROP TABLE IF EXISTS prompts;
CREATE TABLE IF NOT EXISTS prompts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO prompts (title, text, category) VALUES 
('润色邮件', '作为一名字节跳动的资深产品经理，帮我润色以下邮件，使其更专业并且突出核心数据亮点：\n\n[在这里粘贴你的草稿]', 'work'),
('代码 Review', '作为一名前端技术专家，帮我Review下面这段代码，指出可以在哪些方面做性能优化和规范重构：\n\n[在这里粘贴代码]', 'dev'),
('会议总结', '根据以下会议纪要提取出：1. 核心讨论点；2. 关键决议；3. 每个人的后续 Action Items (待办事项)：\n\n[在这里粘贴会议内容]', 'work'),
('爆款标题', '为一篇关于"AI桌面宠物开发"的技术分享文章，起5个吸引技术宅眼球的爆款标题：', 'marketing'),
('中英文本翻译', '你是一个精通中英互译的信达雅翻译官。请把以下文本翻译为流畅自然的英文，并提供几个不同的口吻（商务/日常/学术）：\n\n[在这里粘贴中文]', 'general');
