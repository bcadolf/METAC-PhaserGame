import { Scene } from 'phaser';
import { Player } from '../objects/Player';

export class HomeBase extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  transitionExit: Phaser.Physics.Arcade.StaticBody;
  player: Player;
  walls: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super('HomeBase');
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.camera = this.cameras.main;

    this.background = this.add
      .image(centerX, centerY, 'home-base')
      .setDisplaySize(this.scale.width, this.scale.height);

    // interactive scene objects
    this.walls = this.physics.add.staticGroup();

    const wallData = [
      { x: centerX - 216, y: 36, w: 800, h: 64 },
      { x: centerX - 216, y: this.scale.height - 36, w: 800, h: 64 },
      { x: 36, y: centerY, w: 64, h: this.scale.height },
      { x: 816, y: centerY + 240, w: 38, h: 230 },
      { x: 848, y: centerY - 200, w: 98, h: 260 },
      { x: 1050, y: 128, w: 400, h: 16 },
      { x: 955, y: centerY - 78, w: 116, h: 26 },
      { x: this.scale.width - 78, y: centerY - 145, w: 152, h: 170 },
    ];

    wallData.forEach((data) => {
      const wall = this.add.zone(data.x, data.y, data.w, data.h);
      this.physics.add.existing(wall, true);
      this.walls.add(wall);
    });

    this.transitionExit = this.physics.add.staticBody(
      this.scale.width - 2,
      300,
      2,
      184,
    );

    this.player = new Player(this, centerX, centerY);

    // collisions
    this.physics.add.overlap(this.player, this.transitionExit, () => {
      this.scene.start('Scraplands');
    });
    this.physics.add.collider(this.player, this.walls, () => {
      this.player.setVelocity(0);
    });
  }

  update() {
    this.player.update();
    this.player.createAnimations(this);
  }
}
