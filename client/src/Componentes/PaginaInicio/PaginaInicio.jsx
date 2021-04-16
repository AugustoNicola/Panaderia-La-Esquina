import React, { useContext } from 'react';
import { EstadoGlobal } from '../../EstadoGlobal';

import "./PaginaInicio.css";
import Footer from "../Utilidades/Footer/Footer";

const PaginaInicio = () => {
	const estado = useContext(EstadoGlobal);
	const [categorias, setCategorias] = estado.categoriasAPI.categorias;

	return (
		<>
		<header className="hero">
			<div className="titulo-hero">
				<h1 data-transicion style={{animationDelay: "0s"}}>La Esquina</h1>
				<h2 data-transicion style={{animationDelay: "0.1s"}}>Panadería y Confitería</h2>
			</div>
			<div data-transicion style={{animationDelay: "0.55s"}} className="informacion-hero">
				<h3>Mirá lo que tenemos para vos ;)</h3>
				<i class="fas fa-chevron-down"></i>
			</div>
		</header>

		<div className="seccion nuestros-productos">
			<h2 data-transicion style={{animationDelay: "0s"}}>Nuestros Productos</h2>
			<div className="categorias-productos" data-transicion style={{animationDelay: "0.3s"}}>
				<div className="categoria">
					<span>Nuestras</span>
					<h4>Facturas</h4>
				</div>
				<div className="categoria">
					<span>Nuestros</span>
					<h4>Dulces</h4>
				</div>
				<div className="categoria">
					<span>Nuestras</span>
					<h4>Tortas</h4>
				</div>
			</div>
		</div>

		<div className="donde-encontrarnos">
			<div className="contenido-donde-encontrarnos">
				<h2 data-transicion style={{animationDelay: "0.2s"}}>¿Sabés dónde encontranos?</h2>
				<div className="informacion" data-transicion style={{animationDelay: "0.4s"}}>
					<i class="fas fa-map-marker-alt"></i>
					<p>Av. Cabildo 1234, Palermo, Buenos Aires</p>
				</div>
				<div className="informacion" data-transicion style={{animationDelay: "0.5s"}}>
					<i class="far fa-clock"></i>
					<p>Lunes a Viernes 08:00 — 19:30</p>
				</div>
				<div className="mapa" data-transicion style={{animationDelay: "0.7s"}}>
					{ /* todo plugin mapa*/}
				</div>
			</div>
		</div>

		<Footer />
		</>
	);
};

export default PaginaInicio;
