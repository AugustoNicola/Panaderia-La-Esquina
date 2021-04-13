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
				<h1>La Esquina</h1>
				<h2>Panadería y Confitería</h2>
			</div>
			<div className="informacion-hero">
				<h3>Mirá lo que tenemos para vos ;)</h3>
				<img src="./flecha-abajo.svg" alt="Flecha" />
			</div>
		</header>

		<div className="seccion nuestros-productos">
			<h2>Nuestros Productos</h2>
			<div className="categorias-productos">
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
			<img src="" alt="Imagen Dónde Encontrarnos"/>
			<div className="contenido-donde-encontrarnos">
				<h2>¿Sabés dónde encontranos?</h2>
				<div className="informacion">
					<i>i</i>
					<p>Av. Cabildo 1234, Palermo, Buenos Aires</p>
				</div>
				<div className="informacion">
					<i>i</i>
					<p>Lunes a Viernes 08:00 — 19:30</p>
				</div>
				<div className="mapa">
					//todo plugin mapa
				</div>
			</div>
		</div>

		<Footer />
		</>
	);
};

export default PaginaInicio;
