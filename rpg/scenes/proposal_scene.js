// TODO: Populate stuffed animals and hello kitty.
// TODO: Properly implement dialogue options.

import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class ProposalScene extends RpgScene {
  constructor ()
  {
    super('ProposalScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'proposal_tilemap',
      'town_and_city_tileset',
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      States.proposal,
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_left');
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_left');
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('AcceptedScene', {fadeIn: true}, true)
  }
}

export { ProposalScene };