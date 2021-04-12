import {useState, useEffect} from 'react';
import axios from 'axios';

const ProductosAPI = () => {
	const [productos, setProductos] = useState([]);
	const [cantidadProductos, setCantidadProductos] = useState(0);

	const [categoria, setCategoria] = useState("")
	const [busqueda, setBusqueda] = useState("");
	const [orden, setOrden] = useState("");
	const [pagina, setPagina] = useState(1);
	const [limite, setLimite] = useState(9);

	const [callback, setCallback] = useState(false);

	useEffect(() =>{
		const obtenerProductos = async () => {
			//* llamada al backend para recibir los productos segun query string
			const respuesta = await axios.get(`http://localhost:5000/api/productos?categoria=${categoria}&busqueda=${busqueda}&orden=${orden}&pagina=${pagina}&limite=${limite}`);

			if(respuesta.status === 200)
			{
				setProductos(respuesta.data.productos);
				setCantidadProductos(respuesta.data.cantidad);
			}
		}
		
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
