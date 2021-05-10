import React, {createContext} from 'react';
import ProductosAPI from "./API/ProductosAPI";
import CategoriasAPI from "./API/CategoriasAPI";
import UsuarioAPI from "./API/UsuarioAPI";

export const EstadoGlobal = createContext();

export const ProveedorEstado = ({children}) =>{
	const estadoGlobal = {
		productosAPI: ProductosAPI(),
		categoriasAPI: CategoriasAPI(),
		usuarioAPI: UsuarioAPI()
	}

	return (
		<EstadoGlobal.Provider value={estadoGlobal}>
			{children}
		</EstadoGlobal.Provider>
	)
}