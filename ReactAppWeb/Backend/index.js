const express = require("express") //Node.js (Servidor en Js) busca en sus modulos el framework (entorno de trabajo) y lo guarda en express.
const MongoClient = require("mongodb").MongoClient //Importamos el modulo de Mongo para Node.js y llamamos a su cñase (MongoClient) para conectar nuestra base de datos local
bodyParset = require("body-parser") //Importamos el modulo que analiza la solicitudes HTTP 
let cors = require("cors") //Implementa el modulo que perimite acceder a nuestra API desde diferentes dominios
const bcrypt=require("bcrypt") // bcrypt es una librería utilizada para el hashing seguro de contraseñas.
const jwt=require("jsonwebtoken")// jsonwebtoken es una librería utilizada para la autenticación basada en tokens
const https=require('https')
const fs=require('fs')

let db; //Variable que guarda 
const app = express(); //Instancia a Express
app.use(cors()); //Activa el modulo
app.use(bodyParset.json()); //Actuva el modulo
async function connectDB(){ //Funcion que retorna una promesa implicita (valor que puede tardar)
    let client = new MongoClient("mongodb+srv://a01783208:lFASNJWi9CpImoOd@cluster0.zgyl4mg.mongodb.net/RetoTC2007B"); //Variable que guarda un cliente hacia nuetra base de datos
    await client.connect(); //Espera que la base de datos se conecte antes de seguir con el codigo
    db=client.db(); //La variable guarda nuestra base de datos RetoTC2007B
    console.log("Conexion exitosa")
}

async function LogIn(sujeto,accion,objeto){ //Funcion asincronica que recibe e parametros
    toLog = {}; //Creamos un objeto vacio
    toLog["timestamp"] = new Date(); //Creamos una fecha que se guarda en el parametro de TimeStamp
    toLog["sujeto"]=sujeto;//Creamos un sujeto
    toLog["accion"]=accion;//Creamos una accion
    toLog["objeto"]=objeto;//Creamos un objeto
    await db.collection("Log").insertOne(toLog);
}

//**Implementamos los metodos GET y los endpoints */
//** La operacion que realizan estos netodos del CRUD es la de Read */

app.get("/Tickets",async(req,res)=>{ //Funcion asincronica que utiliza el metodos GET. Recibe un request (Endpoint) y devuelve un Response (Record Json)
    console.log(req.body);
    console.log(req.query);
    try{
        let token=req.get("Authentication"); //Se obtiene el elemento de autenticacion del encabezado HTTP
        let verifiedToken = await jwt.verify(token, "secretKey"); //Usamos la libreria para verikicar que el Token (Autenticacion) utilizando la llave secreta
        let authData=await db.collection("Usuarios").findOne({"Usuario": verifiedToken.Usuario}) // Obtenemos la informacion del usuario que esta autenticado
        let parametersFind={} //Creamos un objeto vacio
        if(authData.Rol=="Coordinador Nacional"){ // Si el usuario es coordinador nacional 
            parametersFind["Usuario"]=verifiedToken.Usuario; //? Guardamos un parametro Usuario que guarda la informacion del usuario
        }
        else if(authData.Rol=="Coordinador Aula"){
            parametersFind["Usuario"]=verifiedToken.Usuario; //Solo busca aquellos alumnos que esten en su
        }
        else if(authData.Rol=="Ejecutivo"){
            parametersFind["Usuario"]=verifiedToken.Usuario; //Solo busca aquellos alumnos que esten en su
        }
    if("_sort" in req.query){ //Metodo getList. Busca en los parametros del endpoint (Query)
        let sortBy = req.query._sort; //Guarda el valor del parametro Sort
        let sortOrder = req.query._order=="ASC"?1:-1; //Guarda el valor del parametro Order
        let start = Number (req.query._start); //GUarda el valor del parametro Start en numero
        let end = Number (req.query._end); //Guarda el valor del parametro ENd en numero
        let sorter = {} //Crea un objeto que posee un atributo o propiedad
        sorter[sortBy]=sortOrder;
        let Query = {}
        if("id" in req.query){
            Query["id"]=Number(req.query.id);
        }
        if("Estado" in req.query){
            Query["Estado"]=req.query.Estado;
        }
        if("Prioridad" in req.query){
            Query["Prioridad"]=req.query.Prioridad;
        }
        if("Categoria" in req.query){
            Query["Categoria"]=req.query.Categoria;
        }
        console.log(Query);
        console.log(sorter);
        let data = await db.collection("Tickets").find(Query).sort(sorter).project({_id:0}).toArray(); //Se utiliza el syntax de Mongodb para buscar de manera ascendente o descendente de un atributo mienstras usamos pryeccion para excluir ciertos datos
        res.set("Access-Control-Expose-Headers","X-Total-Count"); //Headers de respuesta 
        res.set("X-Total-Count",data.length); //Headers de respuesta
        data = data.slice(start,end); 
        res.json(data); //Response Final
    }
    else if("id" in req.query){ //Metodo getMany
        let data = [] //Creamos un arreglo, ya que vamos a guardar varias busquedas o responses
        for(let index=0; index < req.query.id.length; index++){ // Iteramos todo los parametros del endpoint
            let dbData = await db.collection("Tickets").find({id: Number(req.query.id[index])}).project({_id:0}).toArray(); // Buscamos los elementos en nuestra bae de datos con find
            data = await data.concat(dbData); // Concatenamos los resultados en un arreglo
        }
        res.json(data); //Response Final
    }else{ //Metodo getReference
        let data = await db.collection("Tickets").find(req.query).project({_id:0}).toArray();
        res.set("Access-Control-Expose-Headers","X-Total-Count"); //Headers de respuesta 
        res.set("X-Total-Count",data.lenght); //Headers de respuesta
        res.json(data); //Response Final
    }
    }catch{
        res.sendStatus(401);// Se manda un mensaje de error de cliente si el try no funciona
    }
})

