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
    <iframe
      style={{
        marginTop: "2px",
        background: "#F1F5F4",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        width: "100%",
        height: "500px",
      }}
      src="https://charts.mongodb.com/charts-project-0-ylbrs/embed/dashboards?id=6529cc0d-90aa-47d0-801b-d0d369dd2939&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
    ></iframe>
  </div>
);
