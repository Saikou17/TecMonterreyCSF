import * as React from "react";
import { Typography, Card, CardContent, CardActions } from "@mui/material";

export const Welcome = () => (
  <Card
    sx={{
      background: `#c5dedd`,
      color: "rgba(0, 0, 0, 0.87)",
      padding: "1em",
      marginBottom: "1em",
      marginTop: "2em",
      [`& .MuiCardActions-root`]: {
        p: 2,
        mt: -2,
        mb: -1,
        flexDirection: "column",
        "& a": {
          mb: 1,
          color: "rgba(0, 0, 0, 0.87)",
          backgroundColor: "white",
          marginLeft: "0 !important",
        },
      },
    }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Reportes
      </Typography>
      <Typography gutterBottom>
        Aquí vera los resultados de los tickets, si ya fueron resueltos o no.
      </Typography>
    </CardContent>
    <CardActions></CardActions>
  </Card>
);
