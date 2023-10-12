import { useState } from "react";
import React from "react";
import { useLogin, useNotify, Notification } from "react-admin";
import { useNavigate } from "react-router-dom";
import "./loginBonito/login.css";

const loginPageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh", // Asegura que el fondo se extienda por toda la altura de la ventana
  backgroundImage: `url('./imagenFondo.jpg')`, // Ruta a tu imagen de fondo
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const MyLoginPage = () => {
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
    <div style={loginPageStyle}>
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
            <h5>Usuario</h5>
            <input
              name="usuario"
              type="text"
              placeholder="Ingrese el usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <h5>Contraseña</h5>
            <input
              name="contraseña"
              type="password"
              placeholder="Escriba la contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </form>
          <button onClick={handleLogIn}>Iniciar Sesión</button>
          <button onClick={handleSignUp}>Registrarse</button>
          <label>
            <input type="checkbox" name="remember" /> Recordarme
          </label>
        </div>
      </div>
    </div>
  );
};

export default MyLoginPage;
