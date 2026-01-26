## MODIFIED Requirements

### Requirement: Roast Interaction
The pet SHALL display a "roast" message in a speech bubble.

#### Scenario: Thinking Indicator
- **GIVEN** the roast interaction is triggered
- **WHEN** the dynamic content is being fetched
- **THEN** the speech bubble SHALL immediately display a thinking indicator (e.g., "...")
- **AND** the indicator SHALL be replaced by the final message once the fetch is complete
