## 1. Analysis and Repair
- [x] 1.1 Create a temporary Python script `remove_bg.py` to process the image.
    - Identify the specific gray/white colors of the checkerboard.
    - Treat these colors (and slight variations) as the background.
    - Replace them with (0,0,0,0) transparent pixels.
- [x] 1.2 Run the script to overwrite `src/assets/owl-sprites.png` with the fixed version.
- [x] 1.3 Verify the fixed image no longer shows the grid.

## 2. Verification
- [x] 2.1 Start the application and visually confirm the checkerboard is gone.
- [x] 2.2 Ensure the owl content itself is not accidentally eroded.
