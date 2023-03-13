import Grid from "@mui/material/Grid";
import { StarOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
      wrap="nowrap"
      sx={{
        minHeight: `calc(100vh - 100px)`,
        backgroundColor: "primary.main",
        borderRadius: 3,
        
      }}
    >
      <Grid item xs={12}   justifyContent="center" >
        <StarOutline sx={{ fontSize: 90, color: "white" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" color="white" >
          Selecciona o crea una entrada
        </Typography>
      </Grid>
    </Grid>
  );
};
