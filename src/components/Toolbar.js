import React from "react";
import Grid from "@material-ui/core/Grid";

const Toolbar = ({ children }) => (
  <Grid
    container
    spacing={3}
    style={{
      padding: 24,
    }}
    justify="space-around"
    alignItems="flex-start"
  >
    {children}
  </Grid>
);

export default Toolbar;
