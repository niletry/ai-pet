# Proposal: Fix Pet Container Size

## Summary
Update the CSS in `index.html` to match the new 100x100 window size, resolving the clipping issue where the pet is not fully visible.

## Background
We recently resized the application window to 100x100 pixels to reduce pixelation. However, the internal `#pet-container` CSS is still hardcoded to 200x200 pixels, causing the content to overflow the window bounds and appear clipped.

## Goals
- Update `#pet-container` width and height to 100px in `index.html`.
- Ensure the pet sprite fits within the new dimensions.

## Non-Goals
- Changing the animation logic.

## Plan
1. Edit `index.html` and change `#pet-container` width/height from `200px` to `100px`.
2. Verify the pet is fully visible in the window.
