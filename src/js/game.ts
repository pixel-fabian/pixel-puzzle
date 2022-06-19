import 'phaser';
import LoadScene from './scenes/LoadScene';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';
import UiScene from './scenes/UiScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // WebGL if available
  title: 'Blueprint',
  width: 800,
  height: 600,
  parent: 'game',
  scene: [LoadScene, MenuScene, GameScene, UiScene],
};

window.onload = () => {
  new Phaser.Game(config);
};
