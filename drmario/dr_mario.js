import { DrMarioPuzzleData } from './dr_mario_puzzle_data.js'

class DrMario {
  /**
   * @type {number} the number of players in the game.
   */
  static NUM_PLAYERS = 2
  /**
   * @type {number} the width of a player field.
   */
  static WIDTH = 8
  /**
   * @type {number} the height of a player field.
   */
  static HEIGHT = 16
  /**
   * @type {number} the maximum number of blocks to add to opponent after a combo.
   */
  static MAX_COMBO_BLOCKS = 4

  /**
   * @type {string} The type of block this is. Could be a portion of a pill.
   */
  static blockTypeEnum = {
    EMPTY: ' ',
    LEFT_SIDE: 'L',
    RIGHT_SIDE: 'R',
    TOP_SIDE: 'T',
    BOTTOM_SIDE: 'B',
    SINGLE: 'S',
    VIRUS: 'V',
    EXPLODED: 'E'
  };

  /**
   * @type {string} the color of the current block.
   */
  static colorEnum = {
    NONE: ' ',
    RED: 'R',
    BLUE: 'B',
    YELLOW: 'Y'
  };

  /**
   * All colors.
   */
  static allColors = [colorEnum.RED, colorEnum.BLUE, colorEnum.YELLOW]

  /**
   * @type {number} the orientation of the pill.
   */
  static orientationEnum = {
    HORIZONTAL: 0,
    VERTICAL: 1
  };

  /**
   * @type {number} a direction of motion of a pill.
   */
  static directionEnum = {
    LEFT: 0,
    RIGHT: 1,
    DOWN: 2
  };

  /**
   * @type {number} a rotation direction of motion of a pill.
   */
  static rotationEnum = {
    CLOCKWISE: 0,
    COUNTERCLOCKWISE: 1
  };

  /**
   * @type {number} the possible game states.
   */
  static gameStatesEnum = {
    GAME_OVER: 0,
    PLAYER_MOVE: 1,
    ANIMATING: 2,
    COMBOING: 3
  }

  constructor () {
    /**
     * @type {array<Player>} the players in the game.
     */
    this.players = [],
    /**
     * @type {boolean} whether the game is over or not.
     */
    this.gameState = DrMario.gameStatesEnum.GAME_OVER
  }

  /**
   * Initializes the game for a puzzle mode.
   */
  initializeForPuzzle () {
    this.gameState = DrMario.gameStatesEnum.PLAYER_MOVE;
    this.players = [];
    for (let p = 0; p < DrMario.NUM_PLAYERS; ++p) {
      let field = null;
      let upcomingPieces = null;
      // TODO: This is hardcoded for only two players.
      if (p == 0) {
        field = DrMarioPuzzleData.drMarioPuzzlePlayer1Field;
        upcomingPieces = DrMarioPuzzleData.drMarioPuzzlePlayer1UpcomingPieces;
      } else if (p == 1) {
        field = DrMarioPuzzleData.drMarioPuzzlePlayer2Field;
        upcomingPieces = DrMarioPuzzleData.drMarioPuzzlePlayer2UpcomingPieces;
      }
      this.players.push(new Player(field, upcomingPieces));
    }
  }
}

/**
 * A single player in the dr mario game.
 */
class Player {
  /**
   * @param {array<string>?} fieldArrayString represents the field of the player in proper visual display format (the top row of viruses
   *     is in the first position. If null, then the whole field is empty.
   *     TODO: This should actually initialize to a random set of values if the fieldArrayString is null.
   * @param {array<string>?} upcomingPiecesArrayString represents the upcoming pieces. Each string has two characters representing
   *     the two colors that make up the piece.
   */
  constructor (fieldArrayString, upcomingPiecesArrayString) {
    /**
     * @type {Piece?} the current piece for the player.
     */
    this.piece = null;
    /**
     * @type {array<Piece>} the upcoming pieces for the player.
     */
    this.upcomingPieces = [];
    /**
     * @type {array<array<PlacedPiece>>} This is a two dimensional array first sorted by row and then by column.
     * i.e. (2, 1) represents the 3rd column from the left and the 2nd row from the bottom.
     */
    this.field = [];
    /**
     * @type {number} the number of viruses remaining.
     */
    this.numVirusesRemaining = 0;

    this.initializeFieldAndVirusesGivenFieldArrayString(fieldArrayString);
    this.initializeUpcomingPiecesGivenArrayString(upcomingPiecesArrayString);
  }

  /**
   * In the player field, replace all exploded placed pieces with empty placed pieces.
   */
  replaceExplodedWithEmpty () {
    for (let w = 0; w < DrMario.WIDTH; ++w) {
      for (let h = 0; h < DrMario.HEIGHT; ++h) {
        if (this.field[w][h].type == DrMario.blockTypeEnum.EXPLODED) {
          this.field[w][h].type = DrMario.blockTypeEnum.EMPTY
        }
      }
    }
  }

