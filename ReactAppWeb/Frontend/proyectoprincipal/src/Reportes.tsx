import { Accordion } from "react-bootstrap";
import {
  List,
  useListContext,
  ReferenceInput,
  TextInput,
  SelectInput,
  DateInput,
} from "react-admin";
/*import { report } from "process";*/

const ReportFilter = [<DateInput source="Fecha" label="Seleccionar fecha" />];

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
