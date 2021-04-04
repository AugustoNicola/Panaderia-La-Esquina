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
			const nombre = req.body.nombre;
			const precio = req.body.precio;
			const nombreUnitario = req.body.nombreUnitario;
			const descripcion = req.body.descripcion;
			const categorias = req.body.categorias;
			const imagenProducto = req.file.filename;
			
			//? verificacion producto unico
			const productoCoincidente = await Producto.findOne({nombre});
			if(productoCoincidente) return res.status(409).json({mensajeError: "¡El producto ya existe!"}); //409: Conflict

			//# la verificacion de imagen se hace en el frontend antes de enviar el request
			//# en caso de error, se alcanza el catch y se envia un error de servidor (500)

			//* creacion nuevo producto
			const nuevoProducto = new Producto({nombre, precio, nombreUnitario, descripcion, categorias, imagenProducto});
			await nuevoProducto.save();

			return res.status(200).json({producto: nuevoProducto});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	}
}

module.exports = controladorProducto;