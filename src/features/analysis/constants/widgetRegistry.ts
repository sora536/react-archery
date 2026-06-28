import AverageScore from "../components/widgets/averageScore";
import type { WidgetDefinition } from "../types/widget";

export const widgetDefinitions: WidgetDefinition[] = [
  {
    id: "averageScore",

    title: "平均点",

    description: "平均点を表示します",

    category: "score",

    component: AverageScore,

    defaultEnabled: true,
  },
];
export const widgetDefinitionMap = new Map(
  widgetDefinitions.map((w) => [w.id, w]),
);
