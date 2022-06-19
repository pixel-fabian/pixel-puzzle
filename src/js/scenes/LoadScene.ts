import { SCENES } from '../constants';

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.LOAD,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {
    // load all textures

    // create loading bar
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    });
    this.load.on('progress', (nPercentage) => {
      loadingBar.fillRect(30, 300, 740 * nPercentage, 40);
    });
  }

  create(): void {
    this.scene.start(SCENES.MENU);
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}