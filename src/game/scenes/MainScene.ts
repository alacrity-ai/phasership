import Phaser from 'phaser';
import { PlayerShip } from '../objects/PlayerShip';
import { Starfield } from '../objects/Starfield';
import { TutorialText } from '../systems/TutorialText';
import { InputManager } from '../input/InputManager';

export class MainScene extends Phaser.Scene {
  private playerShip!: PlayerShip;
  private starfield!: Starfield;
  private inputManager!: InputManager;

  constructor() {
    super('MainScene');
  }

  preload() {
    // Load ship image
    this.load.image('player-ship', 'assets/Ship_1.png');

    // Generate a simple 2x2 white pixel texture for particles
    const graphics = this.make.graphics();
    graphics.fillStyle(0xffffff);
    graphics.fillRect(0, 0, 2, 2);
    graphics.generateTexture('pixel', 2, 2);
    graphics.destroy();
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.starfield = new Starfield(this, width, height);
    this.playerShip = new PlayerShip(this, width / 2, height / 2);
    new TutorialText(this);

    this.inputManager = new InputManager(this);
  }

  update(time: number, delta: number) {
    this.inputManager.update();

    const input = this.inputManager.getState();
    const width = this.scale.width;
    const height = this.scale.height;

    const aimDirection = new Phaser.Math.Vector2(
      input.mouseX - width / 2,
      input.mouseY - height / 2
    ).normalize();

    // Update player ship orientation
    this.playerShip.aimAt(this.inputManager.getPointer());

    // Update thrust easing (ramp up/down smoothly)
    this.playerShip.updateThrust(input.mouseDown, delta);

    // Update starfield scrolling
    this.starfield.update(aimDirection, input.mouseDown);
  }
}
