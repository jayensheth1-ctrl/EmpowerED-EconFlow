import { useRef, useCallback } from "react";
import { PATH_CELLS, MONSTER_DEFS, TOWER_DEFS, buildWave, GRID_COLS, GRID_ROWS } from "./gameConfig";

// Core game engine hook — manages game state via refs for 60fps loop
// Returns { stateRef, startWave, placeTower, upgradeTower, selectTower, tick }

let _id = 0;
const uid = () => ++_id;

function createMonster(type, hpMult = 1, speedMult = 1) {
  const def = MONSTER_DEFS[type];
  return {
    id: uid(),
    type,
    def,
    hp: Math.round(def.hp * hpMult),
    maxHp: Math.round(def.hp * hpMult),
    speed: def.speed * speedMult,
    pathIndex: 0,
    x: PATH_CELLS[0][0],
    y: PATH_CELLS[0][1],
    dead: false,
    reached: false,
    slowUntil: 0,
    hitFlash: 0,
  };
}

function createTower(type, col, row) {
  const def = TOWER_DEFS[type];
  return {
    id: uid(),
    type,
    def,
    col, row,
    level: 0,
    damage: def.damage,
    range: def.range,
    fireRate: def.fireRate,
    lastShot: 0,
    offlineUntil: 0,
    wavesSincePlaced: 0,
    compoundMult: 1,
    totalSpent: def.cost, // tracks gems spent for sell refund
    damageDealt: 0,       // for performance summary
  };
}

