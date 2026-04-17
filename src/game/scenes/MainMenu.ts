import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  playButton: GameObjects.Text;
  metac1: GameObjects.Image;
  metac2: GameObjects.Image;

  constructor() {
    super('MainMenu');
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.background = this.add
      .image(centerX, centerY, 'background')
      .setDisplaySize(this.scale.width, this.scale.height);

    this.logo = this.add.image(centerX, centerY - 120, 'logo').setScale(0.7);

    this.metac1 = this.add
      .image(centerX - 300, centerY + 120, 'Metac1-display')
      .setScale(0.4);
    this.metac2 = this.add
      .image(centerX + 300, centerY + 120, 'Metac2-display')
      .setScale(0.34);

    this.playButton = this.add
      .text(centerX, centerY + 200, 'Start Game', {
        fontSize: '32px',
        color: '#2d3f4fe4',
        stroke: '#ffffff',
        strokeThickness: 2,
        align: 'center',
        fontFamily: 'Arial Black',
        backgroundColor: '#5be6ff',
        padding: { x: 15, y: 10 },
      })
      .setOrigin(0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('HomeBase');
    });
  }
}
