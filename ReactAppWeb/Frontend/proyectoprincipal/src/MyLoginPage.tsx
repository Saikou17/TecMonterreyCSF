import {useState} from "react";
import React from "react";
import {useLogin, useNotify, Notification} from "react-admin";
import { useNavigate } from 'react-router-dom';



export const MyLoginPage = () => {
    const [usuario,setUsuario] = useState(""); //Hook que establece el usuario
    const [contraseña,setContraseña] = useState(""); //Hook que establece la contraseña
    const login = useLogin();
    const notify = useNotify();
    const navigate = useNavigate();
    const handleLogIn = () => {
        console.log(usuario);
        console.log(contraseña);
        login({username:usuario,password:contraseña}).catch(() => 
            notify("usuario o contraseña incorrecta. Intentalo de nuevo.")
        );
    };
    const handleSignUp = () => {
        navigate("/Registrarse");
    }
    return(
    <div>
        <form>
            <input
                name="usuario"
                type="text"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
            />
            <input
                name="contraseña"
                type="password"
                value={contraseña}
                onChange={e => setContraseña(e.target.value)}
            />
        </form>
        <button onClick={handleLogIn}>Iniciar Sesión</button>
        <button onClick={handleSignUp}>Registrarse</button>
    </div>
    );

};

