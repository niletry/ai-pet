# project-assets Specification

## Purpose
TBD - created by archiving change cleanup-unused-icons. Update Purpose after archive.
## Requirements
### Requirement: Minimal Icon Set
The application SHALL only include icons referenced in the `tauri.conf.json` or explicitly used by the application, to maintain a clean codebase.

#### Scenario: No unused icons
- **GIVEN** the `src-tauri/icons` directory
- **WHEN** the project is built or inspected
- **THEN** it SHALL NOT contain default Tauri template icons (e.g., Square*Logo.png) unless explicitly used
- **AND** it SHALL only contain `32x32.png`, `128x128.png`, `128x128@2x.png`, `icon.icns`, and `icon.ico`.

