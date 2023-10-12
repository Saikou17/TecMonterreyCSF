import { useState } from "react";
import React from "react";
import { useLogin, useNotify, Notification } from "react-admin";
import { useNavigate } from "react-router-dom";
import "./loginBonito/login.css";

export const MyLoginPage = () => {
  const [usuario, setUsuario] = useState(""); //Hook que establece el usuario
  const [contraseña, setContraseña] = useState(""); //Hook que establece la contraseña
  const login = useLogin();
  const notify = useNotify();
  const navigate = useNavigate();
  const handleLogIn = () => {
    console.log(usuario);
    console.log(contraseña);
    login({ username: usuario, password: contraseña }).catch(() =>
      notify("usuario o contraseña incorrecta. Intentalo de nuevo.")
    );
  };
  const handleSignUp = () => {
    navigate("/Registrarse");
  };
  return (
    <div className="contenedorLogin">
      <div className="container">
        <form>
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
        <div className="imgcontainer">
          <img
            id="logoSocio"
            src="src\loginBonito\logoSocio.jpg"
            alt="Logio de socio formador"
          />
        </div>
        <button onClick={handleLogIn}>Iniciar Sesión</button>
        <button onClick={handleSignUp}>Registrarse</button>
        <label>
          <input type="checkbox" name="remember" /> Recordar me
        </label>
      </div>
    </div>
  );
};
