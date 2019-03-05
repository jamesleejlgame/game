/**
 * Handles all Rpg dialogue.
 */
Rpg.Common.DialogueManager = function (stateManager) {
  /**
   * @type {array<Rpg.Dialogue object>} the array of dialogue strings.
   */
  this.array = [];
  /**
   * @type {number} the index of dialogue we are rendering.
   */
  this.index = 0;
  /**
   * @type {StateManager} the state manager.
   */
  this.stateManager_ = stateManager;
  /**
   * @type {DialogueScene} The dialogue scene.
   */
  this.dialogueScene_ = null;
};

/**
 * Sets the dialogue scene.
 * @param {Phaser.Scene} dialogueScene the dialogue scene.
 */
Rpg.Common.DialogueManager.prototype.setDialogueScene = function (dialogueScene) {
  this.dialogueScene_ = dialogueScene;
};

/**
 * Sets the dialogue to the given dialogue array.
 * @param {array<Rpg.Dialogue object>} dialogueArray the array of dialogue strings.
 */
Rpg.Common.DialogueManager.prototype.setDialogue = function (dialogueArray) {
  this.array = dialogueArray;
  this.index = 0;
  this.dialogueScene_.updateDisplayedText();
};

/**
 * @param {Phaser.Scene} dialogueScene the DialogueScene calling this.
 */
Rpg.Common.DialogueManager.prototype.advanceIndex = function (dialogueScene) {
  this.index++;
  let didDialogueJustEnd = (this.index == this.array.length);
  dialogueScene.updateDisplayedText();
  if (didDialogueJustEnd) {
    this.stateManager_.advanceToNextState();
  }
}