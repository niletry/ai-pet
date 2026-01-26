## MODIFIED Requirements

### Requirement: Roast Interaction
The pet SHALL display a "roast" (complaining) message in a speech bubble when interacted with.

#### Scenario: User clicks the pet
- **GIVEN** the pet is idle on the desktop
- **WHEN** the user double-clicks (or clicks) the pet
- **THEN** a speech bubble SHALL appear near the pet, fully visible within the window bounds
- **AND** the bubble SHALL contain a random message from the roast list
- **AND** the bubble SHALL disappear automatically after a short duration (e.g., 3 seconds)
- **AND** no system maximize command SHALL be triggered

### Requirement: Window Size for Content
The window SHALL be large enough to contain both the pet and its interactive elements (speech bubble).

#### Scenario: Window accommodates bubble
- **GIVEN** the pet is 100x100
- **AND** the bubble appears above the pet
- **WHEN** the window is configured
- **THEN** the dimensions SHALL be sufficient (e.g., 200x200) to prevent clipping of the bubble
