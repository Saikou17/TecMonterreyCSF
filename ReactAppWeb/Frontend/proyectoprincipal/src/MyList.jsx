import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { List, useListContext, ReferenceInput, TextInput, EditButton, SelectInput } from 'react-admin';
import { format } from "date-fns";
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyList.css';


const CardFilters = [
  <TextInput source="Usuario" label="Search" alwaysOn />, //Input de texto que busca o filtra por el atributo Usuario 
  <ReferenceInput source="id" label="ID" reference="Tickets" />, //Input de referencia que busca o filtra al escribir el atributo id
  <SelectInput source="Prioridad" label="Prioridad" choices={[ //Input de seleccion que busca o filtra por atributo de prioridad
    {id: "normal", name: "Bajo"}, //Prioridad baja
    {id: "medio", name: "Intermedio"}, //Prioridad intermedia
    {id: "grave", name: "Alto"}, //Prioridad alta
  ]}/>,
  <SelectInput source="Estado" label="Estado" choices={[ //Input de seleccion que busca o filtra por atributo de estado
    {id: "incompleto", name: "Sin Revisar"}, //Estados sin revisar
    {id: "trabajando", name: "En Proceso"}, //Estado en proceso
    {id: "completado", name: "Completado"}, //Estado completado
  ]}/>,
  <SelectInput source="Categoria" choices={[ //Input de seleccion que busca o filtra por atributo de categoria 
    {id: "serv", name: "Servicios"}, 
    {id: "dig", name: "Digital"},
    {id: "infra", name: "Infraestructura"},
    {id: "rc", name: "Recursos Humanos"},
    {id: "bene", name: "Beneficiarios"},
    {id: "mobi", name: "Mobiliarios"},
    {id: "segu", name: "Seguridad"},
    {id: "mate", name: "Materiales"},
    {id: "fm", name: "Fenomeno Meteorologico"}
  ]}/>
];

const CardView = () => { //Componente que genera una carta
  const { data } = useListContext(); //Hook que guarda todos los tickets 
  const [showModal, setShowModal] = useState(false); //Hook que guarda el estado (cerrado o abierto) del ticket
  const [selectedPost, setSelectedPost] = useState(null); //Hook que guarda el ticket actual

  const openModal = (ticket) => { //Funcion (abrirModal) que recibe un ticket
    setSelectedPost(ticket); //Cambia la variable selectedPost al ticket actual del parametro
    setShowModal(true); //Cambia de flase a true la variable showModal
  };

  const closeModal = () => { //Funcion (cerraModal) que no recibe mada de parametros
    setSelectedPost(null); //Cambia la variable selectedPost a null
    setShowModal(false);//Cambia de true a false la variable showModal
  };

  return (
    <div>
      {data?.map(ticket => (
        <Card key={ticket.id} style={{ backgroundColor: '#FCFAFA', width: '17.5rem', height: '17.5rem', display: 'inline-flex', margin: '10px 5px 15px 20px' }}>
          <Card.Body style={{ padding: '0px' }}>
            <Card.Header style={{ backgroundColor: '#D9D9D9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px' }}>
                <span>Id: {ticket.id}</span>
                <span>Estado: {ticket.Estado}</span>
              </div>
            </Card.Header>
            <Card.Title style={{ marginLeft: '5px', marginBottom: '5px', textAlign: 'center', marginTop: '50px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>Categoria: {ticket.Categoria}</span>
                <span>Prioridad: {ticket.Prioridad}</span>
                <span>Usuario: {ticket.Usuario}</span>
              </div>
            </Card.Title>
            <Button style={{width: '50px', backgroundColor: '#4CB0FC', marginBottom: '5px', left: '225px', right: '10px', display: 'block', bottom: '40px', position: 'absolute', color: 'white', textAlign: 'center',}} onClick={() => openModal(ticket)}>
              Ver
            </Button>
            <EditButton label="Editar" record={ticket} style={{ width: '70px', backgroundColor: '#4CB0FC', marginBottom: '5px', left: '5px', right: '10px', display: 'block', bottom: '40px', position: 'absolute', color: 'white', textAlign:'center'}}/>
            <Card.Footer style={{ borderColor: 'black', backgroundColor: '#FCFAFA', position: 'absolute', bottom: '0', width: '17.5rem' }}>
              <small className="text-muted" style={{ textAlign: 'center' }}>{"Creado el "}{format(new Date(ticket.Registro), "yyyy-MM-dd")}</small>
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
              <h2 style={{ marginBottom: '10px' }}>Categoria: {selectedPost.Categoria}</h2>
              <h2 style={{ marginBottom: '10px' }}>Tipo: {selectedPost.Tipo}</h2>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <p style={{ margin: '0' }}><b>Emitido por:</b> {selectedPost.Usuario}</p>
                <p><b>Lugar:</b> {selectedPost.Lugar}</p>
              </div>
              <p>{selectedPost.Comentario}</p>
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

export const CardList = (props) => (
  <List filters={CardFilters}>
    <CardView />
  </List>
);
