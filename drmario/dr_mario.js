let DR_MARIO_NUM_PLAYERS = 2;
let DR_MARIO_WIDTH = 8;
let DR_MARIO_HEIGHT = 16;

const placedPieceTypeEnum = {
  EMPTY: ' ',
  LEFT_SIDE: 'L',
  RIGHT_SIDE: 'R',
  TOP_SIDE: 'T',
  BOTTOM_SIDE: 'B',
  SINGLE: 'S',
  VIRUS: 'V'
};

const colorEnum = {
  NONE: ' ',
  RED: 'R',
  BLUE: 'B',
  YELLOW: 'Y'
};

const orientationEnum = {
  HORIZONTAL: 0,
  VERTICAL: 1
};

const directionEnum = {
  LEFT: 0,
  RIGHT: 1,
  DOWN: 2
};

const rotationEnum = {
  CLOCKWISE: 0,
  COUNTERCLOCKWISE: 1
};

class PlacedPiece {
  constructor (type, color) {
    this.type = type;
    this.color = color;
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
    if (this.orientation == orientation.HORIZONTAL) {
      ret.push([this.column + 1, this.row]);
    } else {
      ret.push([this.column, this.row + 1]);
    }
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
      for (let w = 0; w < DR_MARIO_WIDTH; ++w) {
        let col = [];
        for (let l = 0; l < DR_MARIO_HEIGHT; ++l) {
          col.push(new PlacedPiece(placedPieceTypeEnum.EMPTY, colorEnum.NONE));
        }
        this.field.push(col);
      }
    }
    for (let w = 0; w < DR_MARIO_WIDTH; ++w) {
      let col = [];
      for (let l = 0; l < DR_MARIO_HEIGHT; ++l) {
        let placedPiece = new PlacedPiece();
        let fieldArrayStringFirstIndex = DR_MARIO_HEIGHT - 1 - l;
        let fieldArrayStringSecondIndex = 3 * w;
        placedPiece.type = fieldArrayString[fieldArrayStringFirstIndex][fieldArrayStringSecondIndex];
        placedPiece.color = fieldArrayString[fieldArrayStringFirstIndex][fieldArrayStringSecondIndex + 1];
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
  move_piece (dir) {
    let newPiece = null;
    if (dir == directionEnum.LEFT) {
      newPiece = new Piece(this.piece.column - 1, this.piece.row, this.piece.orientation, this.piece.firstColor, this.piece.secondColor);
    } else if (direction == directionEnum.RIGHT) {
      newPiece = new Piece(this.piece.column + 1, this.piece.row, this.piece.orientation, this.piece.firstColor, this.piece.secondColor);
    } else if (direction == directionEnum.DOWN) {
      newPiece = new Piece(this.piece.column, this.piece.row - 1, this.piece.orientation, this.piece.firstColor, this.piece.secondColor);
    }
    if (this.isPiecePositionValid(newPiece)) {
      this.piece = newPiece;
      return;
    }
    if (direction == directionEnum.DOWN) {
      this.addPieceToField();
    }
  }

  rotatePiece (rotation) {
    let newPiece = null;
    let oldPiece = this.piece;
    if (this.piece.column == DR_MARIO_WIDTH - 1 && this.piece.orientation == orientationEnum.VERTICAL) {
      oldPiece = new Piece(this.piece.column - 1, this.piece.row, this.piece.orientation, this.piece.firstColor, this.piece.secondColor);
    }
    if (oldPiece.orientation == orientationEnum.VERTICAL) {
      if (rotation == rotationEnum.CLOCKWISE) {
        newPiece = new Piece(this.piece.column, this.piece.row, orientationEnum.HORIZONTAL, this.piece.firstColor, this.piece.secondColor)
      } else {
        newPiece = new Piece(this.piece.column, this.piece.row, orientationEnum.HORIZONTAL, this.piece.secondColor, this.piece.firstColor)
      }
    } else {
      if (rotation == rotationEnum.CLOCKWISE) {
        newPiece = new Piece(this.piece.column, this.piece.row, orientationEnum.VERTICAL, this.piece.secondColor, this.piece.firstColor)
      } else {
        newPiece = new Piece(this.piece.column, this.piece.row, orientationEnum.VERTICAL, this.piece.firstColor, this.piece.secondColor)
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
      if (coordinate[0] < 0 || coordinate[0] > DR_MARIO_WIDTH - 1) {
        return false;
      }
      if (coordinate[1] < 0) {
        return false;
      }
      if (this.field[coordinate[0]][coordinate[1]] != placed_piece_type.EMPTY) {
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
      this.field[coordinates[0][0]][coordinates[0][1]] = new PlacedPiece(placedPieceTypeEnum.LEFT_SIDE, this.piece.firstColor)
      this.field[coordinates[1][0]][coordinates[1][1]] = new PlacedPiece(placedPieceTypeEnum.RIGHT_SIDE, this.piece.secondColor)
    } else {
      this.field[coordinates[0][0]][coordinates[0][1]] = new PlacedPiece(placedPieceTypeEnum.BOTTOM_SIDE, this.piece.firstColor)
      this.field[coordinates[1][0]][coordinates[1][1]] = new PlacedPiece(placedPieceTypeEnum.TOP_SIDE, this.piece.secondColor)
    }
    this.piece = this.upcomingPieces.unshift();
    // TODO: Handle clears.
  }
};

function drMarioInitializeForPuzzle () {
  drMarioGameOver = false;
  drMarioPlayers = [];
  for (let p = 0; p < DR_MARIO_NUM_PLAYERS; ++p) {
    let field = null;
    let upcomingPieces = null;
    if (p == 0) {
      field = drMarioPuzzlePlayer1Field;
      upcomingPieces = drMarioPuzzlePlayer1UpcomingPieces;
    } else if (p == 1) {
      field = drMarioPuzzlePlayer2Field;
      upcomingPieces = drMarioPuzzlePlayer2UpcomingPieces;
    }
    drMarioPlayers.push(new Player(field, upcomingPieces));
  }
  console.log(drMarioPlayers);
}
