import Phaser from 'phaser';

export class TutorialText {
  private scene: Phaser.Scene;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.text = scene.add.text(10, 10,
      'Mouse to aim ship\nLeft click to move',
      { color: '#ffffff', fontSize: '18px', align: 'left' }
    ).setScrollFactor(0).setOrigin(0, 0);
  }
}
