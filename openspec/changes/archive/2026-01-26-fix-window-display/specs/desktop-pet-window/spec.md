## ADDED Requirements

### Requirement: Desktop Pet Window Size
The desktop pet window SHALL be sized appropriately for a small desktop companion, not a full application window.

#### Scenario: Window matches pet size
- **GIVEN** the pet container is 200x200 pixels
- **WHEN** the application window is created
- **THEN** the window dimensions SHALL be 200x200 pixels
- **AND** the window SHALL be non-resizable

#### Scenario: Window is unobtrusive
- **GIVEN** the user has other applications open
- **WHEN** the desktop pet is running
- **THEN** the window SHALL not dominate screen space
- **AND** the window SHALL remain small enough to not interfere with work

### Requirement: Window Transparency
The desktop pet window SHALL support full background transparency to create a seamless floating pet effect.

#### Scenario: Transparent background on macOS
- **GIVEN** the application is running on macOS
- **WHEN** the window is displayed
- **THEN** the background SHALL be fully transparent
- **AND** only the pet image SHALL be visible
- **AND** the `macOSPrivateApi` configuration SHALL be enabled in `tauri.conf.json`

#### Scenario: Click-through transparent areas
- **GIVEN** the window has transparent areas outside the pet
- **WHEN** the user clicks on a transparent area
- **THEN** the click SHALL pass through to the window below
- **AND** the pet container SHALL still receive clicks

### Requirement: Window Draggability
The desktop pet window SHALL be draggable by clicking and dragging the pet itself.

#### Scenario: Drag pet to new position
- **GIVEN** the desktop pet is displayed
- **WHEN** the user clicks and drags the pet container
- **THEN** the entire window SHALL move to follow the cursor
- **AND** the window SHALL maintain its position when released

#### Scenario: Drag region configuration
- **GIVEN** the pet container has `data-tauri-drag-region` attribute
- **WHEN** the window is frameless (no decorations)
- **THEN** the drag region SHALL enable window movement
- **AND** the drag SHALL work without requiring additional JavaScript

### Requirement: Window Behavior
The desktop pet window SHALL maintain always-on-top behavior and skip the taskbar.

#### Scenario: Always visible
- **GIVEN** other applications are running
- **WHEN** the desktop pet is active
- **THEN** the window SHALL remain on top of other windows
- **AND** the window SHALL not appear in the taskbar/dock

#### Scenario: Frameless appearance
- **GIVEN** the window is configured for desktop pet display
- **WHEN** the window is shown
- **THEN** the window SHALL have no title bar or decorations
- **AND** the window SHALL appear as just the pet image
