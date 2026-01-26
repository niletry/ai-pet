# Change: Implement Sprite Sheet Animation

## Why
The current desktop pet uses a static/GIF image hosted remotely. The user wants to use a local `owl-sprites.png` sprite sheet to implement a more dynamic and controllable animation system. This allows for:
- **Offline capability**: No dependency on external URLs.
- **Better Control**: Ability to switch between different "states" or "poses" (e.g., Idle, Sleeping, Working) defined in the sprite sheet.
- **Crisper Visuals**: Pixel-perfect rendering for the pixel-art style sprite.

## What Changes
- Replace the existing `<img>` tag in `index.html` with a `div` based sprite renderer.
- Implement CSS/JS logic to render specific frames from the `owl-sprites.png` grid.
- Create a basic "Behavior Loop" that switches between sprite frames to create a "living" effect (e.g., changing poses every few seconds).
- Ensure the sprite rendering preserves the pixel-art look (no anti-aliasing).

## Impact
- **Affected specs**: `pet-animation` (new capability)
- **Affected code**:
  - `index.html`: Structure change.
  - `src/styles.css` (or inline styles): Sprite sheet CSS.
  - `src/main.ts`: logic to drive the animation/state switching.
