import {useState} from "react";

const Registrarse = () =>{

    const [datos, setDatos]=useState({
        Usuario: "",
        Contrasena: "",
        Nombre: "",
        Rol: "",
    });

    const handleChange= (event: any)=>{
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    const handleSendData = async() => {
        // Convert the form data to JSON
        const request = await new Request('http://127.0.0.1:1337/Registrarse', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: new Headers({ 'Content-Type': 'application/json'}),
        });
        try {
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                if(response.status == 409){
                    alert("El usuario ya existe");
                    throw new Error(response.statusText);
                }else{
                    throw new Error(response.statusText);
                }
            }
            
        } catch {
            throw new Error('No se pudo registrar el usuario');
        }
    };

    return (
        <div>
            <h2>Registro de nuevos usuarios</h2>
            <form>
                <div>
                    <label htmlFor="Usuario">Usuario: </label>
                    <input 
                        type="text"
                        id="Usuario"
                        name="Usuario"
                        value={datos.Usuario}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="Contrasena">Contraseña: </label>
                    <input 
                        type="password"
                        id="Contrasena"
                        name="Contrasena"
                        value={datos.Contrasena}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="Nombre">Nombre Completo: </label>
                    <input 
                        type="text"
                        id="Nombre"
                        name="Nombre"
                        value={datos.Nombre}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="Rol">Selecciona tu Rol:</label>
                    <select id="Rol" name="Rol" value={datos.Rol} onChange={handleChange}>
                        <option value=""></option>
                        <option value="Coordinador Aula">Coordinador de Aula</option>
                        <option value="Coordinador Nacional">Coordinador Nacional</option>
                        <option value="Ejecutivo">Ejecutivo</option>
                    </select>
                </div>
                <div>
                    <button type="button" onClick={handleSendData}>
                        Crear Usuario
                    </button>
                </div>
            </form>
        </div>
    );

};

export default Registrarse;