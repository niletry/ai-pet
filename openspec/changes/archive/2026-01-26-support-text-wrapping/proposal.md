# Proposal: Support Text Wrapping in Speech Bubble

## Summary
Update the speech bubble styling to support text wrapping for longer dynamic messages.

## Background
Dynamic messages from the API can be long. The current `white-space: nowrap` styling causes these messages to be clipped or overflow the window. Enabling text wrapping will ensure all content is readable.

## Goals
- Allow text to wrap within the speech bubble.
- Set a maximum width for the bubble to keep it within window bounds.
- Ensure the bubble remains centered and legible with multi-line text.

## Plan
1.  Modify `index.html` CSS for `.speech-bubble`:
    - Change `white-space: nowrap` to `white-space: normal`.
    - Set `max-width: 180px` (window is 200px).
    - Add `word-break: break-word` for safety.
    - Set `text-align: center`.
