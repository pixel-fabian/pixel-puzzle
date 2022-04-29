export default class extends Phaser.GameObjects.Rectangle {
  private colorDefault = 0x222222;
  private colorBorder = 0xffffff;
  private colorHover = 0x444444;
  private colorFilled = 0xc6525d;
  private colorEmpty = 0x717171;
  private filled = false;
  private solved = false;

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
    if (this.solved) return;
    if (this.filled) {
      this.setFillStyle(this.colorFilled);
      this.solved = true;
    }
  }

  onPressFieldSolveEmpty() {
    if (this.solved) return;
    if (!this.filled) {
      this.setFillStyle(this.colorEmpty);
      this.solved = true;
    }
  }

  _addEventHandler() {
    this.on('pointerover', () => {
      if (!this.solved) {
        this.setFillStyle(this.colorHover);
      }
    });
    this.on('pointerout', () => {
      if (!this.solved) {
        this.setFillStyle(this.colorDefault);
      }
    });
    this.on('pointerdown', (pointer) => {
      if (pointer.rightButtonDown()) {
        this.onPressFieldSolveFilled();
      } else {
        this.onPressFieldSolveEmpty();
      }
    });
  }

  _setFilled() {
    const rndNumber = Phaser.Math.Between(0, 1);

    if (rndNumber == 1) {
      this.filled = true;
    }
  }
}
