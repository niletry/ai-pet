## MODIFIED Requirements

### Requirement: Window Draggability
The desktop pet window SHALL be draggable by clicking and dragging the pet itself, without triggering window maximize behaviors.

#### Scenario: Drag behavior
- **GIVEN** the pet container does NOT have `data-tauri-drag-region`
- **WHEN** the user drags the pet
- **THEN** the window SHALL move via the custom `startDragging` handler
- **AND** double-clicking SHALL NOT trigger window maximize
