import {useState, useEffect} from 'react';
import axios from 'axios';

const UsuarioAPI = () => {
	const [token, setToken] = useState(false);
	const [sesionIniciada, setSesionIniciada] = useState(false);
	const [esAdmin, setEsAdmin] = useState(false);
	const [carrito, setCarrito] = useState([]);
	
	// intenta iniciar sesion llamando al API, y provoca que se obtenga el token de refresco si se logra
	const iniciarSesion = async (email, contrasena) => {
		try {
			const respuesta = await axios.post("/api/usuario/iniciarSesion", {
				email: email,
				contrasena: contrasena
			});
			
			//* 200: Exito
			if(respuesta.status === 200)
			{
				localStorage.setItem('haySesion', true);
				window.location.href = "/";
			}
			//? 401: Unauthorized
			else if(respuesta.status === 401)
			{
				//todo
			}
			//? 404: Not Found
			else if(respuesta.status === 401)
			{
				//todo
			}
			//? 500: Server Error
			else if(respuesta.status === 500)
			{
				//todo
			}
		} catch (error) {
			console.log(error);
		}
	}
	
	// actualiza el token usando como autorizacion la cookie
	useEffect(() => {
		const obtenerTokenReacceso = async () => {
			try {
				const respuesta = await axios.get("/api/usuario/tokenReacceso");
				//* 200: Exito
				if(respuesta.status === 200)
				{
					setToken(respuesta.data.tokenAcceso);
					setTimeout(() => {obtenerTokenReacceso();}, 10 * 60 * 1000); // vuelve a llamar al acabarse el tiempo
				}
				//? 401: Unauthorized
				else if(respuesta.status === 401)
				{
					//todo
				}
				//? 500: Server Error
				else if(respuesta.status === 500)
				{
					//todo
				}
			} catch (error) {
				console.log(error);
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
				//? 401: Unauthorized
				else if(respuesta.status === 401)
				{
					//todo
				}
				//? 404: Not Found
				else if(respuesta.status === 401)
				{
					//todo
				}
				//? 500: Server Error
				else if(respuesta.status === 500)
				{
					//todo
				}
				
			} catch (error) {
				console.log(error);
			}
		};
		
		if(token) obtenerUsuario();
	}, [token]);
	
	return {
		token: [token, setToken],
		sesionIniciada: [sesionIniciada, setSesionIniciada],
		esAdmin: [esAdmin, setEsAdmin],
		carrito: [carrito, setCarrito],
		
		iniciarSesion: iniciarSesion
	}
};

export default UsuarioAPI;
