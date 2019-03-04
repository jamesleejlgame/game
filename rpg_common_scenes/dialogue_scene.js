/**
 * A scene for rendering dialogue in a box at the top of the screen.
 * This scene expects to be passed an Object containing the keys:
 * @param {array<Text>} dialogue__array The text array to cycle through when the space bar is pressed.
 *     For an description of the Text class, see dialogue/dialogue.js.
 * @param {number} dialogue__index The index into the dialogue__array to render.
 *
 * It also expects to be passed a scene which contains the function dialogueOver which is called as a callback
 * when the dialogue is finished.
 * TODO: Handle Text keys other than 'm'.
 */
var DialogueScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function DialogueScene () {
    Phaser.Scene.call(this, { key: 'DialogueScene' });
  },

  /**
   * Creates a dialogue scene.
   * @param {Object} data The object containing the keys:
     *   textObject {Object} an object with the keys dialogue__array and dialogue__index described above.
     *   scene {Phaser.Scene} the phaser scene calling this.
     */
  create: function (data) {
    /**
     * @type {Phaser.GameObjects.Graphics} The Phaser graphics object.
     */
    this.graphics_ = this.add.graphics();
    /**
     * @type {Object} The object containing the keys:
     *   textObject {Object} an object with the keys dialogue__array and dialogue__index described above.
     *   scene {Phaser.Scene} the phaser scene calling this.
     */
    this.textObject_ = null;
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
    this.setTextObject(data.textObject);
  },

  update: function () {
    if (this.textObject_ && this.textObject_.dialogue__array && this.textObject_.dialogue__array.length > 0 && Phaser.Input.Keyboard.JustDown(this.spaceBar_)) {
      this.textObject_.dialogue__index++;
      let didDialogueJustEnd = this.textObject_.dialogue__index == this.textObject_.dialogue__array.length;
      this._updateDisplayedText();
      if (didDialogueJustEnd && this.scene_.dialogueOver) {
        this.scene_.dialogueOver();
      }
    }
  },

  /**
   * Used to set the textObject which determines what text to render initially and when the space bar is
   * pressed.
   * @param {Object} textObject the textObject with params as defined in textObject_.
   */
  setTextObject: function (textObject) {
    this.graphics_.lineStyle(1, 0xffffff);
    this.graphics_.fillStyle(0x031f4c, 1);
    this.graphics_.strokeRoundedRect(10, 10, 780, 100, 10);
    this.graphics_.fillRoundedRect(11, 11, 778, 99, 10);
    this.textObject_ = textObject;
    this._updateDisplayedText();
  },

  /**
   * Clears the displayed text.
   */
  _clearDisplayedText: function () {
    this.graphics_.clear();
    this.text_.setVisible(false);
    this.textObject_.dialogue__array = [];
    this.textObject_.dialogue__index = 0;
  },

  /**
   * Updates the displayed text.
   */
  _updateDisplayedText: function () {
    if (this.textObject_.dialogue__index >= this.textObject_.dialogue__array.length) {
      this._clearDisplayedText();
      return;
    }
    this.text_.setVisible(true);
    this.text_.setText(this.textObject_.dialogue__array[this.textObject_.dialogue__index]['m']);
  }
});