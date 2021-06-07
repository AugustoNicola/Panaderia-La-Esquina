import React, { useContext, useState } from 'react';
import { Redirect } from "react-router";
import { EstadoGlobal } from "../../../EstadoGlobal";

import "./PaginaInicio.css";

const PaginaInicio = () => {
	const estado = useContext(EstadoGlobal);
	const [categorias] = estado.categoriasAPI.categorias;
	const [categoria, setCategoria] = estado.productosAPI.categoria;
	const [redireccion, setRedireccion] = useState(false);

	const navegacionTienda = (nombreCategoria) => {
		setCategoria(nombreCategoria);
		setRedireccion(true);
	};

	return (
		<>
		{redireccion && <Redirect to="/tienda" />}

		<header className="hero seccion tamano-completo">
			<div className="titulo-hero">
				<h1 data-transicion style={{animationDelay: "0s"}}>La Esquina</h1>
				<h2 data-transicion style={{animationDelay: "0.1s"}}>Panadería y Confitería</h2>
			</div>
			<div data-transicion style={{animationDelay: "0.55s"}} className="informacion-hero">
				<h3>Mirá lo que tenemos para vos</h3>
				<i className="fas fa-chevron-down"></i>
			</div>
		</header>

		<div className="seccion nuestros-productos">
			<h2 data-transicion style={{animationDelay: "0s"}}>Nuestros Productos</h2>
			<div className="categorias-productos" data-transicion style={{animationDelay: "0.3s"}}>
				{
					categorias.map(categoria => {
						return (
							<div className="categoria" key={categoria._id} onClick={() => navegacionTienda(categoria.nombre)}>
								<span>{categoria.esFemenino ? "Nuestras" : "Nuestros"}</span>
								<h4>{categoria.nombre}</h4>
								<img src= {"http://localhost:5000/imagenes/categorias/" + categoria.imagenPortada} alt=""/>
							</div>
						);
					})
				}
			</div>
		</div>

		<div className="donde-encontrarnos seccion tamano-completo">
			<div className="contenido-donde-encontrarnos">
				<h2 data-transicion style={{animationDelay: "0.2s"}}>¿Sabés dónde encontranos?</h2>
				<div className="informacion" data-transicion style={{animationDelay: "0.4s"}}>
					<i className="fas fa-map-marker-alt"></i>
					<p>Av. Cabildo 1234, Palermo, Buenos Aires</p>
				</div>
				<div className="informacion" data-transicion style={{animationDelay: "0.5s"}}>
					<i className="far fa-clock"></i>
					<p>Lunes a Viernes 08:00 — 19:30</p>
				</div>
				<div className="mapa" data-transicion style={{animationDelay: "0.7s"}}>
					{ /* todo plugin mapa*/}
				</div>
			</div>
		</div>
		</>
	);
};

export default PaginaInicio;
