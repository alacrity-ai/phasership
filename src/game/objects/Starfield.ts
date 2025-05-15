import Phaser from 'phaser';

type StarLayer = {
  stars: Phaser.GameObjects.Arc[];
  speedMultiplier: number;
};

export class Starfield {
  private scene: Phaser.Scene;
  private width: number;
  private height: number;
  private layers: StarLayer[] = [];

  constructor(scene: Phaser.Scene, width: number, height: number) {
    this.scene = scene;
    this.width = width;
    this.height = height;

    // Foreground layer: bright, dense, fastest
    this.layers.push(this.createLayer(100, 0xffffff, 1.5));

    // Midground layer: medium brightness, medium speed
    this.layers.push(this.createLayer(70, 0xaaaaaa, 0.75));

    // Background layer: dimmer, slower
    this.layers.push(this.createLayer(40, 0x666666, 0.3));

    // Ultra background layer: very faint, very slow, very sparse
    this.layers.push(this.createLayer(20, 0x444444, 0.1));
  }

  private createLayer(count: number, color: number, speedMultiplier: number): StarLayer {
    const stars: Phaser.GameObjects.Arc[] = [];

    for (let i = 0; i < count; i++) {
      const x = Phaser.Math.Between(0, this.width);
      const y = Phaser.Math.Between(0, this.height);
      const radius = Phaser.Math.Between(1, 2);
      const alpha = Phaser.Math.Clamp(speedMultiplier, 0.1, 1.0); // Dimmer for slower layers

      const star = this.scene.add.circle(x, y, radius, color)
        .setAlpha(alpha)
        .setScrollFactor(0);

      stars.push(star);
    }

    return { stars, speedMultiplier };
  }

  update(direction: Phaser.Math.Vector2, moving: boolean) {
    if (!moving) return;

    const baseSpeed = 1.0; // Global base speed (keeps it subtle)

    for (const layer of this.layers) {
      const moveX = -direction.x * baseSpeed * layer.speedMultiplier;
      const moveY = -direction.y * baseSpeed * layer.speedMultiplier;

      for (const star of layer.stars) {
        star.x += moveX;
        star.y += moveY;

        // Wrap stars around the edges
        if (star.x < 0) star.x += this.width;
        if (star.x > this.width) star.x -= this.width;
        if (star.y < 0) star.y += this.height;
        if (star.y > this.height) star.y -= this.height;
      }
    }
  }
}
