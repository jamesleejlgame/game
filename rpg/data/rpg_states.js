import { Dialogue } from './rpg_dialogue.js'

/**
 * Each variable here is an array of objects which represent states for a given scene.
 *
 * Each object has the following keys:
 * @key {string} type the type of state. Currently could be 'timer', or 'dialogue'.
 * @key {number} time only present if the type is 'timer'. How long after the previous state to start the next one.
 * @key {Dialogue} dialogue {Dialogue} the dialogue.
 */
class States {
  static miriamHouseStates = [
    { type: 'timer', time: 1000 },
    { type: 'dialogue', dialogue: Dialogue.miriamChristinaMeetUp1 },
    { type: 'playerFreeMovement' }
  ]

  static sanFranciscoStates = [
    { type: 'playerFreeMovement' }
  ]

  static christinaHouseStates (christina, james) {
    return [
      { type: 'player', target: christina},
      { type: 'dialogue', dialogue: Dialogue.miriamChristinaMeetUp2 },
      { type: 'npcMove', target: james, tweens: ['james_1', 'james_2', 'james_3', 'james_4'] },
      { type: 'dialogue', dialogue: Dialogue.miriamMeetsJames1 },
      { type: 'npcMove', target: james, tweens: ['james_3', 'james_2', 'james_1', 'james_start'] },
      { type: 'dialogue', dialogue: Dialogue.miriamMeetsJames2 },
      { type: 'timer', time: 1000 },
    ];
  }

  static pubQuizStates = [
    { type: 'dialogue', dialogue: Dialogue.pubQuiz },
    { type: 'timer', time: 1000 },
  ];

  static christinaHouse2States (james) {
    return [
      { type: 'dialogue', dialogue: Dialogue.miriamAsksChristinaToWedding},
      { type: 'player', target: james },
      { type: 'dialogue', dialogue: Dialogue.miriamAsksJamesToWedding },
      { type: 'timer', time: 1000 },
    ];
  }

  static alcatraz (christina, james) {
    return [
      { type: 'npcsMove', 
        targets: [{target: james, tweens: ['christina_1']}, 
                  {target: james, tweens: ['james_1']}]},
      { type: 'dialogue', dialogue: Dialogue.christinaLocksJamesInAlcatraz1 },
      { type: 'npcMove', target: james, tweens: ['james_2'] },
      { type: 'npcMove', target: christina, tweens: ['christina_2'] },
      { type: 'renderLayer', layer: 'tiles3' },
      { type: 'dialogue', dialogue: Dialogue.christinaLocksJamesInAlcatraz2 },
      { type: 'timer', time: 1000 },
    ];
  }

  static jamesCallsMiriam = [
    { type: 'dialogue', dialogue: Dialogue.jamesCallsMiriamFromAlcatraz },
    { type: 'timer', time: 1000 },
  ];

  static postAlcatraz = [
    { type: 'dialogue', dialogue: Dialogue.postAlcatraz },
    { type: 'timer', time: 1000 },
  ];

  static miriamHouseBootCamp = [
    { type: 'dialogue', dialogue: Dialogue.miriamHouseBootCamp },
    { type: 'timer', time: 1000 },
  ];

  static preDrMario = [
    { type: 'dialogue', dialogue: Dialogue.preDrMario },
    { type: 'timer', time: 1000 },
  ];

  static postDrMario = [
    { type: 'dialogue', dialogue: Dialogue.postDrMario },
    { type: 'timer', time: 1000 },
  ];

  static cookingClass (gaby) {
    return [
      { type: 'dialogue', dialogue: Dialogue.cookingClassMiriam },
      { type: 'npcMove', target: gaby, tweens: ['gaby_1'] },
      { type: 'dialogue', dialogue: Dialogue.cookingClassJames },
      { type: 'timer', time: 1000 },
    ];
  }

  static japanIntro = [
    { type: 'dialogue', dialogue: Dialogue.japanIntro },
    { type: 'timer', time: 1000 },
  ];

  static japanHike (miriam, james, star) {
    return [
      { type: 'npcsMove', 
        targets: [{target: miriam, tweens: ['miriam_1']}, 
                  {target: james, tweens: ['james_1']}]},
      { type: 'dialogue', dialogue: Dialogue.japanHike1 },
      { type: 'timer', time: 1000 },
      { type: 'dialogue', dialogue: Dialogue.japanHike2 },
      { type: 'npcMove', target: star, tweens: ['star_1'] },
      { type: 'dialogue', dialogue: Dialogue.japanHike3 },
      { type: 'timer', time: 1000 },
    ];
  }

  static japanHikeBattle = [
    { type: 'dialogue', dialogue: Dialogue.japanHikeBattle },
    { type: 'timer', time: 1000 },
  ];

  static preOvercookedBattle = [
    { type: 'dialogue', dialogue: Dialogue.preOvercookedGame },
    { type: 'timer', time: 1000 },
  ];

  static miriamCallsHomeopath = [
    { type: 'dialogue', dialogue: Dialogue.miriamHomeopath },
    { type: 'timer', time: 1000 },
  ];

  static preHarryPotterBattle = [
    { type: 'dialogue', dialogue: Dialogue.preHarryPotterBattle },
    { type: 'timer', time: 1000 },
  ];

  static harryPotterBattle (harry, snape, spider, attack) {
    return [
      { type: 'npcMove', target: harry, tweens: ['harry_1'] },
      { type: 'npcAppear', target: spider, location: 'spider' },
      { type: 'npcMove', target: attack, tweens: ['attack_1'] },
      { type: 'npcAppear', target: snape, location: 'snape' },
      { type: 'dialogue', dialogue: Dialogue.duringHarryPotterBattle },
      { type: 'timer', time: 1000 },
    ];
  }

  static miriamReceivesPills = [
    { type: 'dialogue', dialogue: Dialogue.miriamReceivesPills },
    { type: 'timer', time: 1000 },
    { type: 'dialogue', dialogue: Dialogue.miriamCured },
    { type: 'timer', time: 1000 },
  ];

  static hike (miriam, james) {
    return [
      { type: 'npcsMove', 
        targets: [{target: miriam, tweens: ['miriam_1']}, 
                  {target: james, tweens: ['james_1']}]},
      { type: 'dialogue', dialogue: Dialogue.hiking1 },
      { type: 'npcMove', target: james, tweens: ['james_2'] },
      { type: 'dialogue', dialogue: Dialogue.hiking2 },
      { type: 'timer', time: 1000 },
    ];
  }

  static babysitting = [
    { type: 'dialogue', dialogue: Dialogue.babysitting },
    { type: 'timer', time: 1000 },
  ];

  static escapeRoom = [
    { type: 'dialogue', dialogue: Dialogue.escapeRoom },
    { type: 'timer', time: 1000 },
  ];

  static proposal = [
    { type: 'dialogue', dialogue: Dialogue.proposal },
    { type: 'timer', time: 1000 },
  ];

}

export { States }
