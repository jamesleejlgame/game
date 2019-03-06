import { DialogueManager } from './dialogue_manager.js'
import { RpgUtils } from './rpg_utils.js'
import { StateManager } from './state_manager.js'

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
    this.stateManager_ = new StateManager(this);
    /**
     * @type {DialogueManager} the dialogue manager for this scene.
     */
    this.dialogueManager_ = new DialogueManager(this);
    /**
     * @type {Phaser.Tilemap} the tilemap representing the map of this scene.
     */
    this.map_ = null;
    /**
     * @type {Phaser.Physics.Action.Sprite} the phaser sprite the player is controlling. 
     */
    this.player_ = null;
    /**
     * @type {string} the name of the animation to play when the player walks left.
     */
    this.playerLeftAnimationName_ = null;
    /**
     * @type {string} the name of the animation to play when the player walks up.
     */
    this.playerUpAnimationName_ = null;
    /**
     * @type {string} the name of the animation to play when the player walks down.
     */
    this.playerDownAnimationName_ = null;
    /**
     * @type {Phaser.Input.Keyboard.Key} the key for taking actions.
     */
    this.actionKey_ = null;
  }

  create (tilemapName, tilesetName, tilelayerNames, 
    playerLeftAnimationName, playerUpAnimationName, playerDownAnimationName,
    playerStartTileObjectName,
    sceneName,
    states) {

    this.playerLeftAnimationName_ = playerLeftAnimationName
    this.playerUpAnimationName_ = playerUpAnimationName
    this.playerDownAnimationName_ = playerDownAnimationName
    let createMapRet = RpgUtils.createMap(
      this,
      tilemapName,
      tilesetName,
      tilelayerNames);
    this.map_ = createMapRet[0];
    let layers = createMapRet[1];

    RpgUtils.createPlayerAnimation(this, playerLeftAnimationName, playerUpAnimationName, playerDownAnimationName);

    this.player_ = RpgUtils.createPlayerControlledRpgCharacter(this, this.map_, playerStartTileObjectName, playerDownAnimationName);
    RpgUtils.addIntersectionWithLayers(this, this.player_, layers);
    this.cursors_ = this.input.keyboard.createCursorKeys();
    this.scene.launch('DialogueScene', {dialogueManager: this.dialogueManager_});
    this.scene.moveAbove(sceneName, 'DialogueScene');
    this.stateManager_.setSceneInfo(this.map_, this.player_, states);
    this.actionKey_ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  }

  update (time, delta) {
    if (this.stateManager_.shouldAdvanceToNextState(this.actionKey_, this.player_)) {
      this.stateManager_.advanceToNextState();
    }
    RpgUtils.updatePlayerAnimation(this, this.cursors_, this.player_, this.playerLeftAnimationName_, this.playerUpAnimationName_, this.playerDownAnimationName_);
  }

  /**
   * Sets the dialogue in the dialogue manager.
   * @param {Dialogue} dialogue the dialogue to set.
   */
  setDialogueOnDialogueManager (dialogue) {
    this.dialogueManager_.setDialogue(dialogue);
  }

  /**
   * Advances to the next state in the state manager.
   */
  advanceToNextState () {
    this.stateManager_.advanceToNextState();
  }

  /**
   * Sets the states in the scene manager.
   * @param {array<State>} states the states of this scene.
   */
  setStates (states) {
    this.stateManager_.setSceneInfo(this.map_, this.player_, states);
  }
}

export { RpgScene }