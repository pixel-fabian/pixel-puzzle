import 'phaser';
import SCENES from '../constants/SceneKeys';
import Field from '../objects/field';
import Numbers from '../objects/numbers';
export default class SceneGame extends Phaser.Scene {
  private amountFields = 10;
  private fieldSize = 50;
  private fields = [];

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
    this._createColumnNumbers();
    this._createRowNumbers();
    this.input.mouse.disableContextMenu();
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  _createFields() {
    let x = 75;
    let y = 75;

    for (let row = 0; row < this.amountFields; row++) {
      this.fields.push([]);
      for (let column = 0; column < this.amountFields; column++) {
        const field = new Field(this, x, y, this.fieldSize);
        this.fields[row].push(field);

        x += this.fieldSize;
      }
      x = 75;
      y += this.fieldSize;
    }
  }

  _createRowNumbers() {
    let x = 40;
    let y = 100;
    for (let row = 0; row < this.fields.length; row++) {
      let numberRow = 0;
      for (let column = 0; column < this.fields[row].length; column++) {
        if (this.fields[row][column].getFilled()) {
          // if filled: Add to number
          numberRow++;
        }
        if (
          numberRow > 0 &&
          (!this.fields[row][column].getFilled() ||
            !this.fields[row][column + 1])
        ) {
          // if empty or last one in column: Display number
          this.add
            .text(x, y, `${numberRow}`, {
              fontFamily: 'Nunito',
              color: '#fff',
              fontSize: '16px',
            })
            .setOrigin(0.5);
          x += 10;
          numberRow = 0;
        }
      }
      x = 40;
      y += this.fieldSize;
    }
  }

  _createColumnNumbers() {
    let x = 100;
    let y = 40;
    console.log(this.fields);

    for (let column = 0; column < this.fields[0].length; column++) {
      let numberRow = 0;
      for (let row = 0; row < this.fields.length; row++) {
        if (this.fields[row][column].getFilled()) {
          // if filled: Add to number
          numberRow++;
        }
        if (
          numberRow > 0 &&
          (!this.fields[row][column].getFilled() ||
            !this.fields[row][column + 1])
        ) {
          // if empty or last one in row: Display number
          this.add
            .text(x, y, `${numberRow}`, {
              fontFamily: 'Nunito',
              color: '#fff',
              fontSize: '16px',
            })
            .setOrigin(0.5);
          y += 10;
          numberRow = 0;
        }
      }
      y = 40;
      x += this.fieldSize;
    }
  }
}

