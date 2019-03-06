import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'
import { SanFranciscoScene } from './san_francisco_scene.js'

/**
 * The scene representing christina's house. Variables are:
 * miriam_ {Phaser.Physics.Arcade.Sprite}: the miriam sprite.
 * cursors_ {Phaser.Cursors}: the cursors object.
 */
class ChristinaHouseScene extends RpgScene {

  constructor ()
  {
    super('ChristinaHouseScene');
  }

  /**
   * Creates the scene.
   */
  create (data) {
    super.create(
      'christina_house_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2'],
      'miriam_left', 'miriam_up', 'miriam_down',
      'miriam_enterdoor',
      'ChristinaHouseScene',
      [])

    this.christina_ = RpgUtils.createNPCCharacter(this, this.map_, 'christina_start', 'christina_down');
    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james_start', 'james_down');
    super.setStates(States.christinaHouseStates(this.christina_, this.james_));

    let door = RpgUtils.createSpriteAtStartTileName(this, this.map_, 'door');
    this.physics.add.overlap(this.player_, door, (player, tile) => {this._overlapDoor();});
    this.physics.add.collider(this.player_, this.christina_);
    this.physics.add.collider(this.player_, this.james_);
  }

  /**
   * Handle case where Miriam overlaps with the door.
   */
  _overlapDoor () {
    this.scene.stop('DialogueScene');
    this.scene.start('SanFranciscoScene', {startingLocation: SanFranciscoScene.startingLocationEnum.CHRISTINA_HOUSE});
  }
}

export { ChristinaHouseScene };