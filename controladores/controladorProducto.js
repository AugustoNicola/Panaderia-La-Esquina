const fs = require("fs");

const Producto = require("../modelos/modeloProducto");

const controladorCategoria = {
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
	}
}

module.exports = controladorCategoria;