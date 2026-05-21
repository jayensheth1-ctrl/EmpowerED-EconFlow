import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTDEngine } from "./useTDEngine";
import { PATH_CELLS, PATH_SET, GRID_COLS, GRID_ROWS, TOWER_DEFS, GRADES } from "./gameConfig";
import { updateProgress } from "../../../lib/progressUtils";

// Cell size chosen so 14×10 grid + HUD fits without scrolling
const CELL = 26;

const TOWER_CARD_COLORS = {
  savings: "#3B82F6",
  bond:    "#22C55E",
  stock:   "#F97316",
  index:   "#F1C40F",
  crypto:  "#A855F7",
};

const TOWER_OPTIONS = [
  { type:"savings", label:"🏦", name:"Save" },
  { type:"bond",    label:"📜", name:"Bond" },
  { type:"stock",   label:"📊", name:"Stock" },
  { type:"index",   label:"🌐", name:"Index" },
  { type:"crypto",  label:"₿",  name:"Crypto" },
];

const TOWER_INFO = {
  savings: {
    desc: "A savings account keeps your money safe with a small guaranteed interest rate. No risk, slow growth.",
    special: "Reliable, never misfires. Best early defense.",
    didYouKnow: "Most savings accounts earn 1–5% per year. Not exciting, but beats cash under a mattress.",
    stats: { speed: 2, damage: 1, range: 2 },
  },
  bond: {
    desc: "Bonds are loans to governments or companies. Safer than stocks, lower returns.",
    special: "Does DOUBLE damage to Recession Beasts! Bonds hold value during downturns.",
    didYouKnow: "In 2008, government bonds were one of the few assets that actually GAINED value.",
    stats: { speed: 3, damage: 3, range: 3 },
  },
  stock: {
    desc: "Stocks are company ownership shares. They grow when companies grow — but markets are unpredictable.",
    special: "High damage but occasionally misfires — representing market volatility.",
    didYouKnow: "The market has crashed many times but has ALWAYS reached new highs over the long term.",
    stats: { speed: 5, damage: 4, range: 4 },
  },
  index: {
    desc: "An index fund invests in hundreds of companies at once. Broad market growth without stock-picking.",
    special: "Gets STRONGER every wave — just like compound interest over time.",
    didYouKnow: "Warren Buffett says a simple index fund will outperform nearly every strategy over 30 years.",
    stats: { speed: 3, damage: 4, range: 5 },
  },
  crypto: {
    desc: "Digital currency not controlled by any government. Prices can rise 1000% — or crash just as fast.",
    special: "EXTREME damage but randomly goes offline for 5 seconds — the crypto crash mechanic.",
    didYouKnow: "Bitcoin fell 80% in 2018, then rose over 1000% by 2021. High risk is not just a saying.",
    stats: { speed: 5, damage: 5, range: 3 },
  },
};

