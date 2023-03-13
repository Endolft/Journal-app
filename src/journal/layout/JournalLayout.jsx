import { Box } from "@mui/material";
import { NavBar, SideBar } from "../components/index";
import Toolbar from "@mui/material/Toolbar";
const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn">
      <NavBar drawerWidth={drawerWidth} />
      <SideBar  />
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
