// TODO: Handle combos adding blocks

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
  static HEIGHT = 17
  /**
   * @type {number} the maximum number of blocks to add to opponent after a combo.
   */
  static MAX_COMBO_BLOCKS = 4
  /**
   * @type {number} the initial column of a piece.
   */
  static INITIAL_COLUMN = 3
  /**
   * @type {string} The type of block this is. Could be a portion of a pill.
   */
  static blockTypeEnum = {
    EMPTY: ' ',
    LEFT: 'L',
    RIGHT: 'R',
    TOP: 'T',
    BOTTOM: 'B',
    SINGLE: 'S',
    VIRUS: 'V',
    EXPLODED: 'E'
  }

  /**
   * @type {string} the color of the current block.
   */
  static colorEnum = {
    NONE: ' ',
    RED: 'R',
    BLUE: 'B',
    YELLOW: 'Y'
  }

  /**
   * All colors.
   */
  static allColors = [DrMario.colorEnum.RED, DrMario.colorEnum.BLUE, DrMario.colorEnum.YELLOW]

  /**
   * @type {number} the orientation of the pill.
   */
  static orientationEnum = {
    HORIZONTAL: 0,
    VERTICAL: 1
  }

  /**
   * @type {number} a direction of motion of a pill.
   */
  static directionEnum = {
    LEFT: 0,
    RIGHT: 1,
    DOWN: 2
  }

  /**
   * @type {number} a rotation direction of motion of a pill.
   */
  static rotationEnum = {
    CLOCKWISE: 0,
    COUNTERCLOCKWISE: 1
  }

  /**
   * @type {number} the possible game states.
   */
  static gameStatesEnum = {
    GAME_OVER: 0,
    IN_GAME: 1
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
    this.players = []
    for (let p = 0; p < DrMario.NUM_PLAYERS; ++p) {
      let field = null
      let upcomingPieces = null
      if (p == 0) {
        field = DrMarioPuzzleData.drMarioPuzzlePlayer1Field
        upcomingPieces = DrMarioPuzzleData.drMarioPuzzlePlayer1UpcomingPieces
      } else if (p == 1) {
        field = DrMarioPuzzleData.drMarioPuzzlePlayer2Field
        upcomingPieces = DrMarioPuzzleData.drMarioPuzzlePlayer2UpcomingPieces
      }
      // TODO: Don't hardcode the player type.
      this.players.push(new Player(p == 0 ? Player.playerTypeEnum.HUMAN : Player.playerTypeEnum.COMPUTER, field, upcomingPieces))
    }
  }

  startGame () {
    if (this.gameState == DrMario.gameStatesEnum.IN_GAME) {
      return
    }
    this.gameState = DrMario.gameStatesEnum.IN_GAME
    for (let p = 0; p < DrMario.NUM_PLAYERS; ++p) {
      this.players[p].startGame()
    }
  }

  // TODO: Only applicable in puzzle mode.
  checkPlayerOutOfPieces () {
    for (let p = 0; p < DrMario.NUM_PLAYERS; ++p) {
      if (this.players[p].piece == null && this.players[p].playerState == Player.playerStatesEnum.PLAYER_MOVE) {
        this.gameState = DrMario.gameStatesEnum.GAME_OVER
      }
    }
  }
}

/**
 * A single player in the dr mario game.
 */
class Player {
  /**
   * @type {number} the possible player states.
   */
  static playerStatesEnum = {
    PLAYER_MOVE: 0,
    ANIMATING: 1,
  }

  /**
   * @type {number} the type of player this is.
   */
  static playerTypeEnum = {
    HUMAN: 0,
    COMPUTER: 1
  }

