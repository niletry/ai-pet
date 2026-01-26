# Proposal: Fix Maximize Error on Double Click

## Summary
Remove `data-tauri-drag-region` from the pet container to prevent the default double-click-to-maximize behavior, which is causing permission errors.

## Background
The user is encountering a `window.internal_toggle_maximize not allowed` error when double-clicking the pet. This is caused by the `data-tauri-drag-region` attribute, which interprets double-clicks as a maximize toggle. Since we already have a custom drag handler in `main.ts`, this attribute is redundant and conflicting.

## Goals
- Remove `data-tauri-drag-region` from `index.html`.
- Maintain drag functionality via the existing `mousedown` handler in `src/main.ts`.

## Non-Goals
- Changing the roast functionality (it should work once the error is gone).

## Plan
1. Edit `index.html` to remove `data-tauri-drag-region`.
2. Verify dragging still works.
3. Verify double-click triggers the roast without error.
