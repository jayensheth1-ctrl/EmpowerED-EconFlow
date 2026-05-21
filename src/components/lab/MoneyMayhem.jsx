import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateProgress } from "../../lib/progressUtils";
import { playClick, playWrong, playChaChig } from "../../lib/sounds";
import { buildConsequenceCards } from "../../lib/mayhemConsequences";
import ConsequencesScreen from "./ConsequencesScreen";

// ── Scenarios ────────────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: "student",
    name: "The Broke Student",
    emoji: "🎓",
    income: 1200,
    desc: "Part-time job income. Rent is brutal.",
    categories: ["Rent", "Food", "Transport", "Fun", "Savings", "Entertainment"],
    minimums: { Rent: 500, Food: 200 },
    investmentRequired: false,
  },
  {
    id: "parent",
    name: "New Parent",
    emoji: "👶",
    income: 3500,
    desc: "Childcare eats most of your budget.",
    categories: ["Rent", "Groceries", "Childcare", "Healthcare", "Savings", "Entertainment"],
    minimums: { Childcare: 800, Rent: 1000 },
    investmentRequired: false,
  },
  {
    id: "professional",
    name: "Young Professional",
    emoji: "💼",
    income: 4500,
    desc: "Loans must be paid. Invest or fail.",
    categories: ["Rent", "Food", "Loans", "Investments", "Entertainment", "Transport"],
    minimums: { Loans: 600, Investments: 1 },
    investmentRequired: true,
  },
  {
    id: "retiree",
    name: "The Retiree",
    emoji: "🧓",
    income: 2200,
    desc: "Fixed pension. Healthcare keeps rising.",
    categories: ["Housing", "Healthcare", "Food", "Leisure", "Emergency Fund", "Transport"],
    minimums: { Healthcare: 400, "Emergency Fund": 200 },
    investmentRequired: false,
  },
  {
    id: "founder",
    name: "Startup Founder",
    emoji: "🚀",
    income: 800,
    desc: "Variable income. Almost nothing left for you.",
    categories: ["Personal Rent", "Business Costs", "Food", "Marketing", "Savings", "Entertainment"],
    minimums: { "Business Costs": 300 },
    investmentRequired: false,
  },
];

// ── Round config ─────────────────────────────────────────────────────────────
const ROUND_CONFIG = [
  { round: 1, cats: 3, time: 60, slack: 100, gems: 2 },
  { round: 2, cats: 4, time: 50, slack: 75,  gems: 3 },
  { round: 3, cats: 5, time: 45, slack: 60,  gems: 4, surprise: "expense" },
  { round: 4, cats: 5, time: 35, slack: 50,  gems: 5, surprise: "income" },
  { round: 5, cats: 6, time: 30, slack: 30,  gems: 6 },
];

const ROUND_GEMS = [0, 2, 3, 4, 5, 6];
const BONUS_GEMS = 5;

// ── Surprise configs ─────────────────────────────────────────────────────────
const EXPENSE_SURPRISES = [
  { cat: "Transport", amount: 300, msg: "🚗 Surprise! Your car broke down. You must allocate $300 to Transport or fail!", label: "Emergency Repair" },
  { cat: "Healthcare", amount: 250, msg: "🏥 Medical emergency! Add $250 to Healthcare.", label: "Medical Bill" },
  { cat: "Food", amount: 150, msg: "🛒 Grocery prices spiked! Add $150 to Food.", label: "Price Spike" },
];
const INCOME_SURPRISES = [
  { dropAmount: 400, msg: "📉 Your hours got cut this month! Income dropped." },
  { dropAmount: 600, msg: "🏦 Unexpected tax bill! Net income reduced." },
  { dropAmount: 300, msg: "💸 Freelance client cancelled. Income dropped." },
];

