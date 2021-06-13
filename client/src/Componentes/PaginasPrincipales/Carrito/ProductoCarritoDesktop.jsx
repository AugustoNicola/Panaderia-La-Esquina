import React, {useState} from 'react';

const ProductoCarritoDesktop = ({producto, intentarModificarCantidad, intentarEliminarProducto}) => {
	const [cantidad, setCantidad] = useState(producto.cantidad);
	
	const cambioCantidadCarrito = e => {
		setCantidad((e.target.value >= 1 && e.target.value <= 99 ? e.target.value : cantidad));
	};
	
	return (
		<tr className="fila-producto">
			<td className="celda-imagen no-select">
				<div className="imagen">
					<img src={`/imagenes/productos/${producto.imagenProducto}`} alt={producto.nombre} />
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
					<input type="number" value={cantidad} min="1" max="99" className="cantidad" onChange={cambioCantidadCarrito} onBlur={(e) => intentarModificarCantidad(e, producto._id)} />
					<button type="button" className="boton borrar" onClick={() => intentarEliminarProducto(producto._id)}><i className="fas fa-trash"></i></button>
				</div>
			</td>
			<td className="celda-subtotal">
				<p>${producto.precio * producto.cantidad}</p>
			</td>
		</tr>
	)
};

export default ProductoCarritoDesktop;
