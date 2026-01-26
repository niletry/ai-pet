## 1. Analysis & Preparation
- [x] 1.1 Measure the dimensions of `owl-sprites.png` and calculate the individual frame size (assuming 3x3 grid).
- [x] 1.2 Move `owl-sprites.png` to `src/assets/` or appropriate public directory for loading.

## 2. Implementation
- [x] 2.1 Update `index.html` to replace `<img>` with a sprite container `div`.
- [x] 2.2 Implement CSS classes for the sprite container:
    - Set `background-image` to the sprite sheet.
    - Set dimensions to a single frame size.
    - Scale up to window size (200x200) using `image-rendering: pixelated`.
- [x] 2.3 Implement JavaScript/TypeScript logic in `main.ts` to manage "States":
    - Define a mapping of states (e.g., Idle, Sleep, Love) to grid coordinates/background positions.
    - Create a timer loop to switch states or frames periodically.

## 3. Verification
- [x] 3.1 Verify the owl image loads correctly from local source.
- [x] 3.2 Verify the image is crisp (pixelated rendering) and not blurry.
- [x] 3.3 Verify the pet changes poses/states over time.
- [x] 3.4 Ensure drag functionality still works with the new container.
