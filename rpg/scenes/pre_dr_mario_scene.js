import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class PreDrMarioScene extends RpgScene {
  constructor ()
  {
    super('PreDrMarioScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'sunnyvale_house_tilemap',
      'town_and_city_tileset',
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      States.preDrMario,
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_up');
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_down');
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('PostDrMarioScene', {fadeIn: true}, true)
  }
}

export { PreDrMarioScene };