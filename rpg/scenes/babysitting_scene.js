import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class BabysittingScene extends RpgScene {
  constructor ()
  {
    super('BabysittingScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'babysitting_tilemap',
      'town_and_city_tileset',
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      States.babysitting,
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_down');
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_down');
    this.adrianna_ = RpgUtils.createNPCCharacter(this, this.map_, 'adrianna', 'adrianna_up');
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('ProposalScene', {fadeIn: true}, true)
  }
}

export { BabysittingScene };