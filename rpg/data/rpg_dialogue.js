/**
 * Each variable is an array of Dialogue objects.
 *
 * These objects have the following keys:
 * @key {string} m: The message.
 * @key {string} question: The question to ask.
 * @key {array<Dialogue object>} answers: The possible answers to the question.
 * @key {string} label: the label of the message. For branching purposes.
 * @key {string} next: the label of the next message after this one.
 */
class Dialogue {
  static miriamChristinaMeetUp1 = [
    { m: "<Phone rings>" },
    { m: "Christina: Hey BFF! Wanna come over? We can talk about how nice I am to everyone and how everyone loves me." },
    { m: "Miriam: Hmm...." },
    { m: "Miriam: ..." },
    { m: "Miriam: ... okay fine." },
    { m: "Christina: Great! See you soon. Like just yesterday I saw this poodle falling off the edge of a cliff and I..." },
    { m: "Miriam: <Click>" },
  ]

  static miriamChristinaMeetUp2 = [
    { m: "Christina: ... dropped all the groceries I was carrying for this old lady and ran over to rescue it!" }
  ]

  static miriamMeetsJames1 = [
    { m: "James: Hi." },
    { m: "Miriam: Hi." }
  ]

  static miriamMeetsJames2 = [
    { m: "James: *She's cute*" },
    { m: "Miriam: ..." },
    { m: "Christina: He does that. What a weirdo. What do you think of setting him up with Karen? So anyway, there I was hanging on the edge of the cliff..." }
  ]

  static pubQuiz = [
    { m: "Announcer: That's right, Pocahontas is the only princess based on a real person. 10 points to the Mighty Morphing Flower Arrangers." },
    { m: "Christina: So James, Karen's really into pool too. " },
    { m: "Karen: Actually I've never pla..." },
    { m: "Christina: ... and she loooooves video games!" },
    { m: "Karen: Oh yeah Candy Crush is so fun!" },
    { m: "James: So how was your day, Miriam?" },
    { m: "Miriam: It was good. Not as good as Karen's day, you should ask her about hers." },
    { m: "James: Oh okay maybe in a little while. Oh yeah I want to learn singing, can you teach me?" },
    { m: "Christina & Miriam: Hmm this isn't working." }
  ]

  static miriamAsksChristinaToWedding = [
    { m: "Miriam: Do you want to go to NY to my cousin's wedding with me?" },
    { m: "Christina: Sure, I'd love to!" },
    { m: "Miriam: Cool! I just RSVP'd and booked the flight." },
    { m: "Christina: Oh yeah about that, I'm not going." },
    { m: "Miriam: Oh, okay. :(" }
  ]

  static miriamAsksJamesToWedding = [
    { m: "Miriam: Hey, do you want to go to NY to my cousin's wedding with me? I know it's kinda short notice." },
    { m: "James: Oh yeah definitely!" },
    { m: "Miriam: Yay!" }
  ]

  static christinaLocksJamesInAlcatraz1 = [
    { m: "Christina: Hmm yeah this wasn't so interesting but I want to do all the touristy things." },
    { m: "James: Yeah, it's kinda lame." },
    { m: "Christina: Hey, let's try standing in the cells." },
    { m: "James: K." }
  ]

  static christinaLocksJamesInAlcatraz2 = [
    { m: "Christina: Going to New York with Miriam, huh! I was teaching her a lesson! You can stay in there and rot!" }
  ]

  static jamesCallsMiriamFromAlcatraz = [
    { m: "<Phone rings>" },
    { m: "Miriam: Hello?" },
    { m: "James: Help!! Christina locked me in Alcatraz!" },
    { m: "Miriam: We have to save James, everyone!" },
    { m: "Council: Let's go!" }
  ]

  static postAlcatraz = [
    { m: "Miriam and James: Thanks everyone!" },
    { m: "Miriam: Man, SF is crazy." },
    { m: "James: Want to move to Sunnyvale? I've got a place." },
    { m: "Miriam: Sure!" }
  ]

  static miriamHouseBootCamp = [
    { m: "James: Wait.. we're still in SF." },
    { m: "Miriam: Oh, umm..." },
    { m: "Miriam: Hmm okay so we want to iterate over everything in the array so... for (int i = 0; i < 10; ++i) { performAction(); ..." },
    { m: "Miriam: Ugh, I hate this. K let's go to Sunnyvale!" },
    { m: "James: Okay!" }
  ]

  static preDrMario = [
    { m: "Miriam: Yesss.. 12314 points to 503. I win again. I can't believe I found supercalifragilisticexpialidocious." },
    { m: "James: Omg. We need a game other than Ruzzle. Oh, want to play Dr. Mario? It's gonna be kinda unfair though, I have 20 years of tetris experience. I'm basically a god." },
    { m: "Miriam: Okay... but you're gonna have to give me a handicap." }
  ]

  static duringDrMario = [
    { m: "James: Oops I set the handicap in the wrong direction. Wahahahaha." }
  ]

  static postDrMario = [
    { m: "Miriam: Yay! Da-da-da-da da da DA-da-DA! da da da da da da-da da-da..." },
    { m: "James: *Thinks* Ooh, playing games with her is going to be fun. Gonna have to work on this trash talk though." }
  ]

  static cookingClassMiriam = [
    { m: "Chef Gaby: Perfect, perfect! I have nothing to teach you. We have openings for head chef positions btw." }
  ]

