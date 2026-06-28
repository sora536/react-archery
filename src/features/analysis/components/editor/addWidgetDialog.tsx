import { useMemo, useState } from "react";
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";

import { widgetDefinitions } from "../../constants/widgetRegistry";
import { CATEGORIES } from "../../constants/category";
import { addWidget } from "../../widgetConfigRepository";
import type { WidgetCategory } from "../../types/category";
import type { WidgetConfig } from "../../types/widget";

interface Props {
  open: boolean;
  configs: WidgetConfig[];
  onClose: () => void;
  onChange: (configs: WidgetConfig[]) => void;
}

function AddWidgetDialog({ open, configs, onClose, onChange }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<WidgetCategory | "all">("all");

  const filteredWidgets = useMemo(() => {
    return widgetDefinitions.filter((widget) => {
      // 追加済みは表示しない
      if (configs.some((config) => config.id === widget.id)) {
        return false;
      }

      // カテゴリ
      if (category !== "all" && widget.category !== category) {
        return false;
      }

      // 検索
      const keyword = search.toLowerCase();

      return (
        widget.title.toLowerCase().includes(keyword) ||
        widget.description.toLowerCase().includes(keyword)
      );
    });
  }, [configs, category, search]);

  const handleAdd = (id: WidgetConfig["id"]) => {
    onChange(addWidget(configs, id));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>新しいWidgetを追加</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Widgetを検索"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />

          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
            }}
          >
            <Chip
              label="すべて"
              clickable
              color={category === "all" ? "primary" : "default"}
              onClick={() => setCategory("all")}
            />

            {CATEGORIES.map((c) => (
              <Chip
                key={c.id}
                label={c.title}
                clickable
                color={category === c.id ? "primary" : "default"}
                onClick={() => setCategory(c.id)}
              />
            ))}
          </Stack>

          <List>
            {filteredWidgets.map((widget) => (
              <ListItemButton
                key={widget.id}
                onClick={() => handleAdd(widget.id)}
              >
                <ListItemText
                  primary={widget.title}
                  secondary={widget.description}
                />
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default AddWidgetDialog;
