## MODIFIED Requirements

### Requirement: Roast Interaction
The pet SHALL display a "roast" message in a speech bubble.

#### Scenario: Text Wrapping and Sizing
- **GIVEN** a roast message is displayed
- **WHEN** the message is short
- **THEN** the bubble SHALL expand horizontally to fit the text on one line
- **WHEN** the message is long
- **THEN** the bubble SHALL wrap to multiple lines but not exceed 160px width
- **AND** the text SHALL NOT be oriented vertically unless intended
