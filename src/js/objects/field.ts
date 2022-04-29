export default class extends Phaser.GameObjects.Rectangle {
  private colorDefault = 0x222222;
  private colorBorder = 0xffffff;
  private colorHover = 0x444444;
  private colorFilled = 0x7289d2;
  private colorError = 0x332020;
  private colorEmpty = 0x717171;
  private filled = false;
  private solved = false;
  private error = false;

  constructor(scene, x, y, size) {
    super(scene, x, y, size, size);
    scene.add.existing(this);
    this.setOrigin(0)
      .setFillStyle(this.colorDefault)
      .setStrokeStyle(1, this.colorBorder)
      .setInteractive({ useHandCursor: true });
    this._addEventHandler();
    this._setFilled();
  }

  onPressFieldSolveFilled() {
    if (this.solved || this.error) return;
    if (this.filled) {
      this.setFillStyle(this.colorFilled);
      this.solved = true;
    } else {
      this.setFillStyle(this.colorError);
      this.error = true;
    }
  }

  onPressFieldSolveEmpty() {
    if (this.solved || this.error) return;
    if (!this.filled) {
      this.setFillStyle(this.colorEmpty);
      this.solved = true;
    } else {
      this.setFillStyle(this.colorError);
      this.error = true;
    }
  }

  _addEventHandler() {
    this.on('pointerover', () => {
      if (!this.solved && !this.error) {
        this.setFillStyle(this.colorHover);
      }
    });
    this.on('pointerout', () => {
      if (!this.solved && !this.error) {
        this.setFillStyle(this.colorDefault);
      }
    });
    this.on('pointerdown', (pointer) => {
      if (pointer.rightButtonDown()) {
        this.onPressFieldSolveEmpty();
      } else {
        this.onPressFieldSolveFilled();
      }
    });
  }

  _setFilled() {
    const rndNumber = Phaser.Math.Between(0, 1);

    if (rndNumber == 1) {
      this.filled = true;
    }
  }

  getFilled() {
    return this.filled;
  }
}
