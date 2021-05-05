import React, {useContext, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import { EstadoGlobal } from "../../../EstadoGlobal";

const Producto = () => {
	const estado = useContext(EstadoGlobal);
	const [productos] = estado.productosAPI.productos;
	const [productoSeleccionado, setProductoSeleccionado] = useState(false);
	const [productosRelacionados, setProductosRelacionados] = useState([]);
	const {idProducto} = useParams();

	useEffect(async () => {
		//* encuentra el producto seleccionado
		productos.map(producto => {
			if(producto._id === idProducto) setProductoSeleccionado(producto);
		});
		
		//* busca productos relacionados
		const categoriaABuscar = productoSeleccionado.categorias ? productoSeleccionado.categorias[0] : "";
		const respuesta = await axios.get(`http://localhost:5000/api/productos?categoria=${categoriaABuscar}&busqueda=&orden=-updatedAt&pagina=1&limite=6`);
		if(respuesta.status === 200) setProductosRelacionados(respuesta.data.productos);

	}, [idProducto, productos, productoSeleccionado]);
	

	return (
		<main className="producto-seleccionado">
			<div className="imagen-producto">
				{ productoSeleccionado && <img src={`http://localhost:5000/imagenes/productos/${productoSeleccionado.imagenProducto}`} alt={productoSeleccionado.nombre} /> }
			</div>

			<div className="informacion-producto">
				<h1 className="nombre">{productoSeleccionado.nombre}</h1>
				<h2 className="precio">{`$${productoSeleccionado.precio}/${productoSeleccionado.nombreUnitario}`}</h2>
				<p className="descripcion">{productoSeleccionado.descripcion}</p>
				<p className="categorias">{productoSeleccionado.categorias}</p>
			</div>
			<div className="acciones">
				<input type="number" className="cantidad"/>
				<button type="submit">Agregar al carrito</button>
			</div>

			<div className="productos-relacionados">
				<h2>Productos Relacionados</h2>
			{
				productosRelacionados.map(productoRelacionado => {
					if (productoRelacionado._id !== idProducto) {
						return (
							<div className="producto" key={productoRelacionado._id}>
								{productoRelacionado.nombre}
							</div>
						);
					}
				})
			}
			</div>
		</main>
	)
};

export default Producto;
