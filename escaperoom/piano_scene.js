class PianoScene extends Phaser.Scene {
  static MIN_X = 201
  static MAX_X = 600
  static MIN_Y = 207
  static MID_Y = 330
  static MAX_Y = 391
  static KEY_WIDTH = (600 - 201)/14
  static WHITE_KEY_INDEX = [
    'PianoC4',
    'PianoD4',
    'PianoE4',
    'PianoF4',
    'PianoG4',
    'PianoA4',
    'PianoB4',
    'PianoC5',
    'PianoD5',
    'PianoE5',
    'PianoF5',
    'PianoG5',
    'PianoA5',
    'PianoB5']
  static BLACK_KEY_X_POS = [
    217, 235,
    250, 268,
    301, 319,
    333, 353,
    366, 385,
    417, 435,
    451, 468,
    502, 520,
    534, 553,
    566, 584
  ]

  static BLACK_KEY_INDEX = [
    'PianoDb4',
    'PianoEb4',
    'PianoGb4',
    'PianoAb4',
    'PianoBb4',
    'PianoDb5',
    'PianoEb5',
    'PianoGb5',
    'PianoAb5',
    'PianoBb5',
  ]

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
     * Whether the mouse click to play a song is still depressed.
     */
    this.clickActive_ = false
    /**
     * The piano layout sprite.
     */
    this.pianoSprite_ = null
    /**
     * The audio file representing the notes.
     */
    this.notes_ = null
    /**
     * The piano scene.
     */
    this.song_ = null
    /**
     * @type {array<number>} the most recently played notes. The numbers correspond to the
     * array index in the black and white key indices. The black keys are offset by 100.
     */
    this.playedNotes_ = []
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
    this.graphics_ = this.add.graphics()
    this.visible_ = false
    this.song_ = this.sound.add('song')
    this.song_.setLoop(true)
    this.hide()
    this.playedNotes_ = []
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
    if (this.game.input.activePointer.isDown && !this.clickActive_) {
      this.click()
    }
    if (this.game.input.activePointer.justUp) {
      this.clickActive_ = false
    }
  }

  playNote (keyArray, keyIndex) {
    this.sound.play('' + keyArray[keyIndex])
    if (keyArray == PianoScene.BLACK_KEY_INDEX) {
      this.playedNotes_.push(keyIndex + 100)
    } else {
      this.playedNotes_.push(keyIndex)
    }
    if (this.playedNotes_.length == 19) {
      this.playedNotes_.shift()
    }

    if (this.playedNotes_.length == 18) {
      if (
        this.playedNotes_[0] == 8 &&
        this.playedNotes_[1] == 8 &&
        this.playedNotes_[2] == 8 &&
        this.playedNotes_[3] == 7 &&
        this.playedNotes_[4] == 8 &&
        this.playedNotes_[5] == 8 &&
        this.playedNotes_[6] == 8 &&
        this.playedNotes_[7] == 7 &&
        this.playedNotes_[8] == 106 &&
        this.playedNotes_[9] == 106 &&
        this.playedNotes_[10] == 106 &&
        this.playedNotes_[11] == 104 &&
        this.playedNotes_[12] == 8 &&
        this.playedNotes_[13] == 8 &&
        this.playedNotes_[14] == 7 &&
        this.playedNotes_[15] == 104 &&
        this.playedNotes_[16] == 5 &&
        this.playedNotes_[17] == 3) {
          this.song_.play()
          this.hide()
      }
    }
  }

  click() {
    this.clickActive_ = true
    let mouseX = this.game.input.mousePointer.x
    let mouseY = this.game.input.mousePointer.y

    if (mouseX < PianoScene.MIN_X || mouseX > PianoScene.MAX_X) {
      return
    }
    if (mouseY < PianoScene.MIN_Y || mouseY > PianoScene.MAX_Y) {
      return
    }
    if (mouseY < PianoScene.MID_Y) {
      for (let i = 0; i < PianoScene.BLACK_KEY_X_POS.length; ++i) {
        if (mouseX < PianoScene.BLACK_KEY_X_POS[i]) {
          if (i % 2 == 1) {
            this.playNote(PianoScene.BLACK_KEY_INDEX, Math.floor(i / 2))
            return
          }
        }
      }
    }
    let keyIndex = Math.floor((mouseX - 201) / PianoScene.KEY_WIDTH)
    this.playNote(PianoScene.WHITE_KEY_INDEX, keyIndex)
  }
}

export { PianoScene }