app.get("/Tickets/:id",async (req,res) =>{ //Funcion asincronica que obtiene un elemento.
    try{
        let token=req.get("Authentication"); // Obtiene el token de autenticacion del encabezado del Req
        let verifiedToken = await jwt.verify(token, "secretKey"); //Verifica si el token se obtiene con la llave
        let authData=await db.collection("Usuarios").findOne({"Usuario": verifiedToken.Usuario}) //Obtiene la informacion del usuario verificado
        let parametersFind={"id": Number(req.params.id)} //Obtiene el id del request
        if(authData.Rol=="Coordinador Nacional"){ // Si el usuario es coordinador nacional 
            parametersFind["Usuario"]=verifiedToken.Usuario; //? Guardamos un parametro Usuario que guarda la informacion del usuario
        }
        else if(authData.Rol=="Coordinador Aula"){
            parametersFind["Usuario"]=verifiedToken.Usuario; //Solo busca aquellos alumnos que esten en su
        }
        else if(authData.Rol=="Ejecutivo"){
            parametersFind["Usuario"]=verifiedToken.Usuario; //Solo busca aquellos alumnos que esten en su
        }
        let data = await db.collection("Tickets").find({id : Number(req.params.id)}).project({_id:0}).toArray(); //Busca en la coleccion de Tickets el numero de ticket y revuelve un arreglo
        res.json(data[0]) //Devuelve el primer elemento del arreglo
        //? Porque guardamos el data en un arreglo
    }catch{
        res.sendStatus(401);// Mensaje de error si no funciona el try
    }
})

app.get("/Dashboard",async(req,res)=>{
    try{
        let token=req.get("Authentication"); // Obtiene el token de autenticacion del encabezado del Req
        let verifiedToken = await jwt.verify(token, "secretKey"); //Verifica si el token se obtiene con la llave
        let authData=await db.collection("Usuarios").findOne({"Usuario": verifiedToken.Usuario}) //Obtiene la informacion del usuario verificado
        let parametersFind={} //Obtiene el id del request
        if(authData.Rol=="Coordinador Nacional"){ // Si el usuario es coordinador nacional 
            parametersFind["Usuario"]=verifiedToken.Usuario; //? Guardamos un parametro Usuario que guarda la informacion del usuario
        }
        else if(authData.Rol=="Coordinador Aula"){
            parametersFind["Usuario"]=verifiedToken.Usuario; //Solo busca aquellos alumnos que esten en su
        }
        else if(authData.Rol=="Ejecutivo"){
            parametersFind["Usuario"]=verifiedToken.Usuario; //Solo busca aquellos alumnos que esten en su
        }
    }catch{
        res.sendStatus(401);// Mensaje de error si no funciona el try
    }

})

