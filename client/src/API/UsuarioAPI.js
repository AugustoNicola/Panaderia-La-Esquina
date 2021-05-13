import {useState, useEffect} from 'react';
import axios from 'axios';

const UsuarioAPI = () => {
	const [token, setToken] = useState(false);
	const [sesionIniciada, setSesionIniciada] = useState(false);
	const [esAdmin, setEsAdmin] = useState(false);
	const [carrito, setCarrito] = useState([]);
	
	const eliminarDatosDeSesion = () => {
		localStorage.removeItem("haySesion");
		setToken(false);
		setSesionIniciada(false);
		setEsAdmin(false);
		setCarrito([]);
	};
	
	// intenta iniciar sesion llamando al API, y provoca que se obtenga el token de refresco si se logra
	const iniciarSesion = async (email, contrasena) => {
		try {
			const respuesta = await axios.post("/api/usuario/iniciarSesion", {
				email: email,
				contrasena: contrasena
			});
			
			if(respuesta.status === 200)
			{
				//* 200: Exito	
				localStorage.setItem("haySesion", true);
				window.location.href = "/tienda";
			}
		} catch (error) {
			//! Error
			return error.response.status; // devuelve el status code para mostrarle al usuario la informacion relevante
		}
	};
	
	const cerrarSesion = async () => {
		try {
			const respuesta = await axios.post("/api/usuario/cerrarSesion"); //borra la cookie
			if(respuesta.status === 200)
			{
				//* 200: Exito
				eliminarDatosDeSesion();
				window.location.href = "/tienda";
			}
		} catch (error) {
			//! Error
			return error.response.status; // devuelve el status code para mostrarle al usuario la informacion relevante
		}
	};
	
	// actualiza el token usando como autorizacion la cookie
	useEffect(() => {
		const obtenerTokenReacceso = async () => {
			try {
				const respuesta = await axios.get("/api/usuario/tokenReacceso");
				if(respuesta.status === 200)
				{
					//* 200: Exito
					setToken(respuesta.data.tokenAcceso);
					setTimeout(() => {obtenerTokenReacceso();}, 10 * 60 * 1000); // vuelve a llamar al acabarse el tiempo
				}
			} catch (error) {
				//! Error: elimina la sesion actual
				console.log(error.respoonse.status);
				alert("Sesion cerrada al querer obtener token: Error + " + error.respoonse.status);
				eliminarDatosDeSesion();
			}
		};
		
		if(localStorage.getItem("haySesion")) obtenerTokenReacceso();
	}, []);
	
	// usa el token para obtener la informacion del usuario
	useEffect(() => {
		const obtenerUsuario = async () => {
			try {
				const respuesta = await axios.get("/api/usuario/informacion", {
					headers: {Authorization: token}
				});
				//* 200: Exito
				if(respuesta.status === 200)
				{
					setSesionIniciada(true);
					setEsAdmin(respuesta.data.usuario.esAdmin);
					setCarrito(respuesta.data.usuario.carrito);
				} 
			} catch (error) {
				//! Error: elimina la sesion actual
				console.log(error.respoonse.status);
				alert("Sesion cerrada al querer obtener datos de usuario: Error + " + error.respoonse.status);
				eliminarDatosDeSesion();
			}
		};
		
		if(token) obtenerUsuario();
	}, [token]);
	
	return {
		token: [token, setToken],
		sesionIniciada: [sesionIniciada, setSesionIniciada],
		esAdmin: [esAdmin, setEsAdmin],
		carrito: [carrito, setCarrito],
		
		iniciarSesion: iniciarSesion,
		cerrarSesion: cerrarSesion
	}
};

export default UsuarioAPI;
