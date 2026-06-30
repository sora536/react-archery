import type { ComponentType } from "react";
import type { WidgetCategory } from "./category";

/**
 * WidgetのID
 *
 * widgetDefinitions.tsに追加したらここにも追加する
 */
export type WidgetId =
  | "kpi"
  | "averageScore"
  | "hitRate"
  | "scoreDistribution"
  | "distanceAverage"
  | "practiceCount"
  | "monthlyTrend";

/**
 * Widgetの固定情報
 *
 * アプリが持つWidgetのカタログ
 */
export interface WidgetDefinition {
  /** 一意なID */
  id: WidgetId;

  /** 表示名 */
  title: string;

  /** 検索用説明 */
  description: string;

  /** カテゴリ */
  category: WidgetCategory;

  /** Widget本体 */
  component: ComponentType;
}

/**
 * ユーザーごとのWidget設定
 *
 * localStorageへ保存する
 */
export interface WidgetConfig {
  /** WidgetID */
  id: WidgetId;

  /** 表示順 */
  order: number;

  /** 表示するか */
  enabled: boolean;
}
