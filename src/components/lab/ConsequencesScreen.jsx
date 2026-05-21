import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMonthSummary } from "../../lib/mayhemConsequences";

const LEVEL_STYLES = {
  positive: {
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.4)",
    badge: "#22C55E",
    label: "Positive",
  },
  neutral: {
    bg: "rgba(241,196,15,0.08)",
    border: "rgba(241,196,15,0.35)",
    badge: "#F1C40F",
    label: "Neutral",
  },
  negative: {
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.4)",
    badge: "#EF4444",
    label: "Negative",
  },
  critical: {
    bg: "rgba(127,0,0,0.15)",
    border: "rgba(220,38,38,0.7)",
    badge: "#DC2626",
    label: "Critical",
  },
};

function ConsequenceCard({ card, index, onVisible }) {
  const style = LEVEL_STYLES[card.level] || LEVEL_STYLES.neutral;

  useEffect(() => {
    // Notify parent this card is now visible
    const t = setTimeout(() => onVisible(index), 300 * index + 400);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.3, type: "spring", stiffness: 220, damping: 22 }}
      className="rounded-2xl p-3 relative overflow-hidden"
      style={{
        background: style.bg,
        border: `1.5px solid ${card.isCumulative ? (card.cumulativePositive ? "rgba(212,175,55,0.7)" : "rgba(180,0,0,0.75)") : style.border}`,
        boxShadow: card.isCumulative ? `0 0 16px ${card.cumulativePositive ? "rgba(212,175,55,0.2)" : "rgba(180,0,0,0.25)"}` : "none",
      }}
    >
      {/* Cumulative badge */}
      {card.isCumulative && (
        <div
          className="absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded-full"
          style={{
            background: card.cumulativePositive ? "rgba(212,175,55,0.2)" : "rgba(180,0,0,0.25)",
            color: card.cumulativePositive ? "#D4AF37" : "#FCA5A5",
            border: `1px solid ${card.cumulativePositive ? "rgba(212,175,55,0.5)" : "rgba(180,0,0,0.5)"}`,
          }}
        >
          Ongoing Effect
        </div>
      )}

      <div className="flex items-start gap-2.5">
        <span className="text-2xl flex-shrink-0 mt-0.5">{card.emoji}</span>
        <div className="flex-1 min-w-0">
          {/* Level badge + category */}
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <span
              className="text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider"
              style={{ background: `${style.badge}22`, color: style.badge, border: `1px solid ${style.badge}44` }}
            >
              {style.label}
            </span>
            <span className="text-[9px] font-bold text-muted-foreground">{card.cat}</span>
          </div>

          {/* Headline */}
          <p className="text-sm font-black text-foreground leading-tight">{card.headline}</p>

          {/* Story */}
          <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{card.story}</p>

          {/* Tip (for negative/critical only) */}
          {card.tip && (
            <p className="text-[10px] mt-1.5 leading-snug italic" style={{ color: "#94A3B8" }}>
              {card.tip}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ConsequencesScreen({ scenarioName, scenarioEmoji, roundNum, cards, onContinue, isLastRound }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const allVisible = visibleCount >= cards.length;
  const summary = getMonthSummary(cards);

  function handleVisible(index) {
    setVisibleCount(c => Math.max(c, index + 1));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 py-1"
    >
      {/* Header */}
      <div className="text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {scenarioEmoji} {scenarioName} · Round {roundNum}
        </p>
        <h3 className="text-lg font-black text-foreground mt-0.5">Here's what happened this month</h3>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2.5">
        {cards.map((card, i) => (
          <ConsequenceCard key={`${card.cat}-${i}`} card={card} index={i} onVisible={handleVisible} />
        ))}
      </div>

      {/* Summary line */}
      <AnimatePresence>
        {allVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl px-4 py-2.5 text-center"
            style={{ background: `${summary.color}12`, border: `1px solid ${summary.color}44` }}
          >
            <p className="text-sm font-black" style={{ color: summary.color }}>{summary.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button — only shows after all cards are in */}
      <AnimatePresence>
        {allVisible && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onContinue}
            className="w-full py-4 rounded-2xl font-black text-sm"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
            }}
          >
            {isLastRound ? "See Final Score 🏆" : `Continue to Round ${roundNum + 1} →`}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}