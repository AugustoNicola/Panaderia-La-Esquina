import React, {useContext, useState} from 'react';

import { EstadoGlobal } from "../../../EstadoGlobal";
import "./Carrito.css"

const Carrito = () => {
	const estado = useContext(EstadoGlobal);

	//TODO integrar con UserAPI
	const productos = estado.productosAPI.productos[0];
	const carrito = [{...productos[0], cantidad: 2}, {...productos[1], cantidad: 1}, {...productos[3], cantidad: 12}];
	//console.log(carrito[0] ? carrito[0]._id : "nope")

	if(carrito[0]) return (
		<main className="seccion">
			<h1>Tu Carrito Virtual</h1>

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
		</main>
	)
	return (<div></div>)
};

export default Carrito;
