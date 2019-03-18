// TODO: Properly implement dialogue options.

import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class ProposalScene extends RpgScene {
  constructor ()
  {
    super('ProposalScene')
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'proposal_tilemap',
      ['town_and_city_tileset'],
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      [],
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_left')
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_left')
    this.homura_ = RpgUtils.createNPCCharacter(this, this.map_, 'homura', 'homura_down')
    this.homura_.setVisible(false)
    this.stitch_ = RpgUtils.createNPCCharacter(this, this.map_, 'stitch', 'stitch_down')
    this.stitch_.setVisible(false)
    this.wimblebear_ = RpgUtils.createNPCCharacter(this, this.map_, 'wimblebear', 'wimble_down')
    this.wimblebear_.setVisible(false)
    this.hellokitty_ = RpgUtils.createNPCCharacter(this, this.map_, 'hello_kitty', 'hellokitty_down')
    this.hellokitty_.setVisible(false)
    super.setStates(States.proposal(this.miriam_, this.james_, this.hellokitty_, this.stitch_, this.wimblebear_, this.homura_))
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('AcceptedScene', {fadeIn: true}, true)
  }
}

export { ProposalScene }