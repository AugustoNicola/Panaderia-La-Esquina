import React, {useContext, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import { EstadoGlobal } from "../../../EstadoGlobal";
import ProductoRelacionado from "../Tienda/Producto";

import MensajeInfo from "../../Utilidades/MensajeInfo/MensajeInfo";
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
	
	const [mensajeError, setMensajeError] = useState("");
	const intentarAniadirCarrito = async e => {
		e.preventDefault();
		if(!estado.usuarioAPI.sesionIniciada[0])
		{
			//? verificacion sesion iniciada
			setMensajeError("Iniciá sesión para añadir productos a tu carrito.");
			return;
		}
		const status = await estado.usuarioAPI.aniadirCarrito(productoSeleccionado, cantidadCarrito);
		if(status === 409)
		{
			//? producto ya en carrito
			setMensajeError("El producto seleccionado ya se encuentra en el carrito.");
		}
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
	
	if (productoSeleccionado) return (
		<>
		<MensajeInfo tipo={"error"} mensaje={mensajeError} /> 
		<main className="producto-seleccionado seccion">
			<div className="imagen-producto" data-transicion style={{animationDelay: "0.2s"}}>
				<img src={`http://localhost:5000/imagenes/productos/${productoSeleccionado.imagenProducto}`} alt={productoSeleccionado.nombre} />
			</div>

			<div className="informacion-producto" data-transicion style={{animationDelay: "0.4s"}}>
				<h1 className="nombre">{productoSeleccionado.nombre}</h1>
				<h2 className="precio">{`$${productoSeleccionado.precio}/${productoSeleccionado.nombreUnitario}`}</h2>
				<p className="descripcion">{productoSeleccionado.descripcion}</p>
				<p className="categorias">{productoSeleccionado.categorias.length > 1 ? "Categorías: " : "Categoría: "} {productoSeleccionado.categorias.map((categoria, i) => i + 1 !== productoSeleccionado.categorias.length ? `${categoria}, ` : categoria)}</p>
				
				<form onSubmit={intentarAniadirCarrito} className="acciones" data-transicion style={{animationDelay: "0.6s"}}>
					<input type="number" value={cantidadCarrito} min="1" max="99" onChange={cambioCantidadCarrito} className="cantidad"/>
					<button type="submit" className="boton">Agregar al carrito</button>
				</form>
			</div>
		</main>

		<div className="productos-relacionados seccion" data-transicion style={{animationDelay: "0.8s"}}>
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
