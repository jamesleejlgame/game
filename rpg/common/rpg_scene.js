// TODO: The 'z' key is used here.

import { RpgConstants } from './constants.js'
import { BootScene } from '../../boot_scene.js'
import { DialogueManager } from './dialogue_manager.js'
import { RpgUtils } from './rpg_utils.js'
import { StateManager } from './state_manager.js'

class RpgScene extends Phaser.Scene {
  /**
   * Constructs a typical RpgScene which has a player controlled sprite.
   * @param {string} sceneKey a key representing the scene in Phaser.
   */
  constructor (sceneKey)
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
    /**
     * Whether the scene is done fading in or not.
     */
    this.fadeInComplete_ = null;
    /**
     * The name of the scene.
     */
    this.sceneName_ = sceneKey;
  }

  /**
   * Creates the scene. The subclasses implement this as follows:
   * @type {string} tilemapName the name of the tile map.
   * @type {string} tilesetName the name of the tile set.
   * @type {string} tilelayerNames the name of the tile layer.
   * @type {string?} playerLeftAnimationName the name of the left animation. Nullable.
   * @type {string?} playerUpAnimationName the name of the up animation. Nullable.
   * @type {string?} playerDownAnimationName the name of the down animation. Nullable.
   * @type {RpgState} states the states of the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   *   fadeIn {boolean?} whether to fade in the scene or not. Defaults to false.
   */
  create (tilemapName, tilesetName, tilelayerNames,
    playerLeftAnimationName, playerUpAnimationName, playerDownAnimationName,
    playerStartTileObjectName,
    states,
    data) {

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

    RpgUtils.initializeAnimations(this, BootScene.ANIMATIONS);

    this.player_ = null;
    if (playerStartTileObjectName) {
      this.player_ = RpgUtils.createPlayerControlledRpgCharacter(this, this.map_, playerStartTileObjectName, playerDownAnimationName);
    }

    if (this.player_) {
      RpgUtils.addIntersectionWithLayers(this, this.player_, layers);
    }
    this.cursors_ = this.input.keyboard.createCursorKeys();
    this.scene.launch('DialogueScene', {dialogueManager: this.dialogueManager_, visible: !data.fadeIn});
    this.scene.moveAbove(this.sceneName_, 'DialogueScene');
    this.stateManager_.setSceneInfo(this.map_, this.player_, states);
    this.actionKey_ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.fadeInComplete_ = !data.fadeIn;
    if (data.fadeIn) {
      this.cameras.main.fadeIn(RpgConstants.FADE_TIME_MS, 0, 0, 0, (camera, progress) => {
        if (progress == 1) {
          this.fadeInComplete_ = true;
          this.dialogueManager_.setDialogueVisible(true);
        }
      });
    }
  }

  update (time, delta) {
    if (this.stateManager_.shouldAdvanceToNextState(this.actionKey_, this.player_)) {
      this.stateManager_.advanceToNextState();
      return;
    }
    let state = this.stateManager_.getState()
    if (this.player_ && state && (state.type == 'player' || state.type == 'playerFreeMovement' || state.type == 'timer')) {
      RpgUtils.updatePlayerAnimation(this, this.cursors_, this.player_, this.playerLeftAnimationName_, this.playerUpAnimationName_, this.playerDownAnimationName_);
    }
  }

  /**
   * Sets the dialogue in the dialogue manager.
   * @param {Dialogue} dialogue the dialogue to set.
   */
  setDialogueOnDialogueManager (dialogue) {
    this.dialogueManager_.setDialogue(dialogue);
  }

  /**
   * Stops the movement of the sprite controlled by the player.
   */
  stopPlayerMovement () {
    if (!this.player_) {
      return;
    }
    if (this.anims.get(this.player_.anims.getCurrentKey()) == undefined) {
      return;
    }
    this.player_.setVelocity(0);
    this.player_.anims.stop();
  }

  /**
   * Advances to the next state in the state manager.
   */
  advanceToNextState () {
    this.stateManager_.advanceToNextState();
  }

  /**
   * Switches the current scene.
   * @param {string} sceneName the name of the next scene.
   * @param {Object} params the data object to pass to the scene.
   * @param {boolean?} fadeOut whether to fade out. Defaults to false.
   */
  switchScene (sceneName, params, fadeOut) {
    this.scene.stop('DialogueScene');
    if (fadeOut) {
      this.cameras.main.fade(RpgConstants.FADE_TIME_MS, 0, 0, 0, false, (camera, progress) => {
        if (progress == 1) {
          this.scene.start(sceneName, params);
        }
      });
      return;
    }
    this.scene.start(sceneName, params);
  }

  /**
   * The function to call when advancing to the next scene.
   */
  advanceToNextScene () {
    throw 'Should be overridden.'
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