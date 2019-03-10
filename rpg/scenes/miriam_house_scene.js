import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
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
    super.create(
      'miriam_house_tilemap',
      'town_and_city_tileset',
      ['base_tiles', 'tiles2'],
      'miriam_left', 'miriam_up', 'miriam_down',
      miriamStartTileObjectName,
      States.miriamHouseStates,
      data)

    let door = RpgUtils.createSpriteAtStartTileName(this, this.map_, 'door');
    this.physics.add.overlap(this.player_, door, (player, tile) => {this._overlapDoor();});
  }

  /**
   * Handle case where Miriam overlaps with the door.
   */
  _overlapDoor () {
    this.switchScene('SanFranciscoScene', {startingLocation: SanFranciscoScene.startingLocationEnum.MIRIAM_HOUSE}, false)
  }
}

export { MiriamHouseScene };