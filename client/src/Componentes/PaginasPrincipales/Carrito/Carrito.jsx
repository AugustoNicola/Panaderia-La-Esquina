import React, {useContext, useState} from 'react';

import { EstadoGlobal } from "../../../EstadoGlobal";
import "./Carrito.css"

const Carrito = () => {
	const estado = useContext(EstadoGlobal);
	const [carrito, setCarrito] = estado.usuarioAPI.carrito;

	//* hay usuario
	if(estado.usuarioAPI.sesionIniciada[0]) return (
		<main className="seccion">
			<h1 data-transicion style={{animationDelay: "0.2s"}}>Tu Carrito Virtual</h1>
			
			{carrito[0] && //* usuario con carrito
			<div className="carrito" data-transicion style={{animationDelay: "0.4s"}}>
				<div className="productos-carrito">
				{
				window.innerWidth <= 1024 && //? estilos mobile
				carrito.map(producto => {
					return (
						<div className="producto-carrito" key={producto._id}>
							<div className="principal">	
								<div className="imagen">
									<img src={`http://localhost:5000/imagenes/productos/${producto.imagenProducto}`} alt={producto.nombre} />
								</div>

								<div className="informacion">
									<h3>{producto.nombre}</h3>
									<p>Precio unitario: ${producto.precio}</p>

									<div className="acciones">
										<input type="number" value={producto.cantidad} min="1" max="99" className="cantidad"/>
										<button type="button" className="boton borrar"><i className="fas fa-trash"></i></button>
									</div>
								</div>
							</div>

							<div className="subtotal">
								<p>Total Producto: ${producto.precio * producto.cantidad}</p>
							</div>
						</div>
					)
				})
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
							<tr className="fila-producto">
								<td className="celda-imagen">
									<div className="imagen">
										<img src={`http://localhost:5000/imagenes/productos/${producto.imagenProducto}`} alt={producto.nombre} />
									</div>
								</td>
								<td className="celda-nombre">
									<h3>{producto.nombre}</h3>
								</td>
								<td className="celda-precio">
									<p>${producto.precio}</p>
								</td>
								<td className="celda-acciones">
									<div className="acciones">
										<input type="number" value={producto.cantidad} min="1" max="99" className="cantidad"/>
										<button type="button" className="boton borrar"><i className="fas fa-trash"></i></button>
									</div>
								</td>
								<td className="celda-subtotal">
									<p>${producto.precio * producto.cantidad}</p>
								</td>
							</tr>
						)
					})
					}
					<tr className="total-final">
						<td colSpan="4">Total Final</td>
						<td className="precio">$5000</td>
					</tr>
				</table>
				}
				</div>
				
				<button type="submit" className="boton continuar" data-transicion style={{animationDelay: "0.6s"}}>Continuar compra</button>
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
