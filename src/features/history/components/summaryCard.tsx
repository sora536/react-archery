import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import type { SessionView } from "../type/type";
import type { DateString } from "../../../types/common";
import renderSession from "./renderSummary";

type Props = {
  session: SessionView;
  date: DateString;
  onClick: () => void;
};

export default function SummaryCard({ session, date, onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      sx={{
        m: 1,
        cursor: "pointer",
        "&:hover": {
          boxShadow: 4,
          transform: "scale(1.01)",
        },
        transition: "0.2s",
      }}
    >
      <CardContent>
        {/* header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Chip
            label={session.type}
            size="small"
            color={
              session.type === "official"
                ? "primary"
                : session.type === "practice"
                  ? "success"
                  : "warning"
            }
          />
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>

        {/* body */}
        <Box sx={{ mt: 1 }}>{renderSession(session)}</Box>
      </CardContent>
    </Card>
  );
}
