import React from 'react';
import {Switch, Route} from "react-router-dom";

import IniciarSesion from "./IniciarSesion/IniciarSesion";
import Registro from "./Registro/Registro";

import Tienda from "./Tienda/Tienda";
import Producto from "./Producto/Producto";
import Carrito from "./Carrito/Carrito";
import Checkout from "./Checkout/Checkout";

import NoEncontrado from "./NoEncontrado/NoEncontrado";

const EnrutadorPaginaPrincipal = () => {
	return (
		<Switch>
			<Route exact path="/iniciarSesion" component={IniciarSesion} />
			<Route exact path="/registro" component={Registro} />
			
			<Route exact path="/tienda" component={Tienda} />
			<Route exact path="/producto/:idProducto" component={Producto} />

			<Route exact path="/carrito" component={Carrito} />
			<Route exact path="/checkout" component={Checkout} />
			
			<Route path="*" component={NoEncontrado} />
		</Switch>
	);
};

export default EnrutadorPaginaPrincipal;