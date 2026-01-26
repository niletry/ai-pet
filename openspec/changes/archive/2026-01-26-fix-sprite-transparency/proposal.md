# Change: Fix Sprite Transparency

## Why
The current `owl-sprites.png` contains a visible checkerboard pattern (gray and white squares) in its background instead of true alpha transparency. This breaks the illusion of the floating pet, as the user sees a rectangular box with a grid around the owl.

## What Changes
- Process `src/assets/owl-sprites.png` to replace the checkerboard background pixels with fully transparent pixels (alpha 0).
- No code changes are required in `main.ts` or `index.html`, only the asset file needs to be updated.

## Impact
- **Affected specs**: `pet-animation` (modified capability)
- **Affected assets**: `src/assets/owl-sprites.png`
- **User impact**: The pet will appear properly floating without a boxy background.
