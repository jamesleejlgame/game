/**
 * A scene for rendering dialogue in a box at the top of the screen.
 */
class ClockScene extends Phaser.Scene {
  constructor ()
  {
    super({ key: 'ClockScene' })
    /**
     * The graphics object of this scene.
     */
    this.graphics_ = null
    /**
     * The text object.
     */
    this.text_ = null
    /**
     * The currently entered code.
     */
    this.number_ = ""
    /**
     * @type {array<Phaser.Input.Keyboard.Key>} the number keys.
     */
    this.numberKeys_ = []

    this.callingClass_ = null
  }

  /**
   * Creates a dialogue scene.
   * @param {Object} data The object containing the keys:
   *   dialogueManager {Object} a scene vars object initialized with dialogue_manager.
   *   visible {boolean} whether this is visible or not.
   */
  create (data) {
    /**
     * @type {Phaser.GameObjects.Graphics} The Phaser graphics object.
     */
    this.graphics_ = this.add.graphics()
    this.graphics_.lineStyle(1, 0xffffff)
    this.graphics_.fillStyle(0x031f4c, 1)
    this.graphics_.strokeRoundedRect(50, 50, 700, 500, 10)
    this.graphics_.fillRoundedRect(51, 51, 698, 498, 10)
    this.numberKeys_ = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE)]
    this.number_ = ''
    this.text_ = this.add.text(60, 60, 'Enter 4-digit code:', { fontFamily: 'Arial', fontSize: 32, color: 'white' });
    data.callingClass.clockScene_ = this
    this.callingClass_ = data.callingClass
  }

  update () {
    for (let i = 0; i < this.numberKeys_.length; ++i) {
      if (Phaser.Input.Keyboard.JustDown(this.numberKeys_[i])) {
        this.number_ += '' + i
        this.text_.setText('Enter 4-digit code: ' + this.number_)
        if (this.number_ == '1000') {
          this.callingClass_.solved()
        }
      }
    }
  }
}

export { ClockScene }