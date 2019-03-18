import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'
import { SanFranciscoScene } from './san_francisco_scene.js'

/**
 * The scene representing christina's house. Variables are:
 * miriam_ {Phaser.Physics.Arcade.Sprite}: the miriam sprite.
 * cursors_ {Phaser.Cursors}: the cursors object.
 */
class ChristinaHouse2Scene extends RpgScene {

  constructor ()
  {
    super('ChristinaHouse2Scene')
  }

  /**
   * Creates the scene.
   */
  create (data) {
    super.create(
      'christina_house2_tilemap',
      ['town_and_city_tileset'],
      ['base_tiles', 'tiles2'],
      'miriam_left', 'miriam_up', 'miriam_down',
      'miriam',
      [],
      data)

    this.christina_ = RpgUtils.createNPCCharacter(this, this.map_, 'christina', 'christina_up')
    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_left', true)
    super.setStates(States.christinaHouse2States(this.james_))

    this.physics.add.collider(this.player_, this.christina_)
    this.physics.add.collider(this.player_, this.james_)
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('AlcatrazScene', {fadeIn: true}, true)
  }
}

export { ChristinaHouse2Scene }