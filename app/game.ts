import type { Dimension } from "./course";
import type { DimensionStats } from "./MissionPlayer";

export const XP_FIRST_TRY = 10;
export const XP_RETRY = 5;
export const XP_MISSION_BONUS = 20;
export const XP_FLAWLESS_BONUS = 15;

export type StreakState = { count: number; lastDay: string };

export function dayStamp(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function updateStreak(current: StreakState | undefined, today = new Date()): StreakState {
  const stamp = dayStamp(today);
  if (!current || !current.count) return { count: 1, lastDay: stamp };
  if (current.lastDay === stamp) return current;
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (current.lastDay === dayStamp(yesterday)) return { count: current.count + 1, lastDay: stamp };
  return { count: 1, lastDay: stamp };
}

export function missionXp(firstTryCorrect: number, retriedCorrect: number, flawless: boolean) {
  return {
    answers: firstTryCorrect * XP_FIRST_TRY + retriedCorrect * XP_RETRY,
    missionBonus: XP_MISSION_BONUS,
    flawlessBonus: flawless ? XP_FLAWLESS_BONUS : 0,
    get total() {
      return this.answers + this.missionBonus + this.flawlessBonus;
    },
  };
}

export type Rank = { id: string; minXp: number; icon: string };

export const ranks: Rank[] = [
  { id: "trainee", minXp: 0, icon: "🎒" },
  { id: "cadet", minXp: 80, icon: "🧢" },
  { id: "first-officer", minXp: 200, icon: "🥈" },
  { id: "captain", minXp: 350, icon: "🥇" },
  { id: "legend", minXp: 500, icon: "🏆" },
];

export function rankForXp(xp: number): Rank {
  let current = ranks[0];
  for (const rank of ranks) if (xp >= rank.minXp) current = rank;
  return current;
}

export function nextRank(xp: number): Rank | null {
  return ranks.find((rank) => rank.minXp > xp) ?? null;
}

export type BadgeContext = {
  completedMissions: number;
  totalMissions: number;
  flawlessMissions: number;
  perfectMissions: number;
  courseComplete: boolean;
  streak: number;
  lastMissionMistakes: number;
  dims: DimensionStats;
};

export type BadgeDef = { id: string; icon: string; earned: (ctx: BadgeContext) => boolean };

export const badges: BadgeDef[] = [
  { id: "first-flight", icon: "🛫", earned: (ctx) => ctx.completedMissions >= 1 },
  { id: "flawless", icon: "✨", earned: (ctx) => ctx.flawlessMissions >= 1 },
  { id: "comeback", icon: "💪", earned: (ctx) => ctx.lastMissionMistakes >= 3 },
  { id: "halfway", icon: "🧭", earned: (ctx) => ctx.completedMissions >= Math.ceil(ctx.totalMissions / 2) },
  {
    id: "prompt-pro",
    icon: "🎯",
    earned: (ctx) => ctx.dims.promptCraft.attempts >= 4 && ctx.dims.promptCraft.firstTryCorrect === ctx.dims.promptCraft.attempts,
  },
  { id: "on-fire", icon: "🔥", earned: (ctx) => ctx.streak >= 3 },
  { id: "graduate", icon: "🎓", earned: (ctx) => ctx.courseComplete },
  { id: "perfectionist", icon: "💎", earned: (ctx) => ctx.courseComplete && ctx.perfectMissions === ctx.totalMissions },
];

export function evaluateBadges(ctx: BadgeContext, alreadyEarned: Record<string, string>): string[] {
  return badges.filter((badge) => !alreadyEarned[badge.id] && badge.earned(ctx)).map((badge) => badge.id);
}

export type { Dimension };
