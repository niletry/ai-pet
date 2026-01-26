## MODIFIED Requirements

### Requirement: Pet Display Container
The pet container SHALL match the window dimensions to ensure full visibility without clipping.

#### Scenario: Container matches window size
- **GIVEN** the application window is 100x100 pixels
- **WHEN** the pet container is rendered
- **THEN** the container width and height SHALL be 100px
- **AND** the pet sprite SHALL be fully visible within these bounds
