import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";

import MensajeError from "../../Utilidades/MensajeError/MensajeError"

import { EstadoGlobal } from "../../../EstadoGlobal";
import "./IniciarSesion.css";

const IniciarSesion = () => {
	const estado = useContext(EstadoGlobal);
	const iniciarSesion = estado.usuarioAPI.iniciarSesion;
	
	const [credenciales, setCredenciales] = useState({
		email: "",
		contrasena: ""
	});
	const [mensajeError, setMensajeError] = useState("");
	
	const cambioInput = e => {
		const {name, value} = e.target;
		setCredenciales({...credenciales, [name]:value})
	}
	
	const intentarInicioSesion = async e => {
		e.preventDefault();
		const status = await iniciarSesion(credenciales.email, credenciales.contrasena);
		//* si se inicio correctamente, la pagina se recarga y el codigo siguiente no se ejecuta
		if(status === 404)
		{
			//? usuario no encontrado
			setMensajeError("El correo ingresado no está asociado con ningún usuario.")
		}
		if(status === 401)
		{
			//? contrasena incorrecta
			setMensajeError("La contraseña ingresada es incorrecta.")
		}
		if(status === 500)
		{
			//! error del servidor
			setMensajeError("Error interno, por favor intente nuevamente.")
		}
	}
	
	return (
		<main className="seccion">
			<h1 data-transicion style={{animationDelay: "0.2s"}}>Iniciar Sesión</h1>
			
			<MensajeError mensaje={mensajeError} /> 
							
			<form onSubmit={intentarInicioSesion} className="formulario-inicio-sesion" data-transicion style={{animationDelay: "0.4s"}}>
				
				<input type="email" name="email" required autoComplete="on" placeholder="Correo Electrónico" value={credenciales.email} onChange={cambioInput} className="campo" />
				<input type="password" name="contrasena" required autoComplete="on" placeholder="Contraseña" value={credenciales.contrasena} onChange={cambioInput} className="campo" />
				
				<button type="submit" className="boton" data-transicion style={{animationDelay: "0.6s"}}>Ingresar</button>
				<Link to="/registro" className="boton hueco" data-transicion style={{animationDelay: "0.6s"}}>Crear Cuenta</Link>
			</form>
		</main>
	)
};

export default IniciarSesion;
