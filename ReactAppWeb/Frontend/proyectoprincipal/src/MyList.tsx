import React from 'react';
import { Button, Card } from "react-bootstrap";
import {
  List,
  useListContext,
  ReferenceInput,
  TextInput,
  AutocompleteArrayInput,
  EditButton, // Importa EditButton desde React Admin
} from "react-admin";
import 'bootstrap/dist/css/bootstrap.min.css';

const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="userId" label="User" reference="users" />,
];

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const CardView = () => {
  const { data } = useListContext<Post>();
  return (
    <div>
      {data?.map(post => (
        <Card key={post.id} style={{ backgroundColor: '#FCFAFA', width: '17.5rem', height: '17.5rem', display: 'inline-flex', margin: ' 10px 5px 15px 20px' }}>
          <Card.Body style={{ padding: '0px' }}>
            <Card.Header style={{ backgroundColor: '#D9D9D9' }}>{post.id}</Card.Header>
            <Card.Title style={{ marginLeft: ' 5px', marginBottom: '5px', textAlign:'center', marginTop:'50px' }}>{post.title}</Card.Title>
            <EditButton label="Editar" record={post} style={{ width: '70px', backgroundColor: '#4CB0FC', marginBottom: '5px', left: '200px', right: '10px', display: 'block', bottom: '40px', position: 'absolute', color: 'white', textAlign:'center'}}/>
            <Card.Footer style={{ borderColor: 'black', backgroundColor: '#FCFAFA', position: 'absolute', bottom: '0', width: '17.5rem' }}>
              <small className="text-muted" style={{ textAlign: 'center' }}>{"Id usuario: "}{post.userId}</small>
            </Card.Footer>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export const CardList = (props: any) => (
  <List filters={postFilters}>
    <CardView />
  </List>
)
