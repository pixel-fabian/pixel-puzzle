import 'phaser';
import SCENES from '../constants/SceneKeys';
import Field from '../objects/field';
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
    // background
    const camera = this.cameras.add(0, 0, 800, 600);
    camera.setBackgroundColor('rgba(50, 50, 50, 1)');
    this._createFields();
    this.input.mouse.disableContextMenu();
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  _createFields() {
    const size = 50;
    const number = 10;
    const fields = [];
    let x = 50;
    let y = 50;

    for (let row = 0; row < number; row++) {
      for (let column = 0; column < number; column++) {
        const field = new Field(this, x, y, size);
        fields.push(field);

        x += size;
      }
      x = 50;
      y += size;
    }
  }
}
