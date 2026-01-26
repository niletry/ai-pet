# Proposal: Fix Speech Bubble Multi-line Display

## Summary
Correct the speech bubble styling to prevent it from collapsing into a narrow vertical strip when text wrapping is enabled.

## Background
After enabling `white-space: normal`, the speech bubble collapsed to a very narrow width, causing the text to display vertically. This is likely due to how the browser calculates the auto-width of an absolute-positioned element within a narrow container.

## Goals
- Ensure the speech bubble expands horizontally to fit its content up to a maximum width.
- Prevent the "vertical text" effect.
- Keep the bubble centered above the pet.

## Plan
1. Update `.speech-bubble` CSS in `index.html`:
   - Add `width: max-content;`.
   - Keep `max-width: 160px;`.
   - Keep `white-space: normal;`.
   - This ensures it tries to be as wide as the text first, but wraps if it hits 160px.