  /**
   * @param {PlayerTypeEnum} the type of player.
   * @param {array<string>?} fieldArrayString represents the field of the player in proper visual display format (the top row of viruses
   *     is in the first position. If null, then the whole field is empty.
   *     TODO: This should actually initialize to a random set of values if the fieldArrayString is null.
   * @param {array<string>?} upcomingPiecesArrayString represents the upcoming pieces. Each string has two characters representing
   *     the two colors that make up the piece.
   */
  constructor (playerType, fieldArrayString, upcomingPiecesArrayString) {
    /**
     * @type {Piece?} the current piece for the player.
     */
    this.piece = null
    /**
     * @type {PlayerTypeEnum} the type of player.
     */
    this.playerType = playerType
    /**
     * @type {array<Piece>} the upcoming pieces for the player.
     */
    this.upcomingPieces = []
    /**
     * @type {array<array<PlacedPiece>>} This is a two dimensional array first sorted by row and then by column.
     * i.e. (2, 1) represents the 3rd column from the left and the 2nd row from the bottom.
     */
    this.field = []
    /**
     * @type {number} the number of viruses remaining.
     */
    this.numVirusesRemaining = 0
    /**
     * @type {playerStatesEnum} the player's current state.
     */
    this.playerState = Player.playerStatesEnum.PLAYER_MOVE

    this.initializeFieldAndVirusesGivenFieldArrayString(fieldArrayString)
    this.initializeUpcomingPiecesGivenArrayString(upcomingPiecesArrayString)
  }

  /**
   * Initializes the field for a given player.
   * @param {array<string>?} fieldArrayString represents the field of the player in proper visual display format (the top row of viruses
   * is in the first position.
   */
  initializeFieldAndVirusesGivenFieldArrayString (fieldArrayString) {
    this.numVirusesRemaining = 0
    if (!fieldArrayString) {
      for (let w = 0; w < DrMario.WIDTH; ++w) {
        let col = []
        for (let l = 0; l < DrMario.HEIGHT; ++l) {
          col.push(new PlacedPiece(DrMario.colorEnum.NONE, DrMario.blockTypeEnum.EMPTY))
        }
        this.field.push(col)
      }
    }
    for (let w = 0; w < DrMario.WIDTH; ++w) {
      let col = []
      for (let l = 0; l < DrMario.HEIGHT; ++l) {
        let placedPiece = new PlacedPiece()
        let fieldArrayStringFirstIndex = DrMario.HEIGHT - 1 - l
        let fieldArrayStringSecondIndex = 3 * w
        placedPiece.color = fieldArrayString[fieldArrayStringFirstIndex][fieldArrayStringSecondIndex]
        placedPiece.type = fieldArrayString[fieldArrayStringFirstIndex][fieldArrayStringSecondIndex + 1]
        col.push(placedPiece)
        if (placedPiece.type == DrMario.blockTypeEnum.VIRUS) {
          this.numVirusesRemaining++
        }
      }
      this.field.push(col)
    }
  }

  /**
   * Initializes the upcoming pieces for the player.
   * @param {array<string>?} upcomingPiecesArrayString represents the upcoming pieces. Each string has two characters representing
   *     the two colors that make up the piece.
   */
  initializeUpcomingPiecesGivenArrayString (upcomingPiecesArrayString) {
    for (let i = 0; i < upcomingPiecesArrayString.length; ++i) {
      this.upcomingPieces.push(new Piece(null, null, null, upcomingPiecesArrayString[i][0], upcomingPiecesArrayString[i][1]))
    }
  }

  startGame () {
    this.getNextPiece()
  }

  getNextPiece () {
    this.piece = this.upcomingPieces.shift()
    if (!this.piece) {
      return
    }
    this.piece.column = DrMario.INITIAL_COLUMN
    this.piece.row = DrMario.HEIGHT - 2
    this.piece.orientation = DrMario.orientationEnum.HORIZONTAL
  }

