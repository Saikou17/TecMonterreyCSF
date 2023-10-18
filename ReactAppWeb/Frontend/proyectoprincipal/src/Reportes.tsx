import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";

import {
  List,
  useListContext,
  ReferenceInput,
  TextInput,
  SelectInput,
  DateInput,
  Create,
  SimpleForm,
  RadioButtonGroupInput,
} from "react-admin";
import { Grid, Card, CardContent, CardHeader } from "@mui/material";
/*import { report } from "process";*/

const ReportFilter = [<DateInput source="Fecha" label="Seleccionar fecha" />];

/*
const ReportsView = () => {
  const { data } = useListContext(); // Hook que guarda la información de los reportes

  return (
    <div>
      {data?.map((report) => (
        <Accordion key={report.Fecha}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Fecha de reporte: {report.Fecha}
            </Accordion.Header>
            <Accordion.Body>
              <h2>Reporte del: {report.Fecha}</h2>
              <h3>Cantidad de Tickets: {report.cantidadTickets}</h3>
              <h4>{report.Comentario}</h4>

              <h5>Categorías por Ticket:</h5>
              <p>Servicio: {report.Categorias.Servicios}</p>
              <p>Digital: {report.Categorias.Digital}</p>
              <p>Infraestructura: {report.Categorias.Infraestructura}</p>
              <p>Beneficiarios: {report.Categorias.Beneficiarios}</p>
              <p>Mobiliarios: {report.Categorias.Mobiliarios}</p>
              <p>Seguridad: {report.Categorias.Seguridad}</p>
              <p>Materiales: {report.Categorias.Materiales}</p>
              <hr />
              <h5>Prioridad Alta</h5>
              <p>Cantidad de Tickets: {report.PrioridadTickets.Alta}</p>
              <h5>Prioridad Intermedia</h5>
              <p>Cantidad de Tickets: {report.PrioridadTickets.Intermedia}</p>
              <h5>Prioridad Baja</h5>
              <p>Cantidad de Tickets: {report.PrioridadTickets.Baja}</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
};

export const ReportsList = (props: any) => (
  <List filters={ReportFilter}>
    <ReportsView />
  </List>
);

export const ReportCreate = () => {
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);

  <Button variant="primary" onClick={() => setCreateFormOpen(true)}></Button>;
  return (
    <Create>
      <SimpleForm>
        <TextInput source="Fecha" label="Fecha" />
      </SimpleForm>
    </Create>
  );
};*/

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

export const ReportsList = (props: any) => (
  <List /*filters={ReportFilter}*/>
    <ReportsView />
  </List>
);

/*
export const ReportCreate = () => {
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);

  <Button variant="primary" onClick={() => setCreateFormOpen(true)}></Button>;
  return (
    <Create>
      <SimpleForm>
        <TextInput source="Fecha" label="Fecha" />
      </SimpleForm>
    </Create>
  );
};*/
