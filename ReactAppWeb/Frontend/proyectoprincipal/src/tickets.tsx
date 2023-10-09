import { useState } from "react";
import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, SelectInput, RadioButtonGroupInput, Create, DateInput } from "react-admin";

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

export const TicketEdit = () => {
  const [categoriaActual,setCategoria] = useState("");

  const eventoCambioCategoria = (evento: any) => {
    setCategoria(evento.target.value)
  }

  const TipoOpciones: Record<string,{id: string, name: string}[]> = {
    serv:[
      {id: "agua", name: "Agua"},
      {id: "luz", name: "Luz"},
      {id: "telefono", name: "Telefono"},
      {id: "basura", name: "Basura"},
      {id: "limpieza", name: "Limpieza del Aula"}
    ],
    dig:[
      {id: "internet", name: "Internet, Servidores y Equipo"},
      {id: "software", name: "Software"},
      {id: "hardware", name: "Hardware"},
      {id: "camaras", name: "Camaras de Seguridad"},
      {id: "soporte", name: "Soporte tecnico presencial y remoto"}
    ],
    infra:[
      {id: "paredes", name: "Paredes"},
      {id: "techo", name: "Techo"},
      {id: "ventanas", name: "Ventanas"},
      {id: "puertas", name: "Puertas"},
      {id: "aulas", name: "Aulas en general"},
    ],
    rc:[
      {id: "permisos", name: "Permisos"},
      {id: "Asistencias", name: "Asistencias"},
      {id: "salud", name: "Salud"},
      {id: "tramites", name: "Tramites"},
      {id: "honorarios", name: "Honorarios"},
    ],
    bene:[
      {id: "asistencias", name: "Asistencias"},
      {id: "documentacion", name: "Documentacion"},
      {id: "apoyo", name: "Apoyo Academico"},
      {id: "salud", name: "Salud"},
      {id: "seguridad", name: "Seguridad y Bulling"},
    ],
    mobi:[
      {id: "sillas", name: "Sillas y Butacas"},
      {id: "escritorios", name: "Escritorios"},
      {id: "pizarrones", name: "Pizarrones"},
      {id: "cafeteria", name: "Cafeteria"},
      {id: "estantes", name: "Estantes y Archiveros"},
    ],
    segu:[
      {id: "delincuencia", name: "Delincuencia"},
      {id: "robos", name: "Robos"},
      {id: "vandalismo", name: "Vandalismo"},
      {id: "imagen", name: "Imagen Institucional"},
    ],
    mate:[
      {id: "educativos", name: "Educativos"},
      {id: "papeleria", name: "Papeleria"},
      {id: "limpieza", name: "Limpieza"},
    ],
    fm:[
      {id: "inundaciones", name: "Inundaciones"},
      {id: "incendios", name: "Incendios"},
      {id: "sismos", name: "Sismos"},
    ]
  };

  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id"/>
        <TextInput source="Lugar"/>
        <SelectInput source="Categoria" choices={[
          {id: "serv", name: "Servicios"},
          {id: "dig", name: "Digital"},
          {id: "infra", name: "Infraestructura"},
          {id: "rc", name: "Recursos Humanos"},
          {id: "bene", name: "Beneficiarios"},
          {id: "mobi", name: "Mobiliarios"},
          {id: "segu", name: "Seguridad"},
          {id: "mate", name: "Materiales"},
          {id: "fm", name: "Fenomeno Meteorologico"}
        ]} onChange={eventoCambioCategoria} />
        <SelectInput source="Tipo" choices={TipoOpciones[categoriaActual] || []}/>
        <RadioButtonGroupInput source="Prioridad" choices={[
            {id: "normal", name: "Bajo"},
            {id: "medio", name: "Intermedio"},
            {id: "grave", name: "Alto"},
        ]}/>
        <TextInput source="Comentario"/>
      </SimpleForm>
    </Edit>
  );};

export const TicketCreate = () => {
  const [categoriaActual,setCategoria] = useState("");

  const eventoCambioCategoria = (evento: any) => {
    setCategoria(evento.target.value)
  }

  const TipoOpciones: Record<string,{id: string, name: string}[]> = {
    serv:[
      {id: "agua", name: "Agua"},
      {id: "luz", name: "Luz"},
      {id: "telefono", name: "Telefono"},
      {id: "basura", name: "Basura"},
      {id: "limpieza", name: "Limpieza del Aula"}
    ],
    dig:[
      {id: "internet", name: "Internet, Servidores y Equipo"},
      {id: "software", name: "Software"},
      {id: "hardware", name: "Hardware"},
      {id: "camaras", name: "Camaras de Seguridad"},
      {id: "soporte", name: "Soporte tecnico presencial y remoto"}
    ],
    infra:[
      {id: "paredes", name: "Paredes"},
      {id: "techo", name: "Techo"},
      {id: "ventanas", name: "Ventanas"},
      {id: "puertas", name: "Puertas"},
      {id: "aulas", name: "Aulas en general"},
    ],
    rc:[
      {id: "permisos", name: "Permisos"},
      {id: "Asistencias", name: "Asistencias"},
      {id: "salud", name: "Salud"},
      {id: "tramites", name: "Tramites"},
      {id: "honorarios", name: "Honorarios"},
    ],
    bene:[
      {id: "asistencias", name: "Asistencias"},
      {id: "documentacion", name: "Documentacion"},
      {id: "apoyo", name: "Apoyo Academico"},
      {id: "salud", name: "Salud"},
      {id: "seguridad", name: "Seguridad y Bulling"},
    ],
    mobi:[
      {id: "sillas", name: "Sillas y Butacas"},
      {id: "escritorios", name: "Escritorios"},
      {id: "pizarrones", name: "Pizarrones"},
      {id: "cafeteria", name: "Cafeteria"},
      {id: "estantes", name: "Estantes y Archiveros"},
    ],
    segu:[
      {id: "delincuencia", name: "Delincuencia"},
      {id: "robos", name: "Robos"},
      {id: "vandalismo", name: "Vandalismo"},
      {id: "imagen", name: "Imagen Institucional"},
    ],
    mate:[
      {id: "educativos", name: "Educativos"},
      {id: "papeleria", name: "Papeleria"},
      {id: "limpieza", name: "Limpieza"},
    ],
    fm:[
      {id: "inundaciones", name: "Inundaciones"},
      {id: "incendios", name: "Incendios"},
      {id: "sismos", name: "Sismos"},
    ]
  };
  
  return (<Create>
    <SimpleForm>
      <DateInput source="Registro"/>
      <TextInput source="Lugar"/>
      <SelectInput source="Categoria" choices={[
          {id: "serv", name: "Servicios"},
          {id: "dig", name: "Digital"},
          {id: "infra", name: "Infraestructura"},
          {id: "rc", name: "Recursos Humanos"},
          {id: "bene", name: "Beneficiarios"},
          {id: "mobi", name: "Mobiliarios"},
          {id: "segu", name: "Seguridad"},
          {id: "mate", name: "Materiales"},
          {id: "fm", name: "Fenomeno Meteorologico"}
        ]} onChange={eventoCambioCategoria} />
        <SelectInput source="Tipo" choices={TipoOpciones[categoriaActual] || []}/>
        <RadioButtonGroupInput source="Prioridad" choices={[
            {id: "normal", name: "Bajo"},
            {id: "medio", name: "Intermedio"},
            {id: "grave", name: "Alto"},
        ]}/>
        <TextInput source="Comentario"/>
    </SimpleForm>
  </Create>);

};
