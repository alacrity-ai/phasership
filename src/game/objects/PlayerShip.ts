import Phaser from 'phaser';
import { ThrustParticles } from '../effects/ThrustParticles';

export class PlayerShip extends Phaser.GameObjects.Sprite {
  private thrustParticles: ThrustParticles;
  private thrustIntensity: number = 0;  // 0 = idle, 1 = max thrust
  private thrustSpeed: number = 2;      // Adjust how fast it ramps up/down (units per second)

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player-ship');
    scene.add.existing(this);
    this.setOrigin(0.5, 0.5);

    // Attach thrust particles to ship
    this.thrustParticles = new ThrustParticles(scene, this);
  }

  aimAt(pointer: Phaser.Input.Pointer) {
    const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY);
    this.setRotation(angle + Math.PI / 2);
  }

  /**
   * Call every frame to update thrust intensity & particles
   * @param isThrusting Whether the player is holding thrust
   * @param delta Time delta (ms)
   */
  updateThrust(isThrusting: boolean, delta: number) {
    const deltaSeconds = delta / 1000;

    // Smooth thrust easing
    if (isThrusting) {
      this.thrustIntensity = Phaser.Math.Clamp(this.thrustIntensity + this.thrustSpeed * deltaSeconds, 0, 1);
    } else {
      this.thrustIntensity = Phaser.Math.Clamp(this.thrustIntensity - this.thrustSpeed * deltaSeconds, 0, 1);
    }

    // Update particles
    this.thrustParticles.setActive(this.thrustIntensity > 0.01);
    this.thrustParticles.setIntensity(this.thrustIntensity);

    // Update emitter angle based on current ship rotation
    this.thrustParticles.setDirection(this.rotation);
    this.thrustParticles.updateOffset(this.rotation);
  }
}
