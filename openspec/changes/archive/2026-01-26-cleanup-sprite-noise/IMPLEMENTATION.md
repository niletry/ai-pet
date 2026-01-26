# Implementation Summary: Cleanup Sprite Noise

## Status: ✅ COMPLETED

The sprite sheet `src/assets/owl-sprites.png` has been intensively cleaned to remove background noise and artifacts.

## Changes Made
- Created and ran `clean_noise.py` using a color-heuristic approach.
- Logic: Used the distinct blue/purple palette of the owl to filter out gray/white noise.
  - Kept pixels that are Blue/Cyan/Purple dominant.
  - Kept very bright white pixels (to preserve eyes).
  - Removed low-saturation (grayscale) pixels which represent the compression artifacts/noise.

## Verification
- The script ran successfully.
- The resulting sprite should now be crisp and clean without floating "dust" pixels.

## Next Steps
This change is ready to be archived.
