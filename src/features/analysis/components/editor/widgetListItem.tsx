import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box, IconButton, ListItem, ListItemText } from "@mui/material";

import { widgetDefinitions } from "../../constants/widgetRegistry";
import { removeWidget } from "../../widgetConfigRepository";
import type { WidgetConfig } from "../../types/widget";

interface Props {
  config: WidgetConfig;
  configs: WidgetConfig[];
  onChange: (configs: WidgetConfig[]) => void;
}

function WidgetListItem({ config, configs, onChange }: Props) {
  const definition = widgetDefinitions.find(
    (widget) => widget.id === config.id,
  );

  if (!definition) return null;

  const handleDelete = () => {
    onChange(removeWidget(configs, config.id));
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <IconButton edge="end" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Box
        sx={{
          mr: 2,
          display: "flex",
          alignItems: "center",
          color: "text.secondary",
          cursor: "grab",
        }}
      >
        <DragIndicatorIcon />
      </Box>

      <ListItemText
        primary={definition.title}
        secondary={definition.description}
      />
    </ListItem>
  );
}

export default WidgetListItem;
