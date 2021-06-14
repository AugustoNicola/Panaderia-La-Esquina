import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import "./normalize.css";
import "./App.css";
import RestaurarScroll from "./Componentes/Utilidades/RestaurarScroll/RestaurarScroll";
import PaginaInicio from "./Componentes/PaginasPrincipales/PaginaInicio/PaginaInicio";
import Header from "./Componentes/Utilidades/Header/Header";
import Footer from "./Componentes/Utilidades/Footer/Footer";
import EnrutadorPaginaPrincipal from "./Componentes/PaginasPrincipales/EnrutadorPaginaPrincipal";
import { ProveedorEstado } from "./EstadoGlobal";


const App = () => {
	return(
		<ProveedorEstado>
			<Router>
				<RestaurarScroll />
				<div className="app">
					<Switch>
						<Route exact path="/" component={PaginaInicio} />
						
						<Route path="*">	
							<Header />
							<EnrutadorPaginaPrincipal />
						</Route>
					</Switch>
					
					<Footer />
				</div>
			</Router>
		</ProveedorEstado>
	)
};

export default App;
