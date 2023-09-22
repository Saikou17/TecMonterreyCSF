// in src/posts.tsx
import { List, Datagrid, TextField, ReferenceField, EditButton, Edit, SimpleForm, ReferenceInput, TextInput, Create} from "react-admin";
import { useRecordContext } from "react-admin";
const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];

export const PostEdit = () => (
    <Edit title={<PostTitle/>}>
        <SimpleForm >
            <TextInput source="id" disabled />
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" />
            <TextInput source="body" multiline rows={5} />
        </SimpleForm>
    </Edit>
);

export const PostCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users"/>
            <TextInput source="title" />
            <TextInput source="body" multiline rows={5} />
        </SimpleForm>
    </Create>
);

export const PostTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ""}</span>;
}

export const PostList = () => (
    <List filters={postFilters} >
        <Datagrid>
            <TextField source="id"  />
            <ReferenceField source="userId" reference="users" link="show" label = " ID Usuario" />
            <TextField source="title" label="Titulo" />
            <TextField source="body" label="Texto"/>
            <EditButton />
        </Datagrid>
    </List>
);