/*Prueba de conectar los reportes*/
app.get("/Reportes", async (req, res) => {
    console.log(req.query); 
    try {
      const token = req.get("Authentication");
      const verifiedToken = await jwt.verify(token, "secretKey");
      const authData = await db.collection("Usuarios").findOne({ "Usuario": verifiedToken.Usuario });
      const parametersFind = {};
      if (authData.Rol == "Coordinador Nacional") {
        parametersFind["Usuario"] = verifiedToken.Usuario;
      } else if (authData.Rol == "Coordinador Aula") {
        parametersFind["Usuario"] = verifiedToken.Usuario;
      } else if (authData.Rol == "Ejecutivo"){
        parametersFind["Usuario"] = verifiedToken.Usuario;
      }
      if ("_sort" in req.query) {
        const sortBy = req.query._sort;
        const sortOrder = req.query._order == "ASC" ? 1 : -1;
        const start = Number(req.query._start);
        const end = Number(req.query._end);
        const sorter = {};
        sorter[sortBy] = sortOrder;
        let Query = {}
        if ("Fecha" in req.query) {
            const fechaOriginal = req.query.Fecha; // Fecha en formato '2023-10-14'
            const partesFecha = fechaOriginal.split('-'); // Dividir la fecha en partes usando el guion como separador
            Query["Fecha"] = `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`; // Formatear la fecha en el nuevo formato
            console.log(Query)
          }
        const data = await db.collection("Reportes").find(Query).sort(sorter).project({ _id: 0 }).toArray();
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", data.length);
        const slicedData = data.slice(start, end);
        console.log(slicedData);
        res.json(slicedData);
      } 
        else if ("id" in req.query) {
        const data = [];
        for (let index = 0; index < req.query.id.length; index++) {
          const dbData = await db.collection("Reportes").find({ id: Number(req.query.id[index]) }).project({ _id: 0 }).toArray();
          data.push(...dbData);
        }
        res.json(data);
      }
      else {
        const data = await db.collection("Reportes").find(parametersFind).project({ _id: 0 }).toArray();
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", data.length);
        console.log(data);
        res.json(data);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(401);
    }
  });
  




//**Implementamos los metodos POST y los endpoints */
//** La operacion que realizan estos netodos del CRUD es la de Create */

app.post("/Tickets/",async (req,res)=>{ //FUncion asincronica que recibe un request (URL) y devuelve un response en forma de crear un elemento
    try{
        let token=req.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let addValues = req.body; //Guardamos el cuerpo o los datos del URL
        let data = await db.collection("Tickets").find({}).toArray(); //Obtenemos todos los tickets
        let id = data.length+1; //Variable que guarda un numero que le sigue al ultimo ticket
        addValues["id"] = id; //Agregamos un nuevo valor al parametro del request
        addValues["Usuario"] = verifiedToken.Usuario;
        addValues["Registro"] = new Date();
        addValues["Estado"] = "Sin Revisar";
        let authData=await db.collection("Usuarios").findOne({"Usuario": verifiedToken.Usuario}) //Obtiene la informacion del usuario verificado
        let parametersFind={} //Obtiene el id del request
        if(authData.Rol=="Coordinador Nacional"){ // Si el usuario es coordinador nacional 
            parametersFind["Usuario"]=verifiedToken.Usuario; //? Guardamos un parametro Usuario que guarda la informacion del usuario
        }
        else if(authData.Rol=="Coordinador Aula"){
            parametersFind["Usuario"]=verifiedToken.Usuario; //Solo busca aquellos alumnos que esten en su
        }
        else if(authData.Rol=="Ejecutivo"){
            parametersFind["Usuario"]=verifiedToken.Usuario; //Solo busca aquellos alumnos que esten en su
        }
        data = await db.collection("Tickets").insertOne(addValues); //Insertamos en nuestra base de datos el elemento o ticket
        res.json(data); //Response Final
    }catch{
        res.sendStatus(401);
    }    
})

app.post("/Registrarse", async (req, res) => {
    try {
        const user = req.body.Usuario;
        const password = req.body.Contrasena;
        const name = req.body.Nombre;
        const rol = req.body.Rol;
        console.log(req.body);
        const data = await db.collection("Usuarios").findOne({ "Usuario": user });
        console.log(data);

        if (data!=null) {
            res.sendStatus(409); // Usuario ya existe
            return; // Salimos del controlador de ruta
        }

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(password, salt, async (error, hash) => {
                if (error) {
                    res.sendStatus(401); // Error al generar el hash
                    return;
                }

                const id = Math.floor(Math.random() * 100);
                const id_already = await db.collection("Usuarios").findOne({ "id": id });

                while (id_already) {
                    id = Math.floor(Math.random() * 100);
                    id_already = await db.collection("Usuarios").findOne({ "id": id });
                }

                const usuarioAgregar = {
                    "Usuario": user,
                    "Contrasena": hash,
                    "Nombre": name,
                    "Rol": rol,
                    "id": id
                };

                try {
                    await db.collection("Usuarios").insertOne(usuarioAgregar);
                    res.sendStatus(201); // Registro exitoso
                } catch (error) {
                    res.sendStatus(401); // Error al insertar en la base de datos
                }
            });
        });
    } catch (error) {
        res.sendStatus(500); // Error inesperado
    }
});


