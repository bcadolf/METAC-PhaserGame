import { Scene } from 'phaser';
import { EQUIP_LIBRARY } from '../data/EquipData';
import { Player } from '../classes/Player';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    const progressBarWidth = Math.floor(this.scale.width * 0.72);

    //  We loaded this image in our Boot Scene, so we can display it here
    this.add
      .image(centerX, centerY, 'background')
      .setDisplaySize(this.scale.width, this.scale.height);

    //  A simple progress bar. This is the outline of the bar.
    this.add
      .rectangle(centerX, centerY, progressBarWidth, 32)
      .setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add
      .rectangle(centerX - progressBarWidth / 2 + 2, centerY, 4, 28, 0xffffff)
      .setOrigin(0, 0.5);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      bar.width = 4 + (progressBarWidth - 4) * progress;
    });
  }

  preload() {
    this.load.setPath('assets');

    //METAC Robots
    this.load.image('Metac1-display', 'sprites/Metac-robot1.png');
    this.load.image('Metac2-display', 'sprites/Metac2.png');
    this.load.spritesheet('Metac1', 'sprites/metac1-forward.png', {
      frameWidth: 170.667,
      frameHeight: 160.5,
    });

    // textiles
    this.load.image('home-base', 'textiles/home-base.png');
    this.load.image('scrapland1', 'textiles/Scraplands.png');
    this.load.image('logo', 'logo.png');
  }

  create() {
    const starterWeapon = EQUIP_LIBRARY.weapons.STARTER();
    const starterShield = EQUIP_LIBRARY.shields.STARTER();

    // registry defaults still need chips, possibly
    this.registry.set('activeWeapon', starterWeapon);
    this.registry.set('activeShield', starterShield);

    //animation keys
    Player.createAnimations(this);

    this.scene.start('MainMenu');
  }
}