// ── Category colors ───────────────────────────────────────────────────────────
const CAT_COLORS = {
  Rent: "#EF4444", "Personal Rent": "#EF4444", Housing: "#EF4444",
  Food: "#F97316", Groceries: "#F97316",
  Transport: "#3B82F6",
  Fun: "#A855F7", Entertainment: "#A855F7", Leisure: "#A855F7",
  Savings: "#22C55E", "Emergency Fund": "#22C55E",
  Childcare: "#EC4899",
  Healthcare: "#06B6D4",
  Loans: "#EAB308",
  Investments: "#10B981",
  "Business Costs": "#F97316",
  Marketing: "#8B5CF6",
};

const getCatColor = (cat) => CAT_COLORS[cat] || "#6366F1";

// ── Educational tips ─────────────────────────────────────────────────────────
const ROUND_TIPS = [
  "Great start! The 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
  "Budgeting gets harder as life events pile up. Prioritize necessities first!",
  "Unexpected expenses can derail any budget. Always have an emergency fund!",
  "Income instability is real. Variable income budgeting means spending less than you earn.",
  "A tight budget forces tough trade-offs. Financial discipline now = freedom later.",
];

function getTimerColor(t, max) {
  const pct = t / max;
  if (pct > 0.5) return "#ffffff";
  if (pct > 0.3) return "#F1C40F";
  if (pct > 0.15) return "#F97316";
  return "#EF4444";
}

function getMoodEmoji(scenario, leftover, timeLeft, income) {
  const isLow = timeLeft <= 10;
  const isOver = leftover < 0;
  const isClose = leftover >= 0 && leftover <= 50;
  if (isLow) return scenario.emoji === "🎓" ? "😱" : scenario.emoji === "👶" ? "😰" : "😤";
  if (isOver) return "😨";
  if (isClose) return "😐";
  return scenario.emoji === "🎓" ? "😊" : scenario.emoji === "👶" ? "🥰" : "😄";
}

