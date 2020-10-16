import Phaser from 'phaser';
import ScrollingBackground from './ScrollingBackground';
import getLeaderBoard from './getLeaderBoard';

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneGameOver',
    });
  }

  init(data) {
    this.name = data.name;
    this.score = data.score;
  }

  create() {
    // Game Over title

    this.title = this.add.text(
      this.game.config.width * 0.5,
      100,
      'GAME OVER',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fonstStyle: 'bold',
        color: '#ffff',
        align: 'center',
      },
    );
    this.title.setOrigin(0.5);

    // Restart button

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height - 128,
      'sprBtnRestart',
    );
    this.btnRestart.setInteractive();
    this.btnRestart.on(
      'pointerover',
      // eslint-disable-next-line func-names
      function () {
        this.btnRestart.setTexture('sprBtnRestartHover');
        this.sfx.btnOver.play();
      },
      this,
    );
    this.btnRestart.on(
      'pointerout',
      // eslint-disable-next-line func-names
      function () {
        this.setTexture('sprBtnRestart');
      },
    );
    this.btnRestart.on(
      'pointerdown',
      // eslint-disable-next-line func-names
      function () {
        this.btnRestart.setTexture('sprBtnRestartDown');
        this.sfx.btnDown.play();
      },
      this,
    );
    this.btnRestart.on(
      'pointerup',
      // eslint-disable-next-line func-names
      function () {
        this.btnRestart.setTexture('sprBtnRestart');
        this.scene.start('SceneMain');
      },
      this,
    );

    // Leaderboard

    getLeaderBoard(this.name, this.score)
      .then((top) => {
        this.add.text(
          this.game.config.width * 0.5,
          200,
          'Rank  Name  Score',
          {
            fontFamily: 'monospace',
            fontSize: 16,
            fonstStyle: 'bold',
            color: '#ffff',
            align: 'center',
          },
        ).setOrigin(0.5);
        for (let i = 0; i < top.length; i += 1) {
          const pos = String(`${top[i].rank}      `).slice(0, 6);
          const name = String(`${top[i].user}      `).slice(0, 6);
          const score = String(`     ${top[i].score}`).slice(-5);
          this.add.text(
            this.game.config.width * 0.5,
            200 + 40 * (i + 1),
            `${pos}${name}${score}`,
            {
              fontFamily: 'monospace',
              fontSize: 16,
              fonstStyle: 'bold',
              color: '#0ff',
              align: 'center',
            },
          ).setOrigin(0.5);
        }
      })
      .catch((reason) => {
        this.add.text(
          this.game.config.width * 0.5,
          228,
          String(reason),
          {
            fontFamily: 'monospace',
            fontSize: 16,
            fonstStyle: 'bold',
            color: '#ffff',
            align: 'center',
          },
        ).setOrigin(0.5);
      });

    // Background layers

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

export default SceneGameOver;
