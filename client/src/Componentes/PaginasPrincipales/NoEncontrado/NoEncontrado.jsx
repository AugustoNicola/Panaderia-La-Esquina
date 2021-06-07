import React from 'react';
import {Link} from "react-router-dom";

const NoEncontrado = () => {
	return (
		<div className="operacion-invalida seccion" data-transicion style={{animationDelay: "0.4s"}}>
			<h2>¡Ups!</h2>
			<h3>Esta página no existe</h3>
			<h4>Probá volviendo a la <Link to="/">página principal.</Link></h4>
		</div>
	)
};

export default NoEncontrado;
