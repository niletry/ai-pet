## MODIFIED Requirements

### Requirement: Roast Interaction
The pet SHALL display a "roast" message in a speech bubble.

#### Scenario: Text Wrapping
- **GIVEN** a long roast message is fetched
- **WHEN** the bubble is displayed
- **THEN** the text SHALL wrap to multiple lines if it exceeds the maximum width
- **AND** the bubble SHALL remain fully visible within the 200px window bounds
