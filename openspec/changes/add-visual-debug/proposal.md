# Proposal: Add Visual Debugging and Fix Bottom Alignment

## Summary
Add debug backgrounds to visualize the window, container, and bubble bounds, and ensure the pet is correctly aligned to the bottom of the window.

## Background
The pet is not correctly sitting at the bottom of the window, and it is difficult to determine where the window boundaries are. Adding visual debug markers will help in positioning interactive elements like the speech bubble.

## Goals
- Ensure `body` fills the entire window height so `align-items: flex-end` works.
- Add toggleable or clearly visible debug backgrounds/borders for:
  - The entire window (`body`)
  - The pet container (`#pet-container`)
  - The speech bubble (`.speech-bubble`)

## Plan
1.  **Layout**: Add `height: 100vh;` to `body` in `index.html`.
2.  **Debug Styles**: Add semi-transparent background colors to `body`, `#pet-container`, and `.speech-bubble` to visualize their sizes and positions.
3.  **Refinement**: Ensure the speech bubble is fully visible within the resized container/window.
