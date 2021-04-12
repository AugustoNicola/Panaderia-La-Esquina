import React, { useContext } from 'react';
import { EstadoGlobal } from '../../EstadoGlobal';

const PaginaInicio = () => {
	const estado = useContext(EstadoGlobal);
	const [productos, setProductos] = estado.productosAPI.productos;
	const [categorias, setCategorias] = estado.categoriasAPI.categorias;

	
	return (
		<div>
			{productos.map(producto => <li>{producto.nombre}</li>)}
			<br/>
			{categorias.map(categoria => <li>{categoria.nombre}</li>)}
		</div>
	);
};

export default PaginaInicio;
