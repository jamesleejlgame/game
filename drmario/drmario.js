let players = [];

let NUM_PLAYERS = 2;
let WIDTH = 8;
let HEIGHT = 16;


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
     */
    this.column = column;
    /**
     * The row of the bottom left part of the piece.
     */
    this.row = row;
    /**
     * The orientation of the piece.
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
  constructor () {
    /**
     * @type {Piece}.
     */
    this.piece = null;
    this.upcomingPieces = [];
    this.field = [];

    for (let w = 0; w < WIDTH; ++w) {
      let col = [];
      for (let l = 0; l < LENGTH; ++l) {
        col.push(new Piece());
      }
      this.field.push(col);
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
    if (this.piece.column == WIDTH - 1 && this.piece.orientation == orientationEnum.VERTICAL) {
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
      if (coordinate[0] < 0 || coordinate[0] > WIDTH - 1) {
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

function initialize () {
  for (let p = 0; p < NUM_PLAYERS; ++p) {
    this.players.push(new Player());
  }
}

initialize();
