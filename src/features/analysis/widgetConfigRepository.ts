import { defaultWidgetConfig } from "./constants/defaultDashboard";
import type { WidgetConfig, WidgetId } from "./types/widget";

const WIDGET_CONFIG_KEY = "analysis-widget-config";

/**
 * Widget設定を読み込む
 *
 * 新しいWidgetが追加された場合は
 * defaultWidgetConfigから自動で補完する。
 */
export function loadWidgetConfig(): WidgetConfig[] {
  const data = localStorage.getItem(WIDGET_CONFIG_KEY);

  if (!data) {
    return [...defaultWidgetConfig];
  }

  try {
    const savedConfigs: WidgetConfig[] = JSON.parse(data);

    const mergedConfigs = defaultWidgetConfig.map((defaultConfig) => {
      const saved = savedConfigs.find(
        (config) => config.id === defaultConfig.id,
      );

      return saved ?? defaultConfig;
    });

    return mergedConfigs.sort((a, b) => a.order - b.order);
  } catch {
    return [...defaultWidgetConfig];
  }
}

/**
 * Widget設定を保存
 */
export function saveWidgetConfig(configs: WidgetConfig[]) {
  localStorage.setItem(WIDGET_CONFIG_KEY, JSON.stringify(configs));
}

/**
 * Widgetを追加
 */
export function addWidget(
  configs: WidgetConfig[],
  id: WidgetId,
): WidgetConfig[] {
  if (configs.some((config) => config.id === id)) {
    return configs;
  }

  return [
    ...configs,
    {
      id,
      enabled: true,
      order: configs.length,
    },
  ];
}

/**
 * Widgetを削除
 */
export function removeWidget(
  configs: WidgetConfig[],
  id: WidgetId,
): WidgetConfig[] {
  return configs
    .filter((config) => config.id !== id)
    .map((config, index) => ({
      ...config,
      order: index,
    }));
}

/**
 * Widgetの並び替え
 */
export function moveWidget(
  configs: WidgetConfig[],
  from: number,
  to: number,
): WidgetConfig[] {
  const copied = [...configs];

  const [moved] = copied.splice(from, 1);

  copied.splice(to, 0, moved);

  return copied.map((config, index) => ({
    ...config,
    order: index,
  }));
}

/**
 * 初期状態へ戻す
 */
export function resetWidgetConfig(): WidgetConfig[] {
  return [...defaultWidgetConfig];
}