  /**
   * Whether the player has cleared all their viruses.
   */
  clearedAllViruses () {
    return this.numVirusesRemaining == 0;
  }
  // TODO: Function to check if game is over


  /**
   * Taken from https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array.
   * @param {array<Anything>} arr array to fetch from.
   * @param {number} n number of elements to fetch.
   */
  static getRandomNElements (arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  /**
   * Adds punishing blocks to the field based on the combo length of the other player.
   * @param {number} comboLength 
   */
  addComboBlocks (comboLength) {
    let numBlocksToAdd = Math.min(comboLength, DrMario.MAX_COMBO_BLOCKS);
    let possibleColumns = []
    for (let w = 0; w < DrMario.WIDTH; ++w) {
      if (this.field[w][DrMario.HEIGHT - 1].type == DrMario.blockTypeEnum.EMPTY) {
        possibleColumns.push(w);
      }
    }
    numBlocksToAdd = Math.min(numBlocksToAdd, possibleColumns.length);
    let columnsToAdd = Player.getRandomNElements(possibleColumns, numBlocksToAdd);
    let colorsToAdd = []
    for (let i = 0; i < numBlocksToAdd; ++i) {
      colorsToAdd.push(DrMario.allColors[Math.floor(Math.random() * 3)])
    }
    for (let i = 0; i < numBlocksToAdd; ++i) {
      this.field[columnsToAdd[i]][DrMario.HEIGHT - 1] = new PlacedPiece(blockTypeEnum.SINGLE, colorsToAdd[i])
    }
  }

  /**
   * Checks the field for any blocks that will be cleared, mark those with an explosion.
   * Returns the number of combos generated by this field.
   * @returns {number} the number of combos generated by these explosiions.
   */
  markFieldExplosions () {
    let numCombos = 0;
    // Vertical explosions.
    for (let w = 0; w < DrMario.WIDTH; ++w) {
      let streakLength = 0;
      let currentColor = DrMario.colorEnum.NONE
      for (let h = 0; h < DrMario.HEIGHT; ++h) {
        if (this.field[w][h].type == DrMario.blockTypeEnum.NONE) {
          streakLength = 0;
          currentColor = DrMario.colorEnum.NONE
        } else if (this.field[w][h].color != currentColor) {
          streakLength = 1;
          currentColor = this.field[w][h]
        } else if (this.field[w][h].color == currentColor) {
          streakLength++;
          if (streakLength >= 4) {
            if (streakLength == 4) {
              numCombos++
              for (let i = 1; i < 4; ++i) {
                this.explodePlacedPiece(w, h - i);
              }
            }
            this.explodePlacedPiece(w, h);
          }
        }
      }
    }

    // Horizontal explosions.
    for (let h = 0; h < DrMario.HEIGHT; ++h) {
      let streakLength = 0;
      let currentColor = DrMario.colorEnum.NONE
      for (let w = 0; w < DrMario.WIDTH; ++w) {
        if (this.field[w][h].type == DrMario.blockTypeEnum.NONE) {
          streakLength = 0;
          currentColor = DrMario.colorEnum.NONE
        } else if (this.field[w][h].color != currentColor) {
          streakLength = 1;
          currentColor = this.field[w][h]
        } else if (this.field[w][h].color == currentColor) {
          streakLength++;
          if (streakLength >= 4) {
            if (streakLength == 4) {
              numCombos++
              for (let i = 1; i < 4; ++i) {
                this.markPieceExplosion(w - i, h);
              }
            }
            this.markPieceExplosion(w, h);
          }
        }
      }
    }
    return numCombos;
  }

  /**
   * Marks the given block as having exploded and handle its neighbours.
   * @type {number} width the position of the 
   */
  markPieceExplosion (col, row) {
    let piece = this.field[col][row]
    let connectedPiece = null;
    if (piece.type == DrMario.blockTypeEnum.TOP_SIDE) {
      connectedPiece = this.field[col][row - 1]
    } else if (piece.type == DrMario.blockTypeEnum.BOTTOM_SIDE) {
      connectedPiece = this.field[col][row + 1]
    } else if (piece.type == DrMario.blockTypeEnum.LEFT_SIDE) {
      connectedPiece = this.field[col + 1][row]
    } else if (piece.type == DrMario.blockTypeEnum.RIGHT_SIDE) {
      connectedPiece = this.field[col - 1][row]
    }
    if (piece.type == DrMario.blockTypeEnum.VIRUS) {
      this.numVirusesRemaining--
    }
    piece.type = DrMario.blockTypeEnum.EXPLODED;
    if (connectedPiece == null) {
      return;
    }
    connectedPiece.type = DrMario.blockTypeEnum.SINGLE;
  }

  /**
   * Move the field back to a valid state instead of the intermediate states caused by events such as combo
   * blocks being added, or blocks being cleared.
   * @returns {boolean} true if any block moved during this function.
   */
  applyGravityToField () {
    let blockMoved = false;
    for (let h = 1; h < DrMario.HEIGHT; ++h) {
      for (let w = 0; w < DrMario.WIDTH; ++w) {
        let piece = this.field[w][h];
        if (this.field[w][h - 1].type != DrMario.blockTypeEnum.EMPTY) {
          continue;
        }
        if (piece.type == DrMario.blockTypeEnum.SINGLE || piece.type == DrMario.blockTypeEnum.BOTTOM || piece.type == DrMario.blockTypeEnum.TOP) {
          this.field[w][h] = new PlacedPiece(DrMario.blockTypeEnum.EMPTY, DrMario.colorEnum.NONE);
          this.field[w][h - 1] = piece;
          blockMoved = true;
          continue
        }
        if (piece.type == DrMario.blockTypeEnum.LEFT) {
          let connectedPiece = this.field[w][h + 1]
          if (this.field[w + 1][h - 1].type != DrMario.blockTypeEnum.EMPTY) {
            continue
          }
          this.field[w][h] = new PlacedPiece(DrMario.blockTypeEnum.EMPTY, DrMario.colorEnum.NONE);
          this.field[w + 1][h] = new PlacedPiece(DrMario.blockTypeEnum.EMPTY, DrMario.colorEnum.NONE);
          this.field[w][h - 1] = piece;
          this.field[w + 1][h - 1] = connectedPiece;
        }
      }
    }
    return blockMoved
  }

  /**
   * Initializes the field for a given player.
   * @param {array<string>?} fieldArrayString represents the field of the player in proper visual display format (the top row of viruses
   * is in the first position.
   */
  initializeFieldAndVirusesGivenFieldArrayString (fieldArrayString) {
    this.numVirusesRemaining = 0;
    if (!fieldArrayString) {
      for (let w = 0; w < DrMario.WIDTH; ++w) {
        let col = [];
        for (let l = 0; l < DrMario.HEIGHT; ++l) {
          col.push(new PlacedPiece(DrMario.colorEnum.NONE, DrMario.blockTypeEnum.EMPTY));
        }
        this.field.push(col);
      }
    }
    for (let w = 0; w < DrMario.WIDTH; ++w) {
      let col = [];
      for (let l = 0; l < DrMario.HEIGHT; ++l) {
        let placedPiece = new PlacedPiece();
        let fieldArrayStringFirstIndex = DrMario.HEIGHT - 1 - l;
        let fieldArrayStringSecondIndex = 3 * w;
        placedPiece.color = fieldArrayString[fieldArrayStringFirstIndex][fieldArrayStringSecondIndex];
        placedPiece.type = fieldArrayString[fieldArrayStringFirstIndex][fieldArrayStringSecondIndex + 1];
        col.push(placedPiece);
        if (placedPiece.type == blockTypeEnum.VIRUS) {
          this.numVirusesRemaining++;
        }
      }
      this.field.push(col);
    }
  }

  /**
   * Initializes the upcoming pieces for the player.
   * @param {array<string>?} upcomingPiecesArrayString represents the upcoming pieces. Each string has two characters representing
   *     the two colors that make up the piece.
   */
  initializeUpcomingPiecesGivenArrayString (upcomingPiecesArrayString) {
    for (let i = 0; i < upcomingPiecesArrayString.length; ++i) {
      this.upcomingPieces.push(new Piece(null, null, null, upcomingPiecesArrayString[i][0], upcomingPiecesArrayString[i][1]));
    }
  }

  /**
   * Moves the piece in the given direction. If moving down and the piece cannot be moved, it will be added to the field.
   * @param {directionEnum} dir
   */
  movePiece (dir) {
    let newPiece = null;
    if (dir == DrMario.directionEnum.LEFT) {
      newPiece = new Piece(this.piece.column - 1, this.piece.row, this.piece.orientation, this.piece.firstColor, this.piece.secondColor);
    } else if (direction == DrMario.directionEnum.RIGHT) {
      newPiece = new Piece(this.piece.column + 1, this.piece.row, this.piece.orientation, this.piece.firstColor, this.piece.secondColor);
    } else if (direction == DrMario.directionEnum.DOWN) {
      newPiece = new Piece(this.piece.column, this.piece.row - 1, this.piece.orientation, this.piece.firstColor, this.piece.secondColor);
    }
    if (this.isPiecePositionValid(newPiece)) {
      this.piece = newPiece;
      return;
    }
    if (direction == DrMario.directionEnum.DOWN) {
      this.addPieceToField();
    }
  }

  rotatePiece (rotation) {
    let newPiece = null;
    let oldPiece = this.piece;
    if (this.piece.column == DrMario.WIDTH - 1 && this.piece.orientation == DrMario.orientationEnum.VERTICAL) {
      oldPiece = new Piece(this.piece.column - 1, this.piece.row, this.piece.orientation, this.piece.firstColor, this.piece.secondColor);
    }
    if (oldPiece.orientation == DrMario.orientationEnum.VERTICAL) {
      if (rotation == DrMario.rotationEnum.CLOCKWISE) {
        newPiece = new Piece(this.piece.column, this.piece.row, DrMario.orientationEnum.HORIZONTAL, this.piece.firstColor, this.piece.secondColor)
      } else {
        newPiece = new Piece(this.piece.column, this.piece.row, DrMario.orientationEnum.HORIZONTAL, this.piece.secondColor, this.piece.firstColor)
      }
    } else {
      if (rotation == DrMario.rotationEnum.CLOCKWISE) {
        newPiece = new Piece(this.piece.column, this.piece.row, DrMario.orientationEnum.VERTICAL, this.piece.secondColor, this.piece.firstColor)
      } else {
        newPiece = new Piece(this.piece.column, this.piece.row, DrMario.orientationEnum.VERTICAL, this.piece.firstColor, this.piece.secondColor)
      }
    }
    if (this.isPiecePositionValid(newPiece)) {
      this.piece = newPiece;
    }
  }

  /**
   * This is a static method that acts on a given piece passed in rather than the player's piece. This simply checks if 
   * the position of the floating piece is valid. It doesn't not verify whether the piece can be placed down there.
   * @param {Piece} piece the piece to check.
   */
  isPiecePositionValid (piece) {
    let coordinates = piece.getCoordinates();
    for (let i = 0; i < coordinates.length; ++i) {
      let coordinate = coordinates[i];
      if (coordinate[0] < 0 || coordinate[0] > DrMario.WIDTH - 1) {
        return false;
      }
      if (coordinate[1] < 0) {
        return false;
      }
      if (this.field[coordinate[0]][coordinate[1]] != DrMario.placed_piece_type.EMPTY) {
        return false;
      }
    }
    return true;
  }

  /**
   * Adds the current player piece to the field in its current position. THere is no error checking for whether it
   * actually has a piece underneath it to rest on or not.
   * @param {Piece} piece
   */
  addPieceToField () {
    let coordinates = this.piece.getCoordinates();
    if (this.piece.orientation == orientationEnum.HORIZONTAL) {
      this.field[coordinates[0][0]][coordinates[0][1]] = new PlacedPiece(this.piece.firstColor, DrMario.blockTypeEnum.LEFT_SIDE)
      this.field[coordinates[1][0]][coordinates[1][1]] = new PlacedPiece(this.piece.secondColor, DrMario.blockTypeEnum.RIGHT_SIDE)
    } else {
      this.field[coordinates[0][0]][coordinates[0][1]] = new PlacedPiece(this.piece.firstColor, DrMario.blockTypeEnum.BOTTOM_SIDE)
      this.field[coordinates[1][0]][coordinates[1][1]] = new PlacedPiece(this.piece.secondColor, DrMario.blockTypeEnum.TOP_SIDE)
    }
    this.piece = this.upcomingPieces.unshift();
    // TODO: Handle clears.
  }
};

class PlacedPiece {
  constructor (type, color) {
    this.type = type;
    this.color = color;
  }

