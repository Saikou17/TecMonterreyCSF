import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { List, useListContext, TextInput, EditButton, SelectInput, useRecordContext,Edit, SimpleForm, RadioButtonGroupInput, Create, NumberInput, usePermissions } from 'react-admin';
import { format } from "date-fns";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import {CardEditCustomTool} from "./MyListToolBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyList.css';



const CardFilters = [
  <TextInput source="Usuario" label="Usuarios" reference="Tickets"/>,
  <NumberInput source="id" label="ID" reference="Tickets" />, //Input de referencia que busca o filtra al escribir el atributo id
  <SelectInput source="Prioridad" label="Prioridad" choices={[ //Input de seleccion que busca o filtra por atributo de prioridad
    {id: "Baja", name: "Bajo"}, //Prioridad baja
    {id: "Intermedia", name: "Intermedio"}, //Prioridad intermedia
    {id: "Alta", name: "Alto"}, //Prioridad alta
  ]}/>,
  <SelectInput source="Estado" label="Estado" choices={[ //Input de seleccion que busca o filtra por atributo de estado
    {id: "Sin Revisar", name: "Sin Revisar"}, //Estados sin revisar
    {id: "En Proceso", name: "En Proceso"}, //Estado en proceso
    {id: "Completado", name: "Completado"}, //Estado completado
  ]}/>,
  <SelectInput source="Categoria" choices={[ //Input de seleccion que busca o filtra por atributo de categoria 
    {id: "Servicios", name: "Servicios"}, 
    {id: "Digital", name: "Digital"},
    {id: "Infraestructura", name: "Infraestructura"},
    {id: "RecursosHumanos", name: "Recursos Humanos"},
    {id: "Beneficiarios", name: "Beneficiarios"},
    {id: "Mobiliarios", name: "Mobiliarios"},
    {id: "Seguridad", name: "Seguridad"},
    {id: "Materiales", name: "Materiales"},
    {id: "FenomenoMeteorologico", name: "Fenomeno Meteorologico"}
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                style={{
                  border:'5px',
                  width: '50px',
                  backgroundColor: '#D9D9D9',
                  marginBottom: '5px',
                  marginRight: '10px',
                  color: 'black',
                  textAlign: 'center',
                  
                }}
                onClick={() => openModal(ticket)}
              >
                <VisibilityIcon/>
              </Button>
              <EditButton
                icon={<EditIcon />}
                label="Editar"
                record={ticket}
                style={{
                  width: '50px',
                  backgroundColor: '#D9D9D9',
                  marginBottom: '5px',
                  marginRight: '10px',
                  color: 'black',
                  textAlign: 'center',
                }}
              />
            </div>
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

export const CardList = (props) => {
  // const {permissions} =usePermissions();
  // if(permissions==="Coordinador Nacional"){
  //   CardFilters.push(<TextInput source="Usuario" label="Usuarios" reference="Tickets"/>)
  // }
  return(
  <List filters={CardFilters}>
    <CardView />
  </List>
  )
};

const TicketTitle = () => {
  const Ticket = useRecordContext();
  return (<span>Ticket #{Ticket? `${Ticket.id}` : ''}</span>);
};

export const CardEdit = () => {
  const [categoriaActual,setCategoria] = useState("");

  const eventoCambioCategoria = (evento) => {
    setCategoria(evento.target.value)
  }

  const {permissions} = usePermissions();

  const TipoOpciones = {
    Servicios:[
      {id: "Agua", name: "Agua"},
      {id: "Luz", name: "Luz"},
      {id: "Telefono", name: "Telefono"},
      {id: "Basura", name: "Basura"},
      {id: "Limpieza del Aula", name: "Limpieza del Aula"}
    ],
    Digital:[
      {id: "Internet, Servicios y Equipo", name: "Internet, Servidores y Equipo"},
      {id: "Software", name: "Software"},
      {id: "Hardware", name: "Hardware"},
      {id: "Camaras de Seguridad", name: "Camaras de Seguridad"},
      {id: "Soporte tecnico presencial y remoto", name: "Soporte tecnico presencial y remoto"}
    ],
    Infraestructura:[
      {id: "Paredes", name: "Paredes"},
      {id: "Techo", name: "Techo"},
      {id: "Ventanas", name: "Ventanas"},
      {id: "Puertas", name: "Puertas"},
      {id: "Aulas en general", name: "Aulas en general"},
    ],
    RecursosHumanos:[
      {id: "Permisos", name: "Permisos"},
      {id: "Asistencias", name: "Asistencias"},
      {id: "Salud", name: "Salud"},
      {id: "Tramites", name: "Tramites"},
      {id: "Honorarios", name: "Honorarios"},
    ],
    Beneficiarios:[
      {id: "Asistencias", name: "Asistencias"},
      {id: "Documentacion", name: "Documentacion"},
      {id: "Apoyo Academico", name: "Apoyo Academico"},
      {id: "Salud", name: "Salud"},
      {id: "Seguridad y Bulling", name: "Seguridad y Bulling"},
    ],
    Mobiliarios:[
      {id: "Sillas y Butacas", name: "Sillas y Butacas"},
      {id: "Escritorios", name: "Escritorios"},
      {id: "Pizarrones", name: "Pizarrones"},
      {id: "Cafeteria", name: "Cafeteria"},
      {id: "Estantes y Archiveros", name: "Estantes y Archiveros"},
    ],
    Seguridad:[
      {id: "Delincuencia", name: "Delincuencia"},
      {id: "Robos", name: "Robos"},
      {id: "Vandalismo", name: "Vandalismo"},
      {id: "Imagen Institucional", name: "Imagen Institucional"},
    ],
    Materiales:[
      {id: "Educativos", name: "Educativos"},
      {id: "Papeleria", name: "Papeleria"},
      {id: "Limpieza", name: "Limpieza"},
    ],
    FenomenoMeteorologico:[
      {id: "Inundaciones", name: "Inundaciones"},
      {id: "Incendios", name: "Incendios"},
      {id: "Sismos", name: "Sismos"},
    ]
  };

  return (
    <Edit title={<TicketTitle/>}>
      <SimpleForm toolbar={<CardEditCustomTool/>}>
        <TextInput source="Lugar"/>
        <SelectInput source="Categoria" choices={[
          {id: "Servicios", name: "Servicios"},
          {id: "Digital", name: "Digital"},
          {id: "Infraestructura", name: "Infraestructura"},
          {id: "RecursosHumanos", name: "Recursos Humanos"},
          {id: "Beneficiarios", name: "Beneficiarios"},
          {id: "Mobiliarios", name: "Mobiliarios"},
          {id: "Seguridad", name: "Seguridad"},
          {id: "Materiales", name: "Materiales"},
          {id: "FenomenoMeteorologico", name: "Fenomeno Meteorologico"}
        ]} onChange={eventoCambioCategoria} />
        <SelectInput source="Tipo" choices={TipoOpciones[categoriaActual] || []}/>
        <RadioButtonGroupInput source="Prioridad" choices={[
            {id: "Baja", name: "Bajo"},
            {id: "Intermedia", name: "Intermedio"},
            {id: "Alta", name: "Alto"},
        ]}/>
        {permissions==="Coordinador Nacional" && <RadioButtonGroupInput source="Estado" choices={[
          {id: "Sin Revisar", name: "Sin Revisar"},
          {id: "En Proceso", name: "En Proceso"},
          {id: "Completado", name:"Completado"}
        ]}/>}
        <TextInput source="Comentario"/>
      </SimpleForm>
    </Edit>
  );
};

export const CardCreate = () => {
  const [categoriaActual,setCategoria] = useState("");

  const eventoCambioCategoria = (evento) => {
    setCategoria(evento.target.value)
  }

  const TipoOpciones = {
    Servicios:[
      {id: "Agua", name: "Agua"},
      {id: "Luz", name: "Luz"},
      {id: "Telefono", name: "Telefono"},
      {id: "Basura", name: "Basura"},
      {id: "Limpieza del Aula", name: "Limpieza del Aula"}
    ],
    Digital:[
      {id: "Internet, Servicios y Equipo", name: "Internet, Servidores y Equipo"},
      {id: "Software", name: "Software"},
      {id: "Hardware", name: "Hardware"},
      {id: "Camaras de Seguridad", name: "Camaras de Seguridad"},
      {id: "Soporte tecnico presencial y remoto", name: "Soporte tecnico presencial y remoto"}
    ],
    Infraestructura:[
      {id: "Paredes", name: "Paredes"},
      {id: "Techo", name: "Techo"},
      {id: "Ventanas", name: "Ventanas"},
      {id: "Puertas", name: "Puertas"},
      {id: "Aulas en general", name: "Aulas en general"},
    ],
    RecursosHumanos:[
      {id: "Permisos", name: "Permisos"},
      {id: "Asistencias", name: "Asistencias"},
      {id: "Salud", name: "Salud"},
      {id: "Tramites", name: "Tramites"},
      {id: "Honorarios", name: "Honorarios"},
    ],
    Beneficiarios:[
      {id: "Asistencias", name: "Asistencias"},
      {id: "Documentacion", name: "Documentacion"},
      {id: "Apoyo Academico", name: "Apoyo Academico"},
      {id: "Salud", name: "Salud"},
      {id: "Seguridad y Bulling", name: "Seguridad y Bulling"},
    ],
    Mobiliarios:[
      {id: "Sillas y Butacas", name: "Sillas y Butacas"},
      {id: "Escritorios", name: "Escritorios"},
      {id: "Pizarrones", name: "Pizarrones"},
      {id: "Cafeteria", name: "Cafeteria"},
      {id: "Estantes y Archiveros", name: "Estantes y Archiveros"},
    ],
    Seguridad:[
      {id: "Delincuencia", name: "Delincuencia"},
      {id: "Robos", name: "Robos"},
      {id: "Vandalismo", name: "Vandalismo"},
      {id: "Imagen Institucional", name: "Imagen Institucional"},
    ],
    Materiales:[
      {id: "Educativos", name: "Educativos"},
      {id: "Papeleria", name: "Papeleria"},
      {id: "Limpieza", name: "Limpieza"},
    ],
    FenomenoMeteorologico:[
      {id: "Inundaciones", name: "Inundaciones"},
      {id: "Incendios", name: "Incendios"},
      {id: "Sismos", name: "Sismos"},
    ]
  };
  
  return (<Create>
    <SimpleForm>
      <TextInput source="Lugar"/>
      <SelectInput source="Categoria" choices={[ //Input de seleccion que busca o filtra por atributo de categoria 
        {id: "Servicios", name: "Servicios"}, 
        {id: "Digital", name: "Digital"},
        {id: "Infraestructura", name: "Infraestructura"},
        {id: "RecursosHumanos", name: "Recursos Humanos"},
        {id: "Beneficiarios", name: "Beneficiarios"},
        {id: "Mobiliarios", name: "Mobiliarios"},
        {id: "Seguridad", name: "Seguridad"},
        {id: "Materiales", name: "Materiales"},
        {id: "FenomenoMeteorologico", name: "Fenomeno Meteorologico"}
      ]} onChange={eventoCambioCategoria}/>
        <SelectInput source="Tipo" choices={TipoOpciones[categoriaActual] || []}/>
        <RadioButtonGroupInput source="Prioridad" choices={[
            {id: "Baja", name: "Bajo"},
            {id: "Intermedia", name: "Intermedio"},
            {id: "Alta", name: "Alto"},
        ]}/>
        <TextInput source="Comentario"/>
    </SimpleForm>
  </Create>);
};

