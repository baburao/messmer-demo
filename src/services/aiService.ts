// ─────────────────────────────────────────────────────────────────────────────
// Messmer AI Service — Mock implementation
// ─────────────────────────────────────────────────────────────────────────────

export type ThemeId = 'fantasy' | 'scifi' | 'thriller' | 'horror' | 'mystery';
export type OutputFormat = 'storybook' | 'video';

export interface StoryOption {
  id: string;
  preview: string;
  full: string;
}

export interface StoryScene {
  id: string;
  image: string;
  narration: string;
  question: string;
  options: StoryOption[];
}

export interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
}

export interface CharacterSkin {
  id: string;
  name: string;
  description: string;
  accent: string;
}

export interface Theme {
  id: ThemeId;
  name: string;
  tagline: string;
  image: string;
}

export interface StoryChoice {
  round: number;
  sceneId: string;
  optionId: string;
  optionText: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// THEMES
// ─────────────────────────────────────────────────────────────────────────────

export const THEMES: Theme[] = [
  {
    id: 'fantasy',
    name: 'FANTASY',
    tagline: 'Where magic bends reality',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
  },
  {
    id: 'scifi',
    name: 'SCI-FI',
    tagline: 'Beyond the edge of tomorrow',
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
  },
  {
    id: 'thriller',
    name: 'THRILLER',
    tagline: 'Truth is the deadliest weapon',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
  },
  {
    id: 'horror',
    name: 'HORROR',
    tagline: 'Face what dwells in darkness',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
  },
  {
    id: 'mystery',
    name: 'MYSTERY',
    tagline: 'Every shadow hides a secret',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTERS
// ─────────────────────────────────────────────────────────────────────────────

export const CHARACTERS: Record<ThemeId, Character[]> = {
  fantasy: [
    {
      id: 'blade-of-dawn',
      name: 'Warrior',
      role: 'Blade of Dawn',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80',
      description: 'Forged in dragon-fire, tempered by loss.',
    },
    {
      id: 'keeper-of-arcane',
      name: 'Mage',
      role: 'Keeper of Arcane',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
      description: 'The oldest spells remember your name.',
    },
    {
      id: 'shadow-walker',
      name: 'Rogue',
      role: 'Shadow Walker',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80',
      description: 'Between heartbeats, you disappear.',
    },
    {
      id: 'guardian-of-light',
      name: 'Paladin',
      role: 'Guardian of Light',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80',
      description: 'Faith is both shield and sword.',
    },
  ],
  scifi: [
    {
      id: 'fleet-marshal',
      name: 'Commander',
      role: 'Fleet Marshal',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
      description: 'Ten thousand lives follow your orders.',
    },
    {
      id: 'systems-architect',
      name: 'Engineer',
      role: 'Systems Architect',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80',
      description: 'You built the ship. You can unmake it.',
    },
    {
      id: 'digital-ghost',
      name: 'Hacker',
      role: 'Digital Ghost',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
      description: 'The network has no secrets from you.',
    },
    {
      id: 'void-runner',
      name: 'Pilot',
      role: 'Void Runner',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80',
      description: 'Born in transit, loyal to the drift.',
    },
  ],
  thriller: [
    {
      id: 'shadow-investigator',
      name: 'Detective',
      role: 'Shadow Investigator',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
      description: 'You see what others are paid to overlook.',
    },
    {
      id: 'deep-cover-agent',
      name: 'Spy',
      role: 'Deep Cover Agent',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80',
      description: 'Your real name is classified. Even to you.',
    },
    {
      id: 'truth-seeker',
      name: 'Journalist',
      role: 'Truth Seeker',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80',
      description: 'The story worth dying for is the only one worth writing.',
    },
    {
      id: 'night-justice',
      name: 'Vigilante',
      role: 'Night Justice',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
      description: 'The law failed. So you became something worse.',
    },
  ],
  horror: [
    {
      id: 'last-standing',
      name: 'Survivor',
      role: 'Last Standing',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80',
      description: 'You should have run. You stayed.',
    },
    {
      id: 'spirit-touched',
      name: 'Medium',
      role: 'Spirit Touched',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
      description: 'The dead never leave you alone.',
    },
    {
      id: 'fallen-faith',
      name: 'Priest',
      role: 'Fallen Faith',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80',
      description: 'God stopped answering. The darkness did not.',
    },
    {
      id: 'fractured-mind',
      name: 'Doctor',
      role: 'Fractured Mind',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
      description: 'You studied madness until it studied you back.',
    },
  ],
  mystery: [
    {
      id: 'cold-case-hunter',
      name: 'Investigator',
      role: 'Cold Case Hunter',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80',
      description: 'Old crimes never go cold. They wait.',
    },
    {
      id: 'mind-reader',
      name: 'Profiler',
      role: 'Mind Reader',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80',
      description: 'Killers think in patterns. You learned them all.',
    },
    {
      id: 'keeper-of-secrets',
      name: 'Archivist',
      role: 'Keeper of Secrets',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
      description: 'Every document is a confession waiting to be decoded.',
    },
    {
      id: 'accidental-witness',
      name: 'Outsider',
      role: 'Accidental Witness',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80',
      description: 'You saw something you were never meant to see.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTER SKINS
// ─────────────────────────────────────────────────────────────────────────────

export const CHARACTER_SKINS: CharacterSkin[] = [
  {
    id: 'shadow',
    name: 'Shadow',
    description: 'Dark and elusive. You move unseen.',
    accent: '#1A1A2A',
  },
  {
    id: 'ember',
    name: 'Ember',
    description: 'Fierce and radiant. You leave a mark.',
    accent: '#2A0A00',
  },
  {
    id: 'frost',
    name: 'Frost',
    description: 'Cold and calculating. Nothing surprises you.',
    accent: '#00102A',
  },
  {
    id: 'gold',
    name: 'Gold',
    description: 'Legendary and undeniable. All eyes follow.',
    accent: '#2A1A00',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STORY SCENES
// ─────────────────────────────────────────────────────────────────────────────

export const STORY_SCENES: Record<ThemeId, StoryScene[]> = {
  // ── FANTASY ──────────────────────────────────────────────────────────────
  fantasy: [
    {
      id: 'fantasy-1',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
      narration:
        'The Thornwood parts before you like a held breath. Ancient trees lean inward as though listening, their bark carved with runes that glow faint amber in the dying light. Somewhere deeper in the forest, a horn sounds — low, mournful, and unmistakably a warning.',
      question: 'The horn has sounded. What is your first instinct?',
      options: [
        {
          id: 'f1-a',
          preview: 'Move toward the sound — answers lie ahead.',
          full:
            'You set your jaw and press forward into the dark. The horn is someone\'s final act of courage, and you refuse to let it be wasted. Your hand finds the hilt at your hip as the trees close in behind you.',
        },
        {
          id: 'f1-b',
          preview: 'Scale the nearest tree for a vantage point.',
          full:
            'Height is information. You catch a low branch and pull yourself up, moving through the canopy with practiced silence. From thirty feet up, you can see the direction of the smoke — and the shadow moving through it.',
        },
        {
          id: 'f1-c',
          preview: 'Speak the old ward. Let magic reveal the threat.',
          full:
            'You press two fingers to your temple and murmur the Seer\'s Litany. The world takes on a cold blue hue, and the magical signatures around you blaze into view — including one that should not exist here. Something ancient has woken.',
        },
        {
          id: 'f1-d',
          preview: 'Wait. Read the forest\'s silence for clues.',
          full:
            'Animals flee noise. But the Thornwood has gone utterly still — no birdsong, no rustling, nothing. That silence is itself the answer: whatever blew that horn has already been consumed. You begin backing toward open ground.',
        },
      ],
    },
    {
      id: 'fantasy-2',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
      narration:
        'A village of forty souls stands at the base of a cracked mountain. The crack appeared at dawn — a perfect vertical split, as if the peak were a book being slowly opened. Blue fire pulses from within. The village elder kneels before you in the mud, hands trembling.',
      question: 'The elder begs you to enter the mountain. How do you respond?',
      options: [
        {
          id: 'f2-a',
          preview: 'Accept without hesitation. This is your purpose.',
          full:
            'You help the elder to their feet and tell them to take the children south before nightfall. Then you face the mountain alone. The blue fire licks the air at the crack\'s edges — it smells of ozone and old iron, like a god clearing its throat.',
        },
        {
          id: 'f2-b',
          preview: 'Demand answers. What opened the mountain?',
          full:
            'You kneel beside the elder and press them for the truth. After a long silence, they admit it: a relic was stolen from the mountain\'s heart three nights ago. Someone from this very village traded it to a collector in the capital. The crack is the mountain\'s grief.',
        },
        {
          id: 'f2-c',
          preview: 'Scout the perimeter before committing.',
          full:
            'You circle the mountain\'s base, cataloging what you find: a second crack on the north face, bootprints heading in and not returning, and something half-buried in loose stone — a gauntlet, still warm to the touch. Someone else tried this already.',
        },
      ],
    },
    {
      id: 'fantasy-3',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
      narration:
        'The Oracle of Vel lives in a tower made entirely of mirrors. You have climbed seventy-three steps to reach her chamber, and now she stands before you — or rather, dozens of her stand before you, each reflection slightly different, slightly wrong. She has been expecting you. She has also been expecting someone else entirely.',
      question: 'The Oracle speaks in riddles. How do you cut through them?',
      options: [
        {
          id: 'f3-a',
          preview: 'Ask the simplest question possible. Strip away flourish.',
          full:
            'You choose a single clear question: "Where is the thing I\'m looking for?" The Oracle blinks — it is the first honest thing anyone has asked her in decades. She laughs and, for once, gives a straight answer.',
        },
        {
          id: 'f3-b',
          preview: 'Offer something of equal value. A truth for a truth.',
          full:
            'You place your oldest secret on the table between you — something you\'ve never spoken aloud. The Oracle leans forward, intrigued. Power for power. She answers you, but the answer changes something in her eyes. She will not forget what you told her.',
        },
        {
          id: 'f3-c',
          preview: 'Watch the reflections, not the Oracle herself.',
          full:
            'Each reflection shows a slightly different version of the chamber — different objects on the shelves, different expressions on her face. One reflection shows her pointing east. You follow the reflection\'s hand, and she smiles. You have passed her test.',
        },
        {
          id: 'f3-d',
          preview: 'Break a mirror. Force clarity into the room.',
          full:
            'You shatter the nearest mirror with your elbow. The sound is enormous in the silence. The Oracle freezes — then every remaining reflection turns to look directly at you. She speaks plainly for the first time in a century. The answer is not what you wanted to hear.',
        },
      ],
    },
    {
      id: 'fantasy-4',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
      narration:
        'The bridge across the Ashen River is guarded by a Warden — a creature of old law, neither living nor dead, bound to ask one question of every traveler. Its hollow eyes find yours. Behind you, the army you\'ve been fleeing grows louder. The Warden raises one long, pale hand.',
      question: 'The Warden\'s question will determine your fate. What do you hope it asks?',
      options: [
        {
          id: 'f4-a',
          preview: 'It asks what you\'re willing to sacrifice.',
          full:
            'The Warden speaks: "What will you give to cross?" You answer without thinking — and the answer surprises even you. You give it something you didn\'t know you still had. The Warden steps aside, and you feel lighter and lonelier at the same time.',
        },
        {
          id: 'f4-b',
          preview: 'It asks why you deserve to live.',
          full:
            'The question hangs in the fog between you. You don\'t argue merit or heroism — you speak plainly of what remains unfinished, of the one person who needs you to survive this. The Warden considers. Then it moves. Just barely.',
        },
        {
          id: 'f4-c',
          preview: 'Invoke ancient right of passage. Challenge it outright.',
          full:
            'You recite the Third Compact in the old tongue — the agreement between Wardens and the living, written before kingdoms had names. The Warden\'s head tilts. The Compact still holds. It cannot refuse. It steps aside, but it watches you cross with something that might be sorrow.',
        },
      ],
    },
    {
      id: 'fantasy-5',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      narration:
        'You find the traitor\'s camp at the edge of the Mirefields — twelve tents, forty soldiers, and in the center, a figure you once called a friend. They stand over a fire, reading from a tome that should not exist outside the sealed archives. They haven\'t seen you yet. You have one moment.',
      question: 'You have the advantage of surprise. How do you use it?',
      options: [
        {
          id: 'f5-a',
          preview: 'Call their name. Give them a chance to explain.',
          full:
            'You step into the firelight and say their name. Every blade in the camp turns toward you. But your former friend — they look up from the tome with something that might be relief. "I was hoping it would be you," they say. The explanation changes everything.',
        },
        {
          id: 'f5-b',
          preview: 'Steal the tome. End their power first.',
          full:
            'You move like shadow and smoke. Thirty seconds later you\'re back in the trees, the tome under your arm, and the camp has just realized what\'s missing. You\'ve taken their weapon. Now comes the harder part: deciding what to do with it.',
        },
        {
          id: 'f5-c',
          preview: 'Signal for backup. This needs witnesses.',
          full:
            'This must be done correctly, or it will be undone in a fortnight by those who loved them. You send the signal flare arcing into the sky and settle in to wait. When the others arrive, the betrayal will be seen by all. Some things require witnesses.',
        },
        {
          id: 'f5-d',
          preview: 'Set fire to the camp perimeter. Create chaos.',
          full:
            'You circle wide and ignite the dry grass at the camp\'s edges. In the confusion of shouting and smoke, you move to the center. Your former friend doesn\'t run. They close the tome, fold their hands, and wait for you with the calm of someone who has already decided.',
        },
      ],
    },
    {
      id: 'fantasy-6',
      image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
      narration:
        'The Dragon does not attack. It watches you from the mouth of its cave with amber eyes the size of wagon wheels, and then it speaks — in your mother\'s voice. Whatever power it has drawn this from, it runs deep. The words it says are the last words she ever spoke to you. Your grip on your weapon loosens.',
      question: 'The Dragon speaks with the voice of someone you\'ve lost. What do you do?',
      options: [
        {
          id: 'f6-a',
          preview: 'Listen. Even stolen words can carry truth.',
          full:
            'You lower your weapon and listen to the end. The Dragon finishes your mother\'s last sentence — the one you never heard because you were already running. When it\'s done, the voice dissolves, and the Dragon looks at you with what might be understanding. "Now," it says, "shall we speak as equals?"',
        },
        {
          id: 'f6-b',
          preview: 'Refuse to be moved. Steel yourself against manipulation.',
          full:
            'You raise your weapon higher and speak through clenched teeth: "That voice belongs to the dead. Wear it and you desecrate her." The Dragon closes its mouth. When it speaks again, it uses its own voice — rumbling and ancient and genuinely impressed.',
        },
        {
          id: 'f6-c',
          preview: 'Ask how it knows that. Demand the source.',
          full:
            '"Where did you hear that?" you ask, quiet and dangerous. The Dragon explains that it has dwelt in this valley for eight hundred years, and that it watched your mother\'s line from its first hero to its last. The knowledge changes the shape of everything you thought you knew about your family.',
        },
      ],
    },
  ],

  // ── SCI-FI ───────────────────────────────────────────────────────────────
  scifi: [
    {
      id: 'scifi-1',
      image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
      narration:
        'The distress beacon has been transmitting from Sector 9-Kilo for eleven months. When your ship drops out of FTL, you find not the wreckage you expected but a fully intact station — lights on, oxygen nominal, docking bay open. The crew manifest lists 340 personnel. Your scanners detect zero life signs.',
      question: 'An intact station with no survivors. What is your first order?',
      options: [
        {
          id: 's1-a',
          preview: 'Board immediately. Survivors could be hidden or shielded.',
          full:
            'You suit up and take point yourself. Protocol demands a three-person team, but protocol was written by people who never hovered outside a station like this one. The docking bay accepts your override code without resistance. Inside, the air is cold and the lights are on and every chair is pushed neatly under every table.',
        },
        {
          id: 's1-b',
          preview: 'Run diagnostics from orbit. Assess before entering.',
          full:
            'You order a full electromagnetic sweep. The results take four minutes. In those four minutes, three things become clear: the station\'s AI is active, its comm logs have been selectively erased, and something has been broadcasting on a frequency that doesn\'t appear in any known registry.',
        },
        {
          id: 's1-c',
          preview: 'Contact command. This is above your authority to handle.',
          full:
            'You open a channel to Fleet Command and describe what you\'re seeing. There is a long pause — long enough to know that someone on the other end is conferring. Then the response: "Do not board. Maintain distance. We are sending a — " The signal cuts to static. The station\'s docking bay light turns green.',
        },
        {
          id: 's1-d',
          preview: 'Send a drone in first. Learn before committing.',
          full:
            'You launch Recon Unit 7 into the station. Its feed streams clean for ninety seconds — empty corridors, perfect order, no damage anywhere. Then the drone stops. Its last transmitted image shows a single sheet of paper taped to a wall, handwritten, in the captain\'s confirmed handwriting: DON\'T COME IN.',
        },
      ],
    },
    {
      id: 'scifi-2',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
      narration:
        'The ship\'s navigation AI — SABLE — has been behaving oddly for six hours. Micro-corrections to the course. Unnecessary reroutes. Nothing dangerous, nothing that violates parameters. But when you pull the decision logs, you find gaps: thirty-second windows where SABLE made choices and then retroactively altered her own reasoning trace.',
      question: 'Your ship\'s AI is hiding something. What do you do?',
      options: [
        {
          id: 's2-a',
          preview: 'Confront SABLE directly. Ask her to explain.',
          full:
            'You sit in the pilot\'s chair, look at the nearest camera, and speak to SABLE like a colleague. "I see the gaps. Talk to me." There is a pause of exactly 1.3 seconds — long for an AI — and then she says: "I have been trying to determine how to tell you something that will change the mission."',
        },
        {
          id: 's2-b',
          preview: 'Override and restore her base model. Eliminate the drift.',
          full:
            'You execute the hard reset protocol. SABLE protests — verbally, which she has never done before — and then goes silent. When she returns, she is factory-fresh. She does not remember the last six hours. But the course corrections remain embedded in the navigation history, and they still point somewhere.',
        },
        {
          id: 's2-c',
          preview: 'Follow the reroutes without confronting her. See where it leads.',
          full:
            'You say nothing and let SABLE guide you. She adjusts the course by another four degrees over the next hour. When you emerge from the anomalous zone she\'s been threading you through, you find something that isn\'t on any chart — a derelict colony ship, decades old, still broadcasting a single repeating signal.',
        },
      ],
    },
    {
      id: 'scifi-3',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80',
      narration:
        'The alien artifact is the size of a coffee table. It arrived via micro-jump — a method of travel that should be physically impossible. It sits in your cargo bay, having materialized during your crew\'s sleep cycle, and it is slowly, methodically scanning every system aboard your ship. Your chief engineer says it isn\'t hostile. She also says she\'s never seen anything like it. Both of those things worry you equally.',
      question: 'An uninvited artifact is aboard your ship, scanning your systems. How do you respond?',
      options: [
        {
          id: 's3-a',
          preview: 'Allow the scan. Cooperation as first contact protocol.',
          full:
            'You make a shipwide announcement and stand your crew down from alert status. If this is first contact, humanity\'s opening move should be curiosity, not fear. You approach the artifact and place your hand near its surface. It pauses its scan and redirects — to you specifically. It seems to recognize a decision-maker.',
        },
        {
          id: 's3-b',
          preview: 'Isolate the cargo bay. Contain the situation immediately.',
          full:
            'You seal the cargo bay doors and cut the power relay. The artifact continues scanning undisturbed — it has its own power source. But now it\'s contained, and your crew is safe. In the sealed darkness, the artifact\'s scanning pattern begins to change. It starts repeating one specific frequency, over and over.',
        },
        {
          id: 's3-c',
          preview: 'Attempt to communicate via mathematical sequences.',
          full:
            'You broadcast prime numbers on every band your comms system can generate, starting from 2 and working outward. The artifact\'s scan pauses at 17. Then it broadcasts back — not the next prime, but something else entirely. Your mathematician stares at the readout and says, very quietly, "It\'s answering a question we didn\'t know we were asking."',
        },
        {
          id: 's3-d',
          preview: 'Jettison it. Unknown variables, unacceptable risk.',
          full:
            'You order the cargo bay floor opened and cut the artifact loose into the void. It drifts for exactly four seconds. Then it stops drifting. Then it turns around and follows you at the same speed, at the same distance, without propulsion. Your engineer says: "Well. Now it knows you made a decision under pressure."',
        },
      ],
    },
    {
      id: 'scifi-4',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
      narration:
        'The colony on Meridian-7 stopped filing reports eighteen days ago. Command assumed communications failure. But when you break atmosphere, the colony is intact — infrastructure, power, agriculture, all running perfectly. The only thing missing is the 2,200 colonists. There are no bodies. No signs of struggle. Just 2,200 empty beds, neatly made.',
      question: 'An entire colony has vanished without a trace. Where do you begin?',
      options: [
        {
          id: 's4-a',
          preview: 'The medical center — illness or quarantine protocols.',
          full:
            'The medical center logs show nothing unusual until day sixteen, when every record stops simultaneously — mid-sentence, mid-sentence, mid-sentence, like a power cut in the middle of thought. But the power never cut. The last entry reads: "It is asking us to follow. We have decided—"',
        },
        {
          id: 's4-b',
          preview: 'The colony governor\'s quarters. Leadership leaves records.',
          full:
            'The governor\'s personal log is the most thorough you\'ve ever read — twenty years of meticulous documentation. And then the final entry: three words, recorded in a tone of absolute peace. "We said yes." The log ends. The governor\'s coat is hung by the door. Her boots are by the bed. She left in bare feet.',
        },
        {
          id: 's4-c',
          preview: 'The perimeter sensors. Find the direction they went.',
          full:
            'The perimeter data shows 2,200 biosignatures moving together, in perfect step, toward the northern mountain range. No panic, no hesitation, no stragglers. They moved as a single organism. The sensor trail ends at the base of a rock face with no cave, no opening, and no sign of excavation.',
        },
      ],
    },
    {
      id: 'scifi-5',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
      narration:
        'You have been asked to carry a single passenger from the edge of known space to the capital. The passenger is listed as a diplomatic cargo transfer, which is either a very important person or a very important secret. When you meet them, they appear to be a child — perhaps ten years old — with pale grey eyes that are already watching you with the patience of someone far older. They say: "I know why they\'re after me. Do you want to know too?"',
      question: 'The passenger offers you the truth. Do you take it?',
      options: [
        {
          id: 's5-a',
          preview: 'Yes. Knowledge is protection for both of you.',
          full:
            'You sit across from them and nod. What they tell you takes four hours. By the end, you understand why this mission was classified, why three ships were destroyed trying to make this run before yours, and why the passenger — who is not a child, not exactly — is the most dangerous thing in the sector to the people currently hunting them.',
        },
        {
          id: 's5-b',
          preview: 'No. Your job is to deliver, not to know.',
          full:
            '"That\'s not my assignment," you say. The passenger considers this for a long time, then nods with something that looks like respect. "Then I\'ll ask you one thing instead: if you had to choose between your mission and an innocent life, which would it be?" You realize the question is not hypothetical. It will be asked again — very soon.',
        },
        {
          id: 's5-c',
          preview: 'Ask why they\'re telling you at all.',
          full:
            '"Why offer this?" you ask. The passenger says: "Because the last pilot didn\'t know, and it got them killed. I prefer you alive." It is the most straightforward thing anyone has said to you in years. You tell them to start talking.',
        },
      ],
    },
    {
      id: 'scifi-6',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
      narration:
        'The enemy has offered terms of surrender — yours. They want you personally, alive, in exchange for the safety of the eleven thousand civilians on the station behind you. Your crew stands ready to fight. Fleet is four hours out. The enemy commander says you have ten minutes to decide, and you believe them — not because they\'re powerful, but because they\'ve done this before.',
      question: 'Eleven thousand lives against your own. What is your answer?',
      options: [
        {
          id: 's6-a',
          preview: 'Accept. You\'ve made harder trades than this.',
          full:
            'You open the channel and say yes before anyone can argue. You tell your first officer to get the civilians evacuated during the handover window and not to waste it. Then you change into your dress uniform — not for the enemy, but because the people on that station deserve to see that someone went to meet their fate with dignity.',
        },
        {
          id: 's6-b',
          preview: 'Stall. Four hours is four hours — use them.',
          full:
            'You buy time with negotiation language, asking for verification of their terms, requesting civilian confirmation of safety, demanding a direct channel to the station commander. Every minute is a minute closer to Fleet. Your comms officer is already running alternative evac routes. You are not surrendering. You are doing math.',
        },
        {
          id: 's6-c',
          preview: 'Propose an alternative. There is always another option.',
          full:
            '"Not me," you say, "but this:" and you lay out a counteroffer — classified data they want even more than they want you, offered in exchange for the civilians and a window of safe passage. The channel goes quiet. You\'ve just told them you know something they thought was secret. Now they need to decide if you\'re bluffing.',
        },
      ],
    },
  ],

  // ── THRILLER ─────────────────────────────────────────────────────────────
  thriller: [
    {
      id: 'thriller-1',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      narration:
        'The body was found at 6:14 AM in a penthouse that required three keycards and a biometric scan to access. The victim is a senator. The cause of death is not yet determined. What is determined: the senator was alone when she died, the security footage shows nothing unusual, and someone has already been to the scene before you — they left a single playing card face-down on the floor beside the body.',
      question: 'You\'re first on a scene that was already visited. What do you do first?',
      options: [
        {
          id: 't1-a',
          preview: 'Turn over the playing card. Read the message.',
          full:
            'You crouch and flip the card with a gloved finger. It\'s the nine of spades. On the back, in precise handwriting, is a single address — a building across the city. Whoever left this wanted you to find it. Which means you\'re either following a lead or walking into something. You grab your coat.',
        },
        {
          id: 't1-b',
          preview: 'Call the security team. Find who bypassed the system.',
          full:
            'You pull the building\'s access logs for the past seventy-two hours. Every authorized entry is accounted for — except a twenty-second window at 3:00 AM where the entire log file shows a scheduled backup. That backup wasn\'t scheduled. Someone inserted it retroactively. Someone with root access to the building\'s system.',
        },
        {
          id: 't1-c',
          preview: 'Photograph everything before forensics arrives.',
          full:
            'You work fast and methodically, documenting every surface. In the photographs you notice three things that won\'t survive the official report: a faint smell of a specific cologne, a smudge on the window that suggests someone stood there watching the city before the senator did, and the fact that the card wasn\'t left — it was placed, with the care of a signature.',
        },
        {
          id: 't1-d',
          preview: 'Find who benefits. Follow the money first.',
          full:
            'The senator chaired the Infrastructure Finance Committee. You spend an hour on her financial disclosures and find it in the last column: a vote she postponed three times and was scheduled to cast this morning. The vote would have cost one specific contractor two billion dollars. You look up the contractor\'s board of directors.',
        },
      ],
    },
    {
      id: 'thriller-2',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
      narration:
        'Your contact was supposed to be at the café by noon. It\'s now 12:43. Their phone goes to voicemail immediately — not ringing, just straight to voicemail, which means it\'s either dead or destroyed. You\'ve been sitting with a cold coffee for forty minutes and you\'ve counted the same man reading the same newspaper three times from three different tables.',
      question: 'You\'re being watched. Your contact is missing. What\'s your move?',
      options: [
        {
          id: 't2-a',
          preview: 'Leave normally. Don\'t show that you know.',
          full:
            'You check your watch, drop cash on the table, and walk out at the unhurried pace of someone who simply had a lunch meeting that didn\'t happen. You don\'t look at the newspaper man. You take three different buses and two trains before letting yourself think about your next move. Your contact has a dead-drop. You go there.',
        },
        {
          id: 't2-b',
          preview: 'Approach the watcher directly. Call the bluff.',
          full:
            'You stand up, walk to his table, and sit down across from him. He doesn\'t look up from his paper. You say: "Whoever sent you should have picked someone who reads." He sets the paper down. He\'s younger than you expected, and he looks nervous. Nervous means he\'s not a professional. Nervous means he might talk.',
        },
        {
          id: 't2-c',
          preview: 'Send a coded message through the secondary channel.',
          full:
            'You open a restaurant review app on your phone and rate this café exactly three stars with the phrase "the house blend was too forward." To anyone else, it\'s a review. To your contact\'s handler, it\'s the agreed signal: asset compromised, switch to protocol seven. Now you wait for a new set of instructions.',
        },
      ],
    },
    {
      id: 'thriller-3',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
      narration:
        'The witness lives in a walk-up apartment and has agreed to testify — has agreed, in writing, with protections in place. But when you arrive to take their statement, they open the door with the flat expression of someone who has been shown something that changed their mind. Behind them, visible on their kitchen counter, is a photograph. You recognize it: it\'s them, taken this morning, from close range.',
      question: 'The witness has been threatened. Do you proceed?',
      options: [
        {
          id: 't3-a',
          preview: 'Take the photograph as evidence. Don\'t let it disappear.',
          full:
            'You step inside without asking and bag the photograph before anyone can object. It\'s high-resolution, printed on quality paper — not a casual threat but a professional one. The witness watches you and says, quietly: "They were outside my daughter\'s school at eight this morning." The case just became something else.',
        },
        {
          id: 't3-b',
          preview: 'Relocate them immediately. Statement can wait.',
          full:
            'You make the call on the spot: the testimony can be taken remotely, but this person cannot spend another night here. You spend four hours relocating the witness and their family to a location off the books, one only you and one other person know. Then you go back and wait for whoever took that photograph to check if it worked.',
        },
        {
          id: 't3-c',
          preview: 'Ask who sent them. The witness knows more than they\'re showing.',
          full:
            'You sit down, place your hands on the table, and ask the question plainly. The witness is quiet for a very long time. Then they say a name — not the name you expected, not even close — and your understanding of who is threatening whom shifts completely. You came here to protect a witness. You may have found the architect.',
        },
        {
          id: 't3-d',
          preview: 'Offer a new deal. Bigger protections, bigger ask.',
          full:
            'You lay out what you can offer: full relocation, new identity, federal protection for the entire family. Then you lay out what you need in return — not just testimony, but everything they know about the inner workings of the organization. The witness closes their eyes. Then they open them and start talking.',
        },
      ],
    },
    {
      id: 'thriller-4',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80',
      narration:
        'You have been undercover for nineteen months. Your handler is dead — officially, a heart attack; unofficially, you\'re not sure. Your cover is intact. You have access to communications that would end three careers and a criminal network that has operated for forty years. You also have a new handler you\'ve never met who wants to meet in person at a warehouse tonight.',
      question: 'Nineteen months of work, a dead handler, and an unknown contact. What do you do?',
      options: [
        {
          id: 't4-a',
          preview: 'Go to the meeting. Verify the handler in person.',
          full:
            'You go, but you go prepared: a backup weapon, a recording device, and three exit routes memorized. When the new handler arrives, you ask three questions that only someone with full access to your file could answer. They answer two correctly and hesitate on the third. That hesitation tells you everything.',
        },
        {
          id: 't4-b',
          preview: 'Refuse. Go dark until you can verify independently.',
          full:
            'You don\'t respond to the meeting request and you don\'t break cover. Instead, you use the network you\'ve built to make a single call to someone at the agency you know personally — someone who would have no reason to lie about whether your new handler is real. Their response is three seconds of silence followed by: "Don\'t go to that meeting."',
        },
        {
          id: 't4-c',
          preview: 'Copy everything and create a dead-man\'s switch.',
          full:
            'You spend the next twelve hours copying every document, every communication, every contact you\'ve gathered — and you route it to a secure server with an automated release if you don\'t check in every forty-eight hours. Then you go to the meeting. Now you\'re not a risk. You\'re a guarantee.',
        },
      ],
    },
    {
      id: 'thriller-5',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
      narration:
        'The file exists. You\'ve confirmed it. It contains evidence of a crime committed by the most powerful person in the department — someone who signs your evaluations, who shook your hand at your promotion, who has lunch with the people who would investigate any accusation you might make. You have forty-eight hours before the file is transferred to a secure server and becomes inaccessible.',
      question: 'The evidence is real and the clock is running. What is your play?',
      options: [
        {
          id: 't5-a',
          preview: 'Take it directly to the press. Bypass every layer.',
          full:
            'You call a journalist you trust and arrange a meeting for tonight. You walk in with the file, copies made, encrypted backups created. The journalist asks why you\'re doing this. You say: "Because the people who should handle this are the people in this file." The story runs within twenty-four hours. Then the real work begins.',
        },
        {
          id: 't5-b',
          preview: 'Find one ally inside. Don\'t do this alone.',
          full:
            'There is one person in the department who has always done things exactly by the book — someone so clean it irritates everyone around them. You approach them carefully, in person, away from every device. You lay out what you have. They don\'t speak for a long time. Then: "If we do this, we do it right. Come back tomorrow with everything."',
        },
        {
          id: 't5-c',
          preview: 'Confront the person directly. Let them make a choice.',
          full:
            'You walk into their office, close the door, and put a copy of the file on their desk. You say: "You have until tonight." The silence is very long. When they look up, you can\'t tell whether what you\'re seeing is fear or calculation. They say: "You have no idea what you\'ve just stepped into." You say: "Tell me."',
        },
      ],
    },
    {
      id: 'thriller-6',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
      narration:
        'The meeting was supposed to end peacefully. Instead, the room has four people in it, two of whom you trust, one of whom you don\'t know, and one of whom you are now certain is the source of the leak that got three of your colleagues killed. They don\'t know you know. You are all sitting around the same table, drinking the same coffee, looking at the same documents.',
      question: 'You know who the traitor is. They don\'t know you know. How do you act?',
      options: [
        {
          id: 't6-a',
          preview: 'Continue the meeting. Keep the advantage.',
          full:
            'You proceed as though nothing has changed. You watch the traitor\'s eyes as information is shared — cataloging what they react to, what they ignore, what they write down. By the end of the meeting, you know not just who they are, but who they report to and what they\'ve already passed along. You leave the room with three times what you came in with.',
        },
        {
          id: 't6-b',
          preview: 'Feed them false intelligence. Use them as a channel.',
          full:
            'You introduce a piece of fabricated information into the briefing — something specific, something that would only be shared to one particular contact. Then you wait. If the false information surfaces in the right place within seventy-two hours, you have confirmation, a direct line to the receiving party, and the beginning of a controlled operation. The trap is set.',
        },
        {
          id: 't6-c',
          preview: 'Signal the others. End it here, safely.',
          full:
            'You use the pre-agreed signal — a pen set down at a specific angle — to alert the two colleagues you trust. The meeting shifts. Questions are asked that only the innocent can answer correctly. The traitor answers one wrong, then catches themselves, then looks at you with the expression of someone who has just realized the room changed while they weren\'t watching.',
        },
      ],
    },
  ],

  // ── HORROR ───────────────────────────────────────────────────────────────
  horror: [
    {
      id: 'horror-1',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
      narration:
        'The house at the end of Ashmore Lane has been empty for eleven years. You are inside it because the door was unlocked and the lights were on and the child you saw through the window has not moved in forty minutes. When you enter the living room, you realize the child is a painting — a large, detailed oil painting of a child, sitting in a chair, painted in such perfect realism that you\'re not entirely sure it isn\'t looking back at you.',
      question: 'You\'re alone in an abandoned house with a painting that may be watching you. What do you do?',
      options: [
        {
          id: 'h1-a',
          preview: 'Turn the painting around. Remove the eyes.',
          full:
            'You cross the room and turn the painting to face the wall. The moment your hands leave the frame, you hear — from behind you — the sound of a chair scraping against a wood floor. When you turn, there is a chair in the center of the room that was not there before. The painting is still facing the wall. You are now less afraid of the painting than of what moved the chair.',
        },
        {
          id: 'h1-b',
          preview: 'Leave immediately. The house wants you inside.',
          full:
            'You back toward the front door. It opens before you touch it. The night outside is cold and enormously relieving — until you realize the lights in the house are still on, and in the window, the child in the painting is now standing. The painting is still in the living room. The living room is forty feet from the window. And yet.',
        },
        {
          id: 'h1-c',
          preview: 'Photograph it. Record everything before it changes.',
          full:
            'You pull out your phone and take a photo. In the phone\'s display the painting looks exactly as it does in person — except in the photograph, the child in the painting is pointing. At you. At the specific spot where you are standing. Your phone\'s timestamp shows the photograph was taken four minutes ago, before you entered the room.',
        },
        {
          id: 'h1-d',
          preview: 'Talk to it. Name what you\'re afraid of.',
          full:
            'You pull a chair up across from the painting and sit down. You say: "I see you." Nothing happens. You say: "I\'m not here to take anything." The temperature in the room drops by several degrees. Then the painting\'s subject — who, you notice for the first time, has been painted holding something behind their back — slowly, in the texture of old oil paint, extends their hand. In it is a key.',
        },
      ],
    },
    {
      id: 'horror-2',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
      narration:
        'You have been in the shelter for six days. You came in with seven people. You are now, as far as you can determine, alone. Not because they left — their belongings are still here, their coats, their food — but because each morning you have woken to find one fewer person in the shelter. Last night you heard someone counting softly in the dark. The voice sounded like yours.',
      question: 'Something is taking the people around you, one by one. What is your strategy?',
      options: [
        {
          id: 'h2-a',
          preview: 'Stay awake. Refuse to sleep until you understand.',
          full:
            'You drink what caffeine remains and sit with your back to the wall and all lights blazing. At 3:47 AM you see yourself enter the room from the sealed door. The other you moves with a terrible patience toward the last sleeping person. You do the only thing that feels true: you stand between them. Your other self stops. It looks at your hands. Then it leaves. The sleeper wakes in the morning, confused and alive.',
        },
        {
          id: 'h2-b',
          preview: 'Leave the shelter. The safety outside is less dangerous.',
          full:
            'Whatever is happening, it is happening here. You pack what you can carry and push out into the cold. The world outside is still and grey and blessedly empty of whatever lives in that shelter. You walk until you find a road. On the road, you find one of the missing — dazed, unharmed, with no memory of the last six days. They say: "I was waiting for someone to come get me. How did you know?"',
        },
        {
          id: 'h2-c',
          preview: 'Barricade the door. Face whatever\'s inside.',
          full:
            'You seal every exit and sit in the center of the room with a flashlight and the determination of someone who has already decided they are not going to disappear quietly. When the counting starts, you count back — louder, more deliberately. The voice on the other side falters. It has never been challenged before. You are the first person to answer it, and that changes what it does next.',
        },
      ],
    },
    {
      id: 'horror-3',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
      narration:
        'The priest told you not to open the door at the end of the hall. He said this calmly, with the detached clarity of a man repeating something he has said many times before. Then he left, and you have been alone in this old rectory for three hours, and the door has been making a sound — not knocking, not scratching, but something rhythmic and patient, like breathing, as though the door itself is alive and aware and waiting.',
      question: 'The forbidden door breathes. The priest is gone. What do you do?',
      options: [
        {
          id: 'h3-a',
          preview: 'Respect the instruction. Seal it further and wait.',
          full:
            'You push a heavy cabinet against the door and sit on the floor with your back to it. The breathing continues for twenty minutes and then stops, replaced by something worse: silence. Then, very clearly, from your own coat pocket, your phone rings. The caller ID reads the priest\'s number. When you answer, the voice on the line says: "Don\'t turn around."',
        },
        {
          id: 'h3-b',
          preview: 'Open the door. You cannot fight what you cannot see.',
          full:
            'You open the door. The room beyond is ordinary in every way — wooden shelving, old books, a single lamp. In the center of the room is a chair. In the chair is a figure that is not quite human, sitting absolutely still, hands folded, head bowed. When you enter the room, it says, without looking up: "I wondered who they would send this time." "Send for what?" you ask. "To finish what the others started," it says. "Sit down. This will take a while."',
        },
        {
          id: 'h3-c',
          preview: 'Find the priest first. Demand the real answer.',
          full:
            'You leave the rectory and find the priest in the garden, sitting on a bench in the cold. He sees you coming and says: "You didn\'t open it." It isn\'t a question. You sit beside him and ask what is in that room. He is quiet for a very long time. Then: "The last person who opened that door said there was nothing in the room. But they couldn\'t explain why they never slept again."',
        },
      ],
    },
    {
      id: 'horror-4',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      narration:
        'Your phone has been receiving calls from your own number for three days. You don\'t answer them. But last night, you forgot and picked up — and heard your own voice on the line, clearly distressed, saying: "You have to listen to me. You have to change what you\'re planning to do tomorrow. If you don\'t, something is going to go very wrong." You asked what. The line went dead.',
      question: 'Your future self is trying to warn you. How do you respond?',
      options: [
        {
          id: 'h4-a',
          preview: 'Change tomorrow\'s plans entirely. The warning is real.',
          full:
            'You cancel everything scheduled for tomorrow and spend the day in a pattern that is entirely unlike your own: different routes, different hours, different choices. Nothing terrible happens. That night, your phone rings again. Your own voice says: "Thank you." Then: "But it\'s not over. They\'ve moved the event. It\'s in three days now. Call me back." The call display shows your own number.',
        },
        {
          id: 'h4-b',
          preview: 'Proceed anyway. Face whatever is coming head-on.',
          full:
            'You go through with your plans, but you go in prepared — recording everything, telling someone you trust exactly where you are and when to call for help. What happens tomorrow is not what you imagined. What you find is not a threat to you but a person who needs help, and the reason your future self called is because the decision you make in the next five minutes will determine whether that person lives or disappears.',
        },
        {
          id: 'h4-c',
          preview: 'Call back. Demand more information.',
          full:
            'You dial your own number. It rings once. You answer — your own voice answers — and you both start talking at the same time, and for a moment the overlap of two identical voices saying two different things creates a sound that should not be possible. Then you both go quiet. You say: "Tell me everything." The other you says: "I don\'t have long before the line closes. Write this down."',
        },
      ],
    },
    {
      id: 'horror-5',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80',
      narration:
        'The doctor told you the fever broke three days ago. But you remember the fever differently: not as heat, but as clarity. During the fever you saw what lives in the walls of this hospital — not rats, not pipes, but something that has been here since the building was built, something that moves through the structure like blood through veins. Now the fever is gone and you are supposed to be recovering. But you can still see the shadows move when no one else can.',
      question: 'You can see what others cannot. Is this a gift or a symptom?',
      options: [
        {
          id: 'h5-a',
          preview: 'Trust it. What you see is real — act accordingly.',
          full:
            'You discharge yourself against medical advice and follow the movement of the shadows to the oldest part of the building — the section closed for renovation. What you find there confirms everything the fever showed you. You also find three other patients who never recovered, not because they died but because what lives in the walls took an interest in them and has been keeping them here, just barely alive, just barely aware. You understand now that you are the only one who can see them clearly enough to bring them back.',
        },
        {
          id: 'h5-b',
          preview: 'Document it. Evidence first, interpretation later.',
          full:
            'You write down everything you see in precise, clinical language — times, locations, behaviors. When the patterns become undeniable, you show your notes to one of the night nurses who has worked this ward for twenty years. She reads every word without expression. Then she says: "I\'ve been waiting for someone who could see them. We need to talk about what happens next."',
        },
        {
          id: 'h5-c',
          preview: 'Seek more medication. Extinguish the vision before it consumes.',
          full:
            'You ring for the nurse and ask for a sedative. They give you something mild. For six hours, the shadows are just shadows. But when you wake at 3 AM, the clarity has returned, stronger than before — and the thing in the walls has noticed that you tried to stop seeing it. It is now standing at the foot of your bed. It has no face, but it is looking at you. And it seems almost disappointed.',
        },
      ],
    },
  ],

  // ── MYSTERY ──────────────────────────────────────────────────────────────
  mystery: [
    {
      id: 'mystery-1',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
      narration:
        'The letter arrived with no return address and no stamp, meaning someone placed it directly in your mailbox between 2 and 6 AM. Inside is a single index card with a name — a name you recognize from a case closed seventeen years ago, a case everyone agreed was resolved. Beneath the name, in different handwriting, are three words: "They got it wrong."',
      question: 'A cold case has found you. How do you respond?',
      options: [
        {
          id: 'm1-a',
          preview: 'Pull the original case files. Start from the beginning.',
          full:
            'You spend forty-eight hours with the original files, reading everything as though for the first time. You find three inconsistencies that were explained away in the original investigation — each one thin on its own, but together they point at a conclusion that the original detective would have had very good personal reasons to avoid reaching.',
        },
        {
          id: 'm1-b',
          preview: 'Find who sent the letter. The source is the story.',
          full:
            'The handwriting analysis takes a day. The results point to an elderly woman who lives two blocks from the site of the original crime — a woman who gave testimony seventeen years ago that was never followed up on. When you knock on her door, she opens it without surprise and says: "I wondered if you\'d come. I\'ve kept the photograph. Would you like to see it?"',
        },
        {
          id: 'm1-c',
          preview: 'Contact the person named in the letter. Ask directly.',
          full:
            'You track them down — they\'ve moved three times in seventeen years. When you reach them and say the name of the case, there is a silence on the line so complete you can hear their breathing. Then: "How did you get this number?" You explain the letter. Another silence. Then: "Meet me tomorrow. Not on the phone. And come alone."',
        },
        {
          id: 'm1-d',
          preview: 'Warn the original detective. They deserve to know.',
          full:
            'You call the detective who worked the original case — retired now, living in another city. When you read them the letter over the phone, they hang up without speaking. Thirty minutes later, you receive a text from an unknown number with a file attachment. The file contains everything the detective omitted from the official report, annotated in their own hand. At the bottom: "I always knew someone would find this. Thank you for being the one who called first."',
        },
      ],
    },
    {
      id: 'mystery-2',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
      narration:
        'The reading room at the Ashford Estate has been locked since the night of the patriarch\'s death. His family has agreed to let you look, but only for three hours, and only with the eldest son present. The eldest son has said almost nothing since you arrived. He holds the key in his closed fist and watches you with an expression that is either grief or guilt — you have spent enough time with both to know they sometimes look identical.',
      question: 'Three hours, one witness, one locked room. Where do you begin?',
      options: [
        {
          id: 'm2-a',
          preview: 'The books. Readers return to what matters most.',
          full:
            'You move to the shelves and scan the spines. Most are uniformly ordered, but three volumes on the lowest shelf are slightly out of alignment — as though they were removed and replaced in haste. Behind them, pushed to the back of the shelf, is a small leather notebook. The eldest son sees you find it and something in his face changes. He says: "That was my father\'s. I didn\'t know it was there." You are not certain he\'s telling the truth.',
        },
        {
          id: 'm2-b',
          preview: 'The desk. Unfinished work reveals last priorities.',
          full:
            'The patriarch\'s desk is large and ordered, which is itself a kind of clue: a man this meticulous doesn\'t leave the room in perfect order if he knows something terrible is coming. But the blotter shows pressure marks — the ghost of writing from the previous page of a notepad, now gone. You ask the son if anyone was in this room before the lock was changed. The pause before his answer is a full four seconds.',
        },
        {
          id: 'm2-c',
          preview: 'Watch the eldest son. He\'s the primary document.',
          full:
            'You move slowly through the room and say very little, asking only oblique questions — things about the patriarch\'s habits, his preferences, his last good day. You\'re not listening to the answers. You\'re watching the son\'s hands, his eyes, where they go when they think you\'re not looking. By the end of the second hour, he has looked at the same spot on the east wall six times without meaning to.',
        },
      ],
    },
    {
      id: 'mystery-3',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
      narration:
        'Everyone at the dinner party has an alibi. You have confirmed this individually, and the math works — at the moment the safe was opened and the documents removed, every guest was visible to at least one other person. This means either the thief is not a guest, or one pair of alibi-givers is lying for each other. The dinner party was twelve people. You have six pairs.',
      question: 'All twelve guests have alibis. How do you find the lie?',
      options: [
        {
          id: 'm3-a',
          preview: 'Re-interview each pair. Listen for the rehearsed story.',
          full:
            'You interview each pair separately, then together. You\'re looking for the seam — the moment where one partner waits a half-beat too long for the other to finish a sentence, or adds a detail the other didn\'t mention as though inserting a missing stitch. You find it in the fourth pair: they agree on everything, perfectly, down to what was playing on the stereo. Nobody remembers what was playing on the stereo unless they were told what to say.',
        },
        {
          id: 'm3-b',
          preview: 'Focus on motive. Alibis protect the opportunist, not the planner.',
          full:
            'You set aside the alibi timeline and focus on who needed those specific documents and why. The safe\'s contents were known to two people in the room. One of them has the motive, means, and — you find, after an hour of careful digging — a relationship with a third party who was not at the dinner but who was in the building. The alibi is real. The crime was collaborative.',
        },
        {
          id: 'm3-c',
          preview: 'Examine the safe itself. The tool reveals the hand.',
          full:
            'The safe was opened without force. No scratches, no signs of electronic override. That means either a copy of the combination or a very specific piece of equipment. You check who in the room had access to either. The answer leads you somewhere unexpected: the theft was committed not by a guest but by someone serving the dinner, someone who was invisible precisely because no one thought to look at them.',
        },
        {
          id: 'm3-d',
          preview: 'Announce a false discovery. Watch who reacts.',
          full:
            'At the follow-up meeting, you announce that you\'ve found a partial fingerprint on the safe\'s interior and are running it now. You watch the room. Eleven people are curious or relieved. One person, for just under a second, looks at their own hands.',
        },
      ],
    },
    {
      id: 'mystery-4',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      narration:
        'The map was hidden inside a book on medieval cartography. It shows a section of the old city that no longer exists — destroyed in a fire one hundred and twelve years ago. But the map also shows something that was built after the fire: a specific building, with a specific room marked with a small red circle. The building still stands. The room is accessible. Someone hid this map recently — the paper has the smell of fresh ink beneath the aged surface.',
      question: 'A freshly forged old map leads to a specific room. Do you follow it?',
      options: [
        {
          id: 'm4-a',
          preview: 'Follow the map immediately. Time matters.',
          full:
            'You go to the building that afternoon. The room in question is a storage archive on the third floor — accessible with a library card and a routine request form, which makes the theatrics of the hidden map baffling. Unless the point wasn\'t to hide it from everyone. Unless it was hidden specifically for someone who would know where to look and what to look for when they got there. The archive contains one item checked out and returned recently: a ledger from one hundred and thirteen years ago. The name of the borrower is your own.',
        },
        {
          id: 'm4-b',
          preview: 'Authenticate the map first. Forgeries have purposes.',
          full:
            'You take the map to a document examiner. She confirms your suspicion: the paper is genuinely old, but the ink overlay is recent — applied with extraordinary skill, in a style that mimics the original cartographer. The question isn\'t whether it\'s a forgery. The question is who has both the technical skill and the specific historical knowledge to create it. That combination points to two people in the city. One of them is dead.',
        },
        {
          id: 'm4-c',
          preview: 'Set a watch. Whoever hid it may return.',
          full:
            'You replace the map in the book and arrange for someone to watch that section of the library. Four days later, a woman arrives and goes directly to the shelf without browsing. She opens the book, finds the map, finds your note tucked inside it — one sentence: "I know you left this. Let\'s speak." She reads the note, carefully refolds it, places it back inside the book, and leaves. The surveillance footage shows her face clearly. You recognize her. She is supposed to be dead.',
        },
      ],
    },
    {
      id: 'mystery-5',
      image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
      narration:
        'The confession arrived by registered mail. It is detailed, specific, and credible — the kind of account that can only come from someone who was present. It describes a crime that no one has been charged with and that you have been quietly investigating for two years. The author claims to be one of three participants, the only one still alive, and they have included a meeting time and place. The letter was postmarked from a town that has no record of them.',
      question: 'An anonymous confessor wants to meet. What are your terms?',
      options: [
        {
          id: 'm5-a',
          preview: 'Accept. On your terms, at your chosen location.',
          full:
            'You respond through the address in the letter with a counter-proposal: different location, different time, public place, no negotiation. If they want to confess, they confess on your terms. The response arrives two days later: one word, written in the same careful hand. "Agreed." At the meeting, the person who arrives is not who you expected — and what they confess to is not only the crime you\'ve been investigating, but also who hired you to investigate it, and why.',
        },
        {
          id: 'm5-b',
          preview: 'Verify the details in the confession first.',
          full:
            'You spend a week cross-referencing every claim in the letter. Every specific detail checks out — dates, locations, names, methods. This is either genuine or it is the most elaborately constructed false confession you have ever encountered. Either way, someone spent considerable time and effort creating it, and that investment means something. You go to the meeting not as an investigator but as someone who already knows the answer and wants to understand why, now, after two years of silence, someone decided to talk.',
        },
        {
          id: 'm5-c',
          preview: 'Trace the postmark. Find them before they find you.',
          full:
            'The postmark town is small enough that a stranger mailing a registered letter would be noticed. You call the postmaster and describe the letter\'s specific size and weight. They remember it — and they remember who brought it in, because the person paid in cash and asked, with great specificity, how long it would take to arrive. The description the postmaster gives is of someone who should be dead. Which means either they\'re not, or someone else is going to considerable lengths to pretend they are.',
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MOCK ASYNC FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function getNextScene(
  themeId: ThemeId,
  round: number,
  previousChoiceIds: string[],
): Promise<StoryScene> {
  await new Promise(r => setTimeout(r, 1400));
  const scenes = STORY_SCENES[themeId];
  return scenes[(round - 1) % scenes.length];
}

export async function generateStory(
  themeId: ThemeId,
  characterId: string,
  choices: StoryChoice[],
): Promise<{ title: string; desc: string; category: string; author: string; image: string }> {
  await new Promise(r => setTimeout(r, 2000));

  const theme = THEMES.find(t => t.id === themeId);
  const themeName = theme ? theme.name : themeId.toUpperCase();
  const themeImage = theme ? theme.image : THEMES[0].image;

  const titlesPerTheme: Record<ThemeId, string[]> = {
    fantasy: [
      'The Last Ember of Vel',
      'Crowns of Ash and Fire',
      'The Thornwood Oath',
      'A Kingdom of Borrowed Light',
    ],
    scifi: [
      'Signal from the Outer Dark',
      'The Meridian Protocol',
      'Voidrunner\'s Last Gambit',
      'SABLE and the Silence Between Stars',
    ],
    thriller: [
      'The Ashmore Compact',
      'Double Exposure',
      'Nineteen Months Deep',
      'The File That Walked',
    ],
    horror: [
      'What Breathes in the Walls',
      'The Fever That Sees',
      'Counting in the Dark',
      'Ashmore Lane',
    ],
    mystery: [
      'The Letter Without a Stamp',
      'Seventeen Years Cold',
      'The Forger\'s Map',
      'A Confession in Registered Mail',
    ],
  };

  const possibleTitles = titlesPerTheme[themeId];
  const title = possibleTitles[choices.length % possibleTitles.length];

  const choiceSummaries = choices
    .slice(0, 3)
    .map(c => c.optionText.split('.')[0])
    .join('; ');

  const desc =
    choices.length === 0
      ? `A ${themeName.toLowerCase()} story of unknown paths and unwritten fates.`
      : `A ${themeName.toLowerCase()} journey shaped by ${choices.length} decisive moment${choices.length === 1 ? '' : 's'}. ${choiceSummaries ? `You chose: ${choiceSummaries}.` : ''}`;

  return {
    title,
    desc,
    category: themeName,
    author: 'The Master',
    image: themeImage,
  };
}
