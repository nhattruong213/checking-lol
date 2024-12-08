export const PAGINATION_LIMIT = {
  XXS: 10,
  XS: 15,
  S: 20,
  M: 25,
  MD: 30,
  L: 40,
  XL: 50,
  XXL: 100,
};

export const PAGINATION_DEFAULT = {
  limit: PAGINATION_LIMIT.S,
  page: 1,
};
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? 'RGAPI-e2fabd42-5e2f-400e-bcbd-8fec716410af';
export const HOST_API = process.env.NEXT_PUBLIC_HOST_API ?? '/';

export const REAL_PATH = process.env.NEXT_PUBLIC_NOVA_RESERVE_URL;

export const drawerWidth = 260;

export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV = {
  W_VERTICAL: 280,
  W_MINI: 88,
};

export const RANK = {
  I: 'Thách đấu',
  II: 'Đại cao thủ',
  III: 'Cao thủ',
};

export const TIER: Record<
  'CHALLENGER' | 'GRANDMASTER' | 'MASTER' | 'DIAMOND' | 'EMERALD' | 'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE' | 'IRON',
  string
> = {
  CHALLENGER: 'Thách đấu',
  GRANDMASTER: 'Đại cao thủ',
  MASTER: 'Cao thủ',
  DIAMOND: 'Kim cương',
  EMERALD: 'Lục bảo',
  PLATINUM: 'Bạch kim',
  GOLD: 'Vàng',
  SILVER: 'Bạc',
  BRONZE: 'Đồng',
  IRON: 'Sắt',
};

