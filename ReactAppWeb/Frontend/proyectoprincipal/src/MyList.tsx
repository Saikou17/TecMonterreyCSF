import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { List, useListContext, ReferenceInput, TextInput, EditButton } from 'react-admin';
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
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  return (
    <div>
      {data?.map(post => (
        <Card key={post.id} style={{ backgroundColor: '#FCFAFA', width: '17.5rem', height: '17.5rem', display: 'inline-flex', margin: '10px 5px 15px 20px' }}>
          <Card.Body style={{ padding: '0px' }}>
            <Card.Header style={{ backgroundColor: '#D9D9D9' }}>{post.id}</Card.Header>
            <Card.Title style={{ marginLeft: '5px', marginBottom: '5px', textAlign: 'center', marginTop: '50px' }}>{post.title}</Card.Title>
            <Button style={{width: '50px', backgroundColor: '#4CB0FC', marginBottom: '5px', left: '225px', right: '10px', display: 'block', bottom: '40px', position: 'absolute', color: 'white', textAlign: 'center',}} onClick={() => openModal(post)}>
              Ver
            </Button>
            <EditButton label="Editar" record={post} style={{ width: '70px', backgroundColor: '#4CB0FC', marginBottom: '5px', left: '5px', right: '10px', display: 'block', bottom: '40px', position: 'absolute', color: 'white', textAlign:'center'}}/>
            <Card.Footer style={{ borderColor: 'black', backgroundColor: '#FCFAFA', position: 'absolute', bottom: '0', width: '17.5rem' }}>
              <small className="text-muted" style={{ textAlign: 'center' }}>{"Id usuario: "}{post.userId}</small>
            </Card.Footer>
          </Card.Body>
        </Card>
      ))}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <div>
              <h1>{selectedPost.title}</h1>
              <p>{selectedPost.body}</p>
              <p>Id usuario: {selectedPost.userId}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const CardList = (props: any) => (
  <List filters={postFilters}>
    <CardView />
  </List>
);
