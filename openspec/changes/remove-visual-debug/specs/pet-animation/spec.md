## MODIFIED Requirements

### Requirement: Visual Debugging Support
The application SHALL support visual debugging of component boundaries.

#### Scenario: Debug backgrounds
- **GIVEN** production or non-debug mode
- **WHEN** viewing the application UI
- **THEN** the elements SHALL NOT have debug backgrounds
- **AND** the window SHALL remain transparent where appropriate
