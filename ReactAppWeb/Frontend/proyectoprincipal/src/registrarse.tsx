import React, {useState} from "react";

const Registrarse = () =>{

    const [datos, setDatos]=useState({
        Usuario: "",
        Contrasena: "",
        Nombre: "",
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
                throw new Error(response.statusText);
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
                    <label htmlFor="username">Usuario: </label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        value={datos.Usuario}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={datos.Contrasena}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="fullName">Nombre Completo: </label>
                    <input 
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={datos.Nombre}
                        onChange={handleChange}
                    />
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