## MODIFIED Requirements

### Requirement: Local Sprite Rendering
The application SHALL render the pet using the local `owl-sprites.png` sprite sheet.

#### Scenario: Display single frame with transparency
- **GIVEN** the sprite sheet is available locally
- **WHEN** the application renders the pet
- **THEN** only the pet pixels SHALL be visible
- **AND** the background of the sprite square SHALL be fully transparent
- **AND** NO checkerboard or solid color background SHALL be visible
