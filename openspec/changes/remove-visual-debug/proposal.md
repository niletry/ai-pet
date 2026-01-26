# Proposal: Remove Visual Debugging

## Summary
Remove the semi-transparent debug backgrounds used for layout verification.

## Background
The layout and bottom-alignment issues have been resolved and verified. The debug backgrounds are no longer needed.

## Goals
- Remove `background-color` properties from `body` and `#pet-container` in `index.html`.
- Keep the `height: 100vh;` and alignment logic.

## Plan
1. Edit `index.html` to remove the debug `background-color` lines.
