import Phaser from 'phaser';
import { MainScene } from './scenes/MainScene';

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#000000',
  scene: [MainScene],
  parent: 'phaser-container',
};
