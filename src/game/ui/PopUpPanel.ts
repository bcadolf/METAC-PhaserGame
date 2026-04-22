import { GameObjects, Scene } from 'phaser';
import { EQUIP_LIBRARY } from '../data/EquipData';
import { Player } from '../classes/Player';

export class PopUpPanel extends GameObjects.Container {
  private mode: 'inventory' | 'shop' = 'inventory';
  private shopItems: any[] = [];
  private shopFilter: string = 'STARTER';
  public player: Player;

  private title!: Phaser.GameObjects.Text;
  private grid!: Phaser.GameObjects.Container;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    const bg = scene.add.rectangle(0, 0, 400, 300, 0x000000, 0.8).setOrigin(0);

    this.title = scene.add.text(20, 10, 'Inventory', {
      fontSize: '24px',
      color: '#fff',
    });

    this.grid = scene.add.container(20, 50);

    this.add([bg, this.title, this.grid]);
  }

  setMode(mode: 'inventory' | 'shop', shopFilter: string) {
    this.mode = mode;

    if (mode === 'inventory') {
      this.title.setText('Inventory');
      this.renderInventory();
    }

    if (mode === 'shop') {
      this.title.setText('Shop');
      this.shopFilter = shopFilter;

      const equipList = [
        ...Object.values(EQUIP_LIBRARY.shields),
        ...Object.values(EQUIP_LIBRARY.weapons),
      ];

      this.shopItems = equipList.filter((filtItems) => {
        return filtItems.name.includes(shopFilter);
      });

      this.renderShop();
    }
  }

  private renderInventory() {
    this.grid.removeAll(true);

    for (let i = 0; i < 3; i++) {
      const slot = this.scene.add
        .rectangle(i * 60, 0, 48, 48, 0x444444)
        .setStrokeStyle(2, 0xffffff)
        .setInteractive();

      slot.on('pointerdown', () => {
        console.log('Equip / Use item');
        // this.player.equipItem();
      });

      this.grid.add(slot);
    }
  }

  private renderShop() {
    this.grid.removeAll(true);

    this.shopItems.forEach((item, i) => {
      const slot = this.scene.add
        .rectangle(i * 60, 0, 48, 48, 0x222222)
        .setStrokeStyle(2, 0x00ff00)
        .setInteractive();

      slot.on('pointerdown', () => {
        console.log('Buy item:', item.name);
      });

      this.grid.add(slot);
    });
  }
}
