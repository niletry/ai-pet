## 1. Configuration Updates
- [x] 1.1 Update window dimensions in `tauri.conf.json` from 800x600 to 200x200
- [x] 1.2 Add `macOSPrivateApi` configuration to enable transparency on macOS
- [x] 1.3 Verify all window properties are correctly configured for desktop pet behavior
- [x] 1.4 Add window drag permissions to `tauri.conf.json$

## 2. Implementation
- [x] 2.1 Implement window drag functionality using Tauri API
- [x] 2.2 Disable default image drag behavior
- [x] 2.3 Add TypeScript event handlers for drag

## 3. Verification
- [x] 3.1 Test window size matches pet container (200x200)
- [x] 3.2 Verify background transparency works on macOS
- [x] 3.3 Confirm window can be dragged via pet container ✅ WORKING
- [x] 3.4 Verify window stays always-on-top and skips taskbar

## 4. Documentation
- [x] 4.1 Update README.md with macOS transparency requirements
- [x] 4.2 Document platform-specific configuration notes
- [x] 4.3 Document drag functionality implementation
