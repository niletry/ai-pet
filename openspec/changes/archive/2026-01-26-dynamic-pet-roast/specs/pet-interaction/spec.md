## MODIFIED Requirements

### Requirement: Roast Interaction
The pet SHALL display a "roast" message in a speech bubble.

#### Scenario: Dynamic Content Fetch
- **GIVEN** the user interacts with the pet
- **WHEN** the roast event is triggered
- **THEN** the application SHALL fetch a message from the configured API endpoint
- **AND** the returned message SHALL be displayed in the speech bubble
- **AND** the application SHALL fall back to a default message if the fetch fails