export const QUEUE_TYPE = [
  {
    queueId: 0,
    map: 'Custom ',
    description: null,
    notes: null,
  },
  {
    queueId: 2,
    map: "Summoner's Rift",
    description: 'Blind Pick ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 430',
  },
  {
    queueId: 4,
    map: "Summoner's Rift",
    description: 'Ranked Solo ',
    notes: 'Deprecated in favor of queueId 420',
  },
  {
    queueId: 6,
    map: "Summoner's Rift",
    description: 'Ranked Premade ',
    notes: 'Game mode deprecated',
  },
  {
    queueId: 7,
    map: "Summoner's Rift",
    description: 'Co-op vs AI ',
    notes: 'Deprecated in favor of queueId 32 and 33',
  },
  {
    queueId: 8,
    map: 'Twisted Treeline',
    description: 'Normal ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 460',
  },
  {
    queueId: 9,
    map: 'Twisted Treeline',
    description: 'Ranked Flex ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 470',
  },
  {
    queueId: 14,
    map: "Summoner's Rift",
    description: 'Draft Pick ',
    notes: 'Deprecated in favor of queueId 400',
  },
  {
    queueId: 16,
    map: 'Crystal Scar',
    description: 'Dominion Blind Pick ',
    notes: 'Game mode deprecated',
  },
  {
    queueId: 17,
    map: 'Crystal Scar',
    description: 'Dominion Draft Pick ',
    notes: 'Game mode deprecated',
  },
  {
    queueId: 25,
    map: 'Crystal Scar',
    description: 'Dominion Co-op vs AI ',
    notes: 'Game mode deprecated',
  },
  {
    queueId: 31,
    map: "Summoner's Rift",
    description: 'Co-op vs AI Intro Bot ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 830',
  },
  {
    queueId: 32,
    map: "Summoner's Rift",
    description: 'Co-op vs AI Beginner Bot ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 840',
  },
  {
    queueId: 33,
    map: "Summoner's Rift",
    description: 'Co-op vs AI Intermediate Bot ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 850',
  },
  {
    queueId: 41,
    map: 'Twisted Treeline',
    description: 'Ranked Team ',
    notes: 'Game mode deprecated',
  },
  {
    queueId: 42,
    map: "Summoner's Rift",
    description: 'Ranked Team ',
    notes: 'Game mode deprecated',
  },
  {
    queueId: 52,
    map: 'Twisted Treeline',
    description: 'Co-op vs AI ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 800',
  },
  {
    queueId: 61,
    map: "Summoner's Rift",
    description: 'Team Builder ',
    notes: 'Game mode deprecated',
  },
  {
    queueId: 65,
    map: 'Howling Abyss',
    description: 'ARAM ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 450',
  },
  {
    queueId: 67,
    map: 'Howling Abyss',
    description: 'ARAM Co-op vs AI ',
    notes: 'Game mode deprecated',
  },
  {
    queueId: 70,
    map: "Summoner's Rift",
    description: 'One for All ',
    notes: 'Deprecated in patch 8.6 in favor of queueId 1020',
  },
  {
    queueId: 72,
    map: 'Howling Abyss',
    description: '1v1 Snowdown Showdown ',
    notes: null,
  },
  {
    queueId: 73,
    map: 'Howling Abyss',
    description: '2v2 Snowdown Showdown ',
    notes: null,
  },
  {
    queueId: 75,
    map: "Summoner's Rift",
    description: '6v6 Hexakill ',
    notes: null,
  },
  {
    queueId: 76,
    map: "Summoner's Rift",
    description: 'Ultra Rapid Fire ',
    notes: null,
  },
  {
    queueId: 78,
    map: 'Howling Abyss',
    description: 'One For All: Mirror Mode ',
    notes: null,
  },
  {
    queueId: 83,
    map: "Summoner's Rift",
    description: 'Co-op vs AI Ultra Rapid Fire ',
    notes: null,
  },
  {
    queueId: 91,
    map: "Summoner's Rift",
    description: 'Doom Bots Rank 1 ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 950',
  },
  {
    queueId: 92,
    map: "Summoner's Rift",
    description: 'Doom Bots Rank 2 ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 950',
  },
  {
    queueId: 93,
    map: "Summoner's Rift",
    description: 'Doom Bots Rank 5 ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 950',
  },
  {
    queueId: 96,
    map: 'Crystal Scar',
    description: 'Ascension ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 910',
  },
  {
    queueId: 98,
    map: 'Twisted Treeline',
    description: '6v6 Hexakill ',
    notes: null,
  },
  {
    queueId: 100,
    map: "Butcher's Bridge",
    description: 'ARAM ',
    notes: null,
  },
  {
    queueId: 300,
    map: 'Howling Abyss',
    description: 'Legend of the Poro King ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 920',
  },
  {
    queueId: 310,
    map: "Summoner's Rift",
    description: 'Nemesis ',
    notes: null,
  },
  {
    queueId: 313,
    map: "Summoner's Rift",
    description: 'Black Market Brawlers ',
    notes: null,
  },
  {
    queueId: 315,
    map: "Summoner's Rift",
    description: 'Nexus Siege ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 940',
  },
  {
    queueId: 317,
    map: 'Crystal Scar',
    description: 'Definitely Not Dominion ',
    notes: null,
  },
  {
    queueId: 318,
    map: "Summoner's Rift",
    description: 'ARURF ',
    notes: 'Deprecated in patch 7.19 in favor of queueId 900',
  },
  {
    queueId: 325,
    map: "Summoner's Rift",
    description: 'All Random ',
    notes: null,
  },
  {
    queueId: 400,
    map: "Summoner's Rift",
    description: 'Draft Pick ',
    notes: null,
  },
  {
    queueId: 410,
    map: "Summoner's Rift",
    description: 'Ranked Dynamic ',
    notes: 'Game mode deprecated in patch 6.22',
  },
  {
    queueId: 420,
    map: "Summoner's Rift",
    description: 'Ranked Solo ',
    notes: null,
  },
  {
    queueId: 430,
    map: "Summoner's Rift",
    description: 'Blind Pick ',
    notes: null,
  },
  {
    queueId: 440,
    map: "Summoner's Rift",
    description: 'Ranked Flex',
    notes: null,
  },
  {
    queueId: 450,
    map: 'Howling Abyss',
    description: 'ARAM ',
    notes: null,
  },
  {
    queueId: 460,
    map: 'Twisted Treeline',
    description: 'Blind Pick ',
    notes: 'Deprecated in patch 9.23',
  },
  {
    queueId: 470,
    map: 'Twisted Treeline',
    description: 'Ranked Flex ',
    notes: 'Deprecated in patch 9.23',
  },
  {
    queueId: 490,
    map: "Summoner's Rift",
    description: 'Normal (Quickplay)',
    notes: null,
  },
  {
    queueId: 600,
    map: "Summoner's Rift",
    description: 'Blood Hunt Assassin ',
    notes: null,
  },
  {
    queueId: 610,
    map: 'Cosmic Ruins',
    description: 'Dark Star: Singularity ',
    notes: null,
  },
  {
    queueId: 700,
    map: "Summoner's Rift",
    description: "Summoner's Rift Clash ",
    notes: null,
  },
  {
    queueId: 720,
    map: 'Howling Abyss',
    description: 'ARAM Clash ',
    notes: null,
  },
  {
    queueId: 800,
    map: 'Twisted Treeline',
    description: 'Co-op vs. AI Intermediate Bot ',
    notes: 'Deprecated in patch 9.23',
  },
  {
    queueId: 810,
    map: 'Twisted Treeline',
    description: 'Co-op vs. AI Intro Bot ',
    notes: 'Deprecated in patch 9.23',
  },
  {
    queueId: 820,
    map: 'Twisted Treeline',
    description: 'Co-op vs. AI Beginner Bot ',
    notes: null,
  },
  {
    queueId: 830,
    map: "Summoner's Rift",
    description: 'Co-op vs. AI Intro Bot ',
    notes: 'Deprecated in March 2024 in favor of queueId 870',
  },
  {
    queueId: 840,
    map: "Summoner's Rift",
    description: 'Co-op vs. AI Beginner Bot ',
    notes: 'Deprecated in March 2024 in favor of queueId 880',
  },
  {
    queueId: 850,
    map: "Summoner's Rift",
    description: 'Co-op vs. AI Intermediate Bot ',
    notes: 'Deprecated in March 2024 in favor of queueId 890',
  },
  {
    queueId: 870,
    map: "Summoner's Rift",
    description: 'Co-op vs. AI Intro Bot ',
    notes: null,
  },
  {
    queueId: 880,
    map: "Summoner's Rift",
    description: 'Co-op vs. AI Beginner Bot ',
    notes: null,
  },
  {
    queueId: 890,
    map: "Summoner's Rift",
    description: 'Co-op vs. AI Intermediate Bot ',
    notes: null,
  },
  {
    queueId: 900,
    map: "Summoner's Rift",
    description: 'ARURF ',
    notes: null,
  },
  {
    queueId: 910,
    map: 'Crystal Scar',
    description: 'Ascension ',
    notes: null,
  },
  {
    queueId: 920,
    map: 'Howling Abyss',
    description: 'Legend of the Poro King ',
    notes: null,
  },
  {
    queueId: 940,
    map: "Summoner's Rift",
    description: 'Nexus Siege ',
    notes: null,
  },
  {
    queueId: 950,
    map: "Summoner's Rift",
    description: 'Doom Bots Voting ',
    notes: null,
  },
  {
    queueId: 960,
    map: "Summoner's Rift",
    description: 'Doom Bots Standard ',
    notes: null,
  },
  {
    queueId: 980,
    map: 'Valoran City Park',
    description: 'Star Guardian Invasion: Normal ',
    notes: null,
  },
  {
    queueId: 990,
    map: 'Valoran City Park',
    description: 'Star Guardian Invasion: Onslaught ',
    notes: null,
  },
  {
    queueId: 1000,
    map: 'Overcharge',
    description: 'PROJECT: Hunters ',
    notes: null,
  },
  {
    queueId: 1010,
    map: "Summoner's Rift",
    description: 'Snow ARURF ',
    notes: null,
  },
  {
    queueId: 1020,
    map: "Summoner's Rift",
    description: 'One for All ',
    notes: null,
  },
  {
    queueId: 1030,
    map: 'Crash Site',
    description: 'Odyssey Extraction: Intro ',
    notes: null,
  },
  {
    queueId: 1040,
    map: 'Crash Site',
    description: 'Odyssey Extraction: Cadet ',
    notes: null,
  },
  {
    queueId: 1050,
    map: 'Crash Site',
    description: 'Odyssey Extraction: Crewmember ',
    notes: null,
  },
  {
    queueId: 1060,
    map: 'Crash Site',
    description: 'Odyssey Extraction: Captain ',
    notes: null,
  },
  {
    queueId: 1070,
    map: 'Crash Site',
    description: 'Odyssey Extraction: Onslaught ',
    notes: null,
  },
  {
    queueId: 1090,
    map: 'Convergence',
    description: 'Teamfight Tactics ',
    notes: null,
  },
  {
    queueId: 1100,
    map: 'Convergence',
    description: 'Ranked Teamfight Tactics ',
    notes: null,
  },
  {
    queueId: 1110,
    map: 'Convergence',
    description: 'Teamfight Tactics Tutorial ',
    notes: null,
  },
  {
    queueId: 1111,
    map: 'Convergence',
    description: 'Teamfight Tactics test ',
    notes: null,
  },
  {
    queueId: 1200,
    map: 'Nexus Blitz',
    description: 'Nexus Blitz ',
    notes: 'Deprecated in patch 9.2',
  },
  {
    queueId: 1210,
    map: 'Convergence',
    description: "Teamfight Tactics Choncc's Treasure Mode",
    notes: 'null',
  },
  {
    queueId: 1300,
    map: 'Nexus Blitz',
    description: 'Nexus Blitz ',
    notes: null,
  },
  {
    queueId: 1400,
    map: "Summoner's Rift",
    description: 'Ultimate Spellbook ',
    notes: null,
  },
  {
    queueId: 1700,
    map: 'Rings of Wrath',
    description: 'Arena',
    notes: null,
  },
  {
    queueId: 1710,
    map: 'Rings of Wrath',
    description: 'Arena',
    notes: '16 player lobby',
  },
  {
    queueId: 1810,
    map: 'Swarm',
    description: 'Swarm Mode Games',
    notes: 'Swarm Mode 1 player',
  },
  {
    queueId: 1820,
    map: 'Swarm Mode Games',
    description: 'Swarm',
    notes: 'Swarm Mode 2 players',
  },
  {
    queueId: 1830,
    map: 'Swarm Mode Games',
    description: 'Swarm',
    notes: 'Swarm Mode 3 players',
  },
  {
    queueId: 1840,
    map: 'Swarm Mode Games',
    description: 'Swarm',
    notes: 'Swarm Mode 4 players',
  },
  {
    queueId: 1900,
    map: "Summoner's Rift",
    description: 'Pick URF ',
    notes: null,
  },
  {
    queueId: 2000,
    map: "Summoner's Rift",
    description: 'Tutorial 1',
    notes: null,
  },
  {
    queueId: 2010,
    map: "Summoner's Rift",
    description: 'Tutorial 2',
    notes: null,
  },
  {
    queueId: 2020,
    map: "Summoner's Rift",
    description: 'Tutorial 3',
    notes: null,
  },
];

