# Desktop Pet

A lightweight, cross-platform desktop companion application built with Tauri and TypeScript. The pet appears as a small, transparent, always-on-top window that you can drag around your desktop.

## Features

- 🐾 **Small & Unobtrusive**: 200x200 pixel window that doesn't interfere with your work
- 🪟 **Transparent Background**: Seamless floating pet effect with click-through on transparent areas
- 🖱️ **Draggable**: Move your pet anywhere on the screen
- 📌 **Always on Top**: Pet stays visible above other windows
- 🎨 **Smooth Animations**: CSS-based floating animation

## Requirements

### Development
- **Rust 1.93.0+** and Cargo (install via [rustup](https://rustup.rs/))
- **Node.js 22.21.1+** (managed via nvm)
- **pnpm** package manager

### Platform-Specific Requirements

#### macOS
- **Xcode Command Line Tools**: Required for compilation
- **macOS Private API**: Enabled in configuration for full transparency support
  - This is configured via `macOSPrivateApi: true` in `tauri.conf.json`
  - Required for transparent window backgrounds on macOS

#### Windows
- Native transparency support via Tauri

#### Linux
- Transparency support varies by window manager

## Development

### First Time Setup

1. **Install Rust** (if not already installed):
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"
```

2. **Set Node version**:
```bash
nvm use 22
```

3. **Install dependencies**:
```bash
pnpm install
```

### Running the App

```bash
# Make sure Cargo is in your PATH
source "$HOME/.cargo/env"

# Run in development mode
pnpm run tauri dev
```

The first build will take a while as Cargo downloads and compiles all dependencies. Subsequent builds will be much faster.

### Building for Production

```bash
pnpm run tauri build
```

## Project Structure

```
desktop-pet/
├── src/                    # Frontend source code
│   ├── main.ts            # TypeScript entry point
│   ├── styles.css         # Global styles
│   └── assets/            # Static assets
├── src-tauri/             # Rust backend
│   ├── src/
│   │   ├── main.rs        # Rust entry point
│   │   └── lib.rs         # Library code
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
└── index.html             # Main HTML entry
```

## Configuration

Window behavior is configured in `src-tauri/tauri.conf.json`:
- **Size**: 200x200 pixels (matches pet container)
- **Transparency**: Enabled with macOS private API support
- **Decorations**: Disabled (frameless window)
- **Always on Top**: Enabled
- **Skip Taskbar**: Enabled

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

