import React, { useContext } from 'react';

import {EstadoGlobal} from "../../../EstadoGlobal";

const Filtros = () => {
	const estado = useContext(EstadoGlobal);
	const [categorias] = estado.categoriasAPI.categorias;

	return (
		<div className="filtros">
			<input type="text" name="busqueda" id="busqueda" placeholder="¡Escribí el nombre de lo que querés!"/>

			<select name="categoria" id="categoria" className="ordenador">
				<option value="">Todo</option>
				{
					categorias.map(categoria => {
						return (
							<option value={categoria.nombre}>{categoria.nombre}</option>
						)
					})
				}
			</select>

			<select name="orden" id="orden" className="ordenador">
				<option value="precio">Precio más bajo</option>
				<option value="-precio">Precio más alto</option>
				<option value="updatedAt">Más reciente</option>
				<option value="updatedAt">Menos reciente</option>
			</select>
		</div>
	);
};

export default Filtros;
