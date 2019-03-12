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
    console.log(time);
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

  /**
   * This function is tightly coupled to dr_mario_setup_scene.
   * @return {number?} nullable for error. The index of the dr_mario_sprites to use. If it is a virus, then
   * return 100 for yellow, 200 for red, or 300 for blue.
   * TODO: Decouple this from dr_mario_setup_scene.
   * TODO: Don't use hundreds for viruses.
   */
  static getSpriteIndex (type, color) {
    let offset = -1;
    if (type == DrMario.blockTypeEnum.TOP_SIDE) {
      offset = 0;
    } else if (type == DrMario.blockTypeEnum.BOTTOM_SIDE) {
      offset = 3;
    } else if (type == DrMario.blockTypeEnum.LEFT_SIDE) {
      offset = 6;
    } else if (type == DrMario.blockTypeEnum.RIGHT_SIDE) {
      offset = 9;
    } else if (type == DrMario.blockTypeEnum.SINGLE) {
      offset = 12;
    } else if (type == DrMario.blockTypeEnum.CLEAR) {
      offset = 15;
    } else if (type == DrMario.blockTypeEnum.VIRUS) {
      if (color == DrMario.colorEnum.YELLOW) {
        return 100;
      } else if (color == DrMario.colorEnum.RED) {
        return 200;
      } else if (color == DrMario.colorEnum.BLUE) {
        return 300;
      }
    } else {
      return null;
    }
    if (color == DrMario.colorEnum.RED) {
    } else if (color == DrMario.colorEnum.YELLOW) {
      offset += 1;
    } else if (color == DrMario.colorEnum.BLUE) {
      offset += 2;
    } else {
      return null;
    }
    return offset;
  }
}

export { DrMarioScene }