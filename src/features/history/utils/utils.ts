import type {
  DailyRecord,
  ShotDistance,
  PracticeSession,
} from "../../record/types/score";
import type { SessionView } from "../type/type";
import type { HistoryFilter } from "../type/type";

export function normalizeDailyRecord(day: DailyRecord): SessionView[] {
  const result: SessionView[] = [];

  // official
  day.officialSessions.forEach((s) => {
    result.push({
      date: day.date,
      type: "official",
      data: s,
    });
  });

  // practice（安全分離）
  const { closeShot, ...byDistance } = day.practiceSessions;

  // closeShot
  if (closeShot) {
    result.push({
      date: day.date,
      type: "closeShot",
      data: closeShot,
    });
  }

  // distance
  (Object.entries(byDistance) as [ShotDistance, PracticeSession][]).forEach(
    ([distance, value]) => {
      if (!value) return;

      result.push({
        date: day.date,
        type: "practice",
        distance,
        data: value,
      });
    },
  );

  return result;
}

export function applyFilter(data: SessionView[], filter: HistoryFilter) {
  return data.filter((item) => {
    if (filter.type && item.type !== filter.type) return false;

    if (filter.distance) {
      // official
      if (item.type === "official") {
        if (item.data.distance !== filter.distance) return false;
      }

      // practice
      else if (item.type === "practice") {
        if (item.distance !== filter.distance) return false;
      }

      // closeShot は distance を持たないので常に false 扱い or 無視
      else if (item.type === "closeShot") {
        return false;
      }
    }
    if (filter.tags.length > 0) {
      const tags = item.data.tags ?? [];

      const match = filter.tags.some((tag) => tags.includes(tag));

      if (!match) return false;
    }

    return true;
  });
}
