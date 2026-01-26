## ADDED Requirements

### Requirement: Roast Interaction
The pet SHALL display a "roast" (complaining) message in a speech bubble when interacted with.

#### Scenario: User clicks the pet
- **GIVEN** the pet is idle on the desktop
- **WHEN** the user double-clicks (or clicks) the pet
- **THEN** a speech bubble SHALL appear near the pet
- **AND** the bubble SHALL contain a random message from the roast list
- **AND** the bubble SHALL disappear automatically after a short duration (e.g., 3 seconds)

#### Scenario: Roast Content
- **GIVEN** the roast feature is triggered
- **WHEN** a message is selected
- **THEN** it SHALL be one of the pre-defined witty/complaining phrases (e.g., "你的代码写完了吗？")
