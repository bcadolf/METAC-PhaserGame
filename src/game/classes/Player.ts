import { Physics, Input, Scene, Types } from 'phaser';
import { Shield, Weapon } from './Equipment';
import { EQUIP_LIBRARY } from '../data/EquipData';

export class Player extends Physics.Arcade.Sprite {
  private cursors: Types.Input.Keyboard.CursorKeys;
  private wasd: any;
  private baseSpeed: number = 100;
  public activeShield: Shield;
  public activeWeapon: Weapon;
  public chips: number;
  private nextAttackTime: number = 0;

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

    // starting weapons
    this.activeShield = scene.registry.get('activeShield');
    this.activeWeapon = scene.registry.get('activeWeapon');
  }

  static createAnimations(scene: Scene) {
    const anims = scene.anims;

    anims.create({
      key: 'move-forward',
      frames: anims.generateFrameNumbers('Metac1', { start: 0, end: 29 }),
      frameRate: 15,
      repeat: -1,
    });
  }

  equipItem(item: Shield | Weapon) {
    if (item instanceof Shield) {
      this.activeShield = item;
      this.scene.registry.set('activeShield', item);
    } else if (item instanceof Weapon) {
      this.activeWeapon = item;
      this.scene.registry.set('activeWeapon', item);
    }
  }

  takeDamage(amount: number) {
    const isHit = this.activeShield.useEnergy(amount);
    if (isHit) {
      this.scene.scene.start('GameOver');
    }
  }

  startAttack(time: number) {
    if (time < this.nextAttackTime) {
      return;
    }

    this.activeWeapon.attack();
    this.nextAttackTime = time + this.activeWeapon.attackSpeed;
  }

  update(time: number) {
    if (this.cursors.space && this.cursors.space.isDown) {
      this.startAttack(time);
    }

    // movement
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
