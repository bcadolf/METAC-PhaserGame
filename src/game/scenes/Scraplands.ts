import { Scene } from 'phaser';
import { Player } from '../objects/Player';

export class Scraplands extends Scene {
  background: Phaser.GameObjects.Image;
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;

  constructor() {
    super('Scraplands');
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.camera = this.cameras.main;

    this.background = this.add
      .image(centerX, centerY, 'scrapland1')
      .setDisplaySize(this.scale.width, this.scale.height);
  }
}
