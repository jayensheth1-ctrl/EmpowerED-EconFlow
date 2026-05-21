import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X } from "lucide-react";
import { BADGES } from "../../lib/badges";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function BadgeGrid({ progress }) {
  const [selected, setSelected] = useState(null);
  const earned = progress?.earned_badges || [];
  const dates = progress?.earned_badge_dates || {};

  return (
    <div className="mb-6">
      <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground mb-3">🏅 Awards</h2>

      <div className="grid grid-cols-4 gap-2.5">
        {BADGES.map((badge, i) => {
          const isEarned = earned.includes(badge.id);
          return (
            <motion.button
              key={badge.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelected(badge)}
              className="flex flex-col items-center gap-1 rounded-2xl p-2 relative"
              style={
                isEarned
                  ? badge.isLegend
                    ? { background: "rgba(212,175,55,0.12)", border: "2px solid rgba(212,175,55,0.6)", boxShadow: "0 0 14px rgba(212,175,55,0.3)" }
                    : { background: "rgba(192,132,252,0.1)", border: "1.5px solid rgba(192,132,252,0.35)" }
                  : { background: "hsl(var(--muted))", border: "1.5px solid hsl(var(--border))", opacity: 0.55 }
              }
            >
              <span
                className="text-2xl leading-none"
                style={!isEarned ? { filter: "grayscale(1) opacity(0.4)" } : {}}
              >
                {badge.emoji}
              </span>
              <p className="text-[9px] font-black text-center leading-tight"
                style={{ color: isEarned ? (badge.isLegend ? "#D4AF37" : "hsl(var(--foreground))") : "hsl(var(--muted-foreground))" }}>
                {badge.name}
              </p>
              {!isEarned && (
                <div className="absolute top-1 right-1">
                  <Lock className="w-2.5 h-2.5 text-muted-foreground" />
                </div>
              )}
              {isEarned && badge.isLegend && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: "inset 0 0 12px rgba(212,175,55,0.25)" }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Badge detail popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-xs rounded-3xl p-6 flex flex-col items-center gap-3 text-center relative"
              style={
                selected.isLegend && (progress?.earned_badges || []).includes(selected.id)
                  ? { background: "rgba(25,18,5,0.98)", border: "2px solid rgba(212,175,55,0.7)", boxShadow: "0 0 40px rgba(212,175,55,0.25)" }
                  : { background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }
              }
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "hsl(var(--muted))" }}
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>

              <span className="text-5xl">{selected.emoji}</span>
              <div>
                <p className="text-lg font-black text-foreground">{selected.name}</p>
                {selected.isLegend && (
                  <p className="text-xs font-bold" style={{ color: "#D4AF37" }}>Prestige Badge</p>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{selected.desc}</p>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.3)" }}>
                <span className="text-sm font-black" style={{ color: "#2ECC71" }}>💎 +{selected.gems} gems on unlock</span>
              </div>

              {(progress?.earned_badges || []).includes(selected.id) ? (
                <div className="flex items-center gap-1.5 text-xs font-bold"
                  style={{ color: "#C084FC" }}>
                  ✅ Earned {dates[selected.id] ? `on ${formatDate(dates[selected.id])}` : ""}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                  🔒 Not yet unlocked
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}