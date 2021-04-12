import React, {createContext} from 'react';
import ProductosAPI from "./API/ProductosAPI";
import CategoriasAPI from "./API/CategoriasAPI"

export const EstadoGlobal = createContext();

export const ProveedorEstado = ({children}) =>{
	const estadoGlobal = {
		productosAPI: ProductosAPI(),
		categoriasAPI: CategoriasAPI()
	}

	return (
		<EstadoGlobal.Provider value={estadoGlobal}>
			{children}
		</EstadoGlobal.Provider>
	)
}