// TODO: Populate stuffed animals.

import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class JamesCallsMiriamScene extends RpgScene {
  constructor ()
  {
    super('JamesCallsMiriamScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'miriam_house2_tilemap',
      'town_and_city_tileset',
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      States.jamesCallsMiriam,
      data)

    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_down');
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('PostAlcatrazScene', {fadeIn: true}, true)
  }
}

export { JamesCallsMiriamScene };