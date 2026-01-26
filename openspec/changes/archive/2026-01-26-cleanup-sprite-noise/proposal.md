# Change: Cleanup Sprite Noise

## Why
The previous background removal attempt left significant "noise" or "artifacts" around the owl sprite. This looks like dirty pixels floating around the character, which ruins the clean pixel-art aesthetic. This happened because the simple color replacement didn't account for compression artifacts or slight color variations in the checkerboard pattern.

## What Changes
- Create a refined Python script (`clean_noise.py`) to process `src/assets/owl-sprites.png`.
- Implement a more robust algorithm:
  - **Flood Fill**: Start from the corners to identify the background, ensuring we only remove the actual background and not internal pixels.
  - **Color Tolerance**: Increase the sensitivity for "white/gray" detection to catch the dirty edge pixels.
  - **Despeckling**: (Optional) Remove tiny disconnected islands of pixels that are likely noise.

## Impact
- **Affected assets**: `src/assets/owl-sprites.png`
- **User impact**: The pet will look crisp with no floating debris.
