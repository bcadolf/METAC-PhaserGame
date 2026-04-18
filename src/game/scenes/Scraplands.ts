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

    this.player = new Player(this, this.spawnXY.x, this.spawnXY.y);
  }

  update(time: number) {
    this.player.update(time);
    this.player.createAnimations(this);
  }
}