export function useTDEngine() {
  const stateRef = useRef({
    phase: "idle",        // idle | prep | playing | gameover
    wave: 0,
    pileHp: 20,
    pileMaxHp: 20,
    gems: 80,
    monsters: [],
    towers: [],
    projectiles: [],
    particles: [],
    gemFloats: [],
    spawnQueue: [],
    selectedTowerId: null,
    monstersKilled: 0,
    prepCountdown: 0,
    prepTimer: null,
    waveComplete: false,
    divBonus: false,
    eduTips: new Set(),
    pendingTip: null,
    waveGemsBonus: false,
    indexFundWaveTracker: 0,
    // Learning moments
    totalGemsEarned: 0,
    gemsEarnedAtStart: 80,
    milestones: new Set(),   // fired milestone keys
    marketReport: null,      // post-wave report object
    wavePreview: null,       // next wave enemy preview
    // Wave stat tracking
    waveStats: { byType: {}, monstersThrough: 0, divBonusActive: false },
  });

  // ── Helpers ────────────────────────────────────────────────────────────────

  function getEffDamage(tower) {
    const s = stateRef.current;
    let dmg = tower.damage * tower.compoundMult;
    if (s.divBonus) dmg *= 1.2;
    return dmg;
  }

  function checkDivBonus() {
    const s = stateRef.current;
    const types = new Set(s.towers.map(t => t.type));
    s.divBonus = types.has("savings") && types.has("bond") && types.has("stock") && types.has("index") && types.has("crypto");
    if (s.divBonus && !s.eduTips.has("div")) {
      s.eduTips.add("div");
      s.pendingTip = { key:"div", text:"💡 Diversification means spreading your investments. When one struggles, others pick up the slack." };
    }
  }

  function spawnParticle(x, y, text, color) {
    stateRef.current.particles.push({ id: uid(), x, y, text, color, born: Date.now() });
  }

  function spawnGemFloat(x, y, amount) {
    stateRef.current.gemFloats.push({ id: uid(), x, y, amount, born: Date.now() });
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  const startWave = useCallback(() => {
    const s = stateRef.current;
    if (s.phase === "playing") return;
    if (s.prepTimer) { clearInterval(s.prepTimer); s.prepTimer = null; }

    s.wave += 1;
    s.phase = "playing";
    s.waveComplete = false;
    s.waveGemsBonus = false;
    s.marketReport = null;
    s.waveStats = { byType: {}, monstersThrough: 0, divBonusActive: s.divBonus };

    // Index fund: tick wave counter for compound
    s.towers.forEach(t => {
      if (t.type === "index") {
        t.wavesSincePlaced += 1;
        const def2 = TOWER_DEFS.index.upgrades[1];
        if (t.level === 2 && def2.compoundBonus) {
          t.compoundMult = 1 + def2.compoundBonus * t.wavesSincePlaced;
        } else {
          t.compoundMult = 1 + 0.02 * t.wavesSincePlaced;
        }
      }
    });

    // Every 5 waves bonus
    if (s.wave > 1 && s.wave % 5 === 0) {
      s.gems += 15;
    }

    // Boss tip
    if (s.wave % 5 === 0 && !s.eduTips.has("boss")) {
      s.eduTips.add("boss");
      s.pendingTip = { key:"boss", text:"💡 Hyperinflation is every saver's nightmare. Only strong consistent investment survives it." };
    }

    // Build spawn queue
    const entries = buildWave(s.wave);
    const now = Date.now();
    s.spawnQueue = entries.map(e => ({
      ...e,
      spawnAt: now + e.delay + 500,
    }));
  }, []);

  const placeTower = useCallback((type, col, row) => {
    const s = stateRef.current;
    const def = TOWER_DEFS[type];
    if (!def || s.gems < def.cost) return false;
    if (s.towers.some(t => t.col === col && t.row === row)) return false;

    s.gems -= def.cost;
    const tower = createTower(type, col, row);
    s.towers.push(tower);
    checkDivBonus();

    if (type === "index" && !s.eduTips.has("index")) {
      s.eduTips.add("index");
      s.pendingTip = { key:"index", text:"💡 Index funds grow stronger over time. Just like compound interest." };
    }
    return true;
  }, []);

  const sellTower = useCallback((towerId) => {
    const s = stateRef.current;
    const tower = s.towers.find(t => t.id === towerId);
    if (!tower) return 0;
    const refund = Math.floor(tower.totalSpent * 0.6);
    const hadDivBonus = s.divBonus;
    s.towers = s.towers.filter(t => t.id !== towerId);
    s.selectedTowerId = null;
    checkDivBonus();
    s.gems += refund;
    if (hadDivBonus && !s.divBonus) {
      s.pendingTip = { key:"divlost", text:"⚠️ Diversification bonus lost. You need all 5 tower types active to keep it." };
    }
    return { refund, lostDiv: hadDivBonus && !s.divBonus };
  }, []);

  const upgradeTower = useCallback((towerId) => {
    const s = stateRef.current;
    const tower = s.towers.find(t => t.id === towerId);
    if (!tower || tower.level >= 2) return false;
    const upgDef = TOWER_DEFS[tower.type].upgrades[tower.level];
    if (!upgDef || s.gems < upgDef.cost) return false;
    s.gems -= upgDef.cost;
    tower.totalSpent = (tower.totalSpent || 0) + upgDef.cost;
    tower.level += 1;
    tower.damage = upgDef.damage;
    tower.range = upgDef.range;
    tower.fireRate = upgDef.fireRate;
    return true;
  }, []);

  const selectTower = useCallback((id) => {
    stateRef.current.selectedTowerId = stateRef.current.selectedTowerId === id ? null : id;
  }, []);

  const clearSelection = useCallback(() => {
    stateRef.current.selectedTowerId = null;
  }, []);

  // ── TICK — called every animation frame ────────────────────────────────────
  const tick = useCallback(() => {
    const s = stateRef.current;
    if (s.phase !== "playing") return;
    const now = Date.now();

    // Spawn from queue
    s.spawnQueue = s.spawnQueue.filter(entry => {
      if (now >= entry.spawnAt) {
        s.monsters.push(createMonster(entry.type, entry.hpMult, entry.speedMult));
        return false;
      }
      return true;
    });

    // Move monsters
    s.monsters.forEach(m => {
      if (m.dead || m.reached) return;
      const speed = now < m.slowUntil ? m.speed * 0.4 : m.speed;
      const nextIndex = m.pathIndex + 1;
      if (nextIndex >= PATH_CELLS.length) {
        m.reached = true;
        s.waveStats.monstersThrough = (s.waveStats.monstersThrough || 0) + 1;
        s.pileHp = Math.max(0, s.pileHp - m.def.dmg);
        if (!s.eduTips.has("pile")) {
          s.eduTips.add("pile");
          s.pendingTip = { key:"pile", text:"💡 When inflation wins, your purchasing power shrinks. That is real money disappearing." };
        }
        return;
      }
      const [tx, ty] = PATH_CELLS[nextIndex];
      const dx = tx - m.x;
      const dy = ty - m.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const step = speed * 0.016; // ~60fps, speed in cells/sec
      if (dist <= step) {
        m.x = tx; m.y = ty; m.pathIndex = nextIndex;
      } else {
        m.x += (dx/dist) * step;
        m.y += (dy/dist) * step;
      }
    });

    // Towers shoot
    s.towers.forEach(tower => {
      if (now < tower.offlineUntil) return;

      // Crypto random offline
      const def = TOWER_DEFS[tower.type];
      if (def.offlineChance && Math.random() < def.offlineChance) {
        tower.offlineUntil = now + (def.offlineDuration || 5000);
        if (!s.eduTips.has("crypto")) {
          s.eduTips.add("crypto");
          s.pendingTip = { key:"crypto", text:"💡 High reward always comes with high risk. Crypto can moon or crash without warning." };
        }
        return;
      }

      if (now - tower.lastShot < tower.fireRate) return;

      // Stock misfire
      const upgDef = tower.level > 0 ? TOWER_DEFS[tower.type].upgrades[tower.level-1] : null;
      if (def.misfire && Math.random() < def.misfire) return;

      // Find targets in range (furthest along path)
      const inRange = s.monsters.filter(m => {
        if (m.dead || m.reached) return false;
        const dx = m.x - tower.col;
        const dy = m.y - tower.row;
        return Math.sqrt(dx*dx + dy*dy) <= tower.range;
      }).sort((a,b) => b.pathIndex - a.pathIndex);

      if (!inRange.length) return;
      tower.lastShot = now;

      // Determine targets
      const numTargets = (upgDef?.multi) ? Math.min(upgDef.multi, inRange.length) : 1;
      const targets = inRange.slice(0, numTargets);

      targets.forEach(target => {
        let dmg = getEffDamage(tower);
        if (def.bonusVs && target.type === def.bonusVs && def.bonusMult) {
          dmg *= def.bonusMult;
        }
        const victims = (upgDef?.aoe) ? inRange : [target];
        victims.forEach(m => {
          const actualDmg = Math.round(dmg);
          m.hp -= actualDmg;
          m.hitFlash = now;
          // Track damage per tower type for wave stats
          s.waveStats.byType[tower.type] = (s.waveStats.byType[tower.type] || 0) + actualDmg;
          tower.damageDealt = (tower.damageDealt || 0) + actualDmg;
          if (tower.level === 2 && TOWER_DEFS[tower.type].upgrades[1]?.slow) {
            m.slowUntil = now + 2000;
          }
          s.projectiles.push({ id:uid(), fromCol:tower.col, fromRow:tower.row, toX:m.x, toY:m.y, born:now, color: TOWER_DEFS[tower.type].color });
        });
      });
    });

    // Kill dead monsters
    s.monsters.forEach(m => {
      if (!m.dead && m.hp <= 0) {
        m.dead = true;
        s.gems += m.def.reward;
        s.totalGemsEarned = (s.totalGemsEarned || 0) + m.def.reward;
        s.monstersKilled += 1;
        spawnParticle(m.x, m.y, "💥", "#fff");
        spawnGemFloat(m.x, m.y, m.def.reward);

        // Milestones
        const tge = s.totalGemsEarned;
        if (tge >= 50 && !s.milestones.has("roi")) {
          s.milestones.add("roi");
          s.pendingTip = { key:"roi", text:"📊 You just earned 50 gems from investing. In real life this is called ROI — Return on Investment." };
        }
        if (tge >= s.gemsEarnedAtStart * 2 && !s.milestones.has("double")) {
          s.milestones.add("double");
          s.pendingTip = { key:"double", text:"📈 Your in-game wealth just doubled! At 7% real-world returns, the Rule of 72 says money doubles every ~10 years." };
        }
      }
    });

    // Overextended milestone
    if (s.gems === 0 && !s.milestones.has("broke")) {
      s.milestones.add("broke");
      s.pendingTip = { key:"broke", text:"⚠️ Out of gems — overextended! In investing, always keep a cash reserve for emergencies." };
    }

    // Prune dead/reached
    s.monsters = s.monsters.filter(m => !m.dead && !m.reached);

    // Expire projectiles & particles & gemfloats
    s.projectiles = s.projectiles.filter(p => now - p.born < 250);
    s.particles = s.particles.filter(p => now - p.born < 600);
    s.gemFloats = s.gemFloats.filter(g => now - g.born < 1200);

    // Check wave end
    if (s.spawnQueue.length === 0 && s.monsters.length === 0 && !s.waveComplete) {
      s.waveComplete = true;
      if (!s.waveGemsBonus) {
        s.waveGemsBonus = true;
        s.gems += 10;
        spawnParticle(GRID_COLS / 2, GRID_ROWS / 2, "🏆 +10💎", "#F1C40F");
      }

      // Build Market Report
      const byType = s.waveStats.byType;
      const topType = Object.entries(byType).sort((a,b) => b[1]-a[1])[0];
      const monstersThrough = s.waveStats.monstersThrough;
      const divWasActive = s.waveStats.divBonusActive;
      const waveNum = s.wave;
      let reportText = "";
      if (waveNum % 5 === 0 && topType) {
        reportText = `Wave ${waveNum} Boss defeated! ${divWasActive ? "Your diversified portfolio absorbed the Hyperinflation Boss. Spreading risk is why advisors say: never put all your eggs in one basket." : `Your ${TOWER_DEFS[topType[0]]?.name || topType[0]} towers led the defence. Consistency beats volatility every time.`}`;
      } else if (topType && topType[0] === "bond") {
        reportText = `Wave ${waveNum} complete. Your Bond towers held firm. In real markets, bonds are called defensive assets — they hold value when others fall.`;
      } else if (topType && topType[0] === "index") {
        reportText = `Wave ${waveNum} complete. Your Index Fund towers did the heavy lifting. Low-cost index funds consistently outperform actively managed funds over 20+ years.`;
      } else if (topType && topType[0] === "crypto") {
        reportText = `Wave ${waveNum} complete. Crypto towers pulled big damage — when they fired. Remember: high reward always comes with high risk.`;
      } else if (topType) {
        const names = { savings:"Savings Account", bond:"Bond", stock:"Stock Market", index:"Index Fund", crypto:"Crypto" };
        reportText = `Wave ${waveNum} complete. ${names[topType[0]] || topType[0]} towers dealt the most damage${monstersThrough > 0 ? `. ${monstersThrough} monster(s) slipped through — even the best portfolios see some losses` : ""}.`;
      } else {
        reportText = `Wave ${waveNum} complete. Build more towers to defend your money pile better next wave!`;
      }
      if (monstersThrough > 0 && waveNum === 4) {
        reportText = `Wave 4 Swarm survived. The Stagflation Swarm mirrors the 1970s — high inflation, low growth. Index funds still outperformed everything long-term.`;
      }
      s.marketReport = { wave: waveNum, text: reportText };

      // Build wave preview for next wave
      const nextWave = waveNum + 1;
      const nextEntries = buildWave(nextWave);
      const nextTypes = [...new Set(nextEntries.map(e => e.type))];
      const monsterEmojis = { basic:"📈", surge:"⚡", recession:"🐘", swarm:"🦟", boss:"💀" };
      const forecastMessages = {
        boss: `Heavy Boss wave incoming! Stock up on Bond and Crypto towers — bonds counter recession, crypto bursts bosses.`,
        surge: `High Surge activity expected. Consider your Stock Market towers — high fire rate handles fast enemies well.`,
        recession: `Recession Beasts incoming — slow but deadly. Bond towers deal double damage to them!`,
        swarm: `Stagflation Swarm incoming — lots of small fast enemies. AoE and high-fire-rate towers shine here.`,
        basic: `Standard inflation wave. A balanced portfolio should handle it with ease.`,
      };
      const primaryThreat = nextTypes.includes("boss") ? "boss" : nextTypes.includes("recession") ? "recession" : nextTypes.includes("surge") ? "surge" : nextTypes.includes("swarm") ? "swarm" : "basic";
      s.wavePreview = {
        wave: nextWave,
        types: nextTypes,
        emojis: nextTypes.map(t => monsterEmojis[t] || "👾"),
        forecast: forecastMessages[primaryThreat],
      };

      // Reset wave stats for next wave
      s.waveStats = { byType: {}, monstersThrough: 0, divBonusActive: s.divBonus };

      s.phase = "prep";
      s.prepCountdown = 20;
    }

    // Game over
    if (s.pileHp <= 0) {
      s.phase = "gameover";
    }
  }, []);

  const startPrep = useCallback((onTick) => {
    const s = stateRef.current;
    s.prepCountdown = 20;
    if (s.prepTimer) clearInterval(s.prepTimer);
    s.prepTimer = setInterval(() => {
      s.prepCountdown -= 1;
      if (s.prepCountdown <= 0) {
        clearInterval(s.prepTimer);
        s.prepTimer = null;
        startWave();
      }
      onTick();
    }, 1000);
  }, [startWave]);

  const resetGame = useCallback(() => {
    const s = stateRef.current;
    if (s.prepTimer) clearInterval(s.prepTimer);
    s.phase = "idle";
    s.wave = 0;
    s.pileHp = 20;
    s.pileMaxHp = 20;
    s.gems = 80;
    s.monsters = [];
    s.towers = [];
    s.projectiles = [];
    s.particles = [];
    s.gemFloats = [];
    s.spawnQueue = [];
    s.selectedTowerId = null;
    s.monstersKilled = 0;
    s.prepCountdown = 0;
    s.prepTimer = null;
    s.waveComplete = false;
    s.divBonus = false;
    s.eduTips = new Set();
    s.pendingTip = null;
    s.waveGemsBonus = false;
    s.indexFundWaveTracker = 0;
    s.totalGemsEarned = 0;
    s.gemsEarnedAtStart = 80;
    s.milestones = new Set();
    s.marketReport = null;
    s.wavePreview = null;
    s.waveStats = { byType: {}, monstersThrough: 0, divBonusActive: false };
  }, []);

  return { stateRef, startWave, placeTower, upgradeTower, sellTower, selectTower, clearSelection, tick, startPrep, resetGame };
}