app.post("/login",async (req,res)=> { //Funcion asincronica para iniciar sesion
    let user = req.body.Usuario; //Obtenemos el usuario de la persona
    let password = req.body.Contrasena; //Luego la contraseña
    let data = await db.collection("Usuarios").findOne({"Usuario":user}); //Busacamos la persona en la base de datos
    if(data==null){ //Si la persona no esta 
        res.sendStatus(401); //Manda error de que no existe y no puede entrar antes de registrarse
    }else{
        bcrypt.compare(password,data.Contrasena,(error,result)=>{ //Comparamos si las contraseñas coinciden 
            if(result){ //En caso de que se autentique la identidad de la persona 
                let token = jwt.sign({"Usuario": data.Usuario},"secretKey",{expiresIn:600}); //Crea un token (JSON) que 
                LogIn(user,"LogIn",""); //Crea un nuevo dato en la coleccion de Log
                res.json({"token": token, "id": data.id, "Nombre": data.Nombre}); //Regresa el token , el usuario y el nombre
            }else{
                res.sendStatus(401); //Tira error si las contraseñas no son iguales
            }
        })
    }
})

//**Implementamos los metodos PUT y los endpoints */
//** La operacion que realizan estos netodos del CRUD es la de Update */

app.put("/Tickets/:id",async (req,res)=>{ //FUncion asincronica que recibe un request (URL) y devuelve un response en forma de actualizacion de un elemento
    console.log(req.body);
    let addValues = req.body; //Obtenemos los datos de nuestra request (URL)
    addValues["id"] = Number(req.params.id); //Agregamos el numero que posee la URL en el parametro de "Numero", en la variable o parametro del body de la request
    addValues["Registro"] = new Date();
    console.log(addValues);
    console.log("Llega aca");
    let data = await db.collection("Tickets").updateOne({id : addValues["id"]},{"$set" : addValues}); //Actualizamos nuestro elemento que buscamos con el numero que guardamos en el addValues
    data = await db.collection("Tickets").find({id : Number(req.params.id)}).project({_id:0}).toArray(); //Obtenemos nuestro nuevo elemento actualizado
    res.json(data[0]); //Response final

})

//**Implementamos los metodos DELETE y los endpoints */
//** La operacion que realizan estos netodos del CRUD es la de Delete */

// app.delete("/Tickets/:id",async (req,res)=>{ //FUncion asincronica que recibe un request (URL) y borra un elemento
//     let data = await db.collection("Tickets").deleteOne({id : Number(req.params.id)}); //Borra el elemento
//     res.json(data); //Response final

// })

app.listen(1337,()=>{ //Usamos el metodo Listen para acceder al servidor (En este caso es nuestro puerto local)
    connectDB();
    console.log('Servidor corriendo en el puerto 1337');
})

// https.createServer({cert: fs.readFileSync("../Raiz.cer"), key: fs.readFileSync("../CA.key")}, app).listen(1337, ()=>{
//     connectDB();
//     console.log("Servidor escuchando en puerto 1337")
// })