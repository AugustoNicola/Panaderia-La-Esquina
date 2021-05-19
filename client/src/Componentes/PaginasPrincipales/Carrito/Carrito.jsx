import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";

import { EstadoGlobal } from "../../../EstadoGlobal";
import "./Carrito.css";
import MensajeError from "../../Utilidades/MensajeError/MensajeError";
import ProductoCarritoMobile from "./ProductoCarritoMobile";
import ProductoCarritoDesktop from "./ProductoCarritoDesktop";

const Carrito = () => {
	const estado = useContext(EstadoGlobal);
	const [carrito, setCarrito] = estado.usuarioAPI.carrito;
	const [mensajeError, setMensajeError] = useState("");
	
	const intentarModificarCantidad = async (e, id) => {
		const status = await estado.usuarioAPI.modificarCantidadProducto(id, e.target.value);
		if(status === 401 || status === 404)
		{
			//? error de verificacion de usuario
			setMensajeError("Ocurrió un problema al comprobar la información de usuario.");
		}
		if(status === 500)
		{
			//! error interno
			setMensajeError("Error interno, por favor intente nuevamente.");
		}
	};
	
	const intentarEliminarProducto = async (id) => {
		const status = await estado.usuarioAPI.eliminarProducto(id);
		if(status === 401 || status === 404)
		{
			//? error de verificacion de usuario
			setMensajeError("Ocurrió un problema al comprobar la información de usuario.");
		}
		if(status === 500)
		{
			//! error interno
			setMensajeError("Error interno, por favor intente nuevamente.");
		}
	};
	
	//* hay usuario
	if(estado.usuarioAPI.sesionIniciada[0]) return (
		<main className="seccion">
			<h1 data-transicion style={{animationDelay: "0.2s"}}>Tu Carrito Virtual</h1>
			
			<MensajeError mensaje={mensajeError} /> 	
			
			{carrito[0] && //* usuario con carrito
			<div className="carrito" data-transicion style={{animationDelay: "0.4s"}}>
				<div className="productos-carrito">
				{
				window.innerWidth <= 1024 && //? estilos mobile
				<>
					{
					carrito.map(producto => {
						return (
							<ProductoCarritoMobile
								key={producto._id}
								producto={producto}
								intentarModificarCantidad={intentarModificarCantidad}
								intentarEliminarProducto={intentarEliminarProducto}>
							</ProductoCarritoMobile>
						)
					})
					}
					<div className="total">
						Total: ${carrito.reduce((previo, producto) => {return previo + (producto.precio * producto.cantidad)},0)}
					</div>
				</>
				}
				{
				window.innerWidth > 1024 && //? estilos desktop
				<table className="tabla-carrito" data-transicion style={{animationDelay: "0.4s"}}>
					<colgroup>
						<col span="1" style={{width: "20%"}}></col>
						<col span="1" style={{width: "20%"}}></col>
						<col span="1" style={{width: "15%"}}></col>
						<col span="1" style={{width: "15%"}}></col>
						<col span="1" style={{width: "10%"}}></col>
					</colgroup>
					
					<tr className="encabezados">
						<th colSpan="2">Producto</th>
						<th>Pr. unitario</th>
						<th>Cantidad</th>
						<th className="subtotal">Subtotal</th>
					</tr>
					
					{
					carrito.map(producto => {
						return (
							<ProductoCarritoDesktop 
								key={producto._id}
								producto={producto}
								intentarModificarCantidad={intentarModificarCantidad}
								intentarEliminarProducto={intentarEliminarProducto}>
							</ProductoCarritoDesktop>
						)
					})
					}
					<tr className="total-final">
						<td colSpan="4">Total Final</td>
						<td className="precio">
							${carrito.reduce((previo, producto) => {return previo + (producto.precio * producto.cantidad)},0)}
						</td>
					</tr>
				</table>
				}
				</div>
				
				<Link to="/checkout"><button type="submit" className="boton continuar" data-transicion style={{animationDelay: "0.6s"}}>Continuar compra</button></Link>
			</div>
			}
			
			{ !carrito[0] && //? usuario sin carrito
			<div className="operacion-invalida" data-transicion style={{animationDelay: "0.2s"}}>
				<h2>¡Ups!</h2>
				<h3>Tu carrito está vacío</h3>
				<h4>Agregá tus productos favoritos para verlos acá.</h4>
			</div>
			}
		</main>
	)
	//? no hay usuario
	return (
		<main className="seccion">
			<h1 data-transicion style={{animationDelay: "0.2s"}}>Tu Carrito Virtual</h1>
			<div className="operacion-invalida" data-transicion style={{animationDelay: "0.4s"}}>
				<h2>¡Ups!</h2>
				<h3>No iniciaste sesión con un usuario</h3>
				<h4>Iniciá sesión para ver tu carrito.</h4>
			</div>
		</main>
	)
};

export default Carrito;