  /**
   * Moves the piece in the given direction. If moving down and the piece cannot be moved, it will be added to the field.
   * @param {directionEnum} direction the direction to move the piece.
   * @returns {...} See the return of addPieceToField.
   */
  movePiece (direction) {
    let newPiece = null
    if (direction == DrMario.directionEnum.LEFT) {
      newPiece = new Piece(this.piece.column - 1, this.piece.row, this.piece.orientation, this.piece.firstColor, this.piece.secondColor)
    } else if (direction == DrMario.directionEnum.RIGHT) {
      newPiece = new Piece(this.piece.column + 1, this.piece.row, this.piece.orientation, this.piece.firstColor, this.piece.secondColor)
    } else if (direction == DrMario.directionEnum.DOWN) {
      newPiece = new Piece(this.piece.column, this.piece.row - 1, this.piece.orientation, this.piece.firstColor, this.piece.secondColor)
    }
    if (this.isPiecePositionValid(newPiece)) {
      this.piece = newPiece
      return [0, []]
    }
    if (direction == DrMario.directionEnum.DOWN) {
      return this.addPieceToField()
    }
  }

  maybeMovePieceDown () {
    if (this.playerState != Player.playerStatesEnum.PLAYER_MOVE) {
      return [0, []]
    }
    return this.movePiece(DrMario.directionEnum.DOWN)
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
    return this.numVirusesRemaining == 0
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
        taken = new Array(len)
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available")
    while (n--) {
        var x = Math.floor(Math.random() * len)
        result[n] = arr[x in taken ? taken[x] : x]
        taken[x] = --len in taken ? taken[len] : len
    }
    return result
  }

  /**
   * Adds punishing blocks to the field based on the combo length of the other player.
   * @param {number} comboLength
   */
  addComboBlocks (comboLength) {
    let numBlocksToAdd = Math.min(comboLength, DrMario.MAX_COMBO_BLOCKS)
    let possibleColumns = []
    for (let w = 0; w < DrMario.WIDTH; ++w) {
      if (this.field[w][DrMario.HEIGHT - 2].type == DrMario.blockTypeEnum.EMPTY) {
        possibleColumns.push(w)
      }
    }
    numBlocksToAdd = Math.min(numBlocksToAdd, possibleColumns.length)
    let columnsToAdd = Player.getRandomNElements(possibleColumns, numBlocksToAdd)
    let colorsToAdd = []
    for (let i = 0; i < numBlocksToAdd; ++i) {
      colorsToAdd.push(DrMario.allColors[Math.floor(Math.random() * 3)])
    }
    for (let i = 0; i < numBlocksToAdd; ++i) {
      this.field[columnsToAdd[i]][DrMario.HEIGHT - 2] = new PlacedPiece(DrMario.blockTypeEnum.SINGLE, colorsToAdd[i])
    }
  }

  /**
   * Checks the field for any blocks that will be cleared, mark those with an explosion.
   * Returns the number of combos generated by this field.
   * @returns {number} the number of combos generated by these explosiions.
   */
  markFieldExplosions () {
    let numCombos = 0
    // Vertical explosions.
    for (let w = 0; w < DrMario.WIDTH; ++w) {
      let streakLength = 0
      let currentColor = DrMario.colorEnum.NONE
      for (let h = 0; h < DrMario.HEIGHT; ++h) {
        if (this.field[w][h].type == DrMario.blockTypeEnum.EMPTY) {
          streakLength = 0
          currentColor = DrMario.colorEnum.NONE
        } else if (this.field[w][h].color != currentColor) {
          streakLength = 1
          currentColor = this.field[w][h].color
        } else if (this.field[w][h].color == currentColor) {
          streakLength++
          if (streakLength >= 4) {
            if (streakLength == 4) {
              numCombos++
              for (let i = 1; i < 4; ++i) {
                this.markPieceExplosion(w, h - i)
              }
            }
            this.markPieceExplosion(w, h)
          }
        }
      }
    }

    // Horizontal explosions.
    for (let h = 0; h < DrMario.HEIGHT; ++h) {
      let streakLength = 0
      let currentColor = DrMario.colorEnum.NONE
      for (let w = 0; w < DrMario.WIDTH; ++w) {
        if (this.field[w][h].type == DrMario.blockTypeEnum.EMPTY) {
          streakLength = 0
          currentColor = DrMario.colorEnum.NONE
        } else if (this.field[w][h].color != currentColor) {
          streakLength = 1
          currentColor = this.field[w][h].color
        } else if (this.field[w][h].color == currentColor) {
          streakLength++
          if (streakLength >= 4) {
            if (streakLength == 4) {
              numCombos++
              for (let i = 1; i < 4; ++i) {
                this.markPieceExplosion(w - i, h)
              }
            }
            this.markPieceExplosion(w, h)
          }
        }
      }
    }
    return numCombos
  }

