const fs = require("fs");

const Producto = require("../modelos/modeloProducto");

const controladorProducto = {
	obtenerProductos: async(req, res) => {
		try {
			//* obtencion de productos
			const productos = await Producto.find();
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
	eliminarProducto: async(req, res) => {
		try {
			//* eliminacion documento de la categoria
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