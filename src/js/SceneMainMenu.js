import Phaser from 'phaser';
import sprBtnPlay from '../content/sprBtnPlay.png';
import sprBtnPlayHover from '../content/sprBtnPlayHover.png';
import sprBtnPlayDown from '../content/sprBtnPlayDown.png';
import sprBtnRestart from '../content/sprBtnRestart.png';
import sprBtnRestartHover from '../content/sprBtnRestartHover.png';
import sprBtnRestartDown from '../content/sprBtnRestartDown.png';
import sndBtnOver from '../content/sndBtnOver.wav';
import sndBtnDown from '../content/sndBtnDown.wav';

class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMainMenu',
    });
  }

  preload() {
    // Load images

    this.load.image('sprBtnPlay', sprBtnPlay);
    this.load.image('sprBtnPlayHover', sprBtnPlayHover);
    this.load.image('sprBtnPlayDown', sprBtnPlayDown);
    this.load.image('sprBtnRestart', sprBtnRestart);
    this.load.image('sprBtnRestartHover', sprBtnRestartHover);
    this.load.image('sprBtnRestartDown', sprBtnRestartDown);

    // Load audio

    this.load.audio('sndBtnOver', sndBtnOver);
    this.load.audio('sndBtnDown', sndBtnDown);
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnPlay',
    );
    this.btnPlay.setInteractive();
    this.btnPlay.on(
      'pointerover',
      // eslint-disable-next-line func-names
      function () {
        this.btnPlay.setTexture('sprBtnPlayHover');
        this.sfx.btnOver.play();
      },
      this,
    );
    this.btnPlay.on(
      'pointerout',
      // eslint-disable-next-line func-names
      function () {
        this.setTexture('sprBtnPlay');
      },
    );
    this.btnPlay.on(
      'pointerdown',
      // eslint-disable-next-line func-names
      function () {
        this.btnPlay.setTexture('sprBtnPlayDown');
        this.sfx.btnDown.play();
      },
      this,
    );
    this.btnPlay.on(
      'pointerup',
      // eslint-disable-next-line func-names
      function () {
        this.btnPlay.setTexture('sprBtnPlay');
        this.scene.start('SceneMain');
      },
      this,
    );
  }
}

export default SceneMainMenu;
