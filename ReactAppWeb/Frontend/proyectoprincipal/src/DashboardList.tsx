import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { CardList } from "./MyList";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  ReferenceInput,
  TextInput,
  useRecordContext,
} from "react-admin";

export const DashboardList = () => {
  return (
    <div className="DashboardList">
      <Card>
        <CardHeader title="Bienvenido a Fundación Por México" />
        <CardContent>Aquí podra trmitar su ticket</CardContent>
      </Card>

      <CardList>
        <TextField source="id" />
        <ReferenceField source="userId" reference="users" link="show" />
        <TextField source="title" />
      </CardList>
    </div>
  );
};
