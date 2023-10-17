import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import "./loginBonito/registrarse.css";

const Registrarse = () => {
  const [datos, setDatos] = useState({
    Usuario: "",
    Contrasena: "",
    Nombre: "",
    Rol: "",
  });
  const notify = useNotify();

  const handleChange = (event: any) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const handleSendData = async () => {
    // Convert the form data to JSON
    const request = await new Request("http://127.0.0.1:1337/Registrarse", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        if (response.status == 409) {
          notify("El usuario ya existe");
          throw new Error(response.statusText);
        } else {
          throw new Error(response.statusText);
        }
      }else if (response.status === 201) {
        notify("Usuario creado con éxito");
      }
    } catch {
      throw new Error("No se pudo registrar el usuario");
    }
  };

  return (
    <div id="todoRegistro">
      <div>
        <div className="container">
          <br />
          <h2>Registro de nuevos usuarios</h2>
          <div className="imgcontainer">
            <img
              id="logoSocio"
              src=".\src\loginBonito\logoSocio1.png"
              alt="Logo de socio formador"
            />
          </div>
          <form>
            <div className="imageContainer">
              <div className="user">
                <label htmlFor="Usuario">Usuario: </label>
                <input
                  type="text"
                  id="Usuario"
                  name="Usuario"
                  placeholder="Usuario"
                  value={datos.Usuario}
                  onChange={handleChange}
                />
              </div>
              <div className="contrasena">
                <label htmlFor="Contrasena">Contraseña: </label>
                <input
                  type="password"
                  id="Contrasena"
                  name="Contrasena"
                  placeholder="Escriba la contraseña"
                  value={datos.Contrasena}
                  onChange={handleChange}
                />
              </div>
              <div className="nombre">
                <label htmlFor="Nombre">Nombre Completo: </label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  placeholder="Introducir Nombre Completo"
                  value={datos.Nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="rol">
                <label htmlFor="Rol">Selecciona tu Rol:</label>
                <select
                  id="Rol"
                  name="Rol"
                  value={datos.Rol}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="Coordinador Aula">Coordinador de Aula</option>
                  <option value="Coordinador Nacional">
                    Coordinador Nacional
                  </option>
                  <option value="Ejecutivo">Ejecutivo</option>
                </select>
              </div>
              <div>
                <button className="botonRegistro" onClick={handleSendData}>
                  Crear Usuario
                </button>
              </div>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
