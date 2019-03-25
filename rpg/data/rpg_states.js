import { Dialogue } from './rpg_dialogue.js'

/**
 * Each variable here is an array of objects which represent states for a given scene.
 *
 * Each object has the following keys:
 * @key {string} type the type of state. Currently could be 'timer', or 'dialogue'.
 * @key {number} time only present if the type is 'timer'. How long after the previous state to start the next one.
 * @key {Dialogue} dialogue {Dialogue} the dialogue.
 * @key {number?} speed an optional speed for the character movement
 *
 * For Tweens,
 * @key {string} animationEnd the animation to play at the end of this tween.
 * @key {boolean} animationFreezeOnEnd whether to freeze the animation at the end.
 * @key {string} animation the animation name to play.
 * @key {string} location the object location in the tileset to move to.
 */
class States {
  static miriamHouseStates = [
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
      { type: 'npcMove', npc: {
        target: james,
        tweens: [
          {animation: 'james_left', location: 'james_1', flipX: true},
          {animation: 'james_down', location: 'james_2'},
          {animation: 'james_left', location: 'james_3'},
          {animation: 'james_up', location: 'james_4'}]}
      },
      { type: 'dialogue', dialogue: Dialogue.miriamMeetsJames1 },
      { type: 'npcMove', npc: {
        target: james,
        tweens: [
          {animation: 'james_down', location: 'james_3'},
          {animation: 'james_left', location: 'james_2', flipX: true},
          {animation: 'james_up', location: 'james_1'},
          {animation: 'james_left', location: 'james_start', animationEnd: 'james_down'}
        ]}
      },
      { type: 'dialogue', dialogue: Dialogue.miriamMeetsJames2 },
    ]
  }

  static pubQuizStates (james, miriam) {
    return [
      { type: 'dialogue', dialogue: Dialogue.pubQuiz1 },
      { type: 'npcMove', npc: {
        target: james,
        tweens: [
          {animation: 'james_down', location: 'james'},
        ]}
      },
      { type: 'dialogue', dialogue: Dialogue.pubQuiz2 },
      { type: 'npcMove', npc: {
        target: james,
        tweens: [
          {animation: 'james_left', location: 'james'},
        ]}
      },
      { type: 'dialogue', dialogue: Dialogue.pubQuiz3 },
      { type: 'npcMove', npc: {
        target: miriam,
        tweens: [
          {animation: 'miriam_left', location: 'miriam', flipX: true},
        ]}
      },
      { type: 'dialogue', dialogue: Dialogue.pubQuiz4 },
      { type: 'npcMove', npc: {
        target: miriam,
        tweens: [
          {animation: 'miriam_down', location: 'miriam'},
        ]}
      },
      { type: 'dialogue', dialogue: Dialogue.pubQuiz5 }
    ]
  }

  static christinaHouse2States (james) {
    return [
      { type: 'dialogue', dialogue: Dialogue.miriamAsksChristinaToWedding},
      { type: 'player', target: james },
      { type: 'dialogue', dialogue: Dialogue.miriamAsksJamesToWedding },
    ]
  }

  static alcatraz (christina, james) {
    return [
      { type: 'npcsMove',
        npcs: [
          { target: christina,
            tweens: [
              {animation: 'christina_left',
               location: 'christina_1',
               animationEnd: 'christina_down',
               flipX: true,
              }]},
          { target: james,
            tweens:
            [
              { animation: 'james_left',
              location: 'james_1',
              animationEnd: 'james_up',
              flipX: true,
         }]}]},
      { type: 'dialogue', dialogue: Dialogue.christinaLocksJamesInAlcatraz1 },
      { type: 'npcMove', npc: {target: james, tweens: [{animation: 'james_down', location: 'james_2', animationEnd: 'james_up'}]} },
      { type: 'npcMove', npc: {target: christina, tweens: [{animation: 'christina_down', location: 'christina_2'}]} },
      { type: 'renderLayer', layer: 'tiles3', tilesetName: 'castle_tileset' },
      { type: 'dialogue', dialogue: Dialogue.christinaLocksJamesInAlcatraz2 },
    ]
  }

  static jamesCallsMiriamFromAlcatraz (miriam) {
    return [
      { type: 'dialogue', dialogue: Dialogue.jamesCallsMiriamFromAlcatraz1 },
      { type: 'npcMove', npc: {target: miriam, tweens: [{animation: 'miriam_up', location: 'miriam'}]} },
      { type: 'dialogue', dialogue: Dialogue.jamesCallsMiriamFromAlcatraz2 },
    ]
  }

  static jamesCallsMiriam = [
    { type: 'dialogue', dialogue: Dialogue.jamesCallsMiriamFromAlcatraz },
  ]

  static postAlcatraz = [
    { type: 'dialogue', dialogue: Dialogue.postAlcatraz },
  ]

  static miriamHouseBootCamp = [
    { type: 'dialogue', dialogue: Dialogue.miriamHouseBootCamp },
  ]

  static preDrMario = [
    { type: 'dialogue', dialogue: Dialogue.preDrMario },
  ]

  static postDrMario = [
    { type: 'dialogue', dialogue: Dialogue.postDrMario },
  ]

  static cookingClass (gaby) {
    return [
      { type: 'dialogue', dialogue: Dialogue.cookingClassMiriam },
      { type: 'npcMove', npc: {target: gaby, tweens: [{animation: 'gaby_down', location: 'gaby_1'}] } },
      { type: 'dialogue', dialogue: Dialogue.cookingClassJames },
    ]
  }

  static japanIntro (miriam, james) {
    return [
      { type: 'npcsMove',
        npcs: [
          { target: miriam,
            tweens: [
              {animation: 'miriam_left',
               location: 'miriam_1',
               flipX: true,
               animationEnd: 'miriam_down'
              }]},
          { target: james,
            tweens:
            [
              { animation: 'james_left',
              location: 'james_1',
              flipX: true,
              animationEnd: 'james_up'
            }]}]},
      { type: 'dialogue', dialogue: Dialogue.japanIntro },
      { type: 'npcsMove',
        npcs: [
          { target: miriam,
            tweens: [
              {animation: 'miriam_left',
               location: 'miriam_2',
               flipX: true,
              }]},
          { target: james,
            tweens:
            [
              { animation: 'james_left',
              location: 'james_2',
              flipX: true,
            }]}]},
    ]
  }

  static japanHike (miriam, james, star, jiraiya) {
    return [
      { type: 'npcsMove',
        npcs: [
          { target: miriam,
            tweens: [
              {animation: 'miriam_left',
               location: 'miriam_1',
               flipX: true,
               animationEnd: 'miriam_up'
              }]},
          { target: james,
            tweens:
            [
              { animation: 'james_left',
              location: 'james_1',
              flipX: true,
              animationEnd: 'james_down'
            }]}]},
      { type: 'dialogue', dialogue: Dialogue.japanHike1 },
      { type: 'timer', time: 1500 },
      { type: 'dialogue', dialogue: Dialogue.japanHike2 },
      { type: 'npcVisibility', npc: {target: star, visible: true} },
      { type: 'npcMove', npc: {target: star, tweens: [{animation: 'shuriken', location: 'star_1'}] } },
      { type: 'npcVisibility', npc: {target: star, visible: false} },
      { type: 'dialogue', dialogue: Dialogue.japanHike3 },
      { type: 'npcVisibility', npc: {target: jiraiya, visible: true} },
      { type: 'npcsMove',
        npcs: [
          { target: miriam,
            tweens: [
              {animation: 'miriam_left',
               location: 'miriam_1',
               flipX: true,
              }]},
          { target: james,
            tweens:
            [
              { animation: 'james_left',
              location: 'james_1',
              flipX: true,
            }]}]},
      { type: 'dialogue', dialogue: Dialogue.japanHikeBattle },
    ]
  }

  static preOvercookedGame = [
    { type: 'dialogue', dialogue: Dialogue.preOvercookedGame },
  ]

  static miriamCallsHomeopath = [
    { type: 'dialogue', dialogue: Dialogue.miriamHomeopath },
  ]

  static preHarryPotterBattle = [
    { type: 'dialogue', dialogue: Dialogue.preHarryPotterBattle },
  ]

  // TODO: Use this.
  static harryPotterBattle (harry, snape, spider, attack) {
    return [
      { type: 'npcMove', target: harry, tweens: ['harry_1'] },
      { type: 'npcAppear', target: spider, location: 'spider' },
      { type: 'npcMove', target: attack, tweens: ['attack_1'] },
      { type: 'npcAppear', target: snape, location: 'snape' },
      { type: 'dialogue', dialogue: Dialogue.duringHarryPotterBattle },
    ]
  }

  static miriamReceivesPills = [
    { type: 'dialogue', dialogue: Dialogue.miriamReceivesPills },
    { type: 'timer', time: 1000 },
    { type: 'dialogue', dialogue: Dialogue.miriamCured },
  ]

  static hike (miriam, james) {
    return [
      { type: 'npcsMove',
        npcs: [
          { target: miriam,
            tweens: [
              {animation: 'miriam_left',
               location: 'miriam_1',
               flipX: true,
               animationEnd: 'miriam_up'
              }]},
          { target: james,
            tweens:
            [
              { animation: 'james_left',
              location: 'james_1',
              flipX: true,
              animationEnd: 'james_down'
            }]}]},
      { type: 'npcVisibility', npc: {target: jiraiya, visible: true} },
      { type: 'dialogue', dialogue: Dialogue.hiking1 },
      { type: 'npcMove', npc: {target: miriam, tweens: [{animation: 'miriam_left', location: 'miriam_1', flipX: true}]} },
      { type: 'dialogue', dialogue: Dialogue.hiking2 },
      { type: 'npcMove', npc: {target: james, tweens: [{animation: 'james_left', flipX: true, animationEnd: 'james_up', location: 'james_2'}] } },
      { type: 'dialogue', dialogue: Dialogue.hiking3 },
      { type: 'npcMove', npc: {target: james, tweens: [{animation: 'james_left', location: 'james_2'}] } },
      { type: 'dialogue', dialogue: Dialogue.hiking4 },
    ]
  }

  static babysitting = [
    { type: 'dialogue', dialogue: Dialogue.babysitting },
  ]

  static escapeRoom = [
    { type: 'dialogue', dialogue: Dialogue.escapeRoom },
    { type: 'playerFreeMovement' }
  ]

  // TODO: Use this.
  static proposal (miriam, james, hello_kitty, stitch, wimblebear, homura) {
    return [
    { type: 'npcsMove',
      npcs: [
        { target: miriam,
          tweens: [
            {animation: 'miriam_left',
            location: 'miriam_1',
            }]},
        { target: james,
          tweens:
          [
            { animation: 'james_left',
            location: 'james_1',
            animationEnd: 'james_up'
          }]}]},
    { type: 'npcVisibility', npc: {target: hello_kitty, visible: true} },
    { type: 'dialogue', dialogue: Dialogue.proposal1 },
    { type: 'npcsMove',
      npcs: [
        { target: miriam,
          tweens: [
            {animation: 'miriam_up',
            location: 'miriam_1',
            }]},
        { target: james,
          tweens:
          [
            { animation: 'james_down',
            location: 'james_1',
          }]}]},
    { type: 'dialogue', dialogue: Dialogue.proposal2 },
    ]
  }

  static mog (mog1, mog2, mog3) {
    return [
    { speed: 100,
      type: 'npcsMove',
      npcs: [
        { target: mog1,
          tweens: [
            {
              animation: 'mog_down',
              location: 'pos_22',
            },
            {
              animation: 'mog_down',
              location: 'pos_32',
            },
            {
              animation: 'mog_down',
              location: 'pos_31',
            },
            {
              animation: 'mog_down',
              location: 'pos_32',
            },
            {
              animation: 'mog_down',
              location: 'pos_33',
            },
            {
              animation: 'mog_down',
              location: 'pos_32',
            },
            {
              animation: 'mog_down',
              location: 'pos_31',
            },
            {
              animation: 'mog_down',
              location: 'pos_41',
            },
            {
              animation: 'mog_down',
              location: 'pos_42',
            },
            {
              animation: 'mog_down',
              location: 'pos_41',
            },
            {
              animation: 'mog_down',
              location: 'pos_51',
            },
            {
              animation: 'mog_down',
              location: 'pos_52',
            },
            {
              animation: 'mog_down',
              location: 'pos_53',
            },
            {
              animation: 'mog_down',
              location: 'pos_43',
            },
            {
              animation: 'mog_down',
              location: 'pos_44',
            },
            {
              animation: 'mog_down',
              location: 'pos_34',
            },
            {
              animation: 'mog_down',
              animationEnd: 'mog_celebrate',
              location: 'pos_24',
            },
          ]},
        { target: mog2,
          tweens:
          [
            { animation: 'mog_down',
              location: 'pos_23',
            },
            { animation: 'mog_down',
              location: 'pos_24',
            },
            { animation: 'mog_down',
              location: 'pos_34',
            },
            { animation: 'mog_down',
              location: 'pos_33',
            },
            { animation: 'mog_down',
              location: 'pos_43',
            },
            { animation: 'mog_down',
              location: 'pos_33',
            },
            { animation: 'mog_down',
              location: 'pos_32',
            },
            { animation: 'mog_down',
              location: 'pos_22',
            },
            { animation: 'mog_down',
              location: 'pos_23',
            },
            { animation: 'mog_down',
              location: 'pos_13',
            },
            { animation: 'mog_down',
              location: 'pos_14',
            },
            { animation: 'mog_down',
              location: 'pos_24',
            },
            { animation: 'mog_down',
              location: 'pos_34',
            },
            { animation: 'mog_down',
              location: 'pos_33',
            },
            { animation: 'mog_down',
              location: 'pos_34',
            },
            { animation: 'mog_down',
              location: 'pos_35',
            },
            { animation: 'mog_down',
              location: 'pos_25',
              animationEnd: 'mog_down',
            },
        ]},
        { target: mog3,
          tweens: [
            {
              animation: 'mog_down',
              location: 'pos_33',
            },
            {
              animation: 'mog_down',
              location: 'pos_23',
            },
            {
              animation: 'mog_down',
              location: 'pos_22',
            },
            {
              animation: 'mog_down',
              location: 'pos_12',
            },
            {
              animation: 'mog_down',
              location: 'pos_11',
            },
            {
              animation: 'mog_down',
              location: 'pos_12',
            },
            {
              animation: 'mog_down',
              location: 'pos_22',
            },
            {
              animation: 'mog_down',
              location: 'pos_21',
            },
            {
              animation: 'mog_down',
              location: 'pos_22',
            },
            {
              animation: 'mog_down',
              location: 'pos_23',
            },
            {
              animation: 'mog_down',
              location: 'pos_33',
            },
            {
              animation: 'mog_down',
              location: 'pos_43',
            },
            {
              animation: 'mog_down',
              location: 'pos_42',
            },
            {
              animation: 'mog_down',
              location: 'pos_32',
            },
            {
              animation: 'mog_down',
              location: 'pos_42',
            },
            {
              animation: 'mog_down',
              location: 'pos_41',
            },
            {
              animation: 'mog_down',
              location: 'pos_31',
              animationEnd: 'mog_down',
            },
          ]},
        ]},
    ]
  }
}

export { States }
