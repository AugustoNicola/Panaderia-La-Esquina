import React, {useState} from 'react';

const ProductoCarritoMobile = ({producto, intentarModificarCantidad, intentarEliminarProducto}) => {
	const [cantidad, setCantidad] = useState(producto.cantidad);
	
	const cambioCantidadCarrito = e => {
		setCantidad((e.target.value >= 1 && e.target.value <= 99 ? e.target.value : cantidad));
	};
	
	return (
		<div className="producto-carrito">
			<div className="principal">	
				<div className="imagen no-select">
					<img src={`/imagenes/productos/${producto.imagenProducto}`} alt={producto.nombre} />
				</div>

				<div className="informacion">
					<h3>{producto.nombre}</h3>
					<p>Precio unitario: ${producto.precio}</p>
					
					<div className="acciones">
						<input type="number" value={cantidad} min="1" max="99" className="cantidad" onChange={cambioCantidadCarrito} onBlur={(e) => intentarModificarCantidad(e, producto._id)}/>
						<button type="button" className="boton borrar" onClick={() => intentarEliminarProducto(producto._id)}><i className="fas fa-trash"></i></button>
					</div>
					
				</div>
			</div>

			<div className="subtotal">
				<p>Total Producto: ${producto.precio * producto.cantidad}</p>
			</div>
		</div>
	)
};

export default ProductoCarritoMobile;
