import {
  Dashboard,
  EmojiEvents,
  TrendingUp,
  Architecture,
  Sports,
  Straighten,
  LocalOffer,
  CalendarMonth,
  MoreHoriz,
  Flag,
} from "@mui/icons-material";
import type { WidgetCategory } from "../types/category";
import type { ReactElement } from "react";

export interface CategoryDefinition {
  id: WidgetCategory;
  title: string;
  icon: ReactElement;
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: "overview",
    title: "Overview",
    icon: <Dashboard />,
  },
  {
    id: "score",
    title: "Score",
    icon: <EmojiEvents />,
  },
  {
    id: "trend",
    title: "Trend",
    icon: <TrendingUp />,
  },
  {
    id: "goal",
    title: "Goal",
    icon: <Flag />,
  },
  {
    id: "technique",
    title: "Technique",
    icon: <Architecture />,
  },
  {
    id: "practice",
    title: "Practice",
    icon: <Sports />,
  },
  {
    id: "distance",
    title: "Distance",
    icon: <Straighten />,
  },
  {
    id: "tag",
    title: "Tags",
    icon: <LocalOffer />,
  },
  {
    id: "activity",
    title: "Activity",
    icon: <CalendarMonth />,
  },
  {
    id: "other",
    title: "Other",
    icon: <MoreHoriz />,
  },
];
