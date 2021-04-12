import React, { useContext } from 'react';
import { EstadoGlobal } from '../../EstadoGlobal';

const PaginaInicio = () => {
	const estado = useContext(EstadoGlobal);
	const [productos, setProductos] = estado.productosAPI.productos;
	
	return (
		<div>
			{productos.map(producto => <li>{producto.nombre}</li>)}
		</div>
	)
};

export default PaginaInicio;
