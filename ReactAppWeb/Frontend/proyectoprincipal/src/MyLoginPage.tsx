import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { useNavigate } from "react-router-dom";
import "./loginBonito/login.css";

export const MyLoginPage = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const login = useLogin();
  const notify = useNotify();
  const navigate = useNavigate();
  const handleLogIn = () => {
    console.log(usuario);
    console.log(contraseña);
    login({ username: usuario, password: contraseña }).catch(() =>
      notify("Usuario o contraseña incorrecta. Inténtalo de nuevo.")
    );
  };
  const handleSignUp = () => {
    navigate("/Registrarse");
  };
  return (
    <div id="todoLogin">
      <div className="contenedorLogin">
        <div className="container">
          <form>
            <div className="imgcontainer">
              <img
                id="logoSocio"
                src=".\src\loginBonito\logoSocio1.png"
                alt="Logo de socio formador"
              />
            </div>
            <h5 className="Customh5">Usuario :</h5>
            <input
              name="usuario"
              type="text"
              placeholder="Ingrese el usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <h5 className="Customh5">Contraseña :</h5>
            <input
              name="contraseña"
              type="password"
              placeholder="Escriba la contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </form>
          <div className="button-container">
            <button onClick={handleLogIn} className="botonlogin">
              Iniciar Sesión
            </button>
            <button onClick={handleSignUp} className="botonregistro">
              Registrarse
            </button>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};
