// src-tauri/src/main.rs
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let _window = app.get_webview_window("main").unwrap();
            // Window is now draggable via data-tauri-drag-region
            // and clickable on the pet container
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}