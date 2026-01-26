# Project Context

## Purpose
Desktop Pet is a cross-platform desktop companion application that displays an animated pet character on the user's screen. The pet appears as a transparent, always-on-top window that users can interact with and drag around their desktop. The application aims to provide a fun, non-intrusive desktop companion experience.

**Key Goals:**
- Create a lightweight, always-visible desktop pet
- Support transparent window with click-through for non-pet areas
- Enable smooth animations and interactions
- Maintain minimal resource usage
- Cross-platform compatibility (macOS, Windows, Linux)

## Tech Stack

### Frontend
- **HTML/CSS**: Vanilla HTML5 and CSS3 for UI structure and styling
- **TypeScript**: Type-safe JavaScript for frontend logic
- **Vite**: Fast build tool and dev server (v6.4.1)
- **Animations**: CSS keyframe animations for pet movements

### Backend/Native
- **Tauri v2.9**: Rust-based framework for building desktop applications
  - Provides native window management and OS integration
  - Enables transparent windows and always-on-top behavior
- **Rust 1.93.0**: Systems programming language for the native backend
- **Cargo**: Rust package manager and build system

### Development Tools
- **pnpm**: Fast, disk space efficient package manager
- **Node.js v22.21.1**: JavaScript runtime for development tooling
- **TypeScript ~5.6.2**: Static type checking

## Project Conventions

### Code Style

#### TypeScript/JavaScript
- Use TypeScript for all frontend code
- Prefer `const` and `let` over `var`
- Use async/await for asynchronous operations
- Follow standard TypeScript naming conventions:
  - `camelCase` for variables and functions
  - `PascalCase` for types and interfaces

#### Rust
- Follow standard Rust conventions (enforced by `rustfmt`)
- Use `snake_case` for variables and functions
- Use `PascalCase` for types and structs
- Prefix unused variables with underscore (e.g., `_window`)
- Import traits explicitly when using trait methods

#### CSS
- Use kebab-case for class names and IDs
- Organize styles by component/section
- Prefer CSS animations over JavaScript for performance
- Use CSS custom properties for theming when applicable

### Architecture Patterns

#### Application Structure
```
desktop-pet/
├── src/                    # Frontend source code
│   ├── main.ts            # TypeScript entry point
│   ├── styles.css         # Global styles
│   └── assets/            # Static assets (images, icons)
├── src-tauri/             # Rust backend
│   ├── src/
│   │   ├── main.rs        # Rust entry point
│   │   └── lib.rs         # Library code
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
├── index.html             # Main HTML entry
└── vite.config.ts         # Vite configuration
```

#### Window Configuration
- **Transparent**: Background transparency enabled for seamless desktop integration
- **Frameless**: No window decorations for clean pet appearance
- **Always on Top**: Pet stays visible above other windows
- **Skip Taskbar**: Doesn't clutter taskbar/dock
- **Draggable**: Uses `data-tauri-drag-region` attribute for drag functionality
- **Click-through**: Non-pet areas use `pointer-events: none` for transparency

#### Frontend-Backend Communication
- Use Tauri's `invoke` API for calling Rust commands from TypeScript
- Use Tauri's event system for backend-to-frontend communication
- Keep business logic in Rust, UI logic in TypeScript

### Testing Strategy
- **Current Status**: No formal testing framework set up yet
- **Future Plans**:
  - Unit tests for Rust backend using `cargo test`
  - Frontend tests using Vitest or similar
  - Integration tests for Tauri commands

### Git Workflow
- **Main Branch**: `main` - stable, production-ready code
- **Feature Development**: Create feature branches as needed
- **Commit Messages**: Use clear, descriptive commit messages
- **OpenSpec Integration**: Use OpenSpec workflows for structured changes

## Domain Context

### Desktop Pet Behavior
- **Visual Presentation**: Animated GIF or sprite-based character
- **Interaction Model**: 
  - Draggable via click-and-drag
  - Click-through on transparent areas
  - Potential for future interactions (clicks, right-click menus)
- **Animation States**: Currently uses floating animation, expandable to idle, walking, sleeping, etc.

### Platform-Specific Considerations
- **macOS**: Requires `macos-private-api` feature for full transparency support
- **Windows**: Native transparency support via Tauri
- **Linux**: Transparency support varies by window manager

## Important Constraints

### Technical Constraints
1. **Window Transparency**: 
   - macOS requires `macOSPrivateApi` configuration for full transparency
   - Must handle platform-specific transparency APIs
2. **Performance**: 
   - Must remain lightweight (minimal CPU/memory usage)
   - Animations should be CSS-based for GPU acceleration
3. **Fixed Port**: Vite dev server uses strict port 1420
4. **Rust Toolchain**: Requires Rust 1.93.0+ and Cargo installed

### Platform Constraints
- Must support macOS (primary), with Windows/Linux as secondary targets
- Window behavior may differ across platforms
- Icon formats vary by platform (.icns for macOS, .ico for Windows, .png for Linux)

## External Dependencies

### Runtime Dependencies
- **@tauri-apps/api**: Tauri's JavaScript API for frontend-backend communication
- **@tauri-apps/plugin-opener**: Plugin for opening URLs/files from the app
- **serde/serde_json**: Rust serialization for data exchange

### Build Dependencies
- **tauri-build**: Build-time Tauri integration
- **Rust toolchain**: rustc, cargo, rustfmt, clippy

### External Services
- **Giphy**: Currently using Giphy CDN for pet animation (can be replaced with local assets)
- **No backend services**: Fully offline, standalone application

### Development Dependencies
- **Vite**: Development server with HMR (Hot Module Replacement)
- **TypeScript compiler**: Type checking and compilation
- **pnpm**: Package management
