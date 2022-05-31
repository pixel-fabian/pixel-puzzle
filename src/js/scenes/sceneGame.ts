/* eslint-disable for-direction */
import 'phaser';
import SCENES from '../constants/SceneKeys';
import Field from '../objects/field';
import Number from '../objects/number';
export default class SceneGame extends Phaser.Scene {
  private amountFields = 10;
  private fieldSize = 45;
  private fields = [];
  private counts = {
    totalFilled: 0,
    curFilled: 0,
    curErrors: 0,
  };
  private ui = {
    progressText: null,
    progressNumber: 0,
    errorText: null,
  };
  public gameOver = false;

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
    this._updateErrors();
    this._updateProgress();
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  _createFields() {
    let x = 75;
    let y = 120;

    for (let row = 0; row < this.amountFields; row++) {
      this.fields.push([]);
      for (let column = 0; column < this.amountFields; column++) {
        const field = new Field(this, x, y, this.fieldSize);
        if (field.getFilled()) {
          this.counts.totalFilled++;
        }
        this.fields[row].push(field);

        x += this.fieldSize;
      }
      x = 75;
      y += this.fieldSize;
    }
  }

  _createRowNumbers() {
    let x = 65;
    let y = 95 + this.fieldSize * this.fields.length;

    for (let row = this.fields.length - 1; row >= 0; row--) {
      let numberRow = 0;
      for (let column = this.fields[row].length - 1; column >= 0; column--) {
        if (this.fields[row][column].getFilled()) {
          // if filled: Add to number
          numberRow++;
        }
        if (
          numberRow > 0 &&
          (!this.fields[row][column].getFilled() ||
            !this.fields[row][column - 1])
        ) {
          // if empty or last one in column: Display number
          new Number(this, x, y, `${numberRow}`, {}).setOrigin(0.5);
          x -= 10;
          numberRow = 0;
        }
      }
      x = 65;
      y -= this.fieldSize;
    }
  }

  _createColumnNumbers() {
    let x = 50 + this.fieldSize * this.fields.length;
    let y = 105;

    for (let column = this.fields[0].length - 1; column >= 0; column--) {
      let numberColumn = 0;
      for (let row = this.fields.length - 1; row >= 0; row--) {
        if (this.fields[row][column].getFilled()) {
          // if filled: Add to number
          numberColumn++;
        }
        if (
          numberColumn > 0 &&
          (!this.fields[row][column].getFilled() || !this.fields[row - 1])
        ) {
          // if empty or last one in row: Display number
          new Number(this, x, y, `${numberColumn}`, {}).setOrigin(0.5);
          y -= 17;
          numberColumn = 0;
        }
      }
      y = 105;
      x -= this.fieldSize;
    }
  }

  addError() {
    this.counts.curErrors++;
    this._updateErrors();
    this._checkWin();
  }

  addFilled() {
    this.counts.curFilled++;
    this._updateProgress();
    this._checkWin();
  }

  _updateErrors() {
    if (!this.ui.errorText) {
      this.ui.errorText = this.add.text(0, 0, '', {
        fontFamily: 'Nunito',
        color: '#fff',
        fontSize: '16px',
      });
    }
    this.ui.errorText.setText(`Errors: ${this.counts.curErrors}`);
  }

  _updateProgress() {
    this.ui.progressNumber = Phaser.Math.FloorTo(
      (this.counts.curFilled / this.counts.totalFilled) * 100,
    );

    if (!this.ui.progressText) {
      this.ui.progressText = this.add.text(80, 0, '', {
        fontFamily: 'Nunito',
        color: '#fff',
        fontSize: '16px',
      });
    }
    this.ui.progressText.setText(`Progress: ${this.ui.progressNumber}%`);
  }

  _checkWin() {
    if (this.counts.totalFilled === this.counts.curFilled) {
      if (this.counts.curErrors === 0) {
        this.time.addEvent({
          delay: 300,
          callback: () => {
            for (let row = 0; row < this.fields.length; row++) {
              for (let column = 0; column < this.fields[row].length; column++) {
                if (this.fields[row][column].getFilled()) {
                  this.fields[row][column].changeColorRnd();
                }
              }
            }
          },
          loop: true,
        });
      }
      this.gameOver = true;
      return true;
    } else {
      return false;
    }
  }
}
