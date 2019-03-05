import { RpgScene } from '../common/rpg_scene.js'
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
    let createMapRet = Rpg.Common.Utils.createMap(
      this,
      'christina_house_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2']);
    this.map_ = createMapRet[0];
    let layers = createMapRet[1];

    Rpg.Common.Utils.createMiriamAnimation(this, 'miriam_left', 'miriam_up', 'miriam_down');

    this.miriam_ = Rpg.Common.Utils.createPlayerControlledRpgCharacter(this, this.map_, 'miriam_enterdoor', 'miriam_down');
    this.christina_ = Rpg.Common.Utils.createNPCCharacter(this, this.map_, 'christina_start', 'christina_down');
    this.james_ = Rpg.Common.Utils.createNPCCharacter(this, this.map_, 'james_start', 'james_down');

    Rpg.Common.Utils.addIntersectionWithLayers(this, this.miriam_, layers);
    this.cursors_ = this.input.keyboard.createCursorKeys();
    let door = Rpg.Common.Utils.createSpriteAtStartTileName(this, this.map_, 'door');
    this.physics.add.overlap(this.miriam_, door, (player, tile) => {this._overlapDoor();});
    this.physics.add.collider(this.miriam_, this.christina_);
    this.physics.add.collider(this.miriam_, this.james_);
    this.scene.launch('DialogueScene', {dialogueManager: this.dialogueManager_, scene: this});
    this.scene.moveAbove('ChristinaHouseScene', 'DialogueScene');
    /**
     * @type {Phaser.Input.Keyboard.Key} the key for taking actions.
     */
    this.actionKey_ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    this.stateManager_.setSceneInfo(this, this.map_, this.miriam_);
    this.stateManager_.setStates(States.christinaHouseStates(this.christina_, this.james_));
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