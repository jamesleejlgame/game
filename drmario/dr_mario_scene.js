// TODO: The 's' key is used to start the game.
import { DrMario, Player } from './dr_mario.js'

class DrMarioScene extends Phaser.Scene {

  /**
   * @type {number} the time in miliseconds before the piece should be moved down.
   */
  static TIME_TO_MOVE_PIECE_DOWN_MS = 2500;
  /**
   * @type {number} the time in miliseconds between animated fields.
   */
  static TIME_BETWEEN_ANIMATIONS_MS = 300;

  constructor ()
  {
    super({ key: 'DrMarioScene' });
    /**
     * @type {DrMario} The dr mario game.
     */
    this.drMario = new DrMario();
    /**
     * @type {Phaser.Input.Keyboard.Key} the key to start the game.
     */
    this.startGameKey_ = null;
    /**
     * @type {Phaser.Input.Keyboard.Key} the key to start the game.
     */
    this.resetGameKey_ = null;
    /**
     * @type {Phaser.Input.Keyboard.Key} the key to rotate the block clockwise.
     */
    this.rotateClockwiseKey_ = null;
    /**
     * @type {Phaser.Input.Keyboard.Key} the key to rotate the block counter clockwise.
     */
    this.rotateCounterClockwiseKey_ = null;
    /**
     * Initializes the cursor keys.
     */
    this.cursors_ = null;
    /**
     * @type {array<Phaser.Sprite>} the currently rendered sprites.
     */
    this.currentSprites_ = [];
    /**
     * The player fields to animate
     */
    this.playerFieldsToAnimate_ = [[], []];
    /**
     * When to animate each player.
     * @type {array<number>} the time in miliseconds for the next animation of each player.
     */
    this.animatePieceTime = [0, 0];
    /**
     * When to move down the piece per player
     * @type {array<number>} the time in miliseconds of the next time to move the piece down for each player.
     */
    this.movePieceDownTime = [0, 0];
    /**
     * The animate piece index of each player.
     * @type {array<number>} the field index to animate.
     */
    this.animatePieceIndex = [0, 0];
    /**
     * Whether to move the piece down automatically or not.
     * TODO: Don't disable this.
     */
    this.movePieceAutomaticallyEnabled = false;
  }

  create () {
    this.drMario.initializeForPuzzle();
    this.add.image(400, 300, 'dr_mario_background');
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.physics.world.setBounds(0, 0, 800, 600);
    this.cameras.main.roundPixels = true; // avoid tile bleed
    this.resetGameKey_ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.startGameKey_ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.rotateClockwiseKey_ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.rotateCounterClockwiseKey_ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.cursors_ = this.input.keyboard.createCursorKeys();
    for (let p = 0; p < DrMario.NUM_PLAYERS; ++p) {
      this.renderPlayer(p);
    }
  }

  resetGame () {
    if (this.drMario.gameState != DrMario.gameStatesEnum.GAME_OVER) {
      return;
    }
    this.drMario.initializeForPuzzle();
  }

