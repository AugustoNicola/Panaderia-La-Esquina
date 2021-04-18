import React, { useContext } from 'react'
import { EstadoGlobal } from "../../../EstadoGlobal";

import "./Tienda.css"

import Filtros from "./Filtros";
import Producto from "./Producto";

const Tienda = () => {
	const estado = useContext(EstadoGlobal);
	const [productos] = estado.productosAPI.productos;
	
	return (
		<>
		<main className="seccion">
			<h1>Tienda Virtual</h1>
			<Filtros />

			<div className="listado-productos">
				{
					productos.map(producto => {
						return <Producto producto={producto} key={producto._id} />;
					})
				}
			</div>
		</main>
		</>
	)
}

export default Tienda;
