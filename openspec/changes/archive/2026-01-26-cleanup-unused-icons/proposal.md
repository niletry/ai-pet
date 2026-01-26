# Proposal: Cleanup Unused Icons

## Summary
Remove unused default Tauri icons from `src-tauri/icons` that are generated during project initialization but not referenced in the application configuration.

## Background
The `src-tauri/icons` directory contains several "Square*Logo.png" and "StoreLogo.png" files that are mistakenly included or leftover from the default template. These clutter the repository and are not used in `tauri.conf.json`.

## Goals
- Remove unreferenced image files from `src-tauri/icons`.
- Ensure the application still builds and packages correctly with the remaining icons.

## Non-Goals
- Changing the application icon itself.
- modifying specific platform configurations beyond removing unused files.

## Plan
1. Delete the following files:
   - `src-tauri/icons/Square107x107Logo.png`
   - `src-tauri/icons/Square142x142Logo.png`
   - `src-tauri/icons/Square150x150Logo.png`
   - `src-tauri/icons/Square284x284Logo.png`
   - `src-tauri/icons/Square30x30Logo.png`
   - `src-tauri/icons/Square310x310Logo.png`
   - `src-tauri/icons/Square44x44Logo.png`
   - `src-tauri/icons/Square71x71Logo.png`
   - `src-tauri/icons/Square89x89Logo.png`
   - `src-tauri/icons/StoreLogo.png`
2. Verify `tauri.conf.json` does not reference them.
