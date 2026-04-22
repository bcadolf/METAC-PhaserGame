import { Scene } from 'phaser';
import { Player } from '../classes/Player';

interface SceneData {
  from: string;
}

export class Scraplands extends Scene {
  background: Phaser.GameObjects.Image;
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;
  spawnXY: { x: number; y: number };
  pit: Phaser.Physics.Arcade.StaticBody;

  constructor() {
    super('Scraplands');
  }

  init(data: SceneData) {
    if (data.from == 'HomeBase') {
      this.spawnXY = { x: 0, y: 300 };
    }
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.camera = this.cameras.main;

    this.background = this.add
      .image(centerX, centerY, 'scrapland1')
      .setDisplaySize(this.scale.width, this.scale.height);

    // animations

    // interactive scene objects
    this.pit = this.physics.add.staticBody(200, 200, 96, 96);

    this.player = new Player(this, this.spawnXY.x, this.spawnXY.y);

    this.physics.add.collider(this.player, this.pit, () => {
      this.player.takeDamage(1);
      this.pit.destroy();
    });
  }

  update(time: number) {
    this.player.update(time);
  }
}
