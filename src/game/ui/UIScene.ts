import { Scene } from 'phaser';
import { Hotbar } from './Hotbar';
import { PopUpPanel } from './PopUpPanel';

export class UIScene extends Scene {
  private hotbar!: Hotbar;
  private popUpPanel!: PopUpPanel;

  constructor() {
    super('UIScene');
  }

  create() {
    // always visible
    this.hotbar = new Hotbar(this, 32, this.scale.height - 32);

    // hide at until called
    this.popUpPanel = new PopUpPanel(this, 100, 50);
    this.popUpPanel.setVisible(false);

    //popup box content logic
    const keyI = this.input.keyboard?.addKey('I');
    keyI?.on('down', () => {
      //   this.popUpPanel.setMode('inventory');
      this.popUpPanel.setVisible(true);
    });

    this.events.on('open-shop', () => {
      this.popUpPanel.setMode('shop', 'STARTER');
      this.popUpPanel.setVisible(true);
    });
  }
}
