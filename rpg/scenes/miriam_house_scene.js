/**
 * Holds information relevant to the MiriamHouse scene.
 */
Rpg.Scenes.MiriamHouseSceneVars = {
  /**
   * The time in miliseconds after the scene starts to start the dialogue.
   */
  DIALOGUE_START_TIME: 2000,
  /**
   * The possible miriam starting locations.
   */
  startingLocationEnum: {
    START_GAME: 0,
    ENTER_DOOR: 1
  },
  /**
   * @type {StateManager} the state manager.
   */
  stateManager_: null,
  /**
   * @type {DialogueManager} the dialogue manager.
   */
  dialogueManager_: null
};
Rpg.Scenes.MiriamHouseSceneVars.stateManager_ = new Rpg.Common.StateManager();
Rpg.Scenes.MiriamHouseSceneVars.dialogueManager_ = new Rpg.Common.DialogueManager(Rpg.Scenes.MiriamHouseSceneVars.stateManager_);
Rpg.Scenes.MiriamHouseSceneVars.stateManager_.setDialogueManager(Rpg.Scenes.MiriamHouseSceneVars.dialogueManager_);

Rpg.Scenes.MiriamHouseScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function () {
    Phaser.Scene.call(this, { key: 'MiriamHouseScene' });
  },

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create: function (data) {
    let createMapRet = Rpg.Common.Utils.createMap(
      this,
      'miriam_house_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2']);
    let map = createMapRet[0];
    let layers = createMapRet[1];

    Rpg.Common.Utils.createMiriamAnimation(this, 'miriam_left', 'miriam_up', 'miriam_down');

    let miriamStartTileObjectName;
    if (data.startingLocation === Rpg.Scenes.MiriamHouseSceneVars.startingLocationEnum.START_GAME) {
      miriamStartTileObjectName = "miriam_start";
    } else if (data.startingLocation === Rpg.Scenes.MiriamHouseSceneVars.startingLocationEnum.ENTER_DOOR) {
      miriamStartTileObjectName = "miriam_enterdoor";
    }
    this.miriam_ = Rpg.Common.Utils.createPlayerControlledRpgCharacter(this, map, miriamStartTileObjectName, 'miriam_down');

    Rpg.Common.Utils.addIntersectionWithLayers(this, this.miriam_, layers);

    this.cursors_ = this.input.keyboard.createCursorKeys();

    let door = Rpg.Common.Utils.createSpriteAtStartTileName(this, map, 'door');
    this.physics.add.overlap(this.miriam_, door, (player, tile) => {this._overlapDoor();});

    this.scene.launch('DialogueScene', {dialogueManager: Rpg.Scenes.MiriamHouseSceneVars.dialogueManager_, scene: this});

    this.scene.moveAbove('MiriamHouseScene', 'DialogueScene');

    Rpg.Scenes.MiriamHouseSceneVars.stateManager_.setStates(Rpg.Data.States.miriamHouseStates);
  },

  update: function (time, delta) {
    if (Rpg.Scenes.MiriamHouseSceneVars.stateManager_.shouldAdvanceToNextState()) {
      Rpg.Scenes.MiriamHouseSceneVars.stateManager_.advanceToNextState();
    }
    Rpg.Common.Utils.updatePlayerAnimation(this, this.cursors_, this.miriam_, 'miriam_left', 'miriam_up', 'miriam_down');
  },

  /**
   * Handle case where Miriam overlaps with the door.
   */
  _overlapDoor: function () {
    this.scene.stop('DialogueScene');
    this.scene.start('SanFranciscoScene', {startingLocation: Rpg.Scenes.SanFranciscoSceneVars.startingLocationEnum.MIRIAM_HOUSE});
  }
});
