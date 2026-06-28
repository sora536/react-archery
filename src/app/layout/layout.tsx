import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { Box } from "@mui/material";

function Layout() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

export default Layout;
