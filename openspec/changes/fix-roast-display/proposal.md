# Proposal: Fix Roast Display and Error

## Summary
Increase window size to accommodate the speech bubble and fix the "toggle_maximize" error on double-click.

## Background
The user reported two issues:
1. The speech bubble is not visible, likely because it is positioned outside the 100x100 window bounds.
2. Double-clicking triggers a `window.internal_toggle_maximize` permission error.

## Goals
- Increase visual window size (e.g., to 200x150) to allow space for the speech bubble above the pet, while keeping the pet aligned to the bottom.
- Ensure the extra space is transparent and click-through (where possible, though purely HTML click-through might be tricky if the window is larger. We rely on standard transparency).
- Prevent default behavior on double-click to stop the maximize command.

## Plan
1.  **Configuration**: Update `tauri.conf.json` to 150x150 (or enough to fit bubble). Let's go with 200 (width) x 200 (height) to be safe, or maybe 140x160. Let's try 200x200 again but just center everything or put pet at bottom.
    - actually, if we make the window huge, we block clicks.
    - Let's try 150 width, 180 height. Pet is 100x100. Bubble is above.
2.  **Layout**: Update `index.html` CSS:
    - Body/Container: Align content to bottom center.
    - Pet: 100x100.
    - Bubble: Absolute position relative to container.
3.  **Interaction**: Update `src/main.ts`:
    - Add `e.preventDefault()` to `dblclick` handler.

## Design Details
- Window: 200w x 160h.
- Pet: centered horizontally, aligned to bottom.
- Bubble: appears above pet.
