import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SaveButton from "../components/saveButton";
import SaveScoreDialog from "../../../components/saveScoreDialog";
import { formatDate } from "../../../utils/formatDate";
import {
  loadCloseShotDraft,
  saveCloseShotDraft,
  saveCloseShotSession,
} from "../../../repositories/recordRepository";
import type { DateString } from "../../../types/common";

function CloseRecordPage() {
  const date: DateString = formatDate(new Date());
  const [saveScoreOpen, setSaveScoreOpen] = useState(false);
  const [shot, setShot] = useState<number>(loadCloseShotDraft().shotCount || 0);
  const plusShot = (num: number) => {
    setShot((prev) => prev + num);
  };
  if (loadCloseShotDraft().date !== date) {
    saveCloseShotDraft(0, date);
    setShot(0);
  }
  useEffect(() => {
    saveCloseShotDraft(shot, date);
  }, [shot]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "4rem",
          }}
        >
          {shot}
        </Typography>

        <Typography
          sx={{
            fontSize: "1.2rem",
            color: "text.secondary",
          }}
        >
          射
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Button variant="outlined" onClick={() => plusShot(1)}>
          +1
        </Button>
        <Button variant="outlined" onClick={() => plusShot(6)}>
          +6
        </Button>
        <Button variant="outlined" onClick={() => plusShot(-1)}>
          -1
        </Button>
      </Box>
      <SaveButton setSaveScoreOpen={() => setSaveScoreOpen(true)} />

      <SaveScoreDialog
        open={saveScoreOpen}
        date={date}
        distance="近射"
        shotCount={shot}
        onClose={() => setSaveScoreOpen(false)}
        onSave={(session, date) => {
          saveCloseShotSession(date, session);
        }}
      />
    </>
  );
}

export default CloseRecordPage;
