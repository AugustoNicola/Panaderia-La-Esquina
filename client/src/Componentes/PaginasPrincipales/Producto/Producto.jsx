import React, {useContext, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import { EstadoGlobal } from "../../../EstadoGlobal";
import ProductoRelacionado from "../Tienda/Producto";

import "./Producto.css"


const Producto = () => {
	const estado = useContext(EstadoGlobal);
	const [productos] = estado.productosAPI.productos;
	const [productoSeleccionado, setProductoSeleccionado] = useState(false);
	const [productosRelacionados, setProductosRelacionados] = useState([]);
	const {idProducto} = useParams();

	const [cantidadCarrito, setCantidadCarrito] = useState(1);
	const cambioCantidadCarrito = e => {
		setCantidadCarrito((e.target.value >= 1 && e.target.value <= 99 ? e.target.value : cantidadCarrito));
	}

	useEffect(async () => {
		//* encuentra el producto seleccionado
		productos.forEach(producto => {
			if(producto._id === idProducto) setProductoSeleccionado(producto);
		});
		
		//* busca productos relacionados
		const categoriaABuscar = productoSeleccionado.categorias ? productoSeleccionado.categorias[0] : "";
		const respuesta = await axios.get(`http://localhost:5000/api/productos?categoria=${categoriaABuscar}&busqueda=&orden=-updatedAt&pagina=1&limite=6`);
		if(respuesta.status === 200) setProductosRelacionados(respuesta.data.productos);

	}, [idProducto, productos, productoSeleccionado]);
	
	if (productoSeleccionado) return (
		<>
		<main className="producto-seleccionado seccion">
			<div className="imagen-producto">
				<img src={`http://localhost:5000/imagenes/productos/${productoSeleccionado.imagenProducto}`} alt={productoSeleccionado.nombre} />
			</div>

			<div className="informacion-producto">
				<h1 className="nombre">{productoSeleccionado.nombre}</h1>
				<h2 className="precio">{`$${productoSeleccionado.precio}/${productoSeleccionado.nombreUnitario}`}</h2>
				<p className="descripcion">{productoSeleccionado.descripcion}</p>
				<p className="categorias">{productoSeleccionado.categorias.length > 1 ? "Categorías: " : "Categoría: "} {productoSeleccionado.categorias.map((categoria, i) => i + 1 !== productoSeleccionado.categorias.length ? `${categoria}, ` : categoria)}</p>
				
				<div className="acciones">
					<input type="number" value={cantidadCarrito} min="1" max="99" onChange={cambioCantidadCarrito} className="cantidad"/>
					<button type="submit" class="boton">Agregar al carrito</button>
				</div>
			</div>
			
		</main>

		<div className="productos-relacionados seccion">
			<h2>Productos Relacionados</h2>
			<div className="listado">
				{
				productosRelacionados.map(productoRelacionado => {
					if (productoRelacionado._id !== idProducto) {
						return (
							<ProductoRelacionado producto={productoRelacionado} key={productoRelacionado._id} />
						);
					}
				})
				}
			</div>
		</div>
		</>
	)
	return <div ></div>
};

export default Producto;
