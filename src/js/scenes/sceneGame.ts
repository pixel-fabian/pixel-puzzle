import 'phaser';
import SCENES from '../constants/SceneKeys';
export default class SceneGame extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.GAME,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    const camera = this.cameras.add(0, 0, 800, 600);
    // background
    camera.setBackgroundColor('rgba(50, 50, 50, 1)');
    this._createFields();
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  onPressField(field) {
    console.log(field);
  }

  _createFields() {
    const size = 50;
    const number = 10;
    const fields = [];
    let x = 20;
    let y = 20;

    for (let row = 0; row < number; row++) {
      for (let column = 0; column < number; column++) {
        const rect = this.add
          .rectangle(x, y, size, size, 0x222222)
          .setStrokeStyle(1, 0xffffff)
          .setOrigin(0);
        rect.setInteractive({ useHandCursor: true });
        rect.on('pointerover', () => {
          rect.setFillStyle(0x444444);
        });
        rect.on('pointerout', () => {
          rect.setFillStyle(0x222222);
        });
        rect.on('pointerdown', () => {
          this.onPressField(rect);
        });
        fields.push(rect);
        x += size;
      }
      x = 20;
      y += size;
    }
  }
}