  static cookingClassJames = [
    { m: "Chef Gaby: You should be cutting things more evenly. Just watch Miriam and do everything she does." }
  ]

  static japanIntro = [
    { m: "Miriam: This is the best trip ever!" },
    { m: "James: Yeah definitely. There's so much to do in Tokyo, it's amazing! And we still have Kyoto next!" },
    { m: "Miriam: Oh Studio Ghibli, this is our stop!" }
  ]

  static japanHike1 = [
    { m: "James: Omg, no... more... mountains." },
    { m: "Miriam: I know.. but they're all so beautiful!" },
    { m: "James: *huff* It should be just a little further to the top. Let's rest a bit?" },
    { m: "Miriam: Sure. Hmm where are all the other tourists by the way? We started with so many. Also the path's kinda disappeared." },
    { m: "James: Yeah weird. Well don't worry, I'm sure we're on the right track. I used James Maps TM. It's never wrong, you know." },
    { m: "Miriam: *suspicious*" },
    { m: "James: Okay I'm ready, we can keep going. Wait - ahhhh!" }
  ]

  static japanHike2 = [
    { m: "Miriam: Omg that's a ninja star!" },
    { m: "James: It came from that direction! What's going on over there??" }
  ]

  static japanHikeBattle = [
    { m: "Itachi: I will never let you destroy this sanctuary!" }
  ]

  static preOvercookedGame = [
    { m: "Miriam: Hmm so BBQ Bun: 5.0, Shu Mai: 4.0, Spring Roll: 2.0. Worst. Dim sum. Restaurant. EVER!" },
    { m: "James: Yeah no kidding, that was so bad." },
    { m: "Miriam: Omg, we should make our OWN dim sum! We're cooking geniuses, after all." },
    { m: "James: Hmm, yeah true." },
    { m: "Miriam: Ooh, look at all these recipes I found from Asian Julia Child. We should make a year's worth of dim sum!" },
    { m: "James: Wait.. a year's worth? Over how long?" },
    { m: "Miriam: Oh I dunno.. about 4 minutes probably." }
  ]

  static miriamHomeopath = [
    { m: "Miriam: Hello is this Irene Hom?" },
    { m: "Irene: Yup speaking." },
    { m: "Miriam: Hi, I was referred to you by Dr. Thomas. I have a nightshade allergy and I heard you're able to treat that." },
    { m: "Irene: Oh yes of course! We just got a fresh batch of medicine just for that actually! Would you like me to send you some?" },
    { m: "Miriam: Yes th-" },
    { m: "James: It's a scam!" },
    { m: "Miriam: Shush!" },
    { m: "Miriam: Ahem. Yes that'd be great! Could you send it to Sunnyvale?" },
    { m: "Irene: Sure thing, it'll be there by tomorrow!" }
  ]

  static preHarryPotterBattle = [
    { m: "Hermoine: Okay everyone, we have an order to fulfill! I have all the ingredients we need except a drop of acromantula venom. It's perfect, there's that one that's been terrorizing Hogwarts anyway!" },
    { m: "Ron: Ugh, again? Why are we always fighting spiders?! And I don't see you go by that stupid pseudonym." },
    { m: "Hermoine: Hush, do you want all the muggles to trace our magic potions back to us? We'll be expelled!" },
    { m: "Harry: K, we'd better go now before it's too dark. C'mon Ron." }
  ]

  static duringHarryPotterBattle = [
    { m: "Snape: What are you idiots doing here? The reason it's called the Forbidden Forest is because it's FORBIDDEN! Well it's too late now. Let's finish this." }
  ]

  static miriamReceivesPills = [
    { m: "Miriam: Ooh it arrived!" }
  ]

  static miriamCured = [
    { m: "Miriam: I think it worked! Let's order pizza!" }
  ]

  static hiking1 = [
    { m: "James: This hike was only supposed to be one mile!" },
    { m: "Miriam: Oh look there's a sign!" }
  ]

  static hiking2 = [
    { m: "James: The oregon trail 3.6 miles that way. The blair witch house 4 miles the other way? I don't want to go to either of those!" },
    { m: "Miriam: Let's turn back." },
    { m: "James: We're never hiking again." }
  ]

  static babysitting = [
    { m: "Miriam: Adrianna, want to come over here and listen to this song?" },
    { m: "Adrianna: Waaaaaaaaaaaaaaaaaahhhhhhhhhhh!" },
    { m: "James: Ugh." },
    { m: "Miriam: Look, it's Mr Rogers! He wants you in his neighbourhood. Apparently." },
    { m: "Adrianna: Maaaaammmaaaaaaaaaaaaaaaaaaaaa!" }
  ]

  static escapeRoom = [
    { m: "Intercom: Good job. You've made it further than any of my previous victims. But you still have to solve my final challenge or DOOM awaits you. Haha.. ahaha.. aaaahahaHAHAHAHHA." },
    { m: "James: Well it's still less stressful than our last activity." }
  ]

  static proposal = [
    { m: "Hello Kitty: Miriam, James has something to ask you... in person." },
    { question: "Hello Kitty: What'd she say?", answers: [
      { m: "yes", next: "proposal_yes" },
      { m: "no", next: "proposal_no" }
    ] },
    { label: "proposal_yes", m: "Congrats, you two!", next: "proposal_end" },
    { label: "proposal_no", m: "Aww, hope you had fun with the game anyway!", next: "proposal_end" },
    { label: "proposal_end" }
  ]
}

export { Dialogue }