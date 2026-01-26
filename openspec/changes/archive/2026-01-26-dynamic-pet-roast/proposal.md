# Proposal: Dynamic Pet Roast

## Summary
Replace the static list of roast phrases with dynamic content fetched from an external API.

## Background
Currently, the pet's "roasts" are picked from a hardcoded array. The user wants to use a dynamic API (`https://flipside-api.code123.in/pet/interact`) to provide fresher and more varied content.

## Goals
- Fetch a roast message from `https://flipside-api.code123.in/pet/interact` when the pet is interacting.
- Display the `message` field from the API response in the speech bubble.
- Implement error handling to fall back to a default message if the API is unreachable.

## Plan
1.  Modify `src/main.ts` to replace the local array logic in `showRoast()` with an `async` fetch call.
2.  Handle the JSON response and update the speech bubble text.
3.  Add basic error catching for network issues.
