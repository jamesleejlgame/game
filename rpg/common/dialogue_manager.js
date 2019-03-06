/**
 * Handles all Rpg dialogue.
 */
class DialogueManager {
  /**
   * @param {Phaser.Scene} scene the phaser scene.
   */
  constructor (scene) {
    /**
     * @type {array<Rpg.Dialogue object>} the array of dialogue strings.
     */
    this.array = []
    /**
     * @type {number} the index of dialogue we are rendering.
     */
    this.index = 0
    /**
     * @type {Phaser.Scene} The Phaser scene.
     */
    this.scene = scene;
    /**
     * @type {DialogueScene} The dialogue scene.
     */
    this.dialogueScene = null
  }

  /**
   * Sets the dialogue scene.
   * @param {Phaser.Scene} dialogueScene the dialogue scene.
   */
  setDialogueScene (dialogueScene) {
    this.dialogueScene = dialogueScene;
  }

  /**
   * Sets the dialogue to the given dialogue array.
   * @param {array<Dialogue object>} dialogueArray the array of dialogue strings.
   */
  setDialogue (dialogueArray) {
    this.array = dialogueArray;
    this.index = 0;
    this.dialogueScene.updateDisplayedText();
  }

  /**
   * @param {Phaser.Scene} dialogueScene the DialogueScene calling this.
   */
  advanceIndex () {
    this.index++;
    let didDialogueJustEnd = (this.index == this.array.length);
    this.dialogueScene.updateDisplayedText();
    if (didDialogueJustEnd) {
      this.scene.advanceToNextState();
    }
  }
}

export { DialogueManager }