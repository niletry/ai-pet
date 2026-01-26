# Change: Setup CI/CD Build Pipeline

## Why
Currently, the application must be built manually on a developer's machine, which restricts the output to the developer's operating system (e.g., macOS builds only on macOS). Cross-compilation for Tauri (Rust + Web) is complex and error-prone locally.

## What Changes
- Create a GitHub Actions workflow `.github/workflows/release.yml`.
- Configure the workflow to run on three concurrent jobs:
  - `ubuntu-latest` (Linux AppImage/Deb)
  - `macos-latest` (macOS DMG/App)
  - `windows-latest` (Windows MSI/Exe)
- Use the official `tauri-apps/tauri-action` to automate building and uploading assets to a GitHub Release.

## Impact
- **Affected specs**: `ci-pipeline` (new capability)
- **Affected files**: `.github/workflows/release.yml` (new)
- **User impact**: Automates the release process. Pushing a git tag (e.g., `v0.1.0`) will automatically generate and attach binaries for all major platforms to the release page.
