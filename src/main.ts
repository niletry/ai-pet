import { getCurrentWindow } from '@tauri-apps/api/window';
import { characters, CharacterConfig } from './characters';

// Select which character to use here ('owl' or 'water')
let currentCharacterId = 'water'; 

function switchCharacter() {
  currentCharacterId = currentCharacterId === 'owl' ? 'water' : 'owl';
  startLifeCycle();
}

console.log('🐾 Desktop Pet initialized');

let animationTimer: number | null = null;
let currentFrameIndex = 0;

function setSpriteFrame(sprite: HTMLElement, config: CharacterConfig, row: number, col: number) {
  if (sprite.style.backgroundImage !== `url("${config.imagePath}")`) {
    sprite.style.backgroundImage = `url("${config.imagePath}")`;
  }
  
  // Set the size dynamically based on grid
  sprite.style.backgroundSize = `${config.grid.cols * 100}% ${config.grid.rows * 100}%`;

  // Calculate position: mapping column index to percentage and handling 1-column case
  const posX = config.grid.cols > 1 ? (col / (config.grid.cols - 1)) * 100 : 0;
  const posY = config.grid.rows > 1 ? (row / (config.grid.rows - 1)) * 100 : 0;

  sprite.style.backgroundPosition = `${posX}% ${posY}%`;
}

function playAction(actionName: string) {
  const sprite = document.getElementById('pet-sprite');
  const config = characters[currentCharacterId];
  if (!sprite || !config) return;

  const action = config.actions[actionName];
  if (!action) return;

  if (animationTimer) {
    clearInterval(animationTimer);
  }

  currentFrameIndex = 0;

  // Render first frame immediately
  if (action.frames.length > 0) {
    const f = action.frames[currentFrameIndex];
    setSpriteFrame(sprite, config, f.row, f.col);
  }

  const interval = action.interval || 3000;

  // Behavior loop
  animationTimer = window.setInterval(() => {
    if (action.frames.length === 0) return;

    if (action.name === 'random') {
      const idx = Math.floor(Math.random() * action.frames.length);
      const f = action.frames[idx];
      setSpriteFrame(sprite, config, f.row, f.col);
    } else {
      currentFrameIndex = (currentFrameIndex + 1) % action.frames.length;
      const f = action.frames[currentFrameIndex];
      setSpriteFrame(sprite, config, f.row, f.col);
    }
  }, interval);
}

function startLifeCycle() {
  const config = characters[currentCharacterId];
  if (config) {
    playAction(config.defaultAction);
  }
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

    // 3. Setup Radial Menu (Right Click)
    const radialMenu = document.getElementById('radial-menu');
    petContainer.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      radialMenu?.classList.toggle('active');
    });

    // Close menu when clicking elsewhere on the pet container
    petContainer.addEventListener('click', (e) => {
      // @ts-ignore
      if (radialMenu?.classList.contains('active') && !e.target.closest('.menu-item')) {
        radialMenu.classList.remove('active');
      }
    });

    // Setup Menu Actions
    document.getElementById('menu-close')?.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        const appWindow = getCurrentWindow();
        await appWindow.close();
      } catch (error) {
        console.error('Failed to close window:', error);
      }
    });

    document.getElementById('menu-talk')?.addEventListener('click', async (e) => {
      e.stopPropagation();
      radialMenu?.classList.remove('active');
      await showRoast();
    });

    document.getElementById('menu-switch')?.addEventListener('click', (e) => {
      e.stopPropagation();
      radialMenu?.classList.remove('active');
      switchCharacter();
    });

    document.getElementById('menu-settings')?.addEventListener('click', (e) => {
      e.stopPropagation();
      // Placeholder for now
      radialMenu?.classList.remove('active');
      console.log('Settings clicked!');
    });
  }

  // 3. Start Animation
  startLifeCycle();
});
