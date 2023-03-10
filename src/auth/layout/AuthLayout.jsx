import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const AuthLayout = ({ children, Title }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        item
        className="box-shadow "
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          width: { md: "25%" },
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          {Title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
