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
			<div className="carrito">
				<div className="productos-carrito">
				{
				carrito.map(producto => {
					return (
						<div className="producto" key={producto._id}>
							<div className="imagen">
								<img src={`http://localhost:5000/imagenes/productos/${producto.imagenProducto}`} alt={producto.nombre} />
							</div>

							<div className="informacion">
								<h3>{producto.nombre}</h3>
								<p>Precio unitario: ${producto.precio}</p>

								<div className="acciones">
									<input type="number" value={producto.cantidad} min="1" max="99" className="cantidad"/>
									<button type="submit" className="boton borrar"><i className="fas fa-trash"></i></button>
								</div>
							</div>

							<div className="total">
								<p>Total Producto: ${producto.precio * producto.cantidad}</p>
							</div>
						</div>
					)
				})
				}
				</div>
				
				<div className="total">

				</div>
				
				<button type="submit" className="boton">Continuar compra</button>
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
