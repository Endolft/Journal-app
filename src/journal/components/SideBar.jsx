import { Box, Drawer, Typography, Divider, List } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useMemo } from "react";

import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWhith = 240 }) => {
  const { displayName, isSaving } = useSelector((state) => state.auth);

  const { notes } = useSelector((state) => state.journal);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: `${drawerWhith}px` }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWhith },
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="initial" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => {
            return <SideBarItem key={note.id} {...note} />;
          })}
        </List>
      </Drawer>
    </Box>
  );
};
