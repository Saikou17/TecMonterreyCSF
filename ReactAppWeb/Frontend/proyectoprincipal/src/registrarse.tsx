import { useState } from "react";
import { useNotify } from "react-admin";
import "./loginBonito/registrarse.css";
import { useNavigate } from "react-router-dom";

const Registrarse = () => {
  const [datos, setDatos] = useState({
    Usuario: "",
    Contrasena: "",
    Nombre: "",
    Rol: "",
  });
  const notify = useNotify();
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const handleBack = (event: any) => {
    navigate("/login")
  }

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
        alert("Usuario creado con exito");
      }
    } catch {
      throw new Error("No se pudo registrar el usuario");
    }
  };

  return (
    <div id="todoRegistro">
      <div>
        <div className="container">
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
                <label className="titulosCustom" htmlFor="Usuario">Usuario: </label>
                <input
                  type="text"
                  id="Usuario"
                  name="Usuario"
                  placeholder="Introducir usuario nuevo"
                  value={datos.Usuario}
                  onChange={handleChange}
                />
              </div>
              <div className="contrasena">
                <label className="titulosCustom" htmlFor="Contrasena">Contraseña: </label>
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
                <label className="titulosCustom" htmlFor="Nombre">Nombre Completo: </label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  placeholder="Introducir nombre completo"
                  value={datos.Nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="rol">
                <label className="titulosCustom" htmlFor="Rol">Selecciona tu Rol:</label>
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
                <button className="botonRegresar" onClick={handleBack}>
                  Regresar
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
