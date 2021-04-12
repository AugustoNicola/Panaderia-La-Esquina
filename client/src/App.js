import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import PaginaInicio from "./Componentes/PaginaInicio/PaginaInicio";
import Header from "./Componentes/Headers/Header"
import EnrutadorPaginaPrincipal from "./Componentes/PaginasPrincipales/EnrutadorPaginaPrincipal"
import { ProveedorEstado } from "./EstadoGlobal";


const App = () => {
	return(
		<ProveedorEstado>
			<Router>
				<div className="app">
					<Switch>
						<Route exact path="/" component={PaginaInicio} />

						<Route path="*">	
							<Header />
							<EnrutadorPaginaPrincipal />
						</Route>
					</Switch>
				</div>
			</Router>
		</ProveedorEstado>
	)
};

export default App;
