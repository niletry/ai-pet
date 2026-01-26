## MODIFIED Requirements

### Requirement: Pet Display Container
The pet container SHALL be aligned to the bottom of the window to simulate sitting on the desktop.

#### Scenario: Bottom alignment
- **GIVEN** a window of 200x200 pixels
- **WHEN** the application is rendered
- **THEN** the `body` SHALL span the full height of the window
- **AND** the `#pet-container` SHALL be positioned at the bottom-center of the `body`

### Requirement: Visual Debugging Support
The application SHALL support visual debugging of component boundaries.

#### Scenario: Debug backgrounds
- **GIVEN** development mode or a debug flag
- **WHEN** viewing the application UI
- **THEN** the window, pet container, and speech bubble SHALL have distinctive semi-transparent background colors for identification
