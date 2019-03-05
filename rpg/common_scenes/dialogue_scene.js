/**
 * A scene for rendering dialogue in a box at the top of the screen.
 *
 * This class is tightly coupled with Rpg.DialogueManager.
 * TODO: Handle Text keys other than 'm'.
 */
class DialogueScene extends Phaser.Scene {
  constructor ()
  {
    super({ key: 'DialogueScene' });
  }

  /**
   * Creates a dialogue scene.
   * @param {Object} data The object containing the keys:
   *   dialogueManager {Object} a scene vars object initialized with dialogue_manager.
   *   scene {Phaser.Scene} the phaser scene calling this.
   */
  create (data) {
    /**
     * @type {Phaser.GameObjects.Graphics} The Phaser graphics object.
     */
    this.graphics_ = this.add.graphics();
    /**
     * @type {DialogueManager} The dialogue manager tied to this.
     */
    this.dialogueManager_ = data.dialogueManager;
    this.dialogueManager_.setDialogueScene(this);
    /**
     * @type {Phaser.Scene} the phaser scene calling this.
     */
    this.scene_ = data.scene;
    /**
     * @type {Phaser.GameObjects.Text} The current text to display.
     */
    this.text_ = this.add.text(16, 16, '',
      { fontSize: '16px', fill: '#fff', wordWrap: { width: 767, useAdvancedWrap: true } });
    /**
     * @type {Phaser.Input.Keyboard.Key} the spacebar key.
     */
    this.spaceBar_ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.updateDisplayedText();
  }

  update () {
    if (this.dialogueManager_.array.length > 0 && Phaser.Input.Keyboard.JustDown(this.spaceBar_)) {
      this.dialogueManager_.advanceIndex(this);
    }
  }

  /**
   * Clears the displayed text.
   */
  _clearDisplayedText () {
    this.graphics_.clear();
    this.text_.setVisible(false);
    this.dialogueManager_.array = [];
    this.dialogueManager_.index = 0;
  }

  /**
   * Updates the displayed text.
   */
  updateDisplayedText () {
    if (this.dialogueManager_.index >= this.dialogueManager_.array.length) {
      this._clearDisplayedText();
      return;
    }
    this.graphics_.lineStyle(1, 0xffffff);
    this.graphics_.fillStyle(0x031f4c, 1);
    this.graphics_.strokeRoundedRect(10, 10, 780, 100, 10);
    this.graphics_.fillRoundedRect(11, 11, 778, 99, 10);
    this.text_.setVisible(true);
    this.text_.setText(this.dialogueManager_.array[this.dialogueManager_.index]['m']);
  }
}

export { DialogueScene }