import type { WidgetCategory } from "../types/category";

export interface CategoryDefinition {
  id: WidgetCategory;

  title: string;
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: "score",
    title: "📈 得点",
  },
  {
    id: "practice",
    title: "🏹 練習",
  },
  {
    id: "goal",
    title: "🎯 目標",
  },
  {
    id: "technique",
    title: "🏷 技術",
  },
  {
    id: "record",
    title: "📅 記録",
  },
  {
    id: "growth",
    title: "📊 成長",
  },
  {
    id: "motivation",
    title: "🔥 モチベーション",
  },
  {
    id: "other",
    title: "⚙ その他",
  },
];
