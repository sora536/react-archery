export const WIDGET_CATEGORIES = [
  "score",
  "practice",
  "goal",
  "technique",
  "record",
  "growth",
  "motivation",
  "other",
] as const;

export type WidgetCategory = (typeof WIDGET_CATEGORIES)[number];
