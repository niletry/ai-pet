## 1. Implementation
- [x] 1.1 Create directory `.github/workflows/`.
- [x] 1.2 Create workflow file `.github/workflows/release.yml` with the following configuration:
    - Trigger: Push to tags matching `v*` (e.g., `v1.0.0`).
    - Strategy Matrix: Include Ubuntu, Windows, and macOS runners.
    - Steps:
        - Checkout code.
        - Setup Node.js (pnpm) and Rust.
        - Install system dependencies (Linux only).
        - Run `tauri-apps/tauri-action` to build and sign.

## 2. Documentation
- [x] 2.1 Update `README.md` with instructions on how to trigger a release (pushing a tag).

## 3. Verification (Manual)
- [x] 3.1 Since we cannot run GitHub Actions locally easily, verification involves ensuring the YAML syntax is valid using a linter or schema validator if possible, or careful review.
