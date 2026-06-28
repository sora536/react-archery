import { Grid } from "@mui/material";

import { widgetDefinitionMap } from "../constants/widgetRegistry";
import type { WidgetConfig } from "../types/widget";

interface WidgetRendererProps {
  configs: WidgetConfig[];
}

function WidgetRenderer({ configs }: WidgetRendererProps) {
  // id -> WidgetDefinition のMapを作成

  // 表示するWidgetだけを順番通りに並べる
  const visibleConfigs = configs
    .filter((config) => config.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <Grid container spacing={2}>
      {visibleConfigs.map((config) => {
        const definition = widgetDefinitionMap.get(config.id);
        if (!definition) return null;

        const Component = definition.component;

        return (
          <Grid key={definition.id}>
            <Component />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default WidgetRenderer;
