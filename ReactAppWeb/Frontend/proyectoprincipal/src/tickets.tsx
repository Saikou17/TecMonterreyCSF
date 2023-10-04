import { List, Datagrid, TextField, Edit  } from "react-admin";

export const TicketsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id"/>
      <TextField source="Usuario"/>
      <TextField source="Lugar"/>
      <TextField source="Categoria"/>
      <TextField source="Tipo"/>
      <TextField source="Prioridad"/>
      <TextField source="Estado"/>
      <TextField source="Comentario"/>
      <TextField sorce="Registro"/>
    </Datagrid>
  </List>
);

// export const TicketEdit = () => (
//   <Edit>

//   </Edit>
// );
