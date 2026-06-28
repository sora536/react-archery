import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

import type { WidgetConfig } from "../../types/widget";
import WidgetListItem from "./widgetListItem";
import AddWidgetDialog from "./addWidgetDialog";

interface Props {
  open: boolean;
  configs: WidgetConfig[];
  onClose: () => void;
  onSave: (configs: WidgetConfig[]) => void;
}

function WidgetEditorDialog({ open, configs, onClose, onSave }: Props) {
  const [editingConfigs, setEditingConfigs] = useState(configs);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    setEditingConfigs(configs);
  }, [configs, open]);

  const handleSave = () => {
    onSave(editingConfigs);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Widgetを編集</DialogTitle>

        <DialogContent>
          <Stack spacing={1}>
            <Button variant="outlined" onClick={() => setAddDialogOpen(true)}>
              ＋ 新しいWidgetを追加
            </Button>

            {editingConfigs.map((config) => (
              <WidgetListItem
                key={config.id}
                config={config}
                configs={editingConfigs}
                onChange={setEditingConfigs}
              />
            ))}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>キャンセル</Button>

          <Button variant="contained" onClick={handleSave}>
            保存
          </Button>
        </DialogActions>
      </Dialog>

      <AddWidgetDialog
        open={addDialogOpen}
        configs={editingConfigs}
        onClose={() => setAddDialogOpen(false)}
        onChange={setEditingConfigs}
      />
    </>
  );
}

export default WidgetEditorDialog;
