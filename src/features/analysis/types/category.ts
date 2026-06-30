export const WIDGET_CATEGORIES = [
  "overview",
  "score",
  "trend",
  "goal",
  "technique",
  "practice",
  "distance",
  "tag",
  "activity",
  "other",
] as const;

export type WidgetCategory = (typeof WIDGET_CATEGORIES)[number];
