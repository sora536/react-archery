import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function AppProvider({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default AppProvider;
