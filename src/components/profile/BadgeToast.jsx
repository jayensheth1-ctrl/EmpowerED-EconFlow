import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Badge unlock notification — shows all newly earned badges at once.
 * User must press "Claim" to dismiss. Gems are already saved to DB by parent.
 * Prompt to visit /profile to see prizes.
 */
export default function BadgeToast({ badges = [], onClaim }) {
  if (!badges.length) return null;

  const totalGems = badges.reduce((sum, b) => sum + (b.gems || 0), 0);

  return (
    <AnimatePresence>
      <motion.div
        key="badge-toast"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] w-full max-w-sm px-3"
      >
        <div
          className="rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(15,12,35,0.98), rgba(35,15,60,0.98))",
            border: "1.5px solid rgba(192,132,252,0.55)",
            boxShadow: "0 0 40px rgba(192,132,252,0.35)",
          }}
        >
          {/* Header */}
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#C084FC" }}>
                🏅 Badge{badges.length > 1 ? "s" : ""} Unlocked!
              </p>
              <p className="text-xs text-white/50 mt-0.5">
                Go to your{" "}
                <Link to="/profile" onClick={onClaim} className="underline font-bold" style={{ color: "#C084FC" }}>
                  Me page
                </Link>{" "}
                to claim your prize.
              </p>
            </div>
            <span className="text-sm font-black flex-shrink-0 ml-3" style={{ color: "#2ECC71" }}>
              +{totalGems} 💎
            </span>
          </div>

          {/* Badge list */}
          <div className="px-3 pb-3 flex flex-col gap-1.5 max-h-48 overflow-y-auto">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-3 px-3 py-2 rounded-xl"
                style={{ background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.2)" }}
              >
                <span className="text-2xl flex-shrink-0">{badge.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-white leading-tight">{badge.name}</p>
                  <p className="text-[10px] text-white/45 leading-tight truncate">{badge.desc}</p>
                </div>
                <span className="text-xs font-black flex-shrink-0" style={{ color: "#2ECC71" }}>+{badge.gems}💎</span>
              </div>
            ))}
          </div>

          {/* Claim button */}
          <div className="px-3 pb-3">
            <button
              onClick={onClaim}
              className="w-full py-3 rounded-xl font-black text-sm text-white transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #C084FC)",
                boxShadow: "0 0 16px rgba(192,132,252,0.4)",
              }}
            >
              ✅ Claim
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}