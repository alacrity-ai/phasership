import { useEffect } from 'react';
import Phaser from 'phaser';
import { phaserConfig } from '../game/Game';

export const GameCanvas = () => {
  useEffect(() => {
    const game = new Phaser.Game(phaserConfig);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-container" style={{ width: '1280px', height: '720px' }} />;
};
