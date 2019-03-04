/**
 * Holds information relevant to the MiriamHouse scene.
 */
let MiriamHouseSceneVars = {
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
   * @type {number} The current state.
   */
  state: 0,
  /**
   * See rpg_common_scenes/dialogue_scene.js for an explanation of dialogue__ vars.
   */
  dialogue__array: [],
  dialogue__index: 0
}

let MiriamHouseScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:
    function MiriamHouseScene () {
      Phaser.Scene.call(this, { key: 'MiriamHouseScene' });
    },

  preload:
    function () {},

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create: function (data) {
    let createMapRet = Common.createMap(
      this,
      'miriam_house_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2']);
    let map = createMapRet[0];
    let layers = createMapRet[1];

    Common.createMiriamAnimation(this, 'miriam_left', 'miriam_up', 'miriam_down');

    let miriamStartTileObjectName;
    if (data.startingLocation === MiriamHouseSceneVars.startingLocationEnum.START_GAME) {
      miriamStartTileObjectName = "miriam_start";
    } else if (data.startingLocation === MiriamHouseSceneVars.startingLocationEnum.ENTER_DOOR) {
      miriamStartTileObjectName = "miriam_enterdoor";
    }
    this.miriam_ = Common.createPlayerControlledRpgCharacter(this, map, miriamStartTileObjectName, 'miriam_down');

    Common.addIntersectionWithLayers(this, this.miriam_, layers);

    this.cursors_ = this.input.keyboard.createCursorKeys();
    let door = Common.createSpriteAtStartTileName(this, map, 'door');

    this.physics.add.overlap(this.miriam_, door, (player, tile) => {this._overlapDoor();});

    this.scene.launch('DialogueScene', {textObject: MiriamHouseSceneVars, scene: this});
    this.scene.moveAbove('MiriamHouseScene', 'DialogueScene');
  },

  update: function (time, delta) {
    this._maybeSwitchToStateOne(time);
    Common.updatePlayerAnimation(this, this.cursors_, this.miriam_, 'miriam_left', 'miriam_up', 'miriam_down');
  },

  /**
   * Switches to state one if required.
   * @param {Phaser.Time} time the elapsed game time.
   */
  _maybeSwitchToStateOne: function (time) {
    if (MiriamHouseSceneVars.state == 0 && time > MiriamHouseSceneVars.DIALOGUE_START_TIME) {
      MiriamHouseSceneVars.state = 1;
      MiriamHouseSceneVars.dialogue__array = miriamChristinaMeetUp1;
      MiriamHouseSceneVars.dialogue__index = 0;
      Common.getDialogueScene().setTextObject(MiriamHouseSceneVars);
    }
  },

  /**
   * Handle case where Miriam overlaps with the door.
   */
  _overlapDoor: function () {
    this.scene.stop('DialogueScene');
    this.scene.start('SanFranciscoScene', {startingLocation: SanFranciscoSceneVars.startingLocationEnum.MIRIAM_HOUSE});
  }
});