export const summonerSpell: {
  [key: string]: string;
} = {
  '21': 'SummonerBarrier.png',
  '1': 'SummonerBoost.png',
  '14': 'SummonerDot.png',
  '3': 'SummonerExhaust.png',
  '4': 'SummonerFlash.png',
  '6': 'SummonerHaste.png',
  '7': 'SummonerHeal.png',
  '13': 'SummonerMana.png',
  '30': 'SummonerPoroRecall.png',
  '31': 'SummonerPoroThrow.png',
  '11': 'SummonerSmite.png ',
  '39': 'SummonerSnowball.png',
  '32': 'SummonerSnowURFSnowball_Mark.png',
  '12': 'SummonerTeleport.png ',
  '54': 'Summoner_UltBookPlaceholder.png',
  '55': 'Summoner_UltBookSmitePlaceholder.png',
};

export const runes: {
  [key: string]: string;
} = {
  '8000': 'perk-images/Styles/7201_Precision.png',
  '8005': 'perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png',
  '8008': 'perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png',
  '8009': 'perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png',
  '8010': 'perk-images/Styles/Precision/Conqueror/Conqueror.png',
  '8014': 'perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png',
  '8017': 'perk-images/Styles/Precision/CutDown/CutDown.png',
  '8021': 'perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png',
  '8100': 'perk-images/Styles/7200_Domination.png',
  '8105': 'perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png',
  '8106': 'perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png',
  '8112': 'perk-images/Styles/Domination/Electrocute/Electrocute.png',
  '8120': 'perk-images/Styles/Domination/GhostPoro/GhostPoro.png',
  '8126': 'perk-images/Styles/Domination/CheapShot/CheapShot.png',
  '8128': 'perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png',
  '8135': 'perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png',
  '8136': 'perk-images/Styles/Domination/ZombieWard/ZombieWard.png',
  '8138': 'perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png',
  '8139': 'perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png',
  '8143': 'perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png',
  '8200': 'perk-images/Styles/7202_Sorcery.png',
  '8210': 'perk-images/Styles/Sorcery/Transcendence/Transcendence.png',
  '8214': 'perk-images/Styles/Sorcery/SummonAery/SummonAery.png',
  '8224': 'perk-images/Styles/Sorcery/NullifyingOrb/Pokeshield.png',
  '8226': 'perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png',
  '8229': 'perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png',
  '8230': 'perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png',
  '8232': 'perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png',
  '8233': 'perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png',
  '8234': 'perk-images/Styles/Sorcery/Celerity/CelerityTemp.png',
  '8236': 'perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png',
  '8237': 'perk-images/Styles/Sorcery/Scorch/Scorch.png',
  '8242': 'perk-images/Styles/Sorcery/Unflinching/Unflinching.png',
  '8275': 'perk-images/Styles/Sorcery/NimbusCloak/6361.png',
  '8299': 'perk-images/Styles/Sorcery/LastStand/LastStand.png',
  '8300': 'perk-images/Styles/7203_Whimsy.png',
  '8304': 'perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png',
  '8306': 'perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png',
  '8313': 'perk-images/Styles/Inspiration/PerfectTiming/AlchemistCabinet.png',
  '8316': 'perk-images/Styles/Inspiration/JackOfAllTrades/JackofAllTrades2.png',
  '8321': 'perk-images/Styles/Inspiration/CashBack/CashBack2.png',
  '8345': 'perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png',
  '8347': 'perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png',
  '8351': 'perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png',
  '8352': 'perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png',
  '8360': 'perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png',
  '8369': 'perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png',
  '8400': 'perk-images/Styles/7204_Resolve.png',
  '8401': 'perk-images/Styles/Resolve/MirrorShell/MirrorShell.png',
  '8410': 'perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png',
  '8429': 'perk-images/Styles/Resolve/Conditioning/Conditioning.png',
  '8437': 'perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png',
  '8439': 'perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
  '8444': 'perk-images/Styles/Resolve/SecondWind/SecondWind.png',
  '8446': 'perk-images/Styles/Resolve/Demolish/Demolish.png',
  '8451': 'perk-images/Styles/Resolve/Overgrowth/Overgrowth.png',
  '8453': 'perk-images/Styles/Resolve/Revitalize/Revitalize.png',
  '8463': 'perk-images/Styles/Resolve/FontOfLife/FontOfLife.png',
  '8465': 'perk-images/Styles/Resolve/Guardian/Guardian.png',
  '8473': 'perk-images/Styles/Resolve/BonePlating/BonePlating.png',
  '9101': 'perk-images/Styles/Precision/AbsorbLife/AbsorbLife.png',
  '9103': 'perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png',
  '9104': 'perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png',
  '9105': 'perk-images/Styles/Precision/LegendHaste/LegendHaste.png',
  '9111': 'perk-images/Styles/Precision/Triumph.png',
  '9923': 'perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png',
};

export const ACHIVEMENTS = [
  {
    id: 'firstBloodKill',
    name: 'First Blood',
  },
  {
    id: 'pentaKills',
    name: 'Penta Kills',
  },
  {
    id: 'quadraKills',
    name: 'Quadra Kills',
  },
  {
    id: 'tripleKills',
    name: 'Triple Kills',
  },
  {
    id: 'doubleKills',
    name: 'Double Kills',
  },
];

export const QUEUE_OPTIONS = [
  {
    queueId: 'all',
    map: "Summoner's Rift",
    description: 'Tất Cả Hàng Chờ',
    notes: null,
  },
  {
    queueId: 420,
    map: "Summoner's Rift",
    description: 'Đơn/Đôi',
    notes: null,
  },
  {
    queueId: 440,
    map: "Summoner's Rift",
    description: 'Linh Hoạt',
    notes: null,
  },
  {
    queueId: 430,
    map: "Summoner's Rift",
    description: 'Đánh Thường',
    notes: null,
  },
  {
    queueId: 450,
    map: 'Howling Abyss',
    description: 'ARAM ',
    notes: null,
  },
  {
    queueId: 76,
    map: "Summoner's Rift",
    description: 'URF',
    notes: null,
  },
];
