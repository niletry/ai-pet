import { getCurrentWindow } from '@tauri-apps/api/window';

console.log('🐾 Desktop Pet initialized');

// Initialize drag functionality when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
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
});
