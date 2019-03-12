import { DrMarioPuzzleData } from './dr_mario_puzzle_data.js'

class DrMario {
  static NUM_PLAYERS = 2
  static WIDTH = 8
  static HEIGHT = 16

  static placedPieceTypeEnum = {
    EMPTY: ' ',
    LEFT_SIDE: 'L',
    RIGHT_SIDE: 'R',
    TOP_SIDE: 'T',
    BOTTOM_SIDE: 'B',
    SINGLE: 'S',
    VIRUS: 'V',
    CLEAR: 'C'
  };

  static colorEnum = {
    NONE: ' ',
    RED: 'R',
    BLUE: 'B',
    YELLOW: 'Y'
  };

  static orientationEnum = {
    HORIZONTAL: 0,
    VERTICAL: 1
  };

  static directionEnum = {
    LEFT: 0,
    RIGHT: 1,
    DOWN: 2
  };

  static rotationEnum = {
    CLOCKWISE: 0,
    COUNTERCLOCKWISE: 1
  };

  constructor () {
    this.players = [],
    this.gameOver = false
  }

  initializeForPuzzle () {
    this.gameOver = false;
    this.players = [];
    for (let p = 0; p < DrMario.NUM_PLAYERS; ++p) {
      let field = null;
      let upcomingPieces = null;
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

  /**
   * This function is tightly coupled to dr_mario_setup_scene.
   * @return {number?} nullable for error. The index of the dr_mario_sprites to use. If it is a virus, then
   * return 100 for yellow, 200 for red, or 300 for blue.
   * TODO: Decouple this from dr_mario_setup_scene.
   * TODO: Don't use hundreds for viruses.
   */
  static getSpriteIndex (type, color) {
    let offset = -1;
    if (type == DrMario.placedPieceTypeEnum.TOP_SIDE) {
      offset = 0;
    } else if (type == DrMario.placedPieceTypeEnum.BOTTOM_SIDE) {
      offset = 3;
    } else if (type == DrMario.placedPieceTypeEnum.LEFT_SIDE) {
      offset = 6;
    } else if (type == DrMario.placedPieceTypeEnum.RIGHT_SIDE) {
      offset = 9;
    } else if (type == DrMario.placedPieceTypeEnum.SINGLE) {
      offset = 12;
    } else if (type == DrMario.placedPieceTypeEnum.CLEAR) {
      offset = 15;
    } else if (type == DrMario.placedPieceTypeEnum.VIRUS) {
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
    return DrMario.getSpriteIndex(DrMario.placedPieceTypeEnum.LEFT_SIDE, this.firstColor)
  }

  getRightSpriteIndex () {
    return DrMario.getSpriteIndex(DrMario.placedPieceTypeEnum.RIGHT_SIDE, this.secondColor)
  }
};

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
     * @type {Piece}.
     */
    this.piece = null;
    this.upcomingPieces = [];
    /**
     * @type {array<array<Piece>>} This is a two dimensional array first sorted by row and then by column.
     * i.e. (2, 1) represents the 3rd column from the left and the 2nd row from the bottom.
     */
    this.field = [];

    this.initializeFieldGivenFieldArrayString(fieldArrayString);
    this.initializeUpcomingPiecesGivenArrayString(upcomingPiecesArrayString);
  }

  /**
   * Initializes the field for a given player.
   * @param {array<string>?} fieldArrayString represents the field of the player in proper visual display format (the top row of viruses
   * is in the first position.
   */
  initializeFieldGivenFieldArrayString (fieldArrayString) {
    if (!fieldArrayString) {
      for (let w = 0; w < DrMario.WIDTH; ++w) {
        let col = [];
        for (let l = 0; l < DrMario.HEIGHT; ++l) {
          col.push(new PlacedPiece(DrMario.colorEnum.NONE, DrMario.placedPieceTypeEnum.EMPTY));
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
   * This is a static method that acts on a given piece passed in rather than the player's piece.
   * @param {Piece} piece
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
      this.field[coordinates[0][0]][coordinates[0][1]] = new PlacedPiece(this.piece.firstColor, DrMario.placedPieceTypeEnum.LEFT_SIDE)
      this.field[coordinates[1][0]][coordinates[1][1]] = new PlacedPiece(this.piece.secondColor, DrMario.placedPieceTypeEnum.RIGHT_SIDE)
    } else {
      this.field[coordinates[0][0]][coordinates[0][1]] = new PlacedPiece(this.piece.firstColor, DrMario.placedPieceTypeEnum.BOTTOM_SIDE)
      this.field[coordinates[1][0]][coordinates[1][1]] = new PlacedPiece(this.piece.secondColor, DrMario.placedPieceTypeEnum.TOP_SIDE)
    }
    this.piece = this.upcomingPieces.unshift();
    // TODO: Handle clears.
  }
};

export { DrMario }