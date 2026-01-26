## 1. Analysis & Repair
- [x] 1.1 Create `clean_noise.py` using `PIL`/`Pillow`.
    - Implement a "fuzzy" flood fill from the top-left corner (0,0).
    - Define a 'background' color (white/light gray) and a tolerance (e.g., Euclidean distance) to match dirty pixels.
    - Treat everything connected to the background matching that criteria as transparent.
    - Iterate through all 9 sprite cells (since it's a grid, flood fill from outside might not reach inside the frames if lines block it, but usually sprite sheets have gaps).
    - **Revised Strategy**: The owl is distinctly **Blue/Purple**. The background noise is **White/Gray**. The script should simply: "If pixel is NOT Blue/Purple enough, make it transparent."
- [x] 1.2 Run the script to overwrite `src/assets/owl-sprites.png`.
- [x] 1.3 Verify the noise is gone.

## 2. Verification
- [x] 2.1 Visually inspect the result in the app.
