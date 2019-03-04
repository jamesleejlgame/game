/**
 * Holds information relevant to the ChristinaHouse scene.
 */
let ChristinaHouseSceneVars = {
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

/**
 * The scene representing christina's house. Variables are:
 * miriam_ {Phaser.Sprite}: the miriam sprite.
 * cursors_ {Phaser.Cursors}: the cursors object.
 */
let ChristinaHouseScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:
    function ChristinaHouseScene () {
      Phaser.Scene.call(this, { key: 'ChristinaHouseScene' });
    },

  preload:
    function () {},

  /**
   * Creates the scene.
   */
  create: function (data) {
    let createMapRet = Common.createMap(
      this,
      'christina_house_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2']);
    let map = createMapRet[0];
    let layers = createMapRet[1];

    Common.createMiriamAnimation(this, 'miriam_left', 'miriam_up', 'miriam_down');

    this.miriam_ = Common.createPlayerControlledRpgCharacter(this, map, 'miriam_enterdoor', 'miriam_down');
    this.christina_ = Common.createNPCCharacter(this, map, 'christina_start', 'christina_down');
    this.james_ = Common.createNPCCharacter(this, map, 'james_start', 'james_down');

    Common.addIntersectionWithLayers(this, this.miriam_, layers);

    this.cursors_ = this.input.keyboard.createCursorKeys();
    let door = Common.createSpriteAtStartTileName(this, map, 'door');

    this.physics.add.overlap(this.miriam_, door, (player, tile) => {this._overlapDoor();});
    this.physics.add.collider(this.miriam_, this.christina_);
    this.physics.add.collider(this.miriam_, this.james_);

    this.scene.launch('DialogueScene', {textObject: ChristinaHouseSceneVars, scene: this});
    this.scene.moveAbove('ChristinaHouseScene', 'DialogueScene');

    /**
     * @type {Phaser.Input.Keyboard.Key} the spacebar key.
     */
    this.actionButton_ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  },

  update: function (time, delta) {
    if (Phaser.Input.Keyboard.JustDown(this.actionButton_)) {
      this._maybeSwitchToStateOne();
    }
    Common.updatePlayerAnimation(this, this.cursors_, this.miriam_, 'miriam_left', 'miriam_up', 'miriam_down');
  },

  /**
   * Switches to state one if required.
   * @param {Phaser.Time} time the elapsed game time.
   */
  _maybeSwitchToStateOne: function () {
    if (ChristinaHouseSceneVars.state == 0 && Common.areSpritesInRangeToInteract(this.miriam_, this.christina_)) {
      ChristinaHouseSceneVars.state = 1;
      Common.setDialogueInSceneVars(ChristinaHouseSceneVars, miriamChristinaMeetUp2);
    }
  },

  /**
   * Handle case where Miriam overlaps with the door.
   */
  _overlapDoor: function () {
    this.scene.stop('DialogueScene');
    this.scene.start('SanFranciscoScene', {startingLocation: SanFranciscoSceneVars.startingLocationEnum.CHRISTINA_HOUSE});
  },

  dialogueOver: function () {
    if (ChristinaHouseSceneVars.state == 1) {
      this.physics.moveToObject(this.james_, this.miriam_, 200);
      ChristinaHouseSceneVars.state == 2;
    }
  }
});
