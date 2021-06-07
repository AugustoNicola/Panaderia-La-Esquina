import React, {useContext, useState} from 'react';

import MensajeInfo from "../../Utilidades/MensajeInfo/MensajeInfo"

import { EstadoGlobal } from "../../../EstadoGlobal";
import "./Registro.css";

const Registro = () => {
	const estado = useContext(EstadoGlobal);
	const registrarUsuario = estado.usuarioAPI.registrarUsuario;
	
	const [credenciales, setCredenciales] = useState({
		nombre: "",
		apellido: "",
		email: "",
		contrasena: "",
		repetirContrasena: ""
	});
	const [mensajeError, setMensajeError] = useState("");
	
	const cambioInput = e => {
		const {name, value} = e.target;
		setCredenciales({...credenciales, [name]:value})
	}
	
	const intentarRegistrarUsuario = async e => {
		e.preventDefault();
		if(credenciales.contrasena != credenciales.repetirContrasena)
		{
			//? verificacion contrasena fallida
			setMensajeError("Las contraseñas deben ser iguales.")
			return;
		}
		
		const status = await registrarUsuario(credenciales.nombre, credenciales.apellido, credenciales.email, credenciales.contrasena);
		//* si se registro correctamente, la pagina se recarga y el codigo siguiente no se ejecuta
		if(status === 409)
		{
			//? usuario ya existe
			setMensajeError("El correo ingresado ya está en uso.")
		}
		if(status === 422)
		{
			//? contrasena demasiado corta
			setMensajeError("La contraseña ingresada es demasiado corta, usá al menos 6 caracteres.")
		}
		if(status === 500)
		{
			//! error del servidor
			setMensajeError("Error interno, por favor intente nuevamente.")
		}
	}
	
	return (
		<main className="seccion">
			<h1 data-transicion style={{animationDelay: "0.2s"}}>Crear Cuenta</h1>
			
			<MensajeInfo tipo={"error"} mensaje={mensajeError} /> 
							
			{!estado.usuarioAPI.sesionIniciada[0] && //solo se muestra si no hay sesion 
			<form onSubmit={intentarRegistrarUsuario} className="formulario-registro" data-transicion style={{animationDelay: "0.4s"}}>
				
				<input type="text" name="nombre" required autoComplete="off" placeholder="Nombre" value={credenciales.nombre} onChange={cambioInput} className="campo" />
				
				<input type="text" name="apellido" required autoComplete="off" placeholder="Apellido" value={credenciales.apellido} onChange={cambioInput} className="campo" />
				
				<input type="email" name="email" required autoComplete="off" placeholder="Correo Electrónico" value={credenciales.email} onChange={cambioInput} className="campo" />
				
				<input type="password" name="contrasena" required autoComplete="off" placeholder="Contraseña" value={credenciales.contrasena} onChange={cambioInput} className="campo" />
				
				<input type="password" name="repetirContrasena" required autoComplete="off" placeholder="Repetir contraseña" value={credenciales.repetirContrasena} onChange={cambioInput} className="campo" />
				
				<div className="acciones-registro">
					<button type="submit" className="boton" data-transicion style={{animationDelay: "0.6s"}}>Registrate</button>
				</div>
			</form>
			}
			
			{estado.usuarioAPI.sesionIniciada[0] && //solo se muestra si hay sesion 
			<div className="operacion-invalida" data-transicion style={{animationDelay: "0.4s"}}>
				<h2>¡Ups!</h2>
				<h3>Ya iniciaste sesión con un usuario</h3>
				<h4>Cerrá sesión para crear una cuenta.</h4>
			</div>
			}
		</main>
	)
};

export default Registro;
