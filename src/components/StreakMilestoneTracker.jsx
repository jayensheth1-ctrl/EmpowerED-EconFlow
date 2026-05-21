import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

// Milestones every 7 days
const MILESTONES = [7, 14, 21, 30, 50, 100];
const MILESTONE_GEMS = { 7: 25, 14: 40, 21: 60, 30: 100, 50: 150, 100: 250 };

function getNextMilestone(streak) {
  return MILESTONES.find(m => m > streak) ?? null;
}

function getPrevMilestone(streak) {
  const passed = MILESTONES.filter(m => m <= streak);
  return passed.length > 0 ? passed[passed.length - 1] : 0;
}

export default function StreakMilestoneTracker({ streak = 0 }) {
  const next = getNextMilestone(streak);
  const prev = getPrevMilestone(streak);

  if (!next) {
    // Maxed out — show a badge
    return (
      <div className="mx-4 mb-3 rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, rgba(234,179,8,0.15), rgba(251,191,36,0.08))", border: "1.5px solid rgba(234,179,8,0.4)" }}>
        <span className="text-2xl">🔥</span>
        <div>
          <p className="text-sm font-black" style={{ color: "#F59E0B" }}>Streak Legend — {streak} days! 🏆</p>
          <p className="text-xs" style={{ color: "rgba(245,158,11,0.7)" }}>You've conquered every milestone. Incredible!</p>
        </div>
      </div>
    );
  }

  const range = next - prev;
  const progress = streak - prev;
  const pct = Math.min((progress / range) * 100, 100);
  const isClose = pct >= 71; // within ~2 days of 7-day window

  return (
    <div className="mx-4 mb-3 rounded-2xl px-4 py-3"
      style={{
        background: isClose
          ? "linear-gradient(135deg, rgba(234,179,8,0.15), rgba(251,191,36,0.08))"
          : "rgba(255,255,255,0.03)",
        border: isClose
          ? "1.5px solid rgba(234,179,8,0.45)"
          : "1.5px solid hsl(var(--border))",
        boxShadow: isClose ? "0 0 18px rgba(234,179,8,0.15)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            {isClose ? (
              <motion.div
                key="pulsing"
                animate={{ scale: [1, 1.25, 1], opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 1.1 }}
              >
                <Flame className="w-4 h-4" style={{ color: "#F59E0B" }} />
              </motion.div>
            ) : (
              <motion.div key="static">
                <Flame className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="text-xs font-black" style={{ color: isClose ? "#F59E0B" : "hsl(var(--muted-foreground))" }}>
            {isClose ? "Almost there!" : "Streak Milestone"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-black" style={{ color: "#2ECC71" }}>+{MILESTONE_GEMS[next]} 💎</span>
          <span className="text-[10px] text-muted-foreground font-semibold">at {next} days</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: isClose
              ? "linear-gradient(90deg, #F59E0B, #FBBF24)"
              : "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))",
            boxShadow: isClose ? "0 0 8px rgba(245,158,11,0.6)" : "none",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-muted-foreground font-semibold">
          🔥 {streak} day{streak !== 1 ? "s" : ""}
        </span>
        <span className="text-[10px] font-bold" style={{ color: isClose ? "#F59E0B" : "hsl(var(--muted-foreground))" }}>
          {next - streak} day{next - streak !== 1 ? "s" : ""} to go
        </span>
      </div>
    </div>
  );
}

export { MILESTONES, MILESTONE_GEMS, getNextMilestone };