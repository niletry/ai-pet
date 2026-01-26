## MODIFIED Requirements

### Requirement: Desktop Pet Window Size
The desktop pet window SHALL be sized appropriately for a small desktop companion, not a full application window.

#### Scenario: Window matches pet size
- **GIVEN** the pet container is 100x100 pixels
- **WHEN** the application window is created
- **THEN** the window dimensions SHALL be 100x100 pixels
- **AND** the window SHALL be non-resizable
