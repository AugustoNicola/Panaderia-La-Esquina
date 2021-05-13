import React, {useContext} from 'react';
import {Link} from "react-router-dom";

import { EstadoGlobal } from "../../EstadoGlobal";
import "./Header.css";

const Header = () => {
	const estado = useContext(EstadoGlobal);
	
	const accionesConSesion = () => {
		return (
			<div className="botones-header">
				<Link to="/carrito" className="accion">
					<i className="fas fa-shopping-cart"></i>
					<p>Carrito</p>
				</Link>
				<a target="#" className="accion" onClick={estado.usuarioAPI.cerrarSesion}>
					<i className="fas fa-sign-in-alt"></i>
					<p>Salir</p>
				</a>
			</div>
		)
	};
	
	const accionesSinSesion = () => {
		return (
			<div className="botones-header">
				<Link to="/iniciarSesion" className="accion">
					<i className="fas fa-sign-in-alt"></i>
					<p>Entrar</p>
				</Link>
			</div>
		)
	}
	
	return (
		<div className="header">
			<Link to="/tienda" className="logo-header">La Esquina</Link>

			{estado.usuarioAPI.sesionIniciada[0] ? accionesConSesion() : accionesSinSesion()}
		</div>
	);
};

export default Header;
