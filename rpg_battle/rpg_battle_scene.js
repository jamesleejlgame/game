import { RpgHero } from "./rpg_hero.js";
import { RpgEnemy } from "./rpg_enemy.js";
import { RpgUnit } from "./rpg_unit.js";

class RpgBattleScene extends Phaser.Scene {

  /**
   * @type {array<number>} the multiplier of an attack based on how many people have attacked within a certain duration.
   */
  static COMBO_MULTIPLIER = [0, 0, 1.33, 1.66, 2]

  static RPG_UNIT_SIDE = {
    ALLY: 0,
    ENEMY: 1
  }

  static RPG_UNIT_TYPE = {
    WIZARD: 0,
    SPIDER: 1,
    SPIDER_EGG: 2,
    DEMENTOR: 3
  }

  static GAME_STATE = {
    NORMAL: 0,
    ANIMATING: 1,
    MENU: 2
  }

  constructor ()
  {
    super({ key: 'RpgBattleScene' })
  }

  create () {
    // Run UI Scene at the same time
    // Do not submit. this.scene.launch('RpgBattleUIScene');
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    this.allies_ = []
    this.enemies_ = []
    this.units_ = []
    /**
     * @type {string, RpgUnit} unit id to unit.
     * A mapping of unit id to the unit it represents.
     */
    this.unitIdToUnit_ = {}
    /**
     * @type {string, RpgUnit} unit id to unit counter.
     * A mapping of unit id to the unit which is countering it.
     */
    this.unitCountersMap_ = {}
    /**
     * @type {GAME_STATE} the game state of the battle.
     */
    this.gameState_ = RpgBattleScene.GAME_STATE.NORMAL
    /**
     * The list of things to animate.
     * @type {array<Unit>} an array of units to animate.
     */
    this.animateChain_ = []
    /**
     * The list of menu items to show.
     * @type {array<Unit>} an array of units to pop up the menu for.
     */
    this.menuChain_ = []

    // Should be ideal to kill spider eggs first, then all spiders, then voldemort.
    this.snape_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ALLY, 'snape', 1100, 150, 'snape_battle', RpgBattleScene.RPG_UNIT_TYPE.WIZARD, 999, 10, -10, -100)
    this.harry_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ALLY, 'harry', 1100, 340, 'harry_potter_battle', RpgBattleScene.RPG_UNIT_TYPE.WIZARD, 999, 10, -10, -70)
    this.hermione_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ALLY, 'hermione', 1100, 500, 'hermione_battle', RpgBattleScene.RPG_UNIT_TYPE.WIZARD, 999, 10, -10, -70)
    this.ron_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ALLY, 'ron', 1100, 660, 'ron_battle', RpgBattleScene.RPG_UNIT_TYPE.WIZARD, 999, 10, -10, -70)
    this.spider1_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ENEMY, 'spider1', 350, 100, 'spider_battle1', RpgBattleScene.RPG_UNIT_TYPE.SPIDER, 999, 10, 50, 0)
    this.spider2_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ENEMY, 'spider2', 350, 250, 'spider_battle1', RpgBattleScene.RPG_UNIT_TYPE.SPIDER, 999, 10, 50, 0)
    this.spider3_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ENEMY, 'spider3', 350, 400, 'spider_battle1', RpgBattleScene.RPG_UNIT_TYPE.SPIDER, 999, 10, 50, 0)
    this.spider4_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ENEMY, 'spider4', 350, 550, 'spider_battle1', RpgBattleScene.RPG_UNIT_TYPE.SPIDER, 999, 10, 50, 0)
    this.spider_egg1_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ENEMY, 'spider_egg1', 330, 60, 'spider_egg_battle', RpgBattleScene.RPG_UNIT_TYPE.SPIDER, 999, 10, 20, -10)
    this.spider_egg2_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ENEMY, 'spider_egg1', 330, 210, 'spider_egg_battle', RpgBattleScene.RPG_UNIT_TYPE.SPIDER, 999, 10, 20, -10)
    this.spider_egg3_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ENEMY, 'spider_egg1', 330, 360, 'spider_egg_battle', RpgBattleScene.RPG_UNIT_TYPE.SPIDER, 999, 10, 20, -10)
    this.spider_egg4_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ENEMY, 'spider_egg1', 330, 510, 'spider_egg_battle', RpgBattleScene.RPG_UNIT_TYPE.SPIDER, 999, 10, 20, -10)
    this.voldemort_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ENEMY, 'voldemort', 100, 300, 'voldemort_battle', RpgBattleScene.RPG_UNIT_TYPE.WIZARD, 999, 10, -10, -100)
    this.dementor_ = this.createUnit(RpgBattleScene.RPG_UNIT_SIDE.ENEMY, 'dementor', 100, 600, 'dementor_battle', RpgBattleScene.RPG_UNIT_TYPE.DEMENTOR, 999, 10, -10, -100)
  }

  update (time, delta) {
    if (this.gameState_ == RpgBattleScene.GAME_STATE.NORMAL) {
      this.units_.forEach((unit) => {
        let actionType = unit.handleTick(delta)
        if (actionType == RpgUnit.ACTION_TYPE.ATTACK) {
          this.generateAnimateChain(unit)
        } else if (actionType == RpgUnit.ACTION_TYPE.ACTION_SELECTION) {
          this.handleActionSelectionForUnit(unit)
        }
      })
    }
    if (this.animateChain_.length > 0) {
      this.gameState_ = RpgBattleScene.GAME_STATE.ANIMATING
    } else if (this.menuChain_.length > 0) {
      this.gameState_ = RpgBattleScene.GAME_STATE.MENU
    }
  }

  handleActionSelectionForUnit (unit) {
    let target = null
    if (unit.rpgUnitSide_ == RpgBattleScene.RPG_UNIT_SIDE.ALLY) {
      target = this.voldemort_
      unit.handleSelectAction(target)
    } else {
      target = this.snape_
      unit.handleSelectAction(target)
    }
  }

  /**
   *
   * @param {RpgUnit} unit the unit to handle
   */
  generateAnimateChain (unit) {
    let unitChain = []
    unitChain.push(unit)
    let currentUnit = unit
    while (currentUnit) {
      currentUnit = this.unitCountersMap_[currentUnit.id_]
      if (currentUnit) {
        unitChain.push(unit)
      }
    }
    let currentUnitIndex = unitChain.length - 1
    while (currentUnitIndex > 0) {
      this.animateChain_.push(unitChain[currentUnitIndex])
      currentUnitIndex -= 2
    }
    if (currentUnitIndex == 0) {
      this.animate_chain_.push(unit)
    }
  }

  createUnit (rpgUnitSide, id, x, y, img, type, hp, damage, hp_x_offset, hp_y_offset) {
    let unit = null
    if (rpgUnitSide == RpgBattleScene.RPG_UNIT_SIDE.ALLY) {
      unit = new RpgHero(this, id, x, y, rpgUnitSide, img, type, hp, damage, hp_x_offset, hp_y_offset)
      this.allies_.push(unit)
    } else if (rpgUnitSide == RpgBattleScene.RPG_UNIT_SIDE.ENEMY) {
      unit = new RpgEnemy(this, id, x, y, rpgUnitSide, img, type, hp, damage, hp_x_offset, hp_y_offset)
      this.enemies_.push(unit)
    } else {
      throw new Error('Invalid battle side.')
    }
    this.unitIdToUnit_[id] = unit
    this.units_.push(unit)
    this.add.existing(unit);
    return unit
  }
}

export { RpgBattleScene }