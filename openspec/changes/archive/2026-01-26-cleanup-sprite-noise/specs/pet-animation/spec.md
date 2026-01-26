## MODIFIED Requirements

### Requirement: Local Sprite Rendering
The application SHALL render the pet using the local `owl-sprites.png` sprite sheet.

#### Scenario: Clean Edges
- **GIVEN** the sprite sheet is available locally
- **WHEN** the application renders the pet
- **THEN** the transparency SHALL be clean with NO visible artifacts or noise
- **AND** pixels that represent the background (gray/white compression artifacts) SHALL be fully removed