function StatBar({ label, value, max = 5, color }) {
  return (
    <div style={{ marginBottom: 3 }}>
      <div style={{ fontSize: 7, fontWeight: 700, color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>{label}</div>
      <div style={{ display:"flex", gap: 2 }}>
        {Array.from({ length: max }).map((_, i) => (
          <div key={i} style={{
            height: 5, flex: 1, borderRadius: 2,
            background: i < value ? color : "rgba(255,255,255,0.08)",
            boxShadow: i < value ? `0 0 4px ${color}88` : "none",
          }} />
        ))}
      </div>
    </div>
  );
}

function getGrade(wave) {
  for (const g of GRADES) { if (wave >= g.min) return g; }
  return GRADES[GRADES.length - 1];
}

function pileColor(pct) {
  if (pct > 0.5) return "#22C55E";
  if (pct > 0.25) return "#F1C40F";
  return "#EF4444";
}

// ── RIGHT SIDEBAR ─────────────────────────────────────────────────────────────
function TowerSidebar({ sidebarType, selectedTower, gems, sellConfirm, onClose, onUpgrade, onSellClick, onSellConfirm, onSellCancel }) {
  const displayType = selectedTower ? selectedTower.type : sidebarType;
  if (!displayType) {
    // Default state — brief guide
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 6, padding: "8px 7px" }}>
        <p style={{ fontSize: 8, fontWeight: 900, color: "rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.08em" }}>HOW TO PLAY</p>
        {[
          "📍 Tap empty cells to place towers",
          "👆 Tap a placed tower to select it",
          "💎 Earn gems by killing monsters",
          "🌈 Place all 5 types for +20% DMG",
          "⬆ Upgrade towers for more power",
          "💰 Sell towers for 60% refund",
        ].map(t => (
          <p key={t} style={{ fontSize: 8, color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>{t}</p>
        ))}
      </div>
    );
  }

  const info = TOWER_INFO[displayType];
  const def = TOWER_DEFS[displayType];
  const color = TOWER_CARD_COLORS[displayType];
  const isSelected = !!selectedTower;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${color}cc, ${color}77)`,
        padding: "6px 8px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
        borderBottom: `1px solid ${color}44`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 15 }}>{def.emoji}</span>
          <div>
            <p style={{ fontSize: 9, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>{def.name}</p>
            {isSelected ? (
              <p style={{ fontSize: 7, color: "rgba(255,255,255,0.75)" }}>
                Lv{selectedTower.level + 1}
                {selectedTower.type === "index" && selectedTower.wavesSincePlaced > 0 ? ` · ×${selectedTower.compoundMult.toFixed(1)}` : ` · DMG ${Math.round(selectedTower.damage * selectedTower.compoundMult)}`}
              </p>
            ) : (
              <p style={{ fontSize: 7, color: "rgba(255,255,255,0.75)" }}>{def.cost}💎 to place</p>
            )}
          </div>
        </div>
        <button onClick={onClose} style={{ color:"rgba(255,255,255,0.7)", fontSize:11, lineHeight:1, padding:2, background:"none", border:"none", cursor:"pointer" }}>✕</button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 7px", display: "flex", flexDirection: "column", gap: 5 }}>
        <p style={{ fontSize: 8, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{info.desc}</p>

        {/* Stat bars */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 5 }}>
          <StatBar label="⚡ SPEED"  value={info.stats.speed}  color="#06B6D4" />
          <StatBar label="💥 DAMAGE" value={info.stats.damage} color="#EF4444" />
          <StatBar label="🎯 RANGE"  value={info.stats.range}  color="#22C55E" />
        </div>

        {/* Special */}
        <div style={{ background:`${color}18`, border:`1px solid ${color}44`, borderRadius:5, padding:"4px 6px" }}>
          <p style={{ fontSize: 7, fontWeight: 900, color: color, marginBottom: 2 }}>⚡ SPECIAL</p>
          <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.35 }}>{info.special}</p>
        </div>

        {/* Did You Know */}
        <div style={{ background:"rgba(251,191,36,0.13)", border:"1px solid rgba(251,191,36,0.4)", borderLeft:"3px solid #FBBF24", borderRadius:5, padding:"4px 6px" }}>
          <p style={{ fontSize: 7, fontWeight: 900, color: "#FBBF24", marginBottom: 2 }}>💡 DID YOU KNOW</p>
          <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.35 }}>{info.didYouKnow}</p>
        </div>

        {/* Action buttons */}
        {isSelected && !sellConfirm && (
          <div style={{ display:"flex", flexDirection:"column", gap:4, marginTop:2 }}>
            <div style={{ width:"100%", height:1, background:"rgba(255,255,255,0.07)" }} />
            {selectedTower.level < 2 ? (() => {
              const upgDef = TOWER_DEFS[selectedTower.type].upgrades[selectedTower.level];
              const canAfford = gems >= upgDef.cost;
              return (
                <button onClick={onUpgrade} disabled={!canAfford} style={{
                  background: canAfford ? "linear-gradient(135deg,#22C55E,#16A34A)" : "rgba(255,255,255,0.06)",
                  color: canAfford ? "#fff" : "rgba(255,255,255,0.25)", border:"none", borderRadius:6,
                  padding:"6px 4px", fontSize:8.5, fontWeight:900, cursor:canAfford?"pointer":"not-allowed",
                  boxShadow: canAfford ? "0 0 10px #22C55E55" : "none",
                }}>⬆ Upgrade {upgDef.cost}💎</button>
              );
            })() : (
              <div style={{ background:"rgba(34,197,94,0.12)", border:"1px solid #22C55E44", borderRadius:6, padding:"5px", fontSize:8, fontWeight:900, color:"#22C55E", textAlign:"center" }}>MAX LEVEL ✅</div>
            )}
            <button onClick={onSellClick} style={{
              background:"linear-gradient(135deg,#EF4444,#B91C1C)", color:"#fff", border:"none", borderRadius:6,
              padding:"6px 4px", fontSize:8.5, fontWeight:900, cursor:"pointer",
              boxShadow:"0 0 8px #EF444444",
            }}>💰 Sell {Math.floor((selectedTower.totalSpent || def.cost) * 0.6)}💎</button>
          </div>
        )}

        {/* Sell confirm */}
        {isSelected && sellConfirm && (
          <div style={{ display:"flex", flexDirection:"column", gap:4, marginTop:2 }}>
            <p style={{ fontSize:8, fontWeight:900, color:"#EF4444", textAlign:"center" }}>Confirm sell?</p>
            <p style={{ fontSize:7.5, color:"rgba(255,255,255,0.4)", textAlign:"center" }}>Refund: {sellConfirm.refund}💎</p>
            <button onClick={onSellConfirm} style={{ background:"linear-gradient(135deg,#EF4444,#B91C1C)", color:"#fff", border:"none", borderRadius:5, padding:"5px", fontSize:8, fontWeight:900, cursor:"pointer" }}>Yes, Sell</button>
            <button onClick={onSellCancel} style={{ background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.45)", border:"none", borderRadius:5, padding:"5px", fontSize:8, cursor:"pointer" }}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function InflationInvaders({ progress, setProgress }) {
  const { stateRef, startWave, placeTower, upgradeTower, sellTower, selectTower, clearSelection, tick, startPrep, resetGame } = useTDEngine();
  const rafRef = useRef(null);
  const [renderTick, setRenderTick] = useState(0);
  const [selectedTowerType, setSelectedTowerType] = useState("savings");
  const [sidebarType, setSidebarType] = useState(null);
  const [tip, setTip] = useState(null);
  const tipTimerRef = useRef(null);
  const [sellConfirm, setSellConfirm] = useState(null);
  const [marketReport, setMarketReport] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [waveFlash, setWaveFlash] = useState(false);
  const prevPhaseRef = useRef("idle");

  const rerender = useCallback(() => setRenderTick(t => t + 1), []);

  useEffect(() => {
    function loop() {
      tick();
      const s = stateRef.current;
      if (s.pendingTip) {
        const t = s.pendingTip; s.pendingTip = null;
        setTip(t.text);
        if (tipTimerRef.current) clearTimeout(tipTimerRef.current);
        tipTimerRef.current = setTimeout(() => setTip(null), 6000);
      }
      if (s.marketReport) {
        const r = s.marketReport; s.marketReport = null;
        setMarketReport(r);
        setTimeout(() => setMarketReport(null), 7000);
      }
      rerender();
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafRef.current); if (tipTimerRef.current) clearTimeout(tipTimerRef.current); };
  }, [tick, rerender]);

  const s = stateRef.current;

  useEffect(() => {
    if (s.phase === "playing" && prevPhaseRef.current !== "playing") {
      setWaveFlash(true);
      setTimeout(() => setWaveFlash(false), 700);
    }
    prevPhaseRef.current = s.phase;
  });

  const prepStartedRef = useRef(false);
  useEffect(() => {
    if (s.phase === "prep" && !prepStartedRef.current) {
      prepStartedRef.current = true;
      startPrep(rerender);
    }
    if (s.phase !== "prep") prepStartedRef.current = false;
  });

  function handleCellClick(col, row) {
    const s = stateRef.current;
    if (PATH_SET.has(`${col},${row}`)) return;
    const existing = s.towers.find(t => t.col === col && t.row === row);
    if (existing) {
      selectTower(existing.id);
      setSidebarType(existing.type);
      rerender(); return;
    }
    if (s.phase === "gameover") return;
    if (placeTower(selectedTowerType, col, row)) { clearSelection(); rerender(); }
  }

  function handleStartWave() {
    const s = stateRef.current;
    if (s.phase === "prep") { if (s.prepTimer) { clearInterval(s.prepTimer); s.prepTimer = null; } prepStartedRef.current = false; }
    setMarketReport(null);
    startWave(); rerender();
  }

  async function handleGameOver() {
    const s = stateRef.current;
    const g = getGrade(s.wave);
    if (g.gems > 0 && progress?.id) {
      const updated = await updateProgress(progress, { gems: (progress.gems || 0) + g.gems });
      setProgress(updated);
    }
  }

  function handleReset() {
    setSellConfirm(null); setMarketReport(null); setSidebarType(null);
    resetGame(); rerender();
  }

  function handleSellClick() {
    const t = selectedTower; if (!t) return;
    setSellConfirm({ towerId: t.id, refund: Math.floor((t.totalSpent || TOWER_DEFS[t.type].cost) * 0.6), towerName: TOWER_DEFS[t.type].name });
  }

  function handleSellConfirm() {
    if (!sellConfirm) return;
    sellTower(sellConfirm.towerId);
    setSellConfirm(null); setSidebarType(null); rerender();
  }

  const selectedTower = s.selectedTowerId ? s.towers.find(t => t.id === s.selectedTowerId) : null;
  const pct = s.pileHp / s.pileMaxHp;
  const pilePulse = pct <= 0.25;
  const boardW = GRID_COLS * CELL;
  const boardH = GRID_ROWS * CELL;

  function buildPortfolioSummary(towers) {
    const byType = {};
    towers.forEach(t => {
      if (!byType[t.type]) byType[t.type] = { damage: 0, spent: 0 };
      byType[t.type].damage += t.damageDealt || 0;
      byType[t.type].spent += t.totalSpent || TOWER_DEFS[t.type].cost;
    });
    const sorted = Object.entries(byType).sort((a, b) => b[1].damage - a[1].damage);
    const bestEff = sorted.reduce((prev, cur) => {
      return (cur[1].spent > 0 ? cur[1].damage / cur[1].spent : 0) > (prev[1].spent > 0 ? prev[1].damage / prev[1].spent : 0) ? cur : prev;
    }, sorted[0] || ["", { damage: 0, spent: 1 }]);
    const realLifeMap = {
      index:"Low-cost index funds consistently outperform actively managed funds over 20+ years.",
      bond:"Bonds are the backbone of a defensive portfolio — stability when everything else falls.",
      savings:"A savings account is the foundation of any portfolio. Safety first, growth second.",
      stock:"Individual stocks can generate huge returns, but diversification protects when they don't.",
      crypto:"Crypto shows huge upside — always size your position based on what you can afford to lose.",
    };
    return { sorted, bestEff, realLifeMap };
  }

  // ── GAME OVER ──────────────────────────────────────────────────────────────
  if (s.phase === "gameover") {
    const g = getGrade(s.wave);
    const { sorted, bestEff, realLifeMap } = buildPortfolioSummary(s.towers);
    const gc = g.grade==="S"?"#F1C40F":g.grade==="A"?"#22C55E":g.grade==="B"?"#3B82F6":g.grade==="C"?"#F97316":"#EF4444";
    const names = { savings:"Savings",bond:"Bond",stock:"Stock",index:"Index Fund",crypto:"Crypto" };
    const emojis = { savings:"🏦",bond:"📜",stock:"📊",index:"🌐",crypto:"₿" };
    return (
      <div className="flex flex-col items-center gap-3 py-2 text-center">
        <motion.div animate={{ scale:[1,1.2,1],rotate:[0,10,-10,0] }} transition={{ duration:0.8 }} style={{ fontSize:44 }}>💸</motion.div>
        <div>
          <p style={{ fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.1em" }}>VAULT DESTROYED</p>
          <h2 style={{ fontSize:20,fontWeight:900,color:"#fff",marginTop:2 }}>Wave {s.wave} Reached</h2>
        </div>
        <div style={{ width:"100%",background:`${gc}12`,border:`2px solid ${gc}55`,borderRadius:16,padding:"14px 16px" }}>
          <p style={{ fontSize:52,fontWeight:900,color:gc,lineHeight:1 }}>{g.grade}</p>
          <p style={{ fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:6,lineHeight:1.4 }}>{g.lesson}</p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,width:"100%" }}>
          <div style={{ background:"rgba(255,255,255,0.05)",borderRadius:10,padding:"10px 8px",textAlign:"center" }}>
            <p style={{ fontSize:18,fontWeight:900,color:"#fff" }}>{s.monstersKilled}</p>
            <p style={{ fontSize:9,color:"rgba(255,255,255,0.4)" }}>Defeated</p>
          </div>
          <div style={{ background:"rgba(241,196,15,0.1)",borderRadius:10,padding:"10px 8px",textAlign:"center" }}>
            <p style={{ fontSize:18,fontWeight:900,color:"#F1C40F" }}>+{g.gems}💎</p>
            <p style={{ fontSize:9,color:"rgba(255,255,255,0.4)" }}>Earned</p>
          </div>
        </div>
        {sorted.length > 0 && (
          <div style={{ width:"100%",background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.3)",borderRadius:10,padding:"10px 12px",textAlign:"left" }}>
            <p style={{ fontSize:9,fontWeight:900,color:"#818CF8",marginBottom:8,textTransform:"uppercase" }}>📊 Portfolio Performance</p>
            {sorted.map(([type,stats]) => (
              <div key={type} style={{ display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:10 }}>
                <span style={{ fontWeight:700,color:"#fff" }}>{emojis[type]} {names[type]}</span>
                <span style={{ color:"rgba(255,255,255,0.45)" }}>{stats.damage} dmg · {stats.spent}💎</span>
              </div>
            ))}
            {bestEff?.[0] && <p style={{ fontSize:9,color:"rgba(255,255,255,0.5)",marginTop:6,lineHeight:1.4 }}><span style={{ color:"#818CF8",fontWeight:900 }}>Best ROI: {emojis[bestEff[0]]} {names[bestEff[0]]}. </span>{realLifeMap[bestEff[0]]}</p>}
          </div>
        )}
        <button onClick={() => { handleGameOver(); handleReset(); }}
          style={{ width:"100%",padding:"12px",borderRadius:14,fontWeight:900,fontSize:13,background:"linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary)/0.7))",color:"#fff",border:"none",cursor:"pointer",boxShadow:"0 0 20px hsl(var(--primary)/0.4)" }}>
          🔁 Play Again
        </button>
      </div>
    );
  }

  // ── IDLE ───────────────────────────────────────────────────────────────────
  if (s.phase === "idle") {
    return (
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <motion.div animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity, duration:2.5 }} style={{ fontSize:48 }}>🛡️</motion.div>
        <div>
          <h2 style={{ fontSize:20,fontWeight:900,color:"#fff" }}>Inflation Invaders</h2>
          <p style={{ fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2 }}>Defend your money pile from rising prices!</p>
        </div>
        <div style={{ width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"10px 12px",textAlign:"left" }}>
          <p style={{ fontSize:9,fontWeight:900,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",marginBottom:6 }}>How to play</p>
          {["📍 Tap empty grid squares to place investment towers","👾 Monsters march along the neon road to your vault","💎 Start with 80 gems — earn more by killing monsters","📈 Index Fund towers grow stronger every wave (compound)","🌈 All 5 tower types active = +20% Diversification Bonus","💰 Tap any placed tower to upgrade or sell it"].map(t => (
            <p key={t} style={{ fontSize:10,color:"rgba(255,255,255,0.55)",marginBottom:3,lineHeight:1.4 }}>{t}</p>
          ))}
        </div>
        <div style={{ display:"flex",gap:8,width:"100%" }}>
          {TOWER_OPTIONS.map(t => {
            const c = TOWER_CARD_COLORS[t.type];
            return (
              <div key={t.type} style={{ flex:1,background:`${c}18`,border:`2px solid ${c}55`,borderRadius:10,padding:"8px 4px",textAlign:"center",position:"relative",boxShadow:`0 0 8px ${c}22` }}>
                <div style={{ fontSize:18 }}>{t.label}</div>
                <p style={{ fontSize:7,fontWeight:900,color:c }}>{t.name}</p>
                <div style={{ position:"absolute",top:-4,right:-4,background:c,borderRadius:99,fontSize:6,fontWeight:900,color:"#000",padding:"1px 3px",boxShadow:`0 0 5px ${c}` }}>{TOWER_DEFS[t.type].cost}💎</div>
              </div>
            );
          })}
        </div>
        <button onClick={handleStartWave}
          style={{ width:"100%",padding:"14px",borderRadius:16,fontWeight:900,fontSize:14,background:"linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary)/0.7))",color:"#fff",border:"none",cursor:"pointer",boxShadow:"0 0 24px hsl(var(--primary)/0.4)" }}>
          START GAME ▶
        </button>
      </div>
    );
  }

  // ── MAIN GAME — TWO-COLUMN LAYOUT ─────────────────────────────────────────
  const showSidebar = !!(sidebarType || selectedTower);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4, userSelect:"none", touchAction:"none" }}>

      {/* Wave flash overlay */}
      <AnimatePresence>
        {waveFlash && (
          <motion.div key="flash" initial={{ opacity:0.5 }} animate={{ opacity:0 }} exit={{ opacity:0 }} transition={{ duration:0.7 }}
            style={{ position:"fixed",inset:0,background:"rgba(255,200,0,0.2)",zIndex:999,pointerEvents:"none" }} />
        )}
      </AnimatePresence>

      {/* ── HUD ROW ── */}
      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
        {/* Wave badge */}
        <motion.div animate={waveFlash ? { scale:[1.2,1] } : {}}
          style={{
            padding:"4px 8px", borderRadius:7, fontSize:9, fontWeight:900, flexShrink:0,
            background: s.phase==="playing" ? "rgba(239,68,68,0.2)" : s.phase==="prep" ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
            border:`1px solid ${s.phase==="playing"?"#EF4444":s.phase==="prep"?"#22C55E":"rgba(255,255,255,0.1)"}`,
            color: s.phase==="playing" ? "#EF4444" : s.phase==="prep" ? "#22C55E" : "#fff",
          }}>
          {s.phase==="playing" ? `⚔️ Wave ${s.wave}` : s.phase==="prep" ? `⏳ ${s.prepCountdown}s` : `🌊 W${s.wave}`}
        </motion.div>

        {/* HP bar */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:8, fontWeight:700, color:pileColor(pct) }}>
            <span>{pct>0.5?"💰":pct>0.25?"😰":"💀"} Vault</span>
            <span>{s.pileHp}/{s.pileMaxHp}</span>
          </div>
          <motion.div style={{ height:6, borderRadius:99, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.08)", overflow:"hidden" }}
            animate={pilePulse ? { boxShadow:["0 0 0 #EF444400","0 0 10px #EF4444aa","0 0 0 #EF444400"] } : {}} transition={{ repeat:Infinity, duration:0.6 }}>
            <motion.div style={{ height:"100%", borderRadius:99, background:pct>0.5?"linear-gradient(90deg,#22C55E,#16A34A)":pct>0.25?"linear-gradient(90deg,#F1C40F,#D97706)":"linear-gradient(90deg,#EF4444,#B91C1C)" }}
              animate={{ width:`${pct*100}%` }} transition={{ duration:0.3 }} />
          </motion.div>
        </div>

        {/* Gems */}
        <div style={{ padding:"4px 7px", borderRadius:7, fontSize:9, fontWeight:900, color:"#F1C40F", background:"rgba(241,196,15,0.12)", border:"1px solid rgba(241,196,15,0.4)", flexShrink:0 }}>
          💎{s.gems}
        </div>

        {s.divBonus && (
          <motion.div animate={{ scale:[1,1.1,1] }} transition={{ repeat:Infinity, duration:1.5 }}
            style={{ padding:"3px 5px", borderRadius:5, fontSize:8, fontWeight:900, color:"#F1C40F", background:"rgba(241,196,15,0.18)", border:"1px solid #F1C40F77", flexShrink:0 }}>
            ✨
          </motion.div>
        )}
      </div>

      {/* Prep countdown bar */}
      <AnimatePresence>
        {s.phase === "prep" && (
          <motion.div key="prepbar" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ height:3, borderRadius:99, background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
            <motion.div style={{ height:"100%", background:"linear-gradient(90deg,#22C55E,#16A34A)", borderRadius:99, originX:0 }}
              animate={{ scaleX: s.prepCountdown / 20 }} transition={{ duration:0.9, ease:"linear" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wave action button */}
      {s.phase === "prep" && (
        <button onClick={handleStartWave} style={{ width:"100%",padding:"7px",borderRadius:10,fontWeight:900,fontSize:11,background:"linear-gradient(135deg,#22C55E,#16A34A)",color:"#fff",border:"none",cursor:"pointer",boxShadow:"0 0 12px #22C55E44" }}>
          ▶ Launch Wave {s.wave + 1}
        </button>
      )}
      {s.phase === "playing" && (
        <div style={{ width:"100%",padding:"6px",borderRadius:10,fontWeight:900,fontSize:10,textAlign:"center",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.3)",color:"#EF4444" }}>
          ⚔️ Wave {s.wave} in progress…
        </div>
      )}

      {/* Edu tip */}
      <AnimatePresence>
        {tip && (
          <motion.div key="tip" initial={{ x:"100%",opacity:0 }} animate={{ x:0,opacity:1 }} exit={{ x:"100%",opacity:0 }}
            style={{ borderRadius:8,padding:"5px 9px",fontSize:9,fontWeight:700,lineHeight:1.4,background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.4)",color:"#818CF8" }}>
            {tip}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Market Report */}
      <AnimatePresence>
        {marketReport && (
          <motion.div key="report" initial={{ y:-12,opacity:0 }} animate={{ y:0,opacity:1 }} exit={{ y:-12,opacity:0 }}
            style={{ borderRadius:8,padding:"5px 9px",background:"rgba(241,196,15,0.09)",border:"1.5px solid rgba(241,196,15,0.4)" }}>
            <p style={{ fontSize:8,fontWeight:900,color:"#F1C40F",marginBottom:2,textTransform:"uppercase" }}>📰 Market Report — Wave {marketReport.wave}</p>
            <p style={{ fontSize:9,color:"rgba(255,255,255,0.65)",lineHeight:1.4 }}>{marketReport.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOWER CARD BAR + GAME AREA (two columns) ── */}
      <div style={{ display:"flex", gap:6, alignItems:"flex-start" }}>

        {/* LEFT: Tower bar + Grid */}
        <div style={{ display:"flex", flexDirection:"column", gap:4, minWidth:0 }}>

          {/* Tower picker — all 5 in a row, compact */}
          <div style={{ display:"flex", gap:4 }}>
            {TOWER_OPTIONS.map(opt => {
              const def = TOWER_DEFS[opt.type];
              const c = TOWER_CARD_COLORS[opt.type];
              const canAfford = s.gems >= def.cost;
              const active = selectedTowerType === opt.type && !selectedTower;
              const showingInfo = sidebarType === opt.type && !selectedTower;
              return (
                <motion.button
                  key={opt.type}
                  whileTap={{ scale:0.88 }}
                  onClick={() => {
                    setSelectedTowerType(opt.type); clearSelection(); rerender();
                    setSidebarType(st => st === opt.type ? null : opt.type);
                  }}
                  style={{
                    flex:1, display:"flex", flexDirection:"column", alignItems:"center",
                    paddingTop:7, paddingBottom:5, borderRadius:9, position:"relative",
                    background: active ? `${c}28` : "rgba(255,255,255,0.04)",
                    border:`2px solid ${active||showingInfo ? c : canAfford ? c+"44" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: active ? `0 0 12px ${c}66` : "none",
                    opacity: canAfford ? 1 : 0.4,
                    cursor:"pointer", transition:"all 0.15s",
                  }}>
                  {/* Gem badge */}
                  <div style={{ position:"absolute", top:-5, right:-5, background:c, borderRadius:99, padding:"1px 3px", fontSize:6.5, fontWeight:900, color:"#000", minWidth:16, textAlign:"center", boxShadow:`0 0 5px ${c}` }}>
                    {def.cost}💎
                  </div>
                  <span style={{ fontSize:16, lineHeight:1, marginBottom:2 }}>{opt.label}</span>
                  <span style={{ fontSize:7.5, fontWeight:900, color:active ? c : "rgba(255,255,255,0.5)" }}>{opt.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Game grid */}
          <div style={{ borderRadius:10, overflow:"hidden", border:"1px solid rgba(255,255,255,0.09)", background:"#060a11", boxShadow:"0 0 30px rgba(0,0,0,0.5)" }}>
            <div style={{ width:boardW, height:boardH, position:"relative", flexShrink:0 }}>

              {/* Grid cells */}
              {Array.from({ length:GRID_ROWS }).map((_,row) =>
                Array.from({ length:GRID_COLS }).map((_,col) => {
                  const isPath = PATH_SET.has(`${col},${row}`);
                  const endCell = PATH_CELLS[PATH_CELLS.length-1];
                  const isEnd = col===endCell[0] && row===endCell[1];
                  const isStart = col===PATH_CELLS[0][0] && row===PATH_CELLS[0][1];
                  const tower = s.towers.find(t => t.col===col && t.row===row);
                  const towerDef = tower ? TOWER_DEFS[tower.type] : null;
                  const towerColor = tower ? TOWER_CARD_COLORS[tower.type] : null;
                  const isSelTower = tower && s.selectedTowerId === tower.id;
                  const isHovered = hoveredCell && hoveredCell[0]===col && hoveredCell[1]===row;
                  const canPlace = !isPath && !tower && !isEnd && s.phase !== "gameover";

                  let bg = "#0b101c";
                  if (isPath) bg = "#0e2040";
                  if (isEnd) bg = "rgba(241,196,15,0.16)";
                  if (isStart) bg = "rgba(239,68,68,0.16)";
                  if (isHovered && canPlace) bg = "rgba(34,197,94,0.16)";

                  const pathBorderColor = "rgba(0,180,255,0.2)";
                  const cellBorderColor = "rgba(255,255,255,0.035)";

                  return (
                    <div key={`${col},${row}`}
                      onClick={() => handleCellClick(col, row)}
                      onMouseEnter={() => { if (!isPath && !tower) setHoveredCell([col,row]); }}
                      onMouseLeave={() => setHoveredCell(null)}
                      style={{
                        position:"absolute", left:col*CELL, top:row*CELL, width:CELL, height:CELL,
                        background:bg,
                        borderRight:`1px solid ${isPath ? pathBorderColor : cellBorderColor}`,
                        borderBottom:`1px solid ${isPath ? pathBorderColor : cellBorderColor}`,
                        cursor: isPath ? "default" : "pointer",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        boxSizing:"border-box",
                        boxShadow: isPath ? "inset 0 0 8px rgba(0,140,255,0.12)" : isHovered&&canPlace ? "inset 0 0 10px rgba(34,197,94,0.3)" : "none",
                      }}>

                      {/* Path glow line */}
                      {isPath && !isEnd && !isStart && (
                        <div style={{ width:"70%", height:2, background:"rgba(0,180,255,0.35)", borderRadius:1, boxShadow:"0 0 4px rgba(0,180,255,0.5)" }} />
                      )}

                      {/* Placeable hint dot */}
                      {!isPath && !tower && !isEnd && !isHovered && (
                        <div style={{ width:5, height:5, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.07)" }} />
                      )}

                      {/* Hover placement indicator */}
                      {isHovered && canPlace && (
                        <div style={{ width:CELL-6, height:CELL-6, border:"2px solid rgba(34,197,94,0.7)", borderRadius:5, boxShadow:"0 0 8px rgba(34,197,94,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, opacity:0.6 }}>
                          {TOWER_OPTIONS.find(o=>o.type===selectedTowerType)?.label}
                        </div>
                      )}

                      {/* End vault */}
                      {isEnd && <span style={{ fontSize:CELL*0.55 }}>🏦</span>}

                      {/* Start arrow */}
                      {isStart && !isEnd && <span style={{ fontSize:10, opacity:0.6 }}>➡</span>}

                      {/* Tower */}
                      {tower && (
                        <div style={{
                          position:"relative", display:"flex", alignItems:"center", justifyContent:"center",
                          width:CELL-4, height:CELL-4, borderRadius:6,
                          background: isSelTower ? `${towerColor}44` : `${towerColor}1c`,
                          border:`2px solid ${isSelTower ? towerColor : towerColor+"66"}`,
                          boxShadow: isSelTower ? `0 0 14px ${towerColor}99` : s.divBonus ? `0 0 7px rgba(241,196,15,0.5)` : `0 0 5px ${towerColor}33`,
                          transition:"box-shadow 0.2s",
                        }}>
                          <span style={{ fontSize:12, lineHeight:1 }}>{towerDef.emoji}</span>
                          {tower.level > 0 && (
                            <div style={{ position:"absolute", bottom:-3, right:-3, background:towerColor, borderRadius:99, width:9, height:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:5.5, fontWeight:900, color:"#000", boxShadow:`0 0 4px ${towerColor}` }}>
                              {tower.level===1?"★":"✦"}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {/* Range ring */}
              {selectedTower && (() => {
                const r = selectedTower.range * CELL;
                const cx = selectedTower.col * CELL + CELL/2;
                const cy = selectedTower.row * CELL + CELL/2;
                const c = TOWER_CARD_COLORS[selectedTower.type];
                return (
                  <svg style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"visible" }} width={boardW} height={boardH}>
                    <circle cx={cx} cy={cy} r={r} fill={`${c}06`} stroke={`${c}55`} strokeWidth={1.5} strokeDasharray="4 3" />
                  </svg>
                );
              })()}

              {/* Projectiles */}
              {s.projectiles.map(p => {
                const sx=p.fromCol*CELL+CELL/2, sy=p.fromRow*CELL+CELL/2;
                const ex=p.toX*CELL+CELL/2, ey=p.toY*CELL+CELL/2;
                const age=(Date.now()-p.born)/250;
                const px2=sx+(ex-sx)*age, py2=sy+(ey-sy)*age;
                return <div key={p.id} style={{ position:"absolute",left:px2-4,top:py2-4,width:7,height:7,borderRadius:"50%",background:p.color,boxShadow:`0 0 8px ${p.color},0 0 3px #fff`,pointerEvents:"none" }} />;
              })}

              {/* Monsters */}
              {s.monsters.map(m => {
                const mx=m.x*CELL+CELL/2, my=m.y*CELL+CELL/2;
                const sz=m.def.size*18;
                const hpPct=m.hp/m.maxHp;
                const isFlashing=Date.now()-m.hitFlash<120;
                return (
                  <div key={m.id} style={{ position:"absolute",left:mx-sz/2-5,top:my-sz/2-11,pointerEvents:"none" }}>
                    <div style={{ width:sz+10,height:4,background:"rgba(0,0,0,0.75)",borderRadius:3,marginBottom:2,border:"1px solid rgba(255,255,255,0.12)" }}>
                      <div style={{ width:`${hpPct*100}%`,height:"100%",borderRadius:3,
                        background:hpPct>0.5?"linear-gradient(90deg,#22C55E,#16A34A)":hpPct>0.25?"linear-gradient(90deg,#F1C40F,#D97706)":"linear-gradient(90deg,#EF4444,#B91C1C)",
                        boxShadow:hpPct>0.5?"0 0 4px #22C55E":hpPct>0.25?"0 0 4px #F1C40F":"0 0 4px #EF4444",
                        transition:"width 0.1s",
                      }} />
                    </div>
                    <div style={{ fontSize:sz,lineHeight:1,filter:isFlashing?"brightness(4) saturate(0)":"none",transition:"filter 0.08s" }}>{m.def.emoji}</div>
                  </div>
                );
              })}

              {/* Particles */}
              {s.particles.map(p => {
                const age=(Date.now()-p.born)/600;
                return <div key={p.id} style={{ position:"absolute",left:p.x*CELL,top:p.y*CELL-age*32,opacity:1-age,fontSize:12,pointerEvents:"none",fontWeight:900,color:p.color,textShadow:`0 0 8px ${p.color}` }}>{p.text}</div>;
              })}

              {/* Gem floats */}
              {s.gemFloats.map(g => {
                const age=(Date.now()-g.born)/1200;
                return <div key={g.id} style={{ position:"absolute",left:g.x*CELL,top:g.y*CELL-age*26-8,opacity:1-age,fontSize:9,pointerEvents:"none",fontWeight:900,color:"#F1C40F",textShadow:"0 0 6px #F1C40F" }}>+{g.amount}💎</div>;
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"2px 10px" }}>
            {[["📈","Inflator","#F97316"],["⚡","Surge","#EF4444"],["🐘","Recession","#7C3AED"],["🦟","Swarm","#F59E0B"],["💀","Boss","#DC2626"]].map(([e,l,c]) => (
              <span key={l} style={{ fontSize:8,fontWeight:700,color:c }}>{e} {l}</span>
            ))}
          </div>
        </div>

        {/* RIGHT: Info sidebar */}
        <div style={{
          width: 112,
          flexShrink: 0,
          alignSelf: "stretch",
          borderRadius: 10,
          background: "rgba(8,12,20,0.95)",
          border: `1.5px solid ${showSidebar && (selectedTower || sidebarType) ? TOWER_CARD_COLORS[selectedTower?.type || sidebarType] + "66" : "rgba(255,255,255,0.08)"}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          minHeight: boardH + 4,
          transition: "border-color 0.3s",
        }}>
          <TowerSidebar
            sidebarType={sidebarType}
            selectedTower={selectedTower}
            gems={s.gems}
            sellConfirm={sellConfirm}
            onClose={() => { setSidebarType(null); clearSelection(); setSellConfirm(null); rerender(); }}
            onUpgrade={() => { upgradeTower(selectedTower.id); rerender(); }}
            onSellClick={handleSellClick}
            onSellConfirm={handleSellConfirm}
            onSellCancel={() => setSellConfirm(null)}
          />
        </div>
      </div>

      {/* Wave forecast (prep) — below the game columns */}
      <AnimatePresence>
        {s.phase === "prep" && s.wavePreview && (
          <motion.div key="forecast" initial={{ opacity:0,y:4 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
            style={{ borderRadius:8,padding:"5px 9px",background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.3)" }}>
            <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:2 }}>
              <p style={{ fontSize:8,fontWeight:900,color:"#60A5FA",textTransform:"uppercase" }}>📡 Wave {s.wavePreview.wave} Forecast</p>
              <span style={{ fontSize:12 }}>{s.wavePreview.emojis.join("")}</span>
            </div>
            <p style={{ fontSize:9,color:"rgba(255,255,255,0.55)",lineHeight:1.4 }}>{s.wavePreview.forecast}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}