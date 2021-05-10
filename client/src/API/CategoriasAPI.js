import {useState, useEffect} from 'react';
import axios from 'axios';

const CategoriasAPI = () => {
	const [categorias, setCategorias] = useState([]);
	const [cantidadCategorias, setCantidadCategorias] = useState(0);

	const [callback, setCallback] = useState(false); // al ser alterado vuelve a obtener los productos

	useEffect(() => {
		const obtenerCategorias = async () => {
			//* llamada al backend para recibir las categorias
			const respuesta = await axios.get(`/api/categorias`);

			if(respuesta.status === 200)
			{
				setCategorias(respuesta.data.categorias);
				setCantidadCategorias(respuesta.data.cantidad);
			}
		};
		
		obtenerCategorias(); // llama a la funcion
	},[callback]);
	
	return {
		categorias: [categorias, setCategorias],
		cantidadCategorias: [cantidadCategorias, setCantidadCategorias],

		callback: [callback, setCallback],
	}
};

export default CategoriasAPI;
