import React, { useContext } from 'react'
import { EstadoGlobal } from "../../../EstadoGlobal";

import "./Tienda.css"

import Filtros from "./Filtros";
import Producto from "./Producto";
import SinProductos from "./SinProductos";

const Tienda = () => {
	const estado = useContext(EstadoGlobal);
	const [productos] = estado.productosAPI.productos;
	
	return (
		<>
		<main className="seccion">
			<h1 data-transicion style={{animationDelay: "0.2s"}}>Tienda Virtual</h1>
			<Filtros />

			<div className="listado-productos"  data-transicion style={{animationDelay: "0.5s"}}>
				{
					productos.length !== 0 ?

					productos.map(producto => {
						return <Producto producto={producto} key={producto._id} />;
					})

					: <SinProductos />
				}
			</div>
		</main>
		</>
	)
}

export default Tienda;
