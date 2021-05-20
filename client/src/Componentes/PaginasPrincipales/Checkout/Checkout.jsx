import React, {useContext, useState} from 'react';

import "./Checkout.css";
import { EstadoGlobal } from "../../../EstadoGlobal";
import MensajeError from "../../Utilidades/MensajeError/MensajeError";

const Checkout = () => {
	const estado = useContext(EstadoGlobal);
	const carrito = estado.usuarioAPI.carrito[0];
	const [mensajeError, setMensajeError] = useState("");
	
	const [credenciales, setCredenciales] = useState({
		nombre: "",
		apellido: "",
		direccion: "",
		extraDireccion: "",
		email: "",
		telefono: ""
	});
	
	const cambioInput = e => {
		const {name, value} = e.target;
		setCredenciales({...credenciales, [name]:value});
	};
	const cambioInputTelefono = e => {
		let {name, value} = e.target;
		value = (value >= 1 && value <= 9999999999 ? value : credenciales.telefono); //verificacion especial por ser numero
		setCredenciales({...credenciales, [name]:value});
	};
	
	return (
		<main className="seccion">
							
			{(estado.usuarioAPI.sesionIniciada[0] && carrito[0]) && //* solo se muestra si hay sesion y el carrito tiene elementos
			<form onSubmit={cambioInput} className="contenedor-facturacion">
				<div className="formulario-facturacion" data-transicion style={{animationDelay: "0.4s"}}>
					<h1>Detalles de Facturación</h1>
					
					<MensajeError mensaje={mensajeError} /> 
					
					<input type="text" name="nombre" required autoComplete="on" placeholder="Nombre" value={credenciales.nombre} onChange={cambioInput} className="campo" />
					
					<input type="text" name="apellido" required autoComplete="on" placeholder="Apellido" value={credenciales.apellido} onChange={cambioInput} className="campo" />
					
					<input type="text" name="direccion" required autoComplete="on" placeholder="Dirección (calle y número)" value={credenciales.direccion} onChange={cambioInput} className="campo" />
					
					<input type="text" name="extraDireccion" autoComplete="on" placeholder="Depto, etc (opcional)" value={credenciales.extraDireccion} onChange={cambioInput} className="campo" />
					
					<input type="email" name="email" required autoComplete="on" placeholder="Correo Electrónico" value={credenciales.email} onChange={cambioInput} className="campo" />
					
					<input type="number" name="telefono" required autoComplete="on" value={credenciales.telefono} placeholder="Teléfono" min="1000000000" max="9999999999" onChange={cambioInputTelefono} className="campo" />
					
				</div>
				
				<div className="pedido-facturacion" data-transicion style={{animationDelay: "0.6s"}}>
					<h1>Tu Pedido</h1>
					<div className="productos">	
						{
						carrito.map((producto) => {
							return (
								<div className="producto">
									<h3>{producto.nombre}</h3>
									<p className="cantidad">
										<span>{producto.cantidad}x </span>
										${producto.precio}
									</p>
									<p className="subtotal">${producto.cantidad * producto.precio}</p>
								</div>
							)
						})
						}
						<div className="total">
							<p className="etiqueta-total">Total Final</p>
							<p className="precio-total">${carrito.reduce((previo, producto) => {return previo + (producto.precio * producto.cantidad)},0)}</p>
						</div>
					</div>
					
					<button type="submit" className="boton" data-transicion style={{animationDelay: "0.8s"}}>Realizar Pedido</button>
				</div>
				
			</form>
			}
			
			{(estado.usuarioAPI.sesionIniciada[0] && !carrito[0]) && //? usuario sin carrito
			<div className="operacion-invalida" data-transicion style={{animationDelay: "0.2s"}}>
				<h2>¡Ups!</h2>
				<h3>Tu carrito está vacío</h3>
				<h4>Agregá tus productos favoritos para realizar un pedido.</h4>
			</div>
			}
			
			{!estado.usuarioAPI.sesionIniciada[0] && //? no hay sesion 
			<div className="operacion-invalida" data-transicion style={{animationDelay: "0.2s"}}>
				<h2>¡Ups!</h2>
				<h3>No iniciaste sesión con un usuario</h3>
				<h4>Iniciá sesión para realizar un pedido.</h4>
			</div>
			}
		</main>
	)
};

export default Checkout;
