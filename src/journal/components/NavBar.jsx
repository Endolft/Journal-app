import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlices";
import { startLogOut } from "../../store/auth/thunks";

export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();

  const onLogOut = (event) => {
    dispatch(startLogOut());
    console.log("aprentando");
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc( 100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Typography variant="h6"></Typography>
        <IconButton
          aria-label=""
          color="inherit"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
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
  );
};
