import { GameObjects, Scene } from 'phaser';

export class Hotbar extends GameObjects.Container {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    const slotSize = 48;

    for (let i = 0; i < 5; i++) {
      const slot = scene.add
        .rectangle(i * (slotSize + 10), 0, slotSize, slotSize, 0x222222)
        .setStrokeStyle(2, 0xffffff);

      this.add(slot);
    }
  }
}
