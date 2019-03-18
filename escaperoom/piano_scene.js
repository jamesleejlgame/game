/**
 * A scene for playing a piano. Adapted from https://github.com/wasi0013/Phaser-Piano.
 * TODO: Remove this.
 */
class PianoScene extends Phaser.Scene {
  //shift octaves left / right
  static LOWER_OFFSET = 24
  static UPPER_OFFSET = 36
  // piano bg center co-ordinates
  static MIN_X = 230
  static MAX_X = 614
  static MIN_Y = 194
  static MID_Y = 311
  static MAX_Y = 403
  //key map
  static LOWER_OCTAVE = [65, 90, 83, 88, 67, 70, 86, 71, 66, 78, 74, 77, 75, 188, 76, 190, 191, 222]
  static UPPER_OCTAVE = [49, 81, 50, 87, 69, 52, 82, 53, 84, 89, 55, 85, 56, 73, 57, 79, 80, 189, 219, 187, 221]
  //note markers
  static CURSOR_LOW =  [1, 3, 4, 6, 8, 9, 11, 13, 15, 16, 18, 20, 21, 23, 25, 27, 28, 30, 32, 33, 35, 37, 39, 40, 42, 44, 45, 47, 49, 51, 52, 54, 56, 57, 59, 61 , 63, 64, 66, 68, 69, 71, 73, 75, 76, 78, 80, 81, 83, 85, 87, 88]
  static CURSOR_HIGH = {2: 15, 5: 62, 7: 89, 10: 135, 12: 161, 14: 186, 17: 233, 19: 259, 22: 303, 24: 329,  26: 353, 29: 400, 31: 426, 34: 470,  36: 496,  38: 522, 41: 566,  43: 592, 46: 636,  48: 662,  50: 688, 53: 732,  55: 758, 58: 802,  60: 828,  62: 854, 65: 898,  67: 924, 70: 970,  72: 996,  74:1022, 77: 1067, 79: 1093, 82: 1138, 84: 1164, 86: 1190 }

  constructor ()
  {
    super({ key: 'PianoScene' })
    /**
     * Whether this is visible or not.
     */
    this.visible_ = false
    /**
     * The graphics object of this scene.
     */
    this.graphics_ = null
    /**
     * Which keys are pressed.
     */
    this.keysDown_ = {}
    /**
     * Whether or not the key was just clicked or not.
     */
    this.clicked_ = false
    /**
     * The piano layout sprite.
     */
    this.pianoSprite_ = null
    /**
     * The audio file representing the notes.
     */
    this.notes_ = null
  }

  /**
   * Creates a dialogue scene.
   * @param {Object} data The object containing the keys:
   *   dialogueManager {Object} a scene vars object initialized with dialogue_manager.
   *   visible {boolean} whether this is visible or not.
   */
  create (data) {
    this.pianoSprite_ = this.physics.add.sprite(400, 300, 'keys')
    this.pianoSprite_.setVisible(false)
    this.pianoSprite_.setDepth(1)
    this.notes_ = this.load.audio('notes', ['assets/tingting/keys.mp3'])
    this.graphics_ = this.add.graphics()
    this.visible_ = false
    this.hide()
    data.callingClass.pianoScene_ = this
  }

  /**
   * Hides the popup.
   */
  hide () {
    this.graphics_.clear()
    this.visible_ = false
    this.pianoSprite_.setVisible(false)
  }

  /**
   * Shows the popup.
   * @param {string} imageName the name of the image to show.
   */
  toggle () {
    if (this.visible_) {
      this.visible_ = false
      this.hide()
      return
    }
    this.visible_ = true
    this.graphics_.lineStyle(1, 0xffffff)
    this.graphics_.fillStyle(0x031f4c, 1)
    this.graphics_.strokeRoundedRect(50, 50, 700, 500, 10)
    this.graphics_.fillRoundedRect(51, 51, 698, 498, 10)
    this.pianoSprite_.setVisible(true)
  }

  update() {
    if (!this.visible_) {
      return
    }
    if (this.game.input.activePointer.isDown && !this.clicked_) {
      this.click()
    }
    if (this.game.input.activePointer.isUp) {
      this.clicked_ = true
    }
  }

  playNote (audioTag) {
    if (audioTag != -1 && 1 <= audioTag && 88 >= audioTag) {
      this.notes_.play(audioTag)
      if(audioTag in PianoScene.CURSOR_HIGH) {
        this.draw(PianoScene.CURSOR_HIGH[audioTag], 345)
      } else {
        this.draw(3 + PianoScene.CURSOR_LOW.indexOf(audioTag) * 24, 437)
      }
    }
  }

  draw (x, y) {
    this.graphics_.lineStyle(2, 0x0000FF, 1)
    this.graphics_.beginFill(0x0000FF, 0.5)
    this.graphics_.drawRect(0, 0, 18, 18)
    this.graphics_.endFill(0x0000FF, 0.5)
    setTimeout(function () {
      graphics.destroy()
    }, 100)
  }

  click() {
    this.clicked_ = false
    let mX = this.game.input.mousePointer.x
    let mY = this.game.input.mousePointer.y
    console.log(mX)
    console.log(mY)
    // 230, 254, 278, 302, 326, 350, 374, 398, ...
    if (mX < PianoScene.MIN_X || mX > PianoScene.MAX_X) {
      return
    }
    if (mY < PianoScene.MIN_Y || mY > PianoScene.MAX_Y) {
      return
    }
    return
    if (mY < PianoScene.MID_Y) {
      let x = mX - PianoScene.MIN_X
      let played = false
      for(let audioTag in PianoScene.CURSOR_HIGH){
        if (PianoScene.CURSOR_HIGH[audioTag] <= x && PianoScene.CURSOR_HIGH[audioTag] + 16 >= x) {
          this.playNote(audioTag)
          played = true
          break
        }
      }
      if (!played) {
        this.playNote(PianoScene.CURSOR_LOW[Math.floor((mX - 50)/24)])
      } else {
        audio_tag = PianoScene.CURSOR_LOW[Math.floor((mX - 50)/24)]
        this.playNote(audio_tag)
      }
    }
  }
}

export { PianoScene }

