import React from 'react';
import {Link} from "react-router-dom";

import "./Header.css";

const Header = () => {

	return (
		<div className="header">
			<Link to="/tienda" className="logo-header">La Esquina</Link>

			<div className="botones-header">
				<Link to="/carrito" className="accion">
					<i className="fas fa-shopping-cart"></i>
					<p>Carrito</p>
				</Link>
				<Link to="/iniciarSesion" className="accion">
					<i className="fas fa-sign-in-alt"></i>
					<p>Entrar</p>
				</Link>
			</div>
		</div>
	);
};

export default Header;
