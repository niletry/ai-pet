export type ActionName = 'idle' | 'random' | string;

export interface Frame {
  row: number;
  col: number;
}

export interface CharacterAction {
  name: ActionName;
  frames: Frame[];
  interval?: number; // Optional custom interval for this action in ms
}

export interface CharacterConfig {
  id: string;
  name: string;
  imagePath: string; // The import path
  grid: {
    rows: number;
    cols: number;
  };
  actions: Record<string, CharacterAction>;
  defaultAction: string;
}

// Since we use Vite, we can import the assets directly.
// @ts-ignore
import owlSprites from './assets/owl-sprites.png';
// @ts-ignore
import waterSprites from './assets/water-sprites.png';

export const characters: Record<string, CharacterConfig> = {
  owl: {
    id: 'owl',
    name: 'Owl',
    imagePath: owlSprites,
    grid: { rows: 3, cols: 3 },
    defaultAction: 'random',
    actions: {
      random: {
        name: 'random',
        // Define available frames for random picking
        frames: [
          { row: 0, col: 0 },
          { row: 0, col: 1 },
          { row: 0, col: 2 },
          { row: 1, col: 0 },
          { row: 1, col: 1 },
          { row: 1, col: 2 },
          { row: 2, col: 0 },
          { row: 2, col: 1 },
          { row: 2, col: 2 },
        ],
        interval: 3000
      }
    }
  },
  water: {
    id: 'water',
    name: 'Water Sprite',
    imagePath: waterSprites,
    grid: { rows: 1, cols: 6 }, // 1 row, 6 columns for 2160x360 image
    defaultAction: 'hello',
    actions: {
      hello: {
        name: 'hello',
        frames: [
          { row: 0, col: 0 },
          { row: 0, col: 1 },
          { row: 0, col: 2 },
          { row: 0, col: 3 },
          { row: 0, col: 4 },
          { row: 0, col: 5 }
        ],
        interval: 200 // 200ms per frame for smooth animation
      }
    }
  }
};
