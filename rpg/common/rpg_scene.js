class RpgScene extends Phaser.Scene {
  /**
   * Constructs a typical RpgScene which has a player controlled sprite.
   * @param {string} sceneKey a key representing the scene in Phaser.
   * @param {Class} sceneClass the class representing the scene. (As opposed to an instance of it.)
   */
  constructor (sceneKey, sceneClass)
  {
    super({ key: sceneKey });

    /**
     * @type {StateManager} the state manager for this scene.
     */
    this.stateManager_ = null;
    /**
     * @type {DialogueManager} the dialogue manager for this scene.
     */
    this.dialogueManager_ = null;
    this.initializeStateAndDialogManagers_();
  }

  update (time, delta) {
    if (this.stateManager_.shouldAdvanceToNextState(this.actionKey_, this.miriam_)) {
      this.stateManager_.advanceToNextState();
    }
    Rpg.Common.Utils.updatePlayerAnimation(this, this.cursors_, this.miriam_, 'miriam_left', 'miriam_up', 'miriam_down');
  }

  /**
   * Defines the state and dialog managers on the scene variable.
   * @param {SceneVars} sceneVars the scene vars to define the managers on.
   */
  initializeStateAndDialogManagers_ () {
    this.stateManager_ = new Rpg.Common.StateManager();
    this.dialogueManager_ = new Rpg.Common.DialogueManager(this.stateManager_);
    this.stateManager_.setDialogueManager(this.dialogueManager_);
  }
}

export { RpgScene }