  /**
   * Marks the given block as having exploded and handle its neighbours.
   * @type {number} width the position of the
   */
  markPieceExplosion (col, row) {
    let piece = this.field[col][row]
    let connectedPiece = null
    if (piece.type == DrMario.blockTypeEnum.TOP) {
      connectedPiece = this.field[col][row - 1]
    } else if (piece.type == DrMario.blockTypeEnum.BOTTOM) {
      connectedPiece = this.field[col][row + 1]
    } else if (piece.type == DrMario.blockTypeEnum.LEFT) {
      connectedPiece = this.field[col + 1][row]
    } else if (piece.type == DrMario.blockTypeEnum.RIGHT) {
      connectedPiece = this.field[col - 1][row]
    }
    if (piece.type == DrMario.blockTypeEnum.VIRUS) {
      this.numVirusesRemaining--
    }
    piece.type = DrMario.blockTypeEnum.EXPLODED
    if (connectedPiece == null) {
      return
    }
    connectedPiece.type = DrMario.blockTypeEnum.SINGLE
  }

  /**
   * Move the field back to a valid state instead of the intermediate states caused by events such as combo
   * blocks being added, or blocks being cleared.
   * @returns {boolean} true if any block moved during this function.
   */
  applyGravityToField () {
    let blockMoved = false
    for (let h = 1; h < DrMario.HEIGHT; ++h) {
      for (let w = 0; w < DrMario.WIDTH; ++w) {
        let piece = this.field[w][h]
        if (this.field[w][h - 1].type != DrMario.blockTypeEnum.EMPTY) {
          continue
        }
        if (piece.type == DrMario.blockTypeEnum.SINGLE || piece.type == DrMario.blockTypeEnum.BOTTOM || piece.type == DrMario.blockTypeEnum.TOP) {
          this.field[w][h] = new PlacedPiece(DrMario.blockTypeEnum.EMPTY, DrMario.colorEnum.NONE)
          this.field[w][h - 1] = piece
          blockMoved = true
          continue
        }
        if (piece.type == DrMario.blockTypeEnum.LEFT) {
          let connectedPiece = this.field[w + 1][h]
          if (this.field[w + 1][h - 1].type != DrMario.blockTypeEnum.EMPTY) {
            continue
          }
          this.field[w][h] = new PlacedPiece(DrMario.blockTypeEnum.EMPTY, DrMario.colorEnum.NONE)
          this.field[w + 1][h] = new PlacedPiece(DrMario.blockTypeEnum.EMPTY, DrMario.colorEnum.NONE)
          this.field[w][h - 1] = piece
          this.field[w + 1][h - 1] = connectedPiece
        }
      }
    }
    return blockMoved
  }

  rotatePiece (rotation) {
    let newPiece = null
    let oldPiece = this.piece
    if (this.piece.column == DrMario.WIDTH - 1 && this.piece.orientation == DrMario.orientationEnum.VERTICAL) {
      oldPiece = new Piece(this.piece.column - 1, this.piece.row, this.piece.orientation, this.piece.firstColor, this.piece.secondColor)
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
      this.piece = newPiece
    }
  }

