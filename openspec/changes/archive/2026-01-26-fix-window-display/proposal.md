# Change: Fix Desktop Pet Window Display

## Why
The desktop pet window currently has three critical display issues that prevent it from functioning as intended:
1. **Window too large**: Currently 800x600, making it intrusive rather than a small desktop companion
2. **No transparency**: Background is not transparent on macOS, breaking the floating pet illusion
3. **Drag not working**: Despite having `data-tauri-drag-region` attribute, window cannot be dragged

These issues prevent the core user experience of having a small, transparent, draggable pet on the desktop.

## What Changes
- Reduce window size from 800x600 to 200x200 to match pet container size
- Enable macOS transparency by adding `macOSPrivateApi` configuration to `tauri.conf.json`
- Verify and fix drag functionality by ensuring proper Tauri configuration

## Impact
- **Affected specs**: `desktop-pet-window` (new capability)
- **Affected code**: 
  - `src-tauri/tauri.conf.json` - Window configuration
  - Potentially `index.html` - Verify drag region setup
- **User impact**: Immediate improvement to core desktop pet experience
- **Breaking changes**: None - purely fixes to match intended behavior
