import { List, Datagrid, TextField, EmailField, UrlField } from "react-admin";
import MyUrlField from "./MyUrlField";

export const TicketsList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source='Numero' />
      <TextField source="Usuario"/>
      <TextField source="Lugar"/>
      <TextField source="Categoria"/>
      <TextField source="Tipo"/>
      <TextField source="Prioridad"/>
      <TextField source="Estado"/>
      <TextField source="Comentario"/>
      <TextField source="Registro"/>
    </Datagrid>
  </List>
);
