import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Stack,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Tags } from "../../../constants/tags";
import type { SessionView } from "../type/type";
import { updateSession } from "../../../repositories/recordRepository";
import type { DateString } from "../../../types/common";

type Props = {
  open: boolean;
  onClose: () => void;
  session: SessionView;
  date: DateString;
};

function SessionEditModal({ open, onClose, session, date }: Props) {
  const [memo, setMemo] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // open時に初期化（SaveScoreDialogと同じ思想）
  useEffect(() => {
    if (!open) return;

    setMemo(session.data.memo ?? "");
    setSelectedTags(session.data.tags ?? []);
  }, [open, session]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSave = () => {
    if (session.type === "official") {
      updateSession(date, {
        date: session.date,
        type: "official",
        data: { ...session.data, memo: memo, tags: selectedTags },
      });
    }
    if (session.type === "practice") {
      updateSession(date, {
        date: session.date,
        type: "practice",
        distance: session.distance,
        data: { ...session.data, memo: memo, tags: selectedTags },
      });
    }
    if (session.type === "closeShot") {
      updateSession(date, {
        date: session.date,
        type: "closeShot",
        data: { ...session.data, memo: memo, tags: selectedTags },
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>セッション編集</DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* memo */}
          <TextField
            label="メモ"
            multiline
            minRows={3}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            fullWidth
          />

          {/* tags（SaveScoreDialog形式） */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              タグ（タップで選択）
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ width: "100%", overflowX: "scroll" }}
            >
              {Tags.map((tag) => {
                const selected = selectedTags.includes(tag);
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    clickable
                    onClick={() => toggleTag(tag)}
                    color={selected ? "primary" : "default"}
                    variant={selected ? "filled" : "outlined"}
                  />
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button variant="contained" onClick={handleSave}>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SessionEditModal;
