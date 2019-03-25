import { RpgHero } from "./rpg_hero.js";
import { RpgEnemy } from "./rpg_enemy.js";

class RpgBattleScene extends Phaser.Scene {

  static RPG_UNIT_SIDE = {
    ALLY: 0,
    ENEMY: 1
  }

  static RPG_UNIT_TYPE = {
    WIZARD: 0,
    SPIDER: 1,
    SPIDER_EGG: 2
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
    this.unit_id_to_unit_ = {}
    /**
     * @type {string, RpgUnit} unit id to unit counter.
     * A mapping of 
     */
    this.unit_counters_map_ = {}

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
  }

  update (time, delta) {
    this.units_.forEach((unit) => {
      if (time > unit.nextAttackTime_) {
        this.handleCounterChainForUnitAttack(unit)
        unit.handleAttack()
      }
      if (time > unit.nextSelectActionTime_) {
        unit.handleSelectAction()
      }
    })
  }

  handleCounterChainForUnitAction (unit) {

  }
  
  createUnit (rpgUnitSide, id, x, y, img, type, hp, damage, hp_x_offset, hp_y_offset) {
    let unit = null
    if (rpgUnitSide == RpgBattleScene.RPG_UNIT_SIDE.ALLY) {
      unit = new RpgHero(this, id, x, y, img, type, hp, damage, hp_x_offset, hp_y_offset)
      this.allies_.push(unit)
    } else if (rpgUnitSide == RpgBattleScene.RPG_UNIT_SIDE.ENEMY) {
      unit = new RpgEnemy(this, id, x, y, img, type, hp, damage, hp_x_offset, hp_y_offset)
      this.enemies_.push(unit)
    } else {
      throw new Error('Invalid battle side.')
    }
    this.unit_id_to_unit_[id] = unit
    this.units_.push(unit)
    this.add.existing(unit);            
  }
}

export { RpgBattleScene }