// TODO: Use this.

import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class EscapeRoomScene extends RpgScene {
  constructor ()
  {
    super('EscapeRoomScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'escape_room_tilemap',
      'town_and_city_tileset',
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      States.escapeRoom,
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_down');
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_down');
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('ProposalScene', {fadeIn: true}, true)
  }
}

export { EscapeRoomScene };