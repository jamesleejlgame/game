/**
 * Manages the state for an rpg.
 * @param {array<Rpg.State object>} states the rpg state objects to set.
 */
Rpg.Common.StateManager = function () {
  /**
   * @type {number} the index number of the rpg state we are in.
   */
  this.index = -1;
  /**
   * @type {array<Rpg.State object>} The Rpg state object.
   */
  this.states = null;
  /**
   * @type {Phaser.Scene} The Phaser scene.
   */
  this.scene = null;
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
  /**
   * The dialogue manager associated with this state.
   */
  this.dialogueManager_ = null;
};

/**
 * Sets the Rpg states.
 * @param {array<Rpg.State object>} states The Rpg states object.
 */
Rpg.Common.StateManager.prototype.setStates = function (states) {
  this.states = states;
}

/**
 * Adds the scene information
 * @param {Phaser.Scene} scene the phaser scene.
 * @param {Phaser.Tilemap} map the phaser map.
 * @param {Phaser.Physics.Arcade.Sprite} player the phaser player.
 */
Rpg.Common.StateManager.prototype.setSceneInfo = function (scene, map, player) {
  this.scene = scene;
  this.map = map;
  this.player = player;
}

/**
 * Checks to see if we should advance to the next state due to time. Must be called in the update function.
 * @param {Phaser.Input.Keyboard.Key?} actionKey the action key to check. Nullable.
 * @param {Phaser.Physics.Arcade.Sprite} player the current player to check for actions on if an action key is pressed.
 */
Rpg.Common.StateManager.prototype.shouldAdvanceToNextState = function (actionKey, player) {
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
    if (this.states[this.index].type == 'player' && Phaser.Input.Keyboard.JustDown(actionKey) && Rpg.Common.Utils.areSpritesInRangeToInteract(player, this.states[this.index].target)) {
      return true;
    }
  }
};

/**
 * Adds a dialogue manager to the state manager.
 * @param {DialogueManager} dialogueManager the dialogue manager.
 */
Rpg.Common.StateManager.prototype.setDialogueManager = function (dialogueManager) {
  this.dialogueManager_ = dialogueManager;
};

/**
 * Advances to the next state.
 * @param {Phaser.Scene} scene the phaser scene.
 * @param {Phaser.Tilemap} map the tilemap to use.
 */
Rpg.Common.StateManager.prototype.advanceToNextState = function () {
  this.index++;
  this.time = (new Date().getTime());
  if (this.index >= this.states.length) {
    return;
  }
  let state = this.states[this.index];
  if (state.type == 'dialogue') {
    this.dialogueManager_.setDialogue(state.dialogue);
    return;
  }
  if (state.type == 'npcMove') {
    tweens = [];
    let currentX = state.target.x;
    let currentY = state.target.y;
    state.tweens.forEach((el) => {
      let obj = Rpg.Common.Utils.findObjectByName(this.map, el);
      tweens.push({x: obj.x, y: obj.y, duration: Rpg.Common.Utils.distanceBetweenCoordinates(currentX, currentY, obj.x, obj.y) * 1000 / Rpg.Common.Utils.CHARACTER_SPEED});
      currentX = obj.x;
      currentY = obj.y;
    });
    this.scene.tweens.timeline({
      targets: state.target,
      ease: 'Linear',
      tweens: tweens
    });
  }
};