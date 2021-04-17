import React from 'react';
import {Link} from "react-router-dom";

const Producto = ({producto}) => {
	return (
		<Link to={"/producto/" + producto._id} className="producto">
			<img src= {"http://localhost:5000/imagenes/productos/" + producto.imagenProducto} alt={producto.nombre}/>

			<div className="informacion-producto">
				<h3 className="nombre">{producto.nombre}</h3>
				<p className="precio">{`$${producto.precio}/${producto.nombreUnitario}`}</p>
			</div>
		</Link>
	)
};

export default Producto;
