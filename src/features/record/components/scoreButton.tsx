import { Button, Box } from "@mui/material";
import { SCORE_VALUE } from "../constants/score";
import { getScoreColor } from "../utils/scoreColor";
import type { ShotScore } from "../types/score";
interface Props {
  addScore: (score: ShotScore) => void;
}
function ScoreButton({ addScore }: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gap: 1,
        p: 1,
      }}
    >
      {SCORE_VALUE.map((e) => {
        return (
          <Button
            key={e}
            sx={{
              boxShadow: 3,
              fontWeight: "bold",
              borderRadius: 3,
              color: getScoreColor(e),
            }}
            onClick={() => addScore(e)}
          >
            {e}
          </Button>
        );
      })}
    </Box>
  );
}
export default ScoreButton;
