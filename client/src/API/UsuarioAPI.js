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
	
	const registrarUsuario = async (nombre, apellido, email, contrasena) =>
	{
		try {
			const respuesta = await axios.post("/api/usuario/registro", {
				nombre: nombre,
				apellido: apellido,
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
	}
	
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
				console.log(error.response.status);
				alert("Sesion cerrada al querer obtener token: Error + " + error.response.status);
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
				console.log(error.response.status);
				alert("Sesion cerrada al querer obtener datos de usuario: Error + " + error.response.status);
				eliminarDatosDeSesion();
			}
		};
		
		if(token) obtenerUsuario();
	}, [token]);
	
	const actualizarCarrito = async (nuevoCarrito) => {
		try {
			const respuesta = await axios.put('/api/usuario/modificarCarrito', {
				carrito: nuevoCarrito
			}, {
				headers: {
					Authorization: token
				}
			});
			
			if(respuesta.status === 200)
			{
				//* 200: Exito
				//sincronizar cambios en la BBDD con estado local
				setCarrito(nuevoCarrito);
			}
			return respuesta.status;
		} catch (error) {
			//! Error
			return error.response.status; // devuelve el status code para mostrarle al usuario la informacion relevante
		}
	};
	
	const aniadirCarrito = async (producto, cantidad) => {
		try {
			//? verificacion producto no se encuentra ya en el carrito
			const productoNoEstaEnCarrito = carrito.every(item => {
				return item._id !== producto._id
			})
			if (!productoNoEstaEnCarrito) return 409; //409: Conflict
			
			const status = await actualizarCarrito([...carrito, {
				...producto,
				cantidad: cantidad
			}]);
			if(status === 200)
			{
				//* 200: Exito
				window.location.href = "/tienda"; // volver a la tienda
			}
			return status; // devuelve el status code para mostrarle al usuario la informacion relevante
		} catch (error) {
			//! Error
			console.log(error);
		}
	};
	
	const modificarCantidadProducto = async (id, cantidad) => {
		try {
			let nuevoCarrito = carrito;
			nuevoCarrito.forEach(producto => {
				if(producto._id === id) producto.cantidad = cantidad;
			});
			
			const status = await actualizarCarrito(nuevoCarrito);
			if(status === 200)
			{
				//* 200: Exito
				window.location.href = "/carrito"; // recargar carrito
			}
			return status; // devuelve el status code para mostrarle al usuario la informacion relevante
		} catch (error) {
			//! Error
			console.log(error);
		}
	};
	
	const eliminarProducto = async (id) => {
		try {
			let nuevoCarrito = carrito;
			nuevoCarrito.forEach((producto, indice) => {
				if(producto._id === id) nuevoCarrito.splice(indice, 1);
			});
			
			const status = await actualizarCarrito(nuevoCarrito);
			if(status === 200)
			{
				//* 200: Exito
				window.location.href = "/carrito"; // recargar carrito
			}
			return status; // devuelve el status code para mostrarle al usuario la informacion relevante
		} catch (error) {
			//! Error
			console.log(error);
		}	
	};
	
	const borrarCarrito = async () => {
		try {
			const status = await actualizarCarrito([]);
			if(status === 200)
			{
				//* 200: Exito
				window.location.href = "/tienda";
			}
		} catch (error) {
			//! Error
			console.log(error);
		}
	}
	
	return {
		token: [token, setToken],
		sesionIniciada: [sesionIniciada, setSesionIniciada],
		esAdmin: [esAdmin, setEsAdmin],
		carrito: [carrito, setCarrito],
		
		registrarUsuario: registrarUsuario,
		iniciarSesion: iniciarSesion,
		cerrarSesion: cerrarSesion,
		
		aniadirCarrito: aniadirCarrito,
		modificarCantidadProducto: modificarCantidadProducto,
		eliminarProducto: eliminarProducto,
		borrarCarrito: borrarCarrito
	}
};

export default UsuarioAPI;
