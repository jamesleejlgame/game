/**
 * A scene for rendering dialogue in a box at the top of the screen.
 */
class PopupImageScene extends Phaser.Scene {
  constructor ()
  {
    super({ key: 'PopupImageScene' })
    /**
     * Whether this is visible or not.
     */
    this.visible_ = false
    /**
     * The graphics object of this scene.
     */
    this.graphics_ = null
    /**
     * The image rendered by this popup scene.
     */
    this.image_ = null
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
    this.image_ = this.physics.add.staticImage(400, 300, '')
    this.visible_ = false
    this.hidePicture()
    data.callingClass.popupImageScene_ = this
  }

  /**
   * Hides the popup.
   */
  hidePicture () {
    this.graphics_.clear()
    this.image_.setVisible(false)
    this.visible_ = false
  }

  /**
   * Shows the popup.
   * @param {string} imageName the name of the image to show.
   */
  togglePicture (imageName) {
    if (this.visible_) {
      this.visible_ = false
      this.hidePicture()
      return
    }
    this.visible_ = true
    this.image_.setVisible(true)
    this.image_.setTexture(imageName)
    this.graphics_.lineStyle(1, 0xffffff)
    this.graphics_.fillStyle(0x031f4c, 1)
    this.graphics_.strokeRoundedRect(50, 50, 700, 500, 10)
    this.graphics_.fillRoundedRect(51, 51, 698, 498, 10)
  }
}

export { PopupImageScene }