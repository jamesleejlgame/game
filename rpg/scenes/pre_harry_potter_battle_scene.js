// TODO: Populate this.

import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class PreHarryPotterBattleScene extends RpgScene {
  constructor ()
  {
    super('PreHarryPotterBattleScene')
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'harry_potter_tilemap',
      ['castle_tileset'],
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      States.preHarryPotterBattle,
      data)

    this.hermione_ = RpgUtils.createNPCCharacter(this, this.map_, 'hermione', 'hermione_down', true)
    this.harry_ = RpgUtils.createNPCCharacter(this, this.map_, 'harry', 'harry_down')
    this.ron_ = RpgUtils.createNPCCharacter(this, this.map_, 'ron', 'ron_down')
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('MiriamReceivesPillsScene', {fadeIn: true}, true)
  }
}

export { PreHarryPotterBattleScene }