import { DrMario } from './dr_mario.js'

class DrMarioScene extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'DrMarioScene' });
    this.drMario = new DrMario();
  }

  create () {
    this.drMario.initializeForPuzzle();
    this.add.image(400, 300, 'dr_mario_background');
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.physics.world.setBounds(0, 0, 800, 600);
    this.cameras.main.roundPixels = true; // avoid tile bleed
    this.cursors = this.input.keyboard.createCursorKeys();
    for (let p = 0; p < DrMario.NUM_PLAYERS; ++p) {
      this.renderPlayer(p);
    }
  }

  update (time, delta) {
  }

  renderPlayer (playerNum) {
    for (let w = 0; w < DrMario.WIDTH; ++w) {
      for (let l = 0; l < DrMario.HEIGHT; ++l) {
        let spriteIndex = this.drMario.players[playerNum].field[w][l].getSpriteIndex();
        if (spriteIndex == null) {
          continue;
        } else if (spriteIndex == 100) {
          this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_yellow_virus', 0);
        } else if (spriteIndex == 200) {
          this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_red_virus', 0);
        } else if (spriteIndex == 300) {
          this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_blue_virus', 0);
        } else {
          this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_sprites', spriteIndex);
        }
      }
    }
    for (let i = 0; i < 6; ++i) {
      this.physics.add.sprite(playerNum * 600 + 90, 210 + i * 20, 'dr_mario_sprites', this.drMario.players[playerNum].upcomingPieces[i].getLeftSpriteIndex());
      this.physics.add.sprite(playerNum * 600 + 90 + 20, 210 + i * 20, 'dr_mario_sprites', this.drMario.players[playerNum].upcomingPieces[i].getRightSpriteIndex());
    }
  }
}

export { DrMarioScene }