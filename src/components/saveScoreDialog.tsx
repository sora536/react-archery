import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import { Tags } from "../constants/tags";
import type {
  CloseShotSession,
  PracticeSession,
  ShotDistance,
  ShotScore,
} from "../features/record/types/score";
import type { DateString } from "../types/common";

type PracticeDialogProps = {
  open: boolean;
  date: DateString;
  distance: ShotDistance;
  score: ShotScore[];
  onClose: () => void;
  onSave: (
    data: PracticeSession,
    distance: ShotDistance,
    date: DateString,
  ) => void;
};

type CloseShotDialogProps = {
  open: boolean;
  date: DateString;
  distance: "近射";
  shotCount: number;
  onClose: () => void;
  onSave: (data: CloseShotSession, date: DateString) => void;
};

type Props = PracticeDialogProps | CloseShotDialogProps;

function SaveScoreDialog(props: Props) {
  const [memo, setMemo] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleSave = () => {
    if (props.distance === "近射") {
      props.onSave(
        {
          shotCount: props.shotCount,
          tags: selectedTags,
          memo: memo,
        },
        props.date,
      );
    } else {
      props.onSave(
        {
          scores: props.score,
          tags: selectedTags,
          memo: memo,
        },
        props.distance,
        props.date,
      );
    }
    setMemo("");
    setSelectedTags([]);
    props.onClose();
  };
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm">
      <DialogTitle>スコアを保存</DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* スコア確認 */}
          <Box>
            <Stack spacing={1}>
              <Typography>
                日付:<strong>{props.date}</strong>
              </Typography>
              <Typography>
                距離: <strong>{props.distance}</strong>
              </Typography>
            </Stack>
          </Box>

          {/* タグ */}
          <Box>
            <Typography variant="subtitle2">タグ（複数選択可）</Typography>

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
                    color={selected ? "primary" : "default"}
                    variant={selected ? "filled" : "outlined"}
                    onClick={() => toggleTag(tag)}
                  />
                );
              })}
            </Stack>
          </Box>

          {/* メモ */}
          <TextField
            label="メモ（任意）"
            multiline
            rows={4}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onClose}>キャンセル</Button>

        <Button variant="contained" onClick={handleSave}>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SaveScoreDialog;
