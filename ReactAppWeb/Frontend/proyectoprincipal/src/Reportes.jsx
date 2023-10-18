import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";

import {
  List,
  useListContext,
  TextInput,
  DateInput,
  Create,
  SimpleForm
} from "react-admin";
import { Grid, Card, CardContent, CardHeader } from "@mui/material";
/*import { report } from "process";*/

const ReportsView = () => {
  const { data } = useListContext(); // Hook que guarda la información de los reportes
  return (
    <div>
      <Card>
        <CardHeader title="Reportes" />
        <CardContent>
          Se presentan gráficas con respecto al reporte generado
        </CardContent>
      </Card>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Reporte Tabla Semanal</Accordion.Header>
          <Accordion.Body>
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
              src="https://charts.mongodb.com/charts-project-0-ylbrs/embed/charts?id=652f19e6-3b6c-49f2-8a29-d0c2becd28a3&maxDataAge=3600&theme=light&autoRefresh=true"
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Tipo de Prioridad Tickets</Accordion.Header>
          <Accordion.Body>
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
              src="https://charts.mongodb.com/charts-project-0-ylbrs/embed/charts?id=652f1afb-afab-4938-8313-c998122337b1&maxDataAge=3600&theme=light&autoRefresh=true"
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Reporte Tipo de Ticket</Accordion.Header>
          <Accordion.Body>
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
              src="https://charts.mongodb.com/charts-project-0-ylbrs/embed/charts?id=652f1d5e-76f7-43f0-8fa1-5b99596944ee&maxDataAge=3600&theme=light&autoRefresh=true"
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export const ReportsList = (props) => (
  <List /*filters={ReportFilter}*/>
    <ReportsView />
  </List>
);
