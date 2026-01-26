import { getCurrentWindow } from '@tauri-apps/api/window';
// @ts-ignore
import owlSprites from './assets/owl-sprites.png';

console.log('🐾 Desktop Pet initialized');

// Sprite Configuration
const ANIMATION_INTERVAL = 3000; // 3 seconds
const SPRITE_GRID = [
  ['0% 0%', '50% 0%', '100% 0%'],
  ['0% 50%', '50% 50%', '100% 50%'],
  ['0% 100%', '50% 100%', '100% 100%']
];

function setSprite(sprite: HTMLElement, row: number, col: number) {
  // Set background image if not set (using imported path)
  if (!sprite.style.backgroundImage) {
    sprite.style.backgroundImage = `url("${owlSprites}")`;
  }
  sprite.style.backgroundPosition = SPRITE_GRID[row][col];
}

function startLifeCycle() {
  const sprite = document.getElementById('pet-sprite');
  if (!sprite) return;

  // Initial pose
  setSprite(sprite, 0, 0);

  // Behavior loop
  setInterval(() => {
    // Random simple behavior: pick a random frame for now
    // In a real app, this would be a state machine
    const row = Math.floor(Math.random() * 3);
    const col = Math.floor(Math.random() * 3);
    setSprite(sprite, row, col);
  }, ANIMATION_INTERVAL);
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Dragging
  const petContainer = document.querySelector('#pet-container');
  if (petContainer) {
    petContainer.addEventListener('mousedown', async (e) => {
      e.preventDefault();
      try {
        const appWindow = getCurrentWindow();
        await appWindow.startDragging();
      } catch (error) {
        console.error('Failed to start dragging:', error);
      }
    });
  }

  // 2. Start Animation
  startLifeCycle();
});
