import { Card, CardContent, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

function WidgetCard({ title, children, action }: Props) {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{title}</Typography>

          {action}
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}

export default WidgetCard;
