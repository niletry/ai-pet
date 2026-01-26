# Proposal: Add Thinking Indicator

## Summary
Display a "thinking" state (e.g., "...") in the speech bubble while fetching dynamic roasts from the API.

## Background
The API call to fetch a roast can take a moment. Providing immediate visual feedback (a "thinking" indicator) makes the interaction feel more responsive.

## Goals
- Immediately show a thinking indicator ("...") when the roast interaction is triggered.
- Keep the thinking indicator visible until the API response is received or fails.

## Plan
1. Update `showRoast()` in `src/main.ts`:
   - Set the speech bubble text to "..." immediately.
   - Show the bubble.
   - Perform the `fetch`.
   - Update with the fetched message (or fallback).