  /**
   * This is a static method that acts on a given piece passed in rather than the player's piece. This simply checks if
   * the position of the floating piece is valid. It doesn't not verify whether the piece can be placed down there.
   * @param {Piece} piece the piece to check.
   */
  isPiecePositionValid (piece) {
    let coordinates = piece.getCoordinates()
    for (let i = 0; i < coordinates.length; ++i) {
      let coordinate = coordinates[i]
      if (coordinate[0] < 0 || coordinate[0] > DrMario.WIDTH - 1) {
        return false
      }
      if (coordinate[1] < 0) {
        return false
      }
      if (this.field[coordinate[0]][coordinate[1]].type != DrMario.blockTypeEnum.EMPTY) {
        return false
      }
    }
    return true
  }

  copy (o) {
    var output, v, key
    output = Array.isArray(o) ? [] : {}
    for (key in o) {
        v = o[key]
        output[key] = (typeof v === "object") ? this.copy(v) : v
    }
    return output
  }

  /**
   * Adds the current player piece to the field in its current position. THere is no error checking for whether it
   * actually has a piece underneath it to rest on or not.
   * @param {Piece} piece
   * @returns {array{Misc}} an array of two different types.
   * - Position 0 is a number representing the number of combos that were generated by this addition
   * - Position 1 is an array of fields needed to render what occurred. This only exists if numCombos is
   *   greater than 0.
   */
  addPieceToField () {
    let coordinates = this.piece.getCoordinates()
    if (this.piece.orientation == DrMario.orientationEnum.HORIZONTAL) {
      this.field[coordinates[0][0]][coordinates[0][1]] = new PlacedPiece(DrMario.blockTypeEnum.LEFT, this.piece.firstColor)
      this.field[coordinates[1][0]][coordinates[1][1]] = new PlacedPiece(DrMario.blockTypeEnum.RIGHT, this.piece.secondColor)
    } else {
      this.field[coordinates[0][0]][coordinates[0][1]] = new PlacedPiece(DrMario.blockTypeEnum.BOTTOM, this.piece.firstColor)
      this.field[coordinates[1][0]][coordinates[1][1]] = new PlacedPiece(DrMario.blockTypeEnum.TOP, this.piece.secondColor)
    }
    this.getNextPiece()

    let totalNumCombos = 0
    let currentNumCombos = 0

    let fields = []
    while (true) {
      currentNumCombos = this.markFieldExplosions()
      fields.push(this.copy(this.field))
      if (currentNumCombos == 0) {
        break
      }
      totalNumCombos += currentNumCombos
      this.replaceExplodedWithEmpty()
      while (true) {
        let fieldChanged = this.applyGravityToField()
        if (!fieldChanged) {
          break
        }
        fields.push(this.copy(this.field))
      }
    }
    if (totalNumCombos > 0) {
      this.playerState = Player.playerStatesEnum.ANIMATING
    }
    return [totalNumCombos, fields]
  }
}

class PlacedPiece {
  constructor (type, color) {
    this.type = type
    this.color = color
  }
}

class Piece {
  constructor (column, row, orientation, firstColor, secondColor) {
    /**
     * The column of the bottom left part of the piece.
     * @type {number?} can be null if representing an upcoming piece.
     */
    this.column = column
    /**
     * The row of the bottom left part of the piece.
     * @type {number?} can be null if representing an upcoming piece.
     */
    this.row = row
    /**
     * The orientation of the piece.
     * @type {orientationEnum?} can be null if representing an upcoming piece.
     */
    this.orientation = orientation
    /**
     * The color of the part of the piece represented by column and row.
     */
    this.firstColor = firstColor
    /**
     * The color of the part of the piece not in the column and row.
     */
    this.secondColor = secondColor
  }

  getCoordinates() {
    let ret = []
    ret.push([this.column, this.row])
    if (this.orientation == DrMario.orientationEnum.HORIZONTAL) {
      ret.push([this.column + 1, this.row])
    } else {
      ret.push([this.column, this.row + 1])
    }
    return ret
  }
}

export { DrMario, Player }