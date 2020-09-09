import Phaser from 'phaser';
import sprBg0 from '../content/sprBg0.png';
import sprBg1 from '../content/sprBg1.png';
import sprExplosion from '../content/sprExplosion.png';
import sprEnemy0 from '../content/sprEnemy0.png';
import sprEnemy1 from '../content/sprEnemy1.png';
import sprEnemy2 from '../content/sprEnemy2.png';
import sprLaserEnemy0 from '../content/sprLaserEnemy0.png';
import sprLaserPlayer from '../content/sprLaserPlayer.png';
import sprPlayer from '../content/sprPlayer.png';
import sndExplode0 from '../content/sndExplode0.wav';
import sndExplode1 from '../content/sndExplode1.wav';
import sndLaser from '../content/sndLaser.wav';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMain',
    });
  }

  preload() {
    // Load Sprites

    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
    this.load.spritesheet(
      'sprExplosion',
      sprExplosion,
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      'sprEnemy0',
      sprEnemy0,
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );
    this.load.image('sprEnemy1', sprEnemy1);
    this.load.spritesheet(
      'sprEnemy2',
      sprEnemy2,
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );
    this.load.image('sprLaserEnemy0', sprLaserEnemy0);
    this.load.image('sprLaserPlayer', sprLaserPlayer);
    this.load.spritesheet(
      'sprPlayer',
      sprPlayer,
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );

    //  Load audio

    this.load.audio('sndExplode0', sndExplode0);
    this.load.audio('sndExplode1', sndExplode1);
    this.load.audio('sndLaser', sndLaser);

    // Create Animations

    
  }

  create() {
    // Todo
  }
}

export default SceneMain;