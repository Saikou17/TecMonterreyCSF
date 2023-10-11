import * as React from "react";
import { Grid, Card, CardContent, CardHeader } from "@mui/material";

import { Welcome } from "./Welcome";
import { GraficaTickets } from "./GraficaTickets";

export const Dashboard = () => (
  <div className="DashboardList">
    <Card>
      <CardHeader title="Bienvenido a Fundación Por México" />
      <CardContent>
        Debajo se presentan gráficas con respecto a los ticket de la semana
      </CardContent>
    </Card>

    <Grid container spacing={2} mt={1}>
      <Grid item xs={12} md={9}>
        <GraficaTickets />
      </Grid>
      <Grid item xs={12} md={3}>
        <Welcome />
      </Grid>
      <Grid item xs={15} md={5}>
        <h1>Poner gráfica de barras para ver los tickets que mas se repiten</h1>
      </Grid>
    </Grid>
  </div>
);
