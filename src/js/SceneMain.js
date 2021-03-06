import Phaser from 'phaser';
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
import Player from './Player';
import GunShip from './GunShip';
import ChaserShip from './ChaserShip';
import CarrierShip from './CarrierShip';
import ScrollingBackground from './ScrollingBackground';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMain',
    });
  }

  init(data) {
    this.name = data.name;
  }

  preload() {
    // Load Sprites

    this.load.spritesheet(
      'sprExplosion',
      sprExplosion,
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );
    this.load.spritesheet(
      'sprEnemy0',
      sprEnemy0,
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      'sprEnemy1',
      sprEnemy1,
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      'sprEnemy2',
      sprEnemy2,
      {
        frameWidth: 64,
        frameHeight: 64,
      },
    );
    this.load.image('sprLaserEnemy0', sprLaserEnemy0);
    this.load.image('sprLaserPlayer', sprLaserPlayer);
    this.load.spritesheet(
      'sprPlayer',
      sprPlayer,
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    //  Load audio

    this.load.audio('sndExplode0', sndExplode0);
    this.load.audio('sndExplode1', sndExplode1);
    this.load.audio('sndLaser', sndLaser);
  }

  create() {
    // Create animations

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy1',
      frames: this.anims.generateFrameNumbers('sprEnemy1'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    // Add sounds to a accessible variable

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    // Add scrolling background to the scene

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    // Add the player

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );

    // Initialize keys

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Groups for enemies, their projectiles and the players projectiles

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    // Event (timer) for spawning enemies

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy;
        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }
        if (enemy) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    // Setup scores

    this.score = 0;
    const scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#fff',
    });

    // Add collision between player lasers and enemies

    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      (playerLaser, enemy) => {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.explode(true);
          playerLaser.destroy();
          this.score += 1;
          scoreText.setText(`Score: ${this.score}`);
        }
      },
    );

    // Add collision between player and enemies

    this.physics.add.overlap(
      this.player,
      this.enemies,
      (player, enemy) => {
        if (!player.getData('isDead') && !enemy.getData('isDead')) {
          player.explode(false);
          player.onDestroy();
          enemy.explode(true);
        }
      },
    );

    // Add collision between player and enemy lasers

    this.physics.add.overlap(
      this.player,
      this.enemyLasers,
      (player, laser) => {
        if (!player.getData('isDead') && !laser.getData('isDead')) {
          player.explode(false);
          player.onDestroy();
          laser.destroy(true);
        }
      },
    );
  }

  update() {
    if (!this.player.getData('isDead')) {
      this.player.update();

      if (this.keyW.isDown || this.keyUp.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown || this.keyDown.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown || this.keyLeft.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown || this.keyRight.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();

      // Frustum Culling enemies

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.Y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    // Update and frustum cull enemy lasers

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    // Update and frustum cull player lasers

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    // update background layers

    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}

export default SceneMain;