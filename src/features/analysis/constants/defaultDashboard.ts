import type { WidgetConfig } from "../types/widget";

export const defaultWidgetConfig: WidgetConfig[] = [
  {
    id: "kpi",
    order: 0,
    enabled: true,
  },
  {
    id: "averageScore",
    order: 1,
    enabled: true,
  },
  {
    id: "monthlyTrend",
    order: 2,
    enabled: true,
  },
];
