import React from 'react';
import {Switch, Route} from "react-router-dom";

import Tienda from "./Tienda/Tienda";

const EnrutadorPaginaPrincipal = () => {
	return (
		<Switch>
			<Route exact path="/tienda" component={Tienda} />
		</Switch>
	);
};

export default EnrutadorPaginaPrincipal;