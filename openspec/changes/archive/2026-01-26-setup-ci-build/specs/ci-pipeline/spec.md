## ADDED Requirements

### Requirement: Cross-Platform Automation
The project SHALL have a CI/CD pipeline capable of building release artifacts for all supported platforms automatically.

#### Scenario: Release Trigger
- **GIVEN** a valid git tag starting with `v` (e.g., `v1.2.3`) is pushed to the repository
- **WHEN** the GitHub Action triggers
- **THEN** it SHALL concurrently build the application for macOS, Windows, and Linux
- **AND** it SHALL upload the resulting artifacts (dmg, msi, appimage, etc.) to the GitHub Release associated with that tag
