import Phaser from 'phaser';
import sprBg0 from '../content/sprBg0.png';
import sprBg1 from '../content/sprBg1.png';
import sprBtnPlay from '../content/sprBtnPlay.png';
import sprBtnPlayHover from '../content/sprBtnPlayHover.png';
import sprBtnPlayDown from '../content/sprBtnPlayDown.png';
import sprBtnRestart from '../content/sprBtnRestart.png';
import sprBtnRestartHover from '../content/sprBtnRestartHover.png';
import sprBtnRestartDown from '../content/sprBtnRestartDown.png';
import sndBtnOver from '../content/sndBtnOver.wav';
import sndBtnDown from '../content/sndBtnDown.wav';
import ScrollingBackground from './ScrollingBackground';

class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMainMenu',
    });
  }

  preload() {
    // Load backgrounds

    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);

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

    // Play button

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
        // this.scene.start('SceneMain');
        this.scene.start('SceneNameSelect');
      },
      this,
    );

    // Game title

    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      'SPACE SHOOTER',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fonstStyle: 'bold',
        color: '#ffff',
        align: 'center',
      },
    );
    this.title.setOrigin(0.5);

    // Backgrounds for the main menu

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}

export default SceneMainMenu;
