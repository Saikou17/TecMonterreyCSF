const express = require("express") //Node.js (Servidor en Js) busca en sus modulos el framework (entorno de trabajo) y lo guarda en express.
const MongoClient = require("mongodb").MongoClient //Importamos el modulo de Mongo para Node.js y llamamos a su cñase (MongoClient) para conectar nuestra base de datos local
const bodyParset = require("body-parser") //Importamos el modulo que analiza la solicitudes HTTP 
let cors = require("cors") //Implementa el modulo que perimite acceder a nuestra API desde diferentes dominios

let db; //Variable que guarda 
const app = express(); //Instancia a Express
app.use(cors()); //Activa el modulo
app.use(bodyParset.json()); //Actuva el modulo

async function connectDB(){ //Funcion que retorna una promesa implicita (valor que puede tardar)
    let client = new MongoClient("mongodb://localhost:27017/RetoTC2007B"); //Variable que guarda un cliente hacia nuetra base de datos
    await client.connect(); //Espera que la base de datos se conecte antes de seguir con el codigo
    db=client.db(); //La variable guarda nuestra base de datos RetoTC2007B
    console.log("Conexion exitosa")
}

//**Implementamos los metodos GET y los endpoints */
//** La operacion que realizan estos netodos del CRUD es la de Read */

app.get("/Tickets",async(req,res)=>{ //Funcion asincronica que utiliza el metodos GET. Recibe un request (Endpoint) y devuelve un Response (Record Json)
    if("_sort" in req.query){ //Metodo getList. Busca en los parametros del endpoint (Query)
        let sortBy = req.query._sort; //Guarda el valor del parametro Sort
        let sortOrder = req.query._order=="ASC"?1:-1; //Guarda el valor del parametro Order
        let start = Number (req.query._start); //GUarda el valor del parametro Start en numero
        let end = Number (req.query._end); //Guarda el valor del parametro ENd en numero
        let sorter = { //Crea un objeto que posee un atributo o propiedad
            sortBy : sortOrder
        }
        let data = await db.collection("Tickets").find({}).sort(sorter).project({_id:0}).toArray(); //Se utiliza el syntax de Mongodb para buscar de manera ascendente o descendente de un atributo mienstras usamos pryeccion para excluir ciertos datos
        res.set("Access-Control-Expose-Headers","X-Total-Count"); //Headers de respuesta 
        res.set("X-Total-Count",data.lenght); //Headers de respuesta
        data = data.slice(start,end); 
        res.json(data); //Response Final
    }else if("id" in req.query){ //Metodo getMany
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
})

app.get("Tickets/:id",async (req,res) =>{
    let data = await db.collection("Tickets").find({id: Number(req.params.id)}).project({_id:0}).toArray();
    res.json(data[0])
})

//**Implementamos los metodos POST y los endpoints */
//** La operacion que realizan estos netodos del CRUD es la de Create */


//**Implementamos los metodos PUT y los endpoints */
//** La operacion que realizan estos netodos del CRUD es la de Update */


//**Implementamos los metodos DELETE y los endpoints */
//** La operacion que realizan estos netodos del CRUD es la de Delete */

app.listen(1337,()=>{ //Usamos el metodo Listen para acceder al servidor (En este caso es nuestro puerto local)
    connectDB();
    console.log('Servidor corriendo en el puerto 1337');
})