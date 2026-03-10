# Tauri v2 中 openUrl 权限拦截的终极排坑指南

## 问题背景
在 Tauri v2 中，出于极高的安全设计，默认情况下所有的外部 API 调用和新窗口创建操作都是被沙盒严格隔离的。我们在为一个独立的子窗口（例如“AI 提示词库”）中去使用 `@tauri-apps/plugin-opener` 插件的 `openUrl` 唤起操作系统的默认浏览器时，连续踩到了多个安全拦截的巨坑。

## 报错历史回溯
以下是我们遇到过的经典报错日志，如果以后看到这些日志，可以迅速对应排查方向：

1. **`webview.create_webview_window not allowed`**
   - **原因**：单纯给应用赋予 `core:window:allow-create` 只能创建普通的幽灵窗口。
   - **解法**：Tauri v2 将包含网页视图的窗口创建权限独立了，必须显式赋予 `core:webview:allow-create-webview-window` 这个权限。

2. **`opener.open_url not allowed on window "ai-prompts-xxx", allowed on: [windows: "main"]`**
   - **原因**：权限的 “尚方宝剑” 只发给了主窗口 `main`，新动态创建的子窗口默认无权使用任何危险 API。
   - **解法**：在 Capabilities 的授权目标中，把新窗口的命名规则利用通配符加入授信名单，例如：`"windows": ["main", "ai-prompts-*"]`。

3. **`Not allowed to open url https://kimi.moonshot.cn/?q=xxx`**
   - **原因排查思路**：遇到了最顽固的问题。即使系统启用了 `opener:allow-open-url`，哪怕我们在 `src-tauri/capabilities/default.json` 里面写满了带通配符 `**` 的正确规则，它仍然无情拦截。
   - **核心真相**：在 Tauri 的配置解析模型中，如果存在**多个权限配置文件**发生合并（例如 `tauri.conf.json` 中内联了 Capabilities，同时外部还有 `default.json`），它们极易产生**合并覆盖**。我们在 `tauri.conf.json` 中曾经仅写了一个裸露的字符串 `"opener:allow-open-url"`，这导致包含详情网址列表的 `default.json` 规则在合并时失效或被降级。

## 最佳实践与最终解决方案
在 Tauri v2 解决多窗口下调用外部浏览器打开带参数的动态网址，应该把详细的 Allow 白名单**显式且完整地内联写死在项目的最终核心配置文件中**。

具体的 `tauri.conf.json` 配置截取范例：

```json
"capabilities": [
  {
    "identifier": "main-capability",
    "description": "Capability for the main window and sub windows",
    "windows": [
      "main",
      "ai-prompts-*" 
      // 必须在这里允许你的新窗口前缀
    ],
    "permissions": [
      "core:window:allow-start-dragging",
      "core:window:allow-close",
      "core:window:allow-create",
      "core:window:allow-set-title",
      "core:window:allow-show",
      "core:webview:allow-create-webview-window", // 创建 Webview 的专属核心权限
      
      "opener:default",
      {
        "identifier": "opener:allow-open-url",
        // 关键点：千万别只写一句单纯的字符串 "opener:allow-open-url"
        // 必须彻底展开描述规则，使用 ** 通配符保障深层 Query 也能畅行无阻
        "allow": [
          { "url": "*" },
          { "url": "**" },
          { "url": "https://kimi.moonshot.cn/**" }
        ]
      }
    ]
  }
]
```

## 关键总结
1. Tauri v2 针对的是 **窗口粒度** 的隔离（主程序能做的事，副窗口默认绝对不能做）。
2. 在处理 `?q=` 这种带大量转义文字的 Query 时，`*` 单星号常常不足以通过，应该使用 `**` 双星号通配，甚至为特定组件展开写明 `{"url": "**"}` 彻底放行同级沙盒。
3. **避免双重配置源冲突**：不要在 `tauri.conf.json` 和 `capabilities/default.json` 中用两种不同的深度去描述同一个安全插件（例如 opener）。如果有交集，最稳妥的办法是把精确权限提到最高的 `tauri.conf.json` 里直接固化。