  update (time, delta) {
    this.currentSprites_.forEach(function(sprite) {
      sprite.destroy();
    })
    this.drMario.checkPlayerOutOfPieces()
    if (Phaser.Input.Keyboard.JustDown(this.resetGameKey_)) {
      this.resetGame()
    }
    if (Phaser.Input.Keyboard.JustDown(this.startGameKey_)) {
      this.drMario.startGame()
      let movePieceDownTime = time + DrMarioScene.TIME_TO_MOVE_PIECE_DOWN_MS
      this.movePieceDownTime = [movePieceDownTime, movePieceDownTime]
    }

    if (this.drMario.gameState == DrMario.gameStatesEnum.IN_GAME) {
      for (let p = 0; p < DrMario.NUM_PLAYERS; ++p) {
        let player = this.drMario.players[p];
        if (player.playerState == Player.playerStatesEnum.PLAYER_MOVE) {
          if (player.playerType == Player.playerTypeEnum.HUMAN) {
            if (Phaser.Input.Keyboard.JustDown(this.cursors_.left) && player.playerState == Player.playerStatesEnum.PLAYER_MOVE) {
              this.drMario.players[0].movePiece(DrMario.directionEnum.LEFT)
            }
            if (Phaser.Input.Keyboard.JustDown(this.cursors_.right) && player.playerState == Player.playerStatesEnum.PLAYER_MOVE) {
              this.drMario.players[0].movePiece(DrMario.directionEnum.RIGHT)
            }
            if (Phaser.Input.Keyboard.JustDown(this.rotateClockwiseKey_) && player.playerState == Player.playerStatesEnum.PLAYER_MOVE) {
              this.drMario.players[0].rotatePiece(DrMario.rotationEnum.CLOCKWISE)
            }
            if (Phaser.Input.Keyboard.JustDown(this.rotateCounterClockwiseKey_) && player.playerState == Player.playerStatesEnum.PLAYER_MOVE) {
              this.drMario.players[0].rotatePiece(DrMario.rotationEnum.COUNTER_CLOCKWISE)
            }
            if (Phaser.Input.Keyboard.JustDown(this.cursors_.down) && player.playerState == Player.playerStatesEnum.PLAYER_MOVE) {
              let movePieceDownRet = player.movePiece(DrMario.directionEnum.DOWN)
              this.handlePieceDown(p, movePieceDownRet, time);
              this.movePieceDownTime[p] = time + DrMarioScene.TIME_TO_MOVE_PIECE_DOWN_MS
            }
          }
          if (this.movePieceAutomaticallyEnabled && time > this.movePieceDownTime[p]) {
            let movePieceDownRet = player.maybeMovePieceDown();
            this.handlePieceDown(p, movePieceDownRet, time);
            this.movePieceDownTime[p] = time + DrMarioScene.TIME_TO_MOVE_PIECE_DOWN_MS
          }
          this.renderPlayer(p);
        } else {
          if (time > this.animatePieceTime[p]) {
            this.animatePieceIndex[p]++
            if (this.animatePieceIndex[p] >= this.playerFieldsToAnimate_[p].length - 1) {
              this.drMario.players[p].playerState = Player.playerStatesEnum.PLAYER_MOVE
              // TODO: This is puzzle mode only.
              if (p == 0 && this.drMario.players[p].numVirusesRemaining == 0) {
                this.scene.start('PostDrMarioScene');
              }
            }
            this.animatePieceTime[p] = time + DrMarioScene.TIME_BETWEEN_ANIMATIONS_MS
          }
          this.renderField(p, this.playerFieldsToAnimate_[p][this.animatePieceIndex[p]]);
        }
        this.renderUpcomingBlocks(p);
      }
    } else {
      for (let p = 0; p < DrMario.NUM_PLAYERS; ++p) {
        this.renderPlayer(p);
        this.renderUpcomingBlocks(p);
      }
    }
  }

  handlePieceDown (playerIndex, movePieceDownRet, time) {
    if (movePieceDownRet && movePieceDownRet[0] > 0) {
      this.playerFieldsToAnimate_[playerIndex] = movePieceDownRet[1];
      this.animatePieceTime[playerIndex] = time + DrMarioScene.TIME_BETWEEN_ANIMATIONS_MS
      this.animatePieceIndex[playerIndex] = 0;
    }
  }

  static getLeftSpriteIndex (piece) {
    return DrMarioScene.getSpriteIndex(DrMario.blockTypeEnum.LEFT, piece.firstColor)
  }

  static getRightSpriteIndex (piece) {
    return DrMarioScene.getSpriteIndex(DrMario.blockTypeEnum.RIGHT, piece.secondColor)
  }

