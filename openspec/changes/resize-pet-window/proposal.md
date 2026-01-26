# Proposal: Resize Pet Window

## Summary
Reduce the desktop pet window size from 200x200 to 100x100 pixels to improve visual quality and reduce pixelation of the pet sprite.

## Background
The current 200x200 pixel window size causes the pet sprite to appear stretched and rough. A smaller 100x100 size will present a sharper image and be less intrusive on the desktop.

## Goals
- Change the main window dimensions to 100x100 pixels in `tauri.conf.json`.
- Ensure the pet container styling (if fixed size) aligns with the new window size.

## Non-Goals
- Changing the pet sprite image source (just resizing the container/window).

## Plan
1. Update `tauri.conf.json`: Set `width` and `height` to 100.
2. Update `openspec/specs/desktop-pet-window/spec.md` to reflect the new size requirement.
3. Verify the pet looks correct and fits within the new bounds.
