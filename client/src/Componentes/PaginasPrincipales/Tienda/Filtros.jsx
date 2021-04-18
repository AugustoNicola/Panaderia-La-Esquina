import React, { useContext } from 'react';

import {EstadoGlobal} from "../../../EstadoGlobal";

const Filtros = () => {
	const estado = useContext(EstadoGlobal);
	const [categorias] = estado.categoriasAPI.categorias;

	return (
		<div className="filtros">
			<input type="text" name="busqueda" id="busqueda" placeholder="¡Escribí lo que querés!"/>
			<div className="selector-filtros">
				<select name="categoria" id="categoria">
					<option value="">Todo</option>
					{
						categorias.map(categoria => {
							return (
								<option value={categoria.nombre}>{categoria.nombre}</option>
							)
						})
					}
				</select>
			</div>
			<div className="selector-filtros">
				<select name="orden" id="orden">
					<option value="precio">Precio más bajo</option>
					<option value="-precio">Precio más alto</option>
					<option value="updatedAt">Más reciente</option>
					<option value="updatedAt">Menos reciente</option>
				</select>
			</div>
		</div>
	);
};

export default Filtros;
