import React, {createContext} from 'react';
import ProductosAPI from './API/ProductosAPI';

export const EstadoGlobal = createContext();

export const ProveedorEstado = ({children}) =>{
	const estadoGlobal = {
		productosAPI: ProductosAPI(),
	}

	return (
		<EstadoGlobal.Provider value={estadoGlobal}>
			{children}
		</EstadoGlobal.Provider>
	)
}