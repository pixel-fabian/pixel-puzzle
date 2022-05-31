export default class Number extends Phaser.GameObjects.Text {
  private crossed = false;
  private fields = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle,
  ) {
    const oStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Nunito',
      color: '#fff',
      fontSize: '16px',
      ...style,
    };
    super(scene, x, y, text, oStyle);
    scene.add.existing(this);
  }

  checkIfFieldsFilled() {
    const filledFields = this.fields.map((field) => field.getFilled());
    if (filledFields.length === 0) {
      this.crossed = true;
      this.setColor('#eee');
      this.scene.add.text(this.x, this.y, '-', {
        fontFamily: 'Nunito',
        color: '#eee',
        fontSize: '16px',
      });
    }
  }
}
