/**
 * Badge system — definitions, unlock logic, and reward helpers.
 */
import { getAllLessons } from "./lessonData";
import { getAllPart2Lessons } from "./part2LessonData";

// Block 1 lesson IDs (first 10 lessons across all part-1 units)
export function getBlock1LessonIds() {
  return getAllLessons().slice(0, 10).map(l => l.id);
}
// Block 2 lesson IDs (first 10 lessons of part 2)
export function getBlock2LessonIds() {
  return getAllPart2Lessons().slice(0, 10).map(l => l.id);
}

export const BADGES = [
  {
    id: "first_step",
    name: "First Step",
    emoji: "👣",
    desc: "Complete your very first lesson.",
    gems: 5,
    check: (p) => (p.completed_lessons || []).length >= 1,
  },
  {
    id: "on_a_roll",
    name: "On A Roll",
    emoji: "🔥",
    desc: "Answer 5 questions correctly in a row within a single lesson.",
    gems: 5,
    check: (p) => (p.badge_max_streak || 0) >= 5,
  },
  {
    id: "week_warrior",
    name: "Week Warrior",
    emoji: "🗓️",
    desc: "Log in 7 days in a row.",
    gems: 8,
    check: (p) => (p.streak || 0) >= 7,
  },
  {
    id: "quiz_machine",
    name: "Quiz Machine",
    emoji: "🤖",
    desc: "Answer 50 questions correctly in total across all lessons.",
    gems: 7,
    check: (p) => (p.badge_total_correct || 0) >= 50,
  },
  {
    id: "speed_runner",
    name: "Speed Runner",
    emoji: "⚡",
    desc: "Complete a full lesson in under 2 minutes.",
    gems: 6,
    check: (p) => !!(p.badge_speed_run_done),
  },
  {
    id: "battle_ready",
    name: "Battle Ready",
    emoji: "⚔️",
    desc: "Play your first bot battle, win or lose.",
    gems: 5,
    check: (p) => (p.badge_battles_played || 0) >= 1,
  },
  {
    id: "bot_slayer",
    name: "Bot Slayer",
    emoji: "🏆",
    desc: "Win 3 bot battles total.",
    gems: 8,
    check: (p) => (p.badge_battle_wins || 0) >= 3,
  },
  {
    id: "big_spender",
    name: "Big Spender",
    emoji: "💸",
    desc: "Spend 50 gems total in the shop.",
    gems: 6,
    check: (p) => (p.badge_gems_spent || 0) >= 50,
  },
  {
    id: "market_watcher",
    name: "Market Watcher",
    emoji: "📊",
    desc: "Open the Lab on 3 different calendar days.",
    gems: 5,
    check: (p) => (p.badge_lab_days || []).length >= 3,
  },
  {
    id: "first_trade",
    name: "First Trade",
    emoji: "💹",
    desc: "Make your first buy or sell in the stock simulator.",
    gems: 5,
    check: (p) => !!(p.badge_first_trade_done),
  },
  {
    id: "in_the_green",
    name: "In The Green",
    emoji: "📈",
    desc: "Close a trade in the stock simulator at a profit.",
    gems: 8,
    check: (p) => !!(p.badge_profitable_trade_done),
  },
  {
    id: "knowledge_seeker",
    name: "Knowledge Seeker",
    emoji: "📚",
    desc: "Read 5 different articles in the Knowledge Base.",
    gems: 6,
    check: (p) => (p.badge_articles_read || []).length >= 5,
  },
  {
    id: "block1_grad",
    name: "Block One Graduate",
    emoji: "🎓",
    desc: "Complete all 10 lessons in Block 1.",
    gems: 8,
    check: (p) => {
      const ids = getBlock1LessonIds();
      return ids.every(id => (p.completed_lessons || []).includes(id));
    },
  },
  {
    id: "block2_grad",
    name: "Block Two Graduate",
    emoji: "🏅",
    desc: "Complete all 10 lessons in Block 2.",
    gems: 10,
    check: (p) => {
      const ids = getBlock2LessonIds();
      return ids.every(id => (p.completed_lessons || []).includes(id));
    },
  },
  {
    id: "come_back_stronger",
    name: "Come Back Stronger",
    emoji: "💪",
    desc: "Restart a lesson after battery death and complete it successfully.",
    gems: 5,
    check: (p) => !!(p.badge_retry_complete_done),
  },
  {
    id: "gem_hoarder",
    name: "Gem Hoarder",
    emoji: "💎",
    desc: "Reach a gem balance of 50 or more at any point.",
    gems: 7,
    check: (p) => (p.badge_peak_gems || 0) >= 50,
  },
  {
    id: "night_owl",
    name: "Night Owl",
    emoji: "🦉",
    desc: "Complete a lesson after 10pm local time.",
    gems: 6,
    check: (p) => !!(p.badge_night_owl_done),
  },
  {
    id: "perfect_lesson",
    name: "Perfect Lesson",
    emoji: "✨",
    desc: "Complete a lesson with zero wrong answers.",
    gems: 9,
    check: (p) => !!(p.badge_perfect_lesson_done),
  },
  {
    id: "shop_regular",
    name: "Shop Regular",
    emoji: "🛍️",
    desc: "Make 5 purchases from the shop.",
    gems: 6,
    check: (p) => (p.badge_shop_purchases || 0) >= 5,
  },
  {
    id: "econflow_legend",
    name: "EconFlow Legend",
    emoji: "👑",
    desc: "Earn every other badge. The ultimate prestige.",
    gems: 10,
    isLegend: true,
    check: (p) => {
      const otherIds = BADGES.filter(b => b.id !== "econflow_legend").map(b => b.id);
      return otherIds.every(id => (p.earned_badges || []).includes(id));
    },
  },
];

/**
 * Run all badge checks against current progress.
 * Returns array of newly-unlocked badge objects (not already earned).
 */
export function checkNewBadges(progress) {
  const earned = progress.earned_badges || [];
  return BADGES.filter(b => !earned.includes(b.id) && b.check(progress));
}

/**
 * Build the progress update object to mark badges as earned + award gems.
 */
export function buildBadgeUpdate(progress, newBadges) {
  if (!newBadges.length) return null;
  const earned = [...(progress.earned_badges || [])];
  const earnedDates = { ...(progress.earned_badge_dates || {}) };
  let gems = progress.gems || 0;
  const now = new Date().toISOString();
  for (const b of newBadges) {
    if (!earned.includes(b.id)) {
      earned.push(b.id);
      earnedDates[b.id] = now;
      gems += b.gems;
    }
  }
  return { earned_badges: earned, earned_badge_dates: earnedDates, gems };
}