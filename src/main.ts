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

// Roast Configuration
const ROASTS = [
  "别点我，我在摸鱼",
  "你的代码写完了吗？",
  "好累啊，想下班",
  "这就是你写的bug吗？",
  "这就是你写的 feature 吗？",
  "求求你别动鼠标了",
  "再点我就报错给你看！"
];

async function showRoast() {
  const bubble = document.getElementById('speech-bubble');
  if (!bubble) return;

  // Immediate feedback: Show thinking indicator
  bubble.textContent = '...';
  bubble.classList.remove('hidden');

  // Pick random roast as fallback
  let text = ROASTS[Math.floor(Math.random() * ROASTS.length)];

  try {
    // Attempt to fetch dynamic roast
    const response = await fetch('https://flipside-api.code123.in/pet/interact');
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.message) {
        text = data.message;
      }
    }
  } catch (error) {
    console.error('Failed to fetch dynamic roast:', error);
  }

  // Update with final text
  bubble.textContent = text;

  // Hide after 4 seconds (increased slightly for potentially longer dynamic messages)
  const existingTimeout = bubble.getAttribute('data-timeout');
  if (existingTimeout) {
    clearTimeout(parseInt(existingTimeout));
  }

  const timeoutId = window.setTimeout(() => {
    bubble.classList.add('hidden');
    bubble.removeAttribute('data-timeout');
  }, 4000);

  bubble.setAttribute('data-timeout', timeoutId.toString());
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Dragging
  const petContainer = document.querySelector('#pet-container');
  if (petContainer) {
    petContainer.addEventListener('mousedown', async (e) => {
      // Only drag on left click
      // @ts-ignore
      if (e.button === 0) { 
        e.preventDefault();
        try {
          const appWindow = getCurrentWindow();
          await appWindow.startDragging();
        } catch (error) {
          console.error('Failed to start dragging:', error);
        }
      }
    });

    // 2. Setup Roast Interaction (Double Click to avoid drag conflict)
    petContainer.addEventListener('dblclick', async (e) => {
      e.stopPropagation(); // Prevent bubbling
      e.preventDefault(); // Prevent accidental maximize behavior
      await showRoast();
    });
  }

  // 3. Start Animation
  startLifeCycle();
});