// ── Single slider card ────────────────────────────────────────────────────────
function SliderCard({ cat, value, max, min, onChange, shaking }) {
  const color = getCatColor(cat);
  const pct = Math.min(100, (value / Math.max(max, 1)) * 100);

  return (
    <motion.div
      animate={shaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-3 relative overflow-hidden"
      style={{ background: "hsl(var(--card))", border: `1.5px solid ${color}44` }}
    >
      {/* Fill tank background */}
      <div
        className="absolute inset-0 rounded-xl transition-all duration-200 pointer-events-none"
        style={{ background: `${color}12`, width: `${pct}%`, right: "auto" }}
      />
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-black" style={{ color }}>{cat}</span>
          <span className="text-sm font-black text-foreground">${value.toLocaleString()}</span>
        </div>
        {min > 0 && (
          <p className="text-[9px] font-bold mb-1" style={{ color: value < min ? "#EF4444" : "#6B7280" }}>
            {value < min ? `⚠ Min: $${min}` : `✓ Min: $${min}`}
          </p>
        )}
        <input
          type="range"
          min={0}
          max={max}
          step={10}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, hsl(var(--border)) ${pct}%, hsl(var(--border)) 100%)`,
            WebkitAppearance: "none",
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Daily play limit helpers ──────────────────────────────────────────────────
const MAYHEM_LIMIT_KEY = "mayhem_daily";
const MAX_DAILY_PLAYS = 3;

function getTodayLocal() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getMayhemPlays() {
  try {
    const raw = localStorage.getItem(MAYHEM_LIMIT_KEY);
    if (!raw) return { date: "", count: 0 };
    return JSON.parse(raw);
  } catch { return { date: "", count: 0 }; }
}

function incrementMayhemPlays() {
  const today = getTodayLocal();
  const cur = getMayhemPlays();
  const count = cur.date === today ? cur.count + 1 : 1;
  localStorage.setItem(MAYHEM_LIMIT_KEY, JSON.stringify({ date: today, count }));
  return count;
}

function getMsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function fmtCountdown(ms) {
  if (ms <= 0) return "00:00";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MoneyMayhem({ progress, setProgress }) {
  const [phase, setPhase] = useState("intro"); // intro | playing | roundResult | consequences | final
  const [scenario, setScenario] = useState(null);

  // ── Daily play limit ────────────────────────────────────────────────────────
  const [playsToday, setPlaysToday] = useState(() => {
    const s = getMayhemPlays();
    return s.date === getTodayLocal() ? s.count : 0;
  });
  const [midnightMs, setMidnightMs] = useState(() => getMsUntilMidnight());
  useEffect(() => {
    const id = setInterval(() => setMidnightMs(getMsUntilMidnight()), 60000);
    return () => clearInterval(id);
  }, []);
  const isLimitReached = playsToday >= MAX_DAILY_PLAYS;
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [income, setIncome] = useState(0);
  const [sliders, setSliders] = useState({});
  const [shakeCats, setShakeCats] = useState([]);
  const [gemsEarned, setGemsEarned] = useState(0);
  const [roundsPassed, setRoundsPassed] = useState(0);
  const [failedThisRound, setFailedThisRound] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [earlyEnd, setEarlyEnd] = useState(false);
  const [roundResultData, setRoundResultData] = useState(null);
  const [surprise, setSurprise] = useState(null); // { type, data, triggered }
  const [surpriseVisible, setSurpriseVisible] = useState(false);
  const [incomeDropAnim, setIncomeDropAnim] = useState(false);
  const [cats, setCats] = useState([]);
  const [allocationHistory, setAllocationHistory] = useState([]); // past round allocations
  const [consequenceCards, setConsequenceCards] = useState([]);
  const timerRef = useRef(null);
  const surpriseTriggeredRef = useRef(false);

  // Pick a new scenario
  function pickScenario() {
    const s = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    return s;
  }

  // Build round state
  function buildRound(sc, roundNum, currentIncome) {
    const cfg = ROUND_CONFIG[roundNum - 1];
    const numCats = Math.min(cfg.cats, sc.categories.length);
    const activeCats = sc.categories.slice(0, numCats);
    const initSliders = {};
    activeCats.forEach(c => { initSliders[c] = 0; });
    setCats(activeCats);
    setSliders(initSliders);
    setTimeLeft(cfg.time);
    setIncome(currentIncome);
    surpriseTriggeredRef.current = false;
    setSurprise(null);
    setSurpriseVisible(false);
    setIncomeDropAnim(false);
    setShakeCats([]);

    // Setup surprise for rounds 3 and 4
    if (cfg.surprise === "expense") {
      const s = EXPENSE_SURPRISES[Math.floor(Math.random() * EXPENSE_SURPRISES.length)];
      setSurprise({ type: "expense", data: s, triggered: false });
    } else if (cfg.surprise === "income") {
      const s = INCOME_SURPRISES[Math.floor(Math.random() * INCOME_SURPRISES.length)];
      setSurprise({ type: "income", data: s, triggered: false });
    }
  }

  function startGame() {
    // Re-check limit fresh from storage (in case another tab updated)
    const cur = getMayhemPlays();
    const todayCount = cur.date === getTodayLocal() ? cur.count : 0;
    if (todayCount >= MAX_DAILY_PLAYS) {
      setPlaysToday(MAX_DAILY_PLAYS);
      return;
    }
    const newCount = incrementMayhemPlays();
    setPlaysToday(newCount);

    const sc = pickScenario();
    setScenario(sc);
    setRound(1);
    setGemsEarned(0);
    setRoundsPassed(0);
    setFailedThisRound(false);
    setRetryCount(0);
    setEarlyEnd(false);
    setAllocationHistory([]);
    setConsequenceCards([]);
    buildRound(sc, 1, sc.income);
    setPhase("playing");
  }

  // Timer
  useEffect(() => {
    if (phase !== "playing") return;
    const cfg = ROUND_CONFIG[round - 1];
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        const next = t - 1;
        // Trigger surprise at halfway
        if (!surpriseTriggeredRef.current && next <= Math.floor(cfg.time / 2)) {
          surpriseTriggeredRef.current = true;
          triggerSurprise();
        }
        if (next <= 0) {
          clearInterval(timerRef.current);
          handleTimerEnd();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, round]);

  function triggerSurprise() {
    setSurprise(prev => {
      if (!prev) return prev;
      if (prev.type === "expense") {
        // Add extra category slider
        const expCat = prev.data.cat;
        setCats(c => c.includes(expCat) ? c : [...c, expCat]);
        setSliders(s => ({ ...s, [expCat]: 0 }));
        setSurpriseVisible(true);
        return { ...prev, triggered: true };
      } else if (prev.type === "income") {
        setIncome(inc => {
          const newInc = Math.max(0, inc - prev.data.dropAmount);
          return newInc;
        });
        setIncomeDropAnim(true);
        setTimeout(() => setIncomeDropAnim(false), 1500);
        setSurpriseVisible(true);
        return { ...prev, triggered: true };
      }
      return prev;
    });
  }

  function handleTimerEnd() {
    clearInterval(timerRef.current);
    // Time ran out = fail
    resolveRound(false, "timeup");
  }

  const totalAllocated = Object.values(sliders).reduce((a, b) => a + b, 0);
  const leftover = income - totalAllocated;

  function handleSubmit() {
    clearInterval(timerRef.current);
    const cfg = ROUND_CONFIG[round - 1];
    const sc = scenario;

    // Check mandatory minimums
    const failedMins = [];
    cats.forEach(cat => {
      const min = sc.minimums[cat] || 0;
      // If surprise expense was triggered, add its minimum
      if (surprise?.type === "expense" && surprise.triggered && cat === surprise.data.cat) {
        if ((sliders[cat] || 0) < surprise.data.amount) {
          failedMins.push({ cat, min: surprise.data.amount });
        }
        return;
      }
      if (min > 0 && (sliders[cat] || 0) < min) {
        failedMins.push({ cat, min });
      }
    });

    if (failedMins.length > 0) {
      setShakeCats(failedMins.map(f => f.cat));
      setTimeout(() => setShakeCats([]), 800);
      playWrong();
      // Restart timer
      const remaining = timeLeft;
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); handleTimerEnd(); return 0; }
          return t - 1;
        });
      }, 1000);
      return;
    }

    // Check budget balance (slack allowed)
    if (totalAllocated > income) {
      resolveRound(false, "overspent");
      return;
    }
    if (leftover > cfg.slack) {
      resolveRound(false, "underspent");
      return;
    }
    resolveRound(true, "balanced");
  }

  function resolveRound(passed, reason) {
    clearInterval(timerRef.current);
    const cfg = ROUND_CONFIG[round - 1];
    const gemsForRound = (passed && !failedThisRound) ? cfg.gems : 0;

    let failReason = "";
    if (reason === "timeup") failReason = "You ran out of time!";
    else if (reason === "overspent") failReason = `You overspent by $${(totalAllocated - income).toFixed(0)}!`;
    else if (reason === "underspent") failReason = `You left $${leftover} unallocated (max slack $${cfg.slack}).`;

    const currentAllocation = { ...sliders };

    setRoundResultData({
      passed,
      gemsForRound,
      reason,
      failReason,
      tip: ROUND_TIPS[round - 1],
      allocation: currentAllocation,
      roundNum: round,
    });

    // Build consequence cards for this round
    setAllocationHistory(hist => {
      const cards = buildConsequenceCards(scenario.id, currentAllocation, income, hist, !passed, reason);
      setConsequenceCards(cards);
      return [...hist, currentAllocation];
    });

    if (passed) {
      setRoundsPassed(p => p + 1);
      setGemsEarned(g => g + gemsForRound);
      playChaChig();
    } else {
      playWrong();
    }
    setPhase("roundResult");
  }

  function handleRetry() {
    if (retryCount >= 1) {
      // Already retried once — end game early
      setEarlyEnd(true);
      setPhase("final");
      return;
    }
    setRetryCount(r => r + 1);
    setFailedThisRound(true);
    buildRound(scenario, round, scenario.income);
    setPhase("playing");
  }

  function handleNextRound() {
    if (round >= 5) {
      setPhase("final");
      return;
    }
    const nextRound = round + 1;
    setRound(nextRound);
    setFailedThisRound(false);
    setRetryCount(0);
    buildRound(scenario, nextRound, scenario.income);
    setPhase("playing");
  }

  // Save gems
  async function saveAndFinish() {
    const perfectBonus = roundsPassed === 5 ? BONUS_GEMS : 0;
    const total = gemsEarned + perfectBonus;
    if (!progress?.id || total <= 0) return;
    const updated = await updateProgress(progress, {
      gems: (progress.gems || 0) + total,
      xp: (progress.xp || 0) + Math.floor(total * 3),
    });
    setProgress(updated);
    playChaChig();
  }

  // Grade
  function getGrade() {
    if (roundsPassed === 5) return { grade: "S", title: "Budget Master", color: "#F1C40F" };
    if (roundsPassed === 4) return { grade: "A", title: "Savvy Spender", color: "#22C55E" };
    if (roundsPassed === 3) return { grade: "B", title: "Getting There", color: "#3B82F6" };
    if (roundsPassed === 2) return { grade: "C", title: "Needs Work", color: "#F97316" };
    return { grade: "F", title: "Back to Basics", color: "#EF4444" };
  }

  const cfg = ROUND_CONFIG[round - 1] || ROUND_CONFIG[0];
  const timerColor = getTimerColor(timeLeft, cfg.time);
  const moodEmoji = scenario ? getMoodEmoji(scenario, leftover, timeLeft, income) : "😊";
  const isOver = leftover < 0;
  const isBalanced = leftover >= 0 && leftover <= cfg.slack;

  // ── INTRO ────────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center gap-5 py-4 text-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="text-6xl"
        >💰</motion.div>
        <div>
          <h2 className="text-2xl font-black text-foreground">Payday Panic</h2>
          <p className="text-xs text-muted-foreground mt-1">Budget your life before time runs out!</p>
        </div>

        {/* Daily play counter */}
        <div className="w-full rounded-xl px-4 py-2.5 flex items-center justify-between"
          style={{ background: isLimitReached ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${isLimitReached ? "rgba(239,68,68,0.4)" : "hsl(var(--border))"}` }}>
          <span className="text-xs font-bold" style={{ color: isLimitReached ? "#EF4444" : "hsl(var(--muted-foreground))" }}>
            Games today: {playsToday} of {MAX_DAILY_PLAYS}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: MAX_DAILY_PLAYS }).map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ background: i < playsToday ? "#EF4444" : "rgba(255,255,255,0.12)" }} />
            ))}
          </div>
        </div>

        {isLimitReached ? (
          <div className="w-full rounded-2xl p-4 text-center"
            style={{ background: "rgba(239,68,68,0.08)", border: "1.5px solid rgba(239,68,68,0.35)" }}>
            <p className="text-base font-black" style={{ color: "#EF4444" }}>🚫 Daily limit reached!</p>
            <p className="text-sm text-muted-foreground mt-1">You have played 3 games today. Come back tomorrow!</p>
            <p className="text-xs font-bold mt-2" style={{ color: "#F1C40F" }}>Resets in {fmtCountdown(midnightMs)}</p>
          </div>
        ) : (
          <>
            <div className="w-full rounded-xl p-3 space-y-1.5 text-left"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid hsl(var(--border))" }}>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-2">How to play</p>
              {[
                "🎯 Drag sliders to allocate your monthly income",
                "⏱️ Balance your budget before the timer hits zero",
                "⚠️ Meet all mandatory minimum expenses",
                "💎 Earn gems for each round you pass",
                "🎉 Perfect run = 25 gems + bonus!",
              ].map(t => <p key={t} className="text-xs text-foreground">{t}</p>)}
            </div>

            <div className="grid grid-cols-3 gap-2 w-full">
              {SCENARIOS.slice(0, 3).map(s => (
                <div key={s.id} className="rounded-xl p-2 text-center"
                  style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>
                  <div className="text-2xl">{s.emoji}</div>
                  <p className="text-[9px] font-bold text-foreground leading-tight">{s.name}</p>
                </div>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="w-full py-4 rounded-2xl font-black text-base"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))", color: "hsl(var(--primary-foreground))", boxShadow: "0 0 24px hsl(var(--primary) / 0.4)" }}
            >
              START GAME ▶
            </motion.button>
          </>
        )}
      </div>
    );
  }

  // ── ROUND RESULT ─────────────────────────────────────────────────────────────
  if (phase === "roundResult" && roundResultData) {
    const { passed, gemsForRound, failReason, tip, allocation, roundNum } = roundResultData;
    const isLastRound = roundNum >= 5;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col gap-4 py-2"
      >
        {/* Result header */}
        <div className="rounded-2xl p-4 text-center"
          style={{
            background: passed ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            border: `2px solid ${passed ? "#22C55E" : "#EF4444"}55`,
          }}>
          <div className="text-4xl mb-2">{passed ? "✅" : "❌"}</div>
          <p className="text-lg font-black" style={{ color: passed ? "#22C55E" : "#EF4444" }}>
            {passed ? `Round ${roundNum} Passed!` : `Round ${roundNum} Failed`}
          </p>
          {!passed && <p className="text-sm text-muted-foreground mt-1">{failReason}</p>}
          {passed && gemsForRound > 0 && (
            <p className="text-sm font-black mt-1" style={{ color: "#F1C40F" }}>+{gemsForRound} 💎 earned!</p>
          )}
          {passed && gemsForRound === 0 && (
            <p className="text-xs text-muted-foreground mt-1">Retry round — no gems this time</p>
          )}
        </div>

        {/* Allocation breakdown */}
        <div className="rounded-xl p-3" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Your Allocation</p>
          <div className="space-y-1">
            {Object.entries(allocation).map(([cat, val]) => (
              <div key={cat} className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: getCatColor(cat) }} />
                  <span className="text-xs text-foreground">{cat}</span>
                </div>
                <span className="text-xs font-bold text-foreground">${val.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="rounded-xl p-3" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.3)" }}>
          <p className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: "#818CF8" }}>💡 Financial Tip</p>
          <p className="text-xs text-foreground leading-relaxed">{tip}</p>
        </div>

        {/* Buttons */}
        {passed ? (
          <button
            onClick={() => setPhase("consequences")}
            className="w-full py-3.5 rounded-2xl font-black text-sm"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            See What Happened →
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setPhase("consequences")}
              className="w-full py-3 rounded-2xl font-bold text-sm"
              style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
            >
              See Consequences →
            </button>
            {retryCount < 1 ? (
              <button
                onClick={handleRetry}
                className="w-full py-3.5 rounded-2xl font-black text-sm"
                style={{ background: "rgba(239,68,68,0.15)", border: "1.5px solid rgba(239,68,68,0.5)", color: "#EF4444" }}
              >
                🔁 Retry Round (0 gems)
              </button>
            ) : (
              <button
                onClick={() => { setEarlyEnd(true); setPhase("final"); saveAndFinish(); }}
                className="w-full py-3.5 rounded-2xl font-black text-sm"
                style={{ background: "rgba(239,68,68,0.15)", border: "1.5px solid rgba(239,68,68,0.5)", color: "#EF4444" }}
              >
                End Game (collect {gemsEarned} 💎)
              </button>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  // ── CONSEQUENCES ─────────────────────────────────────────────────────────────
  if (phase === "consequences" && scenario) {
    const roundNum = roundResultData?.roundNum ?? round;
    const isLastRound = roundNum >= 5;
    const passed = roundResultData?.passed ?? false;

    function handleConsequenceContinue() {
      if (isLastRound || (!passed && retryCount >= 1)) {
        saveAndFinish();
        setEarlyEnd(!isLastRound);
        setPhase("final");
      } else if (!passed) {
        // still can retry
        setPhase("roundResult");
      } else {
        handleNextRound();
      }
    }

    return (
      <ConsequencesScreen
        scenarioName={scenario.name}
        scenarioEmoji={scenario.emoji}
        roundNum={roundNum}
        cards={consequenceCards.length > 0 ? consequenceCards : [
          { emoji: "📋", headline: "Nothing to report.", story: "You didn't allocate to any tracked categories.", level: "neutral", cat: "General", isCumulative: false }
        ]}
        isLastRound={isLastRound}
        onContinue={handleConsequenceContinue}
      />
    );
  }

  // ── FINAL ────────────────────────────────────────────────────────────────────
  if (phase === "final") {
    const { grade, title, color } = getGrade();
    const perfectBonus = roundsPassed === 5 ? BONUS_GEMS : 0;
    const totalGems = gemsEarned + perfectBonus;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 py-2"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.8 }}
          className="text-5xl"
        >🏆</motion.div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {scenario?.name} • {earlyEnd ? "Early End" : "Complete"}
          </p>
        </div>

        <div className="rounded-2xl p-5 w-full text-center"
          style={{ background: `${color}12`, border: `2px solid ${color}55`, boxShadow: `0 0 24px ${color}22` }}>
          <p className="text-6xl font-black" style={{ color, textShadow: `0 0 20px ${color}` }}>{grade}</p>
          <p className="text-lg font-black text-foreground mt-1">{title}</p>
          <p className="text-sm text-muted-foreground mt-1">{roundsPassed}/5 rounds passed</p>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="rounded-xl p-3 text-center" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>
            <p className="text-xl font-black" style={{ color: "#F1C40F" }}>{gemsEarned}</p>
            <p className="text-[9px] text-muted-foreground">Round Gems</p>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>
            <p className="text-xl font-black" style={{ color: "#22C55E" }}>+{perfectBonus}</p>
            <p className="text-[9px] text-muted-foreground">Perfect Bonus</p>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: "rgba(241,196,15,0.08)", border: "1px solid rgba(241,196,15,0.3)" }}>
            <p className="text-xl font-black" style={{ color: "#F1C40F" }}>{totalGems} 💎</p>
            <p className="text-[9px] text-muted-foreground">Total</p>
          </div>
        </div>

        {perfectBonus > 0 && (
          <p className="text-xs font-black text-center" style={{ color: "#F1C40F" }}>
            🎉 Perfect Run! +{BONUS_GEMS} bonus gems!
          </p>
        )}

        <div className="flex flex-col gap-2 w-full">
          {!isLimitReached ? (
            <button
              onClick={() => { startGame(); }}
              className="w-full py-3.5 rounded-2xl font-black text-sm"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              🎲 Play Again ({MAX_DAILY_PLAYS - playsToday} left today)
            </button>
          ) : (
            <div className="w-full rounded-xl px-4 py-3 text-center"
              style={{ background: "rgba(239,68,68,0.08)", border: "1.5px solid rgba(239,68,68,0.35)" }}>
              <p className="text-sm font-black" style={{ color: "#EF4444" }}>Daily limit reached!</p>
              <p className="text-xs text-muted-foreground mt-0.5">Resets in {fmtCountdown(midnightMs)}</p>
            </div>
          )}
          <button
            onClick={() => setPhase("intro")}
            className="w-full py-2.5 rounded-2xl font-bold text-sm"
            style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            Back to Lab
          </button>
        </div>
      </motion.div>
    );
  }

  // ── PLAYING ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-3 pb-2">

      {/* Header: scenario + round */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.span
            key={moodEmoji}
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            className="text-2xl"
          >{moodEmoji}</motion.span>
          <div>
            <p className="text-xs font-black text-foreground">{scenario?.name}</p>
            <p className="text-[9px] text-muted-foreground">{scenario?.desc}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Round</p>
          <p className="text-sm font-black text-foreground">{round} / 5</p>
        </div>
      </div>

      {/* Timer + Income bar */}
      <div className="rounded-xl p-3 flex items-center gap-4"
        style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>
        {/* Timer */}
        <div className="text-center">
          <p className="text-[9px] text-muted-foreground mb-0.5">Time</p>
          <motion.p
            className="text-3xl font-black font-mono"
            style={{ color: timerColor }}
            animate={timeLeft <= 10 ? { scale: [1, 1.12, 1] } : {}}
            transition={timeLeft <= 10 ? { repeat: Infinity, duration: 0.6 } : {}}
          >
            {timeLeft}
          </motion.p>
        </div>

        <div className="flex-1">
          {/* Income */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] text-muted-foreground">Income</span>
            <motion.span
              key={income}
              initial={{ scale: 1.3, color: "#EF4444" }}
              animate={{ scale: 1, color: "#22C55E" }}
              transition={{ duration: 0.5 }}
              className="text-sm font-black"
              style={{ color: incomeDropAnim ? "#EF4444" : "#22C55E" }}
            >
              ${income.toLocaleString()}
            </motion.span>
          </div>
          {/* Budget balance bar */}
          <div className="h-2.5 rounded-full overflow-hidden mb-1"
            style={{ background: "hsl(var(--border))" }}>
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${Math.min(100, (totalAllocated / income) * 100)}%`,
                background: isOver ? "#EF4444" : isBalanced ? "#22C55E" : "#F1C40F",
              }}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-[9px] text-muted-foreground">Allocated: ${totalAllocated.toLocaleString()}</span>
            <span className="text-[9px] font-bold" style={{ color: isOver ? "#EF4444" : leftover <= cfg.slack ? "#22C55E" : "#F1C40F" }}>
              {isOver ? `Over by $${Math.abs(leftover)}` : `Left: $${leftover}`}
            </span>
          </div>
        </div>
      </div>

      {/* Surprise popup */}
      <AnimatePresence>
        {surpriseVisible && surprise && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-xl p-3 flex items-center gap-2"
            style={{
              background: surprise.type === "expense" ? "rgba(239,68,68,0.12)" : "rgba(234,179,8,0.12)",
              border: `1.5px solid ${surprise.type === "expense" ? "#EF4444" : "#EAB308"}55`,
            }}
          >
            <span className="text-2xl">{surprise.type === "expense" ? "🚨" : "📉"}</span>
            <div className="flex-1">
              <p className="text-xs font-black" style={{ color: surprise.type === "expense" ? "#EF4444" : "#EAB308" }}>
                {surprise.type === "income" ? surprise.data.msg : surprise.data.msg}
              </p>
            </div>
            <button onClick={() => setSurpriseVisible(false)} className="text-muted-foreground text-xs">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliders */}
      <div className="space-y-2">
        {cats.map(cat => (
          <SliderCard
            key={cat}
            cat={cat}
            value={sliders[cat] || 0}
            max={income}
            min={
              surprise?.type === "expense" && surprise.triggered && cat === surprise.data.cat
                ? surprise.data.amount
                : (scenario?.minimums[cat] || 0)
            }
            onChange={val => {
              setSliders(s => ({ ...s, [cat]: val }));
              playClick();
            }}
            shaking={shakeCats.includes(cat)}
          />
        ))}
      </div>

      {/* Confirm button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleSubmit}
        className="w-full py-4 rounded-2xl font-black text-base mt-1"
        style={{
          background: isOver
            ? "rgba(239,68,68,0.3)"
            : "hsl(var(--primary))",
          color: isOver ? "#EF4444" : "hsl(var(--primary-foreground))",
          border: isOver ? "1.5px solid #EF4444" : "none",
          opacity: isOver ? 0.7 : 1,
          boxShadow: isOver ? "none" : "0 0 20px hsl(var(--primary) / 0.35)",
        }}
      >
        {isOver ? "⚠️ Overspent! Adjust sliders" : "✅ Confirm Budget"}
      </motion.button>

      {/* Gem tally */}
      {gemsEarned > 0 && (
        <p className="text-center text-xs font-bold" style={{ color: "#F1C40F" }}>
          💎 {gemsEarned} gems earned so far
        </p>
      )}
    </div>
  );
}