import { useNavigate, useLocation } from "react-router-dom";
import { Home, ContentPaste, Timeline, Dehaze } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const footerContents = [
    { icon: Home, label: "home", path: "/" },
    { icon: ContentPaste, label: "history", path: "/history" },
    { icon: Timeline, label: "analysis", path: "/analysis" },
    { icon: Dehaze, label: "morePage", path: "/morePage" },
  ];
  const value = footerContents.findIndex((e) => e.path === location.pathname);
  return (
    <BottomNavigation value={value}>
      {footerContents.map((e) => {
        return (
          <BottomNavigationAction
            key={e.label}
            label={e.label}
            icon={<e.icon />}
            onClick={() => navigate(e.path)}
          />
        );
      })}
    </BottomNavigation>
  );
}
export default Footer;
