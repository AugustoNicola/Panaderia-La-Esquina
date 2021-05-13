import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";

import { EstadoGlobal } from "../../../EstadoGlobal";
import "./IniciarSesion.css";

const IniciarSesion = () => {
	const estado = useContext(EstadoGlobal);
	const iniciarSesion = estado.usuarioAPI.iniciarSesion;
	
	const [credenciales, setCredenciales] = useState({
		email: "",
		contrasena: ""
	});
	
	const cambioInput = e =>{
		const {name, value} = e.target;
		setCredenciales({...credenciales, [name]:value})
	}
	
	return (
		<main className="seccion">
			<h1>Iniciar Sesión</h1>
			
			<form onSubmit={(e) => {e.preventDefault(); iniciarSesion(credenciales.email, credenciales.contrasena)}}>
				
				<input type="email" name="email" required autoComplete="on" placeholder="Correo Electrónico" value={credenciales.email} onChange={cambioInput} />
				<input type="password" name="contrasena" required autoComplete="on" placeholder="Contraseña" value={credenciales.contrasena} onChange={cambioInput} />
				
				<button type="submit" className="boton">Ingresar</button>
				<Link to="/registro" className="boton hueco">Crear Cuenta</Link>
			</form>
		</main>
	)
};

export default IniciarSesion;
