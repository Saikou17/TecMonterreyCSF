# Proyecto Solidario: Fundacion Por Mexico

## Integrantes

* Juan Pablo Cruz Rodriguez A01783208
* Angel
* Daniel
* Juan Pablo

## Introduccion

Fundación por México es una organización civil que lucha por los mexicanos en términos de igualdad de oportunidades. Acciona programas de educación, capacitación, y desarrollo de competencias para integrar a los mexicanos en diferentes ámbitos. Generan oferta para la población en situación de vulnerabilidad que no estudia ni trabaja, implementando estrategias de colaboración entre sectores públicos, privados y no gubernamentales.

Actualmente, Fundación por México se encuentra en varias sedes las cuales contienen diferentes infraestructuras donde llevan a cabo su misión principal. Estas infraestructuras cuentan con distintas aulas y cierto personal encargado de su administración. Sin embargo, últimamente se les ha dificultado reportar incidentes y visualizarlos, dentro de estas aulas.

## Solucion del Proyecto

El procedimiento se llevará a cabo mediante la generación de tickets por parte de los coordinadores de las aulas, empleando la plataforma que será desarrollada. Esta aplicación no solo facilitará la creación de tickets, sino que también habilitará la posibilidad de acceder y comentar sobre diversos tipos de incidentes o situaciones; de igual manera se espera que la interfaz del usuario sea sencilla de manipular, para que personas sin mucho conocimiento de tecnología puedan hacer uso de la sitio web. Esta funcionalidad desempeñará un papel fundamental en la resolución efectiva de cada problemática presentada.

## Parte de la Aplicacion Web

1. Base de Datos (MongoDB)
2. Creacion de API (Application Programming Interface)
3. Pagina Web (React-Admin)

## Lista de Tareas

* [ ] Documentacion de MongoDB
  * [ ] Analisis de Datos
* [ ] Creacion de Base de Datos en MongoDB
* [ ] Documentacion API
* [ ] Creacion de API
* [ ] Documentacion de React-Admin
  * [ ] Hooks
* [ ] Creacion Pagina Web

## Documentacion MongoDB

Agregar aqui los comandos o procedimiento que utilizamos.

Las colecciones es un tipo de documento que guarda datos de tipo JSON. Normalmente usamos las colecciones en este reto, para la creacion de nuestros datos.

### Analisis de datos

1. Coleccion: Usuarios
   1. Nombre
   2. Usuario
   3. Contraseña
   4. Rol
   5. Ultimo-Incio

2. Coleccion: Tickets
   1. Id/Numero del Ticket
   2. Usuario del Ticket
   3. Hora y Fecha del Ticket
   4. Lugar del Ticket
   5. Categoria del Problema
   6. Estado del Ticket
   7. Prioridad del Ticket
   8. Comentario del Ticket

3. Coleccion: Reportes Semanales
   1. Cargo del Usuario
   2. Fecha y hora
   3. Cantidad de tickets reportados en la semana (por aula y por localizacion)
   4. Categorias mas reportadas
   5. Estado de los tickets
   6. Prioridad de los tickets
   7. Observaciones
   8. Mensaje o Comentarios Extras

## Creacion de Base de Datos de MongoDB
