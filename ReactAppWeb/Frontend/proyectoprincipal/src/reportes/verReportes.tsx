import { List, Datagrid, TextField, EmailField } from "react-admin";

export const Reportes = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <TextField source="website" />
    </Datagrid>
  </List>
);
