import { RpgUtils } from './rpg_utils.js'

/**
 * Manages the state for an rpg.
 */
class StateManager {
  /**
   * @param {Phaser.Scene} scene the phaser scene.
   */
  constructor (scene) {
    /**
     * @type {number} the index number of the rpg state we are in.
     */
    this.index = -1;
    /**
     * @type {array<Rpg.State object>} The Rpg state object.
     */
    this.states = [];
    /**
     * @type {Phaser.Scene} The Phaser scene.
     */
    this.scene = scene;
    /**
     * @type {Phaser.Tilemap} The Phaser tilemap.
     */
    this.map = null;
    /**
     * @type {Phaser.Physics.Arcade.Sprite} The Phaser sprite representing the player.
     */
    this.player = null;
    /**
     * @type {number} The time used for state purposes.
     */
    this.time = 0;
  }

  /**
   * Adds the scene information
   * @param {Phaser.Tilemap} map the phaser map.
   * @param {Phaser.Physics.Arcade.Sprite} player the phaser player.
   * @param {array<Rpg.State object>} states The Rpg states object.
   */
  setSceneInfo (map, player, states) {
    this.map = map;
    this.player = player;
    this.states = states;
  }

  /**
   * Checks to see if we should advance to the next state due to time. Must be called in the update function.
   * @param {Phaser.Input.Keyboard.Key?} actionKey the action key to check. Nullable.
   * @param {Phaser.Physics.Arcade.Sprite} player the current player to check for actions on if an action key is pressed.
   */
  shouldAdvanceToNextState (actionKey) {
    if (this.index == -1) {
      return true;
    }
    if (this.index >= this.states.length) {
      return false;
    }
    if (this.states[this.index].type == 'timer' && ((new Date().getTime()) >= this.states[this.index].time + this.time)) {
      return true;
    }
    if (actionKey) {
      if (this.states[this.index].type == 'player' && Phaser.Input.Keyboard.JustDown(actionKey) && RpgUtils.areSpritesInRangeToInteract(this.player, this.states[this.index].target)) {
        return true;
      }
    }
  };

  /**
   * Returns the current state or null if there is no valid state.
   * @return {State} the current state.
   */
  getState () {
    if (this.index < 0 || this.index >= this.states.length) {
      return null;
    }
    return this.states[this.index];
  }

  /**
   * Advances to the next state.
   * @param {Phaser.Scene} scene the phaser scene.
   * @param {Phaser.Tilemap} map the tilemap to use.
   */
  advanceToNextState () {
    this.index++;
    this.time = (new Date().getTime());
    if (this.index >= this.states.length) {
      this.scene.advanceToNextScene();
      return;
    }
    let state = this.states[this.index];
    if (state.type == 'dialogue') {
      this.scene.stopPlayerMovement()
      this.scene.setDialogueOnDialogueManager(state.dialogue);
      return;
    }
    if (state.type == 'npcMove') {
      this.scene.stopPlayerMovement()
      let tweens = [];
      let currentX = state.target.x;
      let currentY = state.target.y;
      state.tweens.forEach((el) => {
        let obj = RpgUtils.findObjectByName(this.map, el);
        tweens.push({x: obj.x, y: obj.y, duration: RpgUtils.distanceBetweenCoordinates(currentX, currentY, obj.x, obj.y) * 1000 / RpgUtils.CHARACTER_SPEED});
        currentX = obj.x;
        currentY = obj.y;
      });
      this.scene.tweens.timeline({
        targets: state.target,
        ease: 'Linear',
        tweens: tweens,
        onComplete: () => { this.advanceToNextState() }
      });
    }
  }
}

export { StateManager }