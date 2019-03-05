import { RpgScene } from '../common/rpg_scene.js';
import { States } from '../data/rpg_states.js'
import { ChristinaHouseScene } from './christina_house_scene.js'
import { SanFranciscoScene } from './san_francisco_scene.js'

class MiriamHouseScene extends RpgScene {
  /**
   * The time in miliseconds after the scene starts to start the dialogue.
   */
  static DIALOGUE_START_TIME = 2000;
  /**
   * The possible miriam starting locations.
   */
  static startingLocationEnum = {
    START_GAME: 0,
    ENTER_DOOR: 1
  };

  constructor ()
  {
    super('MiriamHouseScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    let miriamStartTileObjectName;
    if (data.startingLocation === MiriamHouseScene.startingLocationEnum.START_GAME) {
      miriamStartTileObjectName = "miriam_start";
    } else if (data.startingLocation === MiriamHouseScene.startingLocationEnum.ENTER_DOOR) {
      miriamStartTileObjectName = "miriam_enterdoor";
    }

    let createMapRet = Rpg.Common.Utils.createMap(
      this,
      'miriam_house_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2']);
    this.map_ = createMapRet[0];
    let layers = createMapRet[1];

    Rpg.Common.Utils.createMiriamAnimation(this, 'miriam_left', 'miriam_up', 'miriam_down');

    this.miriam_ = Rpg.Common.Utils.createPlayerControlledRpgCharacter(this, this.map_, miriamStartTileObjectName, 'miriam_down');
    Rpg.Common.Utils.addIntersectionWithLayers(this, this.miriam_, layers);
    this.cursors_ = this.input.keyboard.createCursorKeys();
    this.scene.launch('DialogueScene', {dialogueManager: this.dialogueManager_, scene: this});
    this.scene.moveAbove('MiriamHouseScene', 'DialogueScene');
    this.stateManager_.setSceneInfo(this, this.map_, this.miriam_);
    this.stateManager_.setStates(States.miriamHouseStates);
    let door = Rpg.Common.Utils.createSpriteAtStartTileName(this, this.map_, 'door');
    this.physics.add.overlap(this.miriam_, door, (player, tile) => {this._overlapDoor();});
  }

  /**
   * Handle case where Miriam overlaps with the door.
   */
  _overlapDoor () {
    this.scene.stop('DialogueScene');
    this.scene.start('SanFranciscoScene', {startingLocation: SanFranciscoScene.startingLocationEnum.MIRIAM_HOUSE});
  }
}

export { MiriamHouseScene };