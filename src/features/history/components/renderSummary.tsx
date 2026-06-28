import { Typography, Box } from "@mui/material";
import type { SessionView } from "../type/type";
import { OfficialScoreCalculate } from "../../../utils/officialScoreCalculate";

function renderSession(session: SessionView) {
  switch (session.type) {
    case "official": {
      const s = session.data;

      const calScore = OfficialScoreCalculate({
        date: "00-01-01",
        distance: s.distance,
        scores: s.scores,
      });

      return (
        <>
          <Typography variant="h6">{s.distance}</Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 1,
              mt: 1,
            }}
          >
            {calScore.ends.map((score, index) => (
              <Box
                key={index}
                sx={{
                  py: 1,
                  textAlign: "center",
                  bgcolor: "grey.100",
                  borderRadius: 1,
                }}
              >
                <Typography>{score}</Typography>
              </Box>
            ))}

            <Box
              sx={{
                py: 1,
                textAlign: "center",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                borderRadius: 1,
              }}
            >
              <Typography>{calScore.totals[5]}</Typography>
            </Box>
          </Box>
        </>
      );
    }

    case "practice": {
      const s = session.data;
      return (
        <>
          <Typography variant="h6">{session.distance}</Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <Typography variant="h5">
              {Math.ceil(s.scores.length / 6)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              エンド
            </Typography>
          </Box>
        </>
      );
    }

    case "closeShot": {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h5">{session.data.shotCount}</Typography>
          <Typography variant="caption" color="text.secondary">
            射
          </Typography>
        </Box>
      );
    }
  }
}

export default renderSession;
