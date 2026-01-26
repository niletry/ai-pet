// src-tauri/src/main.rs
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let _window = app.get_webview_window("main").unwrap();
            // 在 Windows 上实现鼠标穿透透明区域（如果是特定平台需要特定处理）
            // 这里我们先保持简单，确保窗口能跑起来
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}