import { RpgScene } from '../rpg/common/rpg_scene.js'
import { RpgUtils } from '../rpg/common/rpg_utils.js'
import { States } from '../rpg/data/rpg_states.js'

class MogScene extends RpgScene {
  constructor ()
  {
    super('MogScene')
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'mog_tilemap',
      ['town_and_city_tileset'],
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      [],
      data)

    this.mog1_ = RpgUtils.createNPCCharacter(this, this.map_, 'pos_32', 'mog_down')
    this.mog2_ = RpgUtils.createNPCCharacter(this, this.map_, 'pos_22', 'mog_down')
    this.mog3_ = RpgUtils.createNPCCharacter(this, this.map_, 'pos_43', 'mog_down')
    super.setStates(States.mog(this.mog1_, this.mog2_, this.mog3_))
    super.resetStateIndex()
    data.callingClass.mogScene_ = this
  }

  advanceToNextScene() {

  }
}

export { MogScene }