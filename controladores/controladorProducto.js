const fs = require("fs");

const Producto = require("../modelos/modeloProducto");

const controladorProducto = {
	obtenerProductos: async(req, res) => {
		try {

			const urlQuery = req.query;
			
			//* filtrado
			let filtros = {};

			if(urlQuery.categoria) {
				filtros.categorias = {$all: [urlQuery.categoria]};
			}
			if(urlQuery.busqueda) {
				filtros.nombre = {$regex: urlQuery.busqueda, $options: "i"};
			}

			//* ordenamiento
			const orden = urlQuery.orden ? urlQuery.orden : "-precio";

			//* paginacion
			const pagina = urlQuery.pagina * 1 || 1;
			const limite = urlQuery.limite * 1 || 9;
			const saltear = (pagina - 1) * limite;

			//* llamada al query
			const productos = await Producto.find(filtros).sort(orden).skip(saltear).limit(limite);

			//* obtencion de productos
			return res.status(200).json({
				exito: true,
				cantidad: productos.length,
				productos: productos
			})
		} catch (error) {
			return res.status(500).json({mensajeError: error.message})
		}
	},
	crearProducto: async(req, res) => {
		try {
			const {nombre, precio, nombreUnitario, descripcion, categorias} = req.body;
			const imagenProducto = req.file.filename;
			
			//? verificacion producto unico
			const productoCoincidente = await Producto.findOne({nombre});
			if(productoCoincidente) return res.status(409).end(); //409: Conflict.

			//# la verificacion de imagen se hace en el frontend antes de enviar el request
			//# en caso de error, se alcanza el catch y se envia un error de servidor (500)

			//* creacion nuevo producto
			const nuevoProducto = new Producto({nombre, precio, nombreUnitario, descripcion, categorias, imagenProducto});
			await nuevoProducto.save();

			return res.status(200).json({producto: nuevoProducto});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	},
	modificarProducto: async(req, res) => {
		try {
			const {nombre, precio, nombreUnitario, descripcion, categorias} = req.body;
			
			//* modficacion producto
			//? y verificacion producto existe
			const productoModificado = await Producto.findByIdAndUpdate(req.params.id, {nombre, precio, nombreUnitario, descripcion, categorias}, {new: true});
			if(!productoModificado) return res.status(404).end(); //404: Not Found.
			
			return res.status(200).json({producto: productoModificado});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	},
	modificarProductoConImagen: async(req, res) => {
		try {
			const {nombre, precio, nombreUnitario, descripcion, categorias} = req.body;
			const imagenProducto = req.file;
			
			//? verificacion producto existe
			const productoAModificar = await Producto.findById(req.params.id);
			if(!productoAModificar) return res.status(404).end(); //404: Not Found.

			//* eliminacion imagen previa
			fs.unlink(`./imagenes/productos/${productoAModificar.imagenProducto}`, err => {
				return; //no importa si la imagen no existe
			});

			//# la verificacion de imagen se hace en el frontend antes de enviar el request
			//# en caso de error, se alcanza el catch y se envia un error de servidor (500)

			//* modificacion producto
			productoAModificar.nombre = nombre;
			productoAModificar.precio = precio;
			productoAModificar.nombreUnitario = nombreUnitario;
			productoAModificar.descripcion = descripcion;
			productoAModificar.categorias = categorias;
			productoAModificar.imagenProducto = imagenProducto.filename;
			await productoAModificar.save();

			return res.status(200).json({producto: productoAModificar});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	},
	eliminarProducto: async(req, res) => {
		try {
			//* eliminacion producto
			//? y verificacion producto existe
			const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
			if(!productoEliminado) return res.status(404).end(); //404: Not Found.

			//* eliminacion imagen asociada
			fs.unlink(`./imagenes/productos/${productoEliminado.imagenProducto}`, err => {
				return; //no importa si la imagen no existe
			});

			return res.status(200).json({producto: productoEliminado});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	}
}

module.exports = controladorProducto;