// in src/users.tsx
import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField} from "react-admin";
import MyUrlField from "./MyUrlField";

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <TextField source="name" label="Nombre" />
                    <EmailField source="email" label="Correo"/>
                    <TextField source="phone" label = "Telefóno" />
                    <MyUrlField source="website" />
                    <TextField source="company.name" label="Nombre Empresa" />
                </Datagrid>
            )}
        </List>
    );
};