  renderPlayer (playerNum) {
    for (let w = 0; w < DrMario.WIDTH; ++w) {
      for (let l = 0; l < DrMario.HEIGHT; ++l) {
        let spriteIndex = DrMarioScene.getSpriteIndex(this.drMario.players[playerNum].field[w][l].type, this.drMario.players[playerNum].field[w][l].color);
        if (spriteIndex == null) {
          continue;
        } else if (spriteIndex == 100) {
          this.currentSprites_.push(this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_yellow_virus', 0))
        } else if (spriteIndex == 200) {
          this.currentSprites_.push(this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_red_virus', 0))
        } else if (spriteIndex == 300) {
          this.currentSprites_.push(this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_blue_virus', 0))
        } else {
          this.currentSprites_.push(this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_sprites', spriteIndex))
        }
      }
    }
    let piece = this.drMario.players[playerNum].piece;
    if (piece != null) {
      let coordinates = piece.getCoordinates()
      let firstPieceType = (piece.orientation == DrMario.orientationEnum.HORIZONTAL) ? DrMario.blockTypeEnum.LEFT : DrMario.blockTypeEnum.BOTTOM
      let secondPieceType = (piece.orientation == DrMario.orientationEnum.HORIZONTAL) ? DrMario.blockTypeEnum.RIGHT : DrMario.blockTypeEnum.TOP
      let firstSpriteIndex = DrMarioScene.getSpriteIndex(firstPieceType, piece.firstColor);
      let secondSpriteIndex = DrMarioScene.getSpriteIndex(secondPieceType, piece.secondColor);
      this.currentSprites_.push(this.physics.add.sprite(playerNum * 320 + 170 + coordinates[0][0] * 20, 510 - coordinates[0][1] * 20, 'dr_mario_sprites', firstSpriteIndex))
      this.currentSprites_.push(this.physics.add.sprite(playerNum * 320 + 170 + coordinates[1][0] * 20, 510 - coordinates[1][1] * 20, 'dr_mario_sprites', secondSpriteIndex))
    }
  }

  renderField (playerNum, field) {
    for (let w = 0; w < DrMario.WIDTH; ++w) {
      for (let l = 0; l < DrMario.HEIGHT; ++l) {
        let spriteIndex = DrMarioScene.getSpriteIndex(field[w][l].type, field[w][l].color);
        if (spriteIndex == null) {
          continue;
        } else if (spriteIndex == 100) {
          this.currentSprites_.push(this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_yellow_virus', 0))
        } else if (spriteIndex == 200) {
          this.currentSprites_.push(this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_red_virus', 0))
        } else if (spriteIndex == 300) {
          this.currentSprites_.push(this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_blue_virus', 0))
        } else {
          this.currentSprites_.push(this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_sprites', spriteIndex))
        }
      }
    }
  }

  renderUpcomingBlocks (playerNum) {
    for (let i = 0; i < Math.min(6, this.drMario.players[playerNum].upcomingPieces.length); ++i) {
      this.currentSprites_.push(this.physics.add.sprite(playerNum * 600 + 90, 210 + i * 20, 'dr_mario_sprites', DrMarioScene.getLeftSpriteIndex(this.drMario.players[playerNum].upcomingPieces[i])))
      this.currentSprites_.push(this.physics.add.sprite(playerNum * 600 + 90 + 20, 210 + i * 20, 'dr_mario_sprites', DrMarioScene.getRightSpriteIndex(this.drMario.players[playerNum].upcomingPieces[i])))
    }
  }

  /**
   * This function is tightly coupled to dr_mario_setup_scene.
   * @return {number?} nullable for error. The index of the dr_mario_sprites to use. If it is a virus, then
   * return 100 for yellow, 200 for red, or 300 for blue.
   * TODO: Don't use hundreds for viruses.
   */
  static getSpriteIndex (type, color) {
    let offset = -1;
    if (type == DrMario.blockTypeEnum.TOP) {
      offset = 0;
    } else if (type == DrMario.blockTypeEnum.BOTTOM) {
      offset = 3;
    } else if (type == DrMario.blockTypeEnum.LEFT) {
      offset = 6;
    } else if (type == DrMario.blockTypeEnum.RIGHT) {
      offset = 9;
    } else if (type == DrMario.blockTypeEnum.SINGLE) {
      offset = 12;
    } else if (type == DrMario.blockTypeEnum.EXPLODED) {
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