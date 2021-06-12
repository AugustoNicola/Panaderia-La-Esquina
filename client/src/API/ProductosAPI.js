import {useState, useEffect} from 'react';
import axios from 'axios';

const ProductosAPI = () => {
	const [productos, setProductos] = useState([]);
	const [cantidadProductos, setCantidadProductos] = useState(0);

	const [categoria, setCategoria] = useState("")
	const [busqueda, setBusqueda] = useState("");
	const [orden, setOrden] = useState("-updatedAt");
	const [pagina, setPagina] = useState(1);
	const [limite, setLimite] = useState(50);

	const [callback, setCallback] = useState(false); // al ser alterado vuelve a obtener los productos

	useEffect(() => {
		const obtenerProductos = async () => {
			//* llamada al backend para recibir los productos segun query string
			const respuesta = await axios.get(`/api/productos?categoria=${categoria}&busqueda=${busqueda}&orden=${orden}&pagina=${pagina}&limite=${limite}`);

			if(respuesta.status === 200)
			{
				setProductos(respuesta.data.productos);
				setCantidadProductos(respuesta.data.cantidad);
			}
		};
		
		obtenerProductos(); // llama a la funcion
	},[categoria, orden, busqueda, pagina, limite, callback]);
	
	return {
		productos: [productos, setProductos],
		cantidadProductos: [cantidadProductos, setCantidadProductos],

		categoria: [categoria, setCategoria],
		busqueda: [busqueda, setBusqueda],
		orden: [orden, setOrden],
		pagina: [pagina, setPagina],
		limite: [limite, setLimite],

		callback: [callback, setCallback],
	}
};

export default ProductosAPI;
