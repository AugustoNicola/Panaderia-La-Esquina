import React from 'react';

import "./Footer.css";

const Footer = () => {
	return (
		<>
		<div className="footer">
			<h3 className="logo-footer">La Esquina</h3>
			<nav className="navegacion-footer">
				<a href="/">Página Principal</a>
				<a href="/tienda">Tienda Virtual</a>
				<a href="/contacto">Contacto</a>
			</nav>
			<div className="redes-sociales">
				<i class="fab fa-facebook-f"></i>
				<i class="fab fa-twitter"></i>
				<i class="fab fa-instagram"></i>
			</div>
		</div>
		<div className="copyright">
			<p>Copyright &copy; 2021 Augusto Nicola</p>
		</div>
		</>
	)
};

export default Footer;
