import Phaser from 'phaser';

export type InputState = {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  fire: boolean;
  mouseX: number;
  mouseY: number;
  mouseDown: boolean;
};

export class InputManager {
  private scene: Phaser.Scene;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private fireKey: Phaser.Input.Keyboard.Key;
  private inputState: InputState;
  private pointer: Phaser.Input.Pointer;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    // Safe non-null assertions (input.keyboard is guaranteed post-create)
    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.fireKey = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Track primary pointer (mouse or touch)
    this.pointer = scene.input.activePointer;

    this.inputState = {
      left: false,
      right: false,
      up: false,
      down: false,
      fire: false,
      mouseX: 0,
      mouseY: 0,
      mouseDown: false,
    };

    // Pointer movement listener
    scene.input.on('pointermove', this.handlePointerMove, this);

    // Pointer button state
    scene.input.on('pointerdown', () => { this.inputState.mouseDown = true; });
    scene.input.on('pointerup', () => { this.inputState.mouseDown = false; });
  }

  private handlePointerMove(pointer: Phaser.Input.Pointer) {
    this.inputState.mouseX = pointer.worldX;
    this.inputState.mouseY = pointer.worldY;
  }

  update() {
    const { left, right, up, down } = this.cursors;

    this.inputState.left = !!left?.isDown;
    this.inputState.right = !!right?.isDown;
    this.inputState.up = !!up?.isDown;
    this.inputState.down = !!down?.isDown;
    this.inputState.fire = this.fireKey.isDown;
  }

  getState(): InputState {
    return this.inputState;
  }

  // === Convenience Helpers ===

  /** Returns Phaser Pointer object (for advanced use) */
  getPointer(): Phaser.Input.Pointer {
    return this.pointer;
  }

  /** Returns true if left mouse button is down */
  isClicking(): boolean {
    return this.inputState.mouseDown;
  }
}
