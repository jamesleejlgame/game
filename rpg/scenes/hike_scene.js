import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class HikeScene extends RpgScene {
  constructor ()
  {
    super('HikeScene')
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'hiking_tilemap',
      ['town_and_city_tileset'],
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      [],
      data)
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_left', true)
    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_left', true)
    super.setStates(States.hike(this.miriam_, this.james_))
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('BabysittingScene', {fadeIn: true}, true)
  }
}

export { HikeScene }