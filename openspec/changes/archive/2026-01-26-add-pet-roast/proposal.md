# Proposal: Add Pet Roast Interaction

## Summary
Add a "Roast" (吐槽) feature where clicking the pet triggers a speech bubble with a witty or complaining message.

## Background
The user wants the pet to have a "complaining" function. Currently, the pet is passive. Adding a speech bubble interaction when clicked will make the pet feel more alive and entertaining.

## Goals
- Add a text bubble component that appears near the pet.
- Trigger the bubble on click (left click on pet).
- Display random messages from a predefined list of "roasts".
- Auto-hide the bubble after a few seconds.

## Non-Goals
- AI-generated responses (using hardcoded list for now).
- Sound effects.

## Plan
1.  **UI Components**: Add a speech bubble HTML structure in `index.html` and styles in `styles.css`.
2.  **Logic**: Update `src/main.ts` to handle click events on the pet (separate from drag).
    - Note: Need to distinguish click from drag start. `mousedown` starts drag. `click` might be consumed by drag?
    - Alternatively, use right-click (context menu) or a specific non-drag button?
    - Simplest: `mousedown` starts drag, but if released quickly without moving effectively, it's a click. Or just add a separate specific interaction area or use `dblclick`.
    - Let's try `click` event first. Tauri's `startDragging` on `mousedown` might prevent `click`.
    - **Strategy**: We will check if `startDragging` interferes. If so, we can use a "Double Click" to roast, or just add the click listener. Usually `mousedown` for drag doesn't fire `click` if the window moves.
3.  **Content**: Add a list of phrases (Chinese) as requested ("吐槽").

## Design Details
- **Bubble**: Absolute positioned div above or beside the pet.
- **Phrases**:
  - "别点我，我在摸鱼" (Don't click me, I'm slacking off)
  - "你的代码写完了吗？" (Is your code finished?)
  - "好累啊，想下班" (So tired, want to go home)
  - "这就是你写的bug吗？" (Is this the bug you wrote?)
