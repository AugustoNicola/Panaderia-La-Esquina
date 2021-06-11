import React, { useContext } from 'react';

import {EstadoGlobal} from "../../../EstadoGlobal";

const Filtros = () => {
	const estado = useContext(EstadoGlobal);
	const [busqueda, setBusqueda] = estado.productosAPI.busqueda;
	const [categoria, setCategoria] = estado.productosAPI.categoria;
	const [orden, setOrden] = estado.productosAPI.orden;

	const [categorias] = estado.categoriasAPI.categorias;

	const cambioBusqueda = e => {
		setBusqueda(e.target.value);
	}

	const cambioCategoria = e => {
		setCategoria(e.target.value);
		setBusqueda(""); //reinicia la busqueda al cambiar la categoria
	}

	const cambioOrden = e => {
		setOrden(e.target.value);
	}
	return (
		<div className="filtros" data-transicion style={{animationDelay: "0.3s"}}>
			<input type="text" name="busqueda" id="busqueda" placeholder="¡Escribí lo que querés!" value={busqueda} onChange={cambioBusqueda}/>
			<div className="selector-filtros">
				<select name="categoria" id="categoria" value={categoria ? categoria : ""} onChange={cambioCategoria}>
					<option value="">Todo</option>
					{
						categorias.map(categoriaActual => {
							return (
								<option key={categoriaActual._id} value={categoriaActual.nombre}>{categoriaActual.nombre}</option>
							)
						})
					}
				</select>
			</div>
			<div className="selector-filtros">
				<select name="orden" id="orden" value={orden ? orden : "-updatedAt"} onChange={cambioOrden}>
					<option value="precio">Precio más bajo</option>
					<option value="-precio">Precio más alto</option>
					<option value="-updatedAt">Más reciente</option>
					<option value="updatedAt">Menos reciente</option>
				</select>
			</div>
		</div>
	);
};

export default Filtros;
