import Phaser from 'phaser';
import '../styles/main.scss';
import SceneMainMenu from './SceneMainMenu';
import SceneMain from './SceneMain';
import SceneGameOver from './SceneGameOver';
import SceneNameSelect from './SceneNameSelect';

const config = {
  type: Phaser.WEBGL,
  width: 550,
  height: 640,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [
    SceneMainMenu,
    SceneNameSelect,
    SceneMain,
    SceneGameOver,
  ],
  pixelArt: true,
  roundPixels: true,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);