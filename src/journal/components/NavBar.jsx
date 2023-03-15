import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlices";
import { startLogOut } from "../../store/auth/thunks";
import MenuIcon from "@mui/icons-material/Menu";

export const NavBar = ({ drawerWidth = 240, handleDrawerToggle }) => {
  const dispatch = useDispatch();

  const onLogOut = (event) => {
    dispatch(startLogOut());
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc( 100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"></Typography>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" noWrap component="div">
              {" "}
              Journal App
            </Typography>
            <IconButton color="error" onClick={onLogOut}>
              <LogoutOutlined />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
