import { Physics, Input, Scene, Types } from 'phaser';

export class Player extends Physics.Arcade.Sprite {
  cursors: Types.Input.Keyboard.CursorKeys;
  wasd: any;
  baseSpeed: number = 100;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'Metac1');
    this.setDisplaySize(64, 64);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.wasd = scene.input.keyboard!.addKeys({
      up: Input.Keyboard.KeyCodes.W,
      down: Input.Keyboard.KeyCodes.S,
      left: Input.Keyboard.KeyCodes.A,
      right: Input.Keyboard.KeyCodes.D,
    });
  }

  createAnimations(scene: Scene) {
    const anims = scene.anims;

    anims.create({
      key: 'move-forward',
      frames: anims.generateFrameNumbers('Metac1', { start: 0, end: 35 }),
      frameRate: 15,
      repeat: -1,
    });
  }

  update() {
    const up = this.cursors.up.isDown || this.wasd.up.isDown;
    const down = this.cursors.down.isDown || this.wasd.down.isDown;
    const left = this.cursors.left.isDown || this.wasd.left.isDown;
    const right = this.cursors.right.isDown || this.wasd.right.isDown;
    const body = this.body as Physics.Arcade.Body;

    body.setVelocity(0);

    if (up) {
      body.setVelocityY(-this.baseSpeed);
    } else if (down) {
      body.setVelocityY(this.baseSpeed);
    }

    if (left) {
      body.setVelocityX(-this.baseSpeed);
    } else if (right) {
      body.setVelocityX(this.baseSpeed);
    }

    body.velocity.normalize().scale(this.baseSpeed);

    if (this.body!.velocity.length() > 0) {
      this.rotation =
        Math.atan2(body.velocity.y, body.velocity.x) - Math.PI / 2;

      this.play('move-forward', true);
    } else {
      this.stop();
    }
  }
}
