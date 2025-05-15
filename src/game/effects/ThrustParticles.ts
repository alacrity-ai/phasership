import Phaser from 'phaser';

export class ThrustParticles {
  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor(scene: Phaser.Scene, followTarget: Phaser.GameObjects.Sprite) {
    const textureKey = 'pixel';

    this.emitter = scene.add.particles(0, 0, textureKey, {
      tint: [0xffff00, 0xff8800, 0xff4400],
      speed: { min: 80, max: 160 },
      // We'll set velocity directly instead of using angle
      scale: { start: 0.8, end: 0 },
      alpha: { start: 1, end: 0 },
      lifespan: { min: 500, max: 1200 },
      quantity: 1,
      frequency: 50,
      blendMode: Phaser.BlendModes.ADD,
      emitting: false,
      follow: followTarget,
      followOffset: { x: 0, y: 0 }
    });
  }

  setActive(active: boolean): void {
    this.emitter.emitting = active;
  }

  /**
   * Updates emission intensity and other dynamic properties
   */
  setIntensity(intensity: number): void {
    this.emitter.quantity = Math.ceil(intensity * 2);
    // We'll handle speed in setDirection to combine with direction
  }

  /**
   * Updates the emitter's angle based on ship rotation (inverse of aim direction)
   */
  setDirection(angleRad: number): void {
    // Compute backward vector (opposite to facing)
    const thrustVector = new Phaser.Math.Vector2(0, 1).rotate(angleRad - Math.PI / 2);

    const baseSpeed = 120;

    // Simulate spread by giving ranges to speedX and speedY
    this.emitter.speedX = {
      min: thrustVector.x * (baseSpeed - 30),
      max: thrustVector.x * (baseSpeed + 30)
    };

    this.emitter.speedY = {
      min: thrustVector.y * (baseSpeed - 30),
      max: thrustVector.y * (baseSpeed + 30)
    };
  }

  updateOffset(angleRad: number): void {
    const offsetDistance = 10;

    // Correct: offset downward (local +Y), rotated into world space
    const offsetVector = new Phaser.Math.Vector2(0, offsetDistance).rotate(angleRad);

    this.emitter.followOffset.x = offsetVector.x;
    this.emitter.followOffset.y = offsetVector.y;
  }

  destroy(): void {
    this.emitter.destroy();
  }
}