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
    super('ChristinaHouse2Scene');
  }

  /**
   * Creates the scene.
   */
  create (data) {
    super.create(
      'christina_house2_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2'],
      'miriam_left', 'miriam_up', 'miriam_down',
      'miriam',
      'ChristinaHouse2Scene',
      [])

    this.christina_ = RpgUtils.createNPCCharacter(this, this.map_, 'christina', 'christina_down');
    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_down');
    super.setStates(States.christinaHouse2States(this.christina_, this.james_));

    this.physics.add.collider(this.player_, this.christina_);
    this.physics.add.collider(this.player_, this.james_);
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.scene.stop('DialogueScene');
    this.scene.start('PubQuizScene');
  }
}

export { ChristinaHouse2Scene };