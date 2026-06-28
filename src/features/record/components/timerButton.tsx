import { Button } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

interface Props {
  setTimerOpen: (e: boolean) => void;
}

function TimerButton({ setTimerOpen }: Props) {
  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<PlayArrow />}
      onClick={() => setTimerOpen(true)}
      sx={{
        width: "100%",
        borderRadius: 3,
      }}
    >
      タイマー開始
    </Button>
  );
}
export default TimerButton;