  getSpriteIndex () {
    return DrMario.getSpriteIndex(this.type, this.color);
  }
};

class Piece {
  constructor (column, row, orientation, firstColor, secondColor) {
    /**
     * The column of the bottom left part of the piece.
     * @type {number?} can be null if representing an upcoming piece.
     */
    this.column = column;
    /**
     * The row of the bottom left part of the piece.
     * @type {number?} can be null if representing an upcoming piece.
     */
    this.row = row;
    /**
     * The orientation of the piece.
     * @type {orientationEnum?} can be null if representing an upcoming piece.
     */
    this.orientation = orientation;
    /**
     * The color of the part of the piece represented by column and row.
     */
    this.firstColor = firstColor;
    /**
     * The color of the part of the piece not in the column and row.
     */
    this.secondColor = secondColor;
  }

  getCoordinates() {
    ret = [];
    ret.push([this.column, this.row]);
    if (this.orientation == DrMario.orientation.HORIZONTAL) {
      ret.push([this.column + 1, this.row]);
    } else {
      ret.push([this.column, this.row + 1]);
    }
  }

  getLeftSpriteIndex () {
    return DrMario.getSpriteIndex(DrMario.blockTypeEnum.LEFT_SIDE, this.firstColor)
  }

  getRightSpriteIndex () {
    return DrMario.getSpriteIndex(DrMario.blockTypeEnum.RIGHT_SIDE, this.secondColor)
  }
};

export { DrMario }