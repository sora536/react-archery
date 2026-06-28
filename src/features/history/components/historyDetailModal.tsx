import type { SessionView } from "../type/type";
import type { DateString } from "../../../types/common";
import SessionEditModal from "./sessionEditModal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Chip,
  DialogActions,
  Button,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import PracticeScoreTable from "../../record/components/practiceScoreTable";
import { useState } from "react";
import { Edit } from "@mui/icons-material";

type Props = {
  open: boolean;
  onClose: () => void;
  session: SessionView;
  date: DateString;
};

function HistoryDetailModal({ open, onClose, session, date }: Props) {
  const [openEdit, setOpenEdit] = useState(false);

  const tags = Array.isArray(session.data.tags) ? session.data.tags : [];

  const TagSection = tags.length > 0 && (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        タグ
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={{ width: "100%", overflowX: "scroll" }}
      >
        {tags.map((tag) => (
          <Chip key={tag} label={tag} />
        ))}
      </Stack>
    </Box>
  );

  const MemoSection = session.data.memo && (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        メモ
      </Typography>

      <Paper variant="outlined" sx={{ p: 1.5, whiteSpace: "pre-wrap" }}>
        <Typography variant="body2">{session.data.memo}</Typography>
      </Paper>
    </Box>
  );

  const MainContent = () => {
    if (session.type === "official") {
      return (
        <PracticeScoreTable
          changeDistance={() => {}}
          officialSessionDraft={{
            date: session.date,
            distance: session.data.distance,
            scores: session.data.scores,
          }}
        />
      );
    }

    if (session.type === "practice") {
      return (
        <PracticeScoreTable
          changeDistance={() => {}}
          officialSessionDraft={{
            date: session.date,
            distance: session.distance,
            scores: session.data.scores,
          }}
        />
      );
    }

    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="h3">{session.data.shotCount}</Typography>
        <Typography color="text.secondary">射</Typography>
      </Box>
    );
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography>
            {session.type.toUpperCase()} - {session.date}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3}>
            {/* メイン */}
            <Box>
              <MainContent />
            </Box>

            <Divider />

            {/* 補足 */}
            {TagSection}
            {MemoSection}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            startIcon={<Edit />}
            variant="contained"
            onClick={() => setOpenEdit(true)}
          >
            編集
          </Button>
        </DialogActions>
      </Dialog>

      <SessionEditModal
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          onClose();
        }}
        session={session}
        date={date}
      />
    </>
  );
}

export default HistoryDetailModal;
