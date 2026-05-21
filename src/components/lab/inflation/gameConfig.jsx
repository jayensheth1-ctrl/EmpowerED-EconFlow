// ── PATH DEFINITION ───────────────────────────────────────────────────────────
// Grid is 14 cols x 10 rows. Path cells listed in order [col, row] (0-indexed).
export const GRID_COLS = 14;
export const GRID_ROWS = 10;

export const PATH_CELLS = [
  [0,4],[1,4],[2,4],[2,3],[2,2],[3,2],[4,2],[5,2],[5,3],[5,4],[5,5],[5,6],
  [6,6],[7,6],[7,5],[7,4],[7,3],[7,2],[8,2],[9,2],[10,2],[10,3],[10,4],[10,5],
  [10,6],[10,7],[11,7],[12,7],[13,7],
];

export const PATH_SET = new Set(PATH_CELLS.map(([c,r]) => `${c},${r}`));

// ── MONSTERS ──────────────────────────────────────────────────────────────────
export const MONSTER_DEFS = {
  basic:      { name:"Basic Inflator",    emoji:"📈", hp:30,  speed:0.6, dmg:1,  reward:2,  size:1,   color:"#F97316" },
  surge:      { name:"Surge",             emoji:"⚡", hp:60,  speed:1.0, dmg:2,  reward:4,  size:1,   color:"#EF4444" },
  recession:  { name:"Recession Beast",   emoji:"🐘", hp:180, speed:0.4, dmg:5,  reward:8,  size:1.4, color:"#7C3AED" },
  swarm:      { name:"Stagflation",       emoji:"🦟", hp:15,  speed:0.9, dmg:1,  reward:1,  size:0.7, color:"#F59E0B" },
  boss:       { name:"Hyperinflation",    emoji:"💀", hp:500, speed:0.7, dmg:10, reward:25, size:2,   color:"#DC2626" },
};

// ── TOWERS ────────────────────────────────────────────────────────────────────
export const TOWER_DEFS = {
  savings: {
    name:"Savings Account", emoji:"🏦", cost:10, color:"#22C55E",
    damage:4, range:2.5, fireRate:2000, // ms between shots
    upgrades:[
      { cost:20, damage:7,  range:3,   fireRate:1800, desc:"Higher interest rate" },
      { cost:30, damage:12, range:3.5, fireRate:1500, desc:"Compound interest kicks in", slow:0.3 },
    ],
  },
  bond: {
    name:"Bond Tower", emoji:"📜", cost:25, color:"#3B82F6",
    damage:10, range:3, fireRate:1500,
    bonusVs:"recession", bonusMult:2,
    upgrades:[
      { cost:50, damage:16, range:3.5, fireRate:1300, desc:"Government-backed rate hike" },
      { cost:75, damage:24, range:4,   fireRate:1100, desc:"Treasury bond: AoE burst",  aoe:true },
    ],
  },
  stock: {
    name:"Stock Market", emoji:"📊", cost:40, color:"#A855F7",
    damage:14, range:3.5, fireRate:900, misfire:0.12,
    upgrades:[
      { cost:80,  damage:22, range:4,   fireRate:750, desc:"Bull market rally" },
      { cost:120, damage:35, range:4.5, fireRate:600, desc:"IPO boom: multi-target", multi:2 },
    ],
  },
  index: {
    name:"Index Fund", emoji:"🌐", cost:60, color:"#F1C40F",
    damage:18, range:4, fireRate:1200, compound:true,
    upgrades:[
      { cost:120, damage:28, range:4.5, fireRate:1000, desc:"10-year horizon" },
      { cost:180, damage:40, range:5,   fireRate:900,  desc:"Compounding miracle", compoundBonus:0.05 },
    ],
  },
  crypto: {
    name:"Crypto Tower", emoji:"₿", cost:35, color:"#F59E0B",
    damage:20, range:3, fireRate:500, offlineChance:0.015, offlineDuration:5000,
    bonusVs:"boss", bonusMult:3,
    upgrades:[
      { cost:70,  damage:32, range:3.5, fireRate:400, desc:"DeFi protocol" },
      { cost:105, damage:50, range:4,   fireRate:350, desc:"Moonshot mode: volatile burst" },
    ],
  },
};

// ── WAVE DEFINITIONS ─────────────────────────────────────────────────────────
export function buildWave(waveNum) {
  const hp = 1 + (waveNum - 1) * 0.15;
  const sp = 1 + (waveNum - 1) * 0.05;
  const entries = [];

  function add(type, count, delay = 1200) {
    for (let i = 0; i < count; i++) {
      entries.push({ type, delay: delay * i, hpMult: hp, speedMult: sp });
    }
  }

  if (waveNum % 5 === 0) {
    // Boss wave
    add("boss", 1, 0);
    add("basic", 6 + waveNum, 1800);
    return entries;
  }

  if (waveNum === 1) { add("basic", 5); return entries; }
  if (waveNum === 2) { add("basic", 8); return entries; }
  if (waveNum === 3) { add("basic", 5, 1000); add("surge", 3, 1500); return entries; }
  if (waveNum === 4) {
    // Stagflation swarm
    add("swarm", 10, 400);
    add("surge", 4, 1200);
    return entries;
  }

  // Wave 6+: escalating mix
  const base = Math.ceil(waveNum * 0.8);
  add("basic", base, 900);
  if (waveNum >= 6)  add("surge",     Math.ceil(waveNum * 0.4), 1100);
  if (waveNum >= 7)  add("swarm",     Math.ceil(waveNum * 0.6), 500);
  if (waveNum >= 8)  add("recession", Math.max(1, Math.floor(waveNum / 4)), 2000);
  return entries;
}

export const GRADES = [
  { min:20, grade:"S", gems:15, lesson:"A diversified, long-term portfolio is the best defense against inflation. You proved it." },
  { min:15, grade:"A", gems:10, lesson:"Strong, consistent investing beats inflation in the long run. Your strategy paid off." },
  { min:10, grade:"B", gems:6,  lesson:"Inflation is persistent. Regular contributions and diversification keep it at bay." },
  { min:5,  grade:"C", gems:3,  lesson:"Inflation moves fast. Starting your investments early gives your money more time to fight back." },
  { min:0,  grade:"F", gems:0,  lesson:"Every dollar uninvested loses value to inflation. Even a savings account beats doing nothing." },
];