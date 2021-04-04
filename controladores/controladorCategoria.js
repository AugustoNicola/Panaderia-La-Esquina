const fs = require("fs");

const Categoria = require("../modelos/modeloCategoria");

const controladorCategoria = {
	obtenerCategorias: async(req, res) => {
		try {
			//* obtencion de categorias
			const categorias = await Categoria.find();
			return res.status(200).json({
				exito: true,
				cantidad: categorias.length,
				categorias: categorias
			})
		} catch (error) {
			return res.status(500).json({mensajeError: error.message})
		}
	},
	crearCategoria: async(req, res) => {
		try {
			const nombreCategoria = req.body.nombre;
			const imagenCategoria = req.file;
			
			//? verificacion categoria unica
			const categoriaCoincidente = await Categoria.findOne({nombre: nombreCategoria});
			if(categoriaCoincidente) return res.status(409).json({mensajeError: "¡La categoría ya existe!"}); //409: Conflict

			//# la verificacion de imagen se hace en el frontend antes de enviar el request
			//# en caso de error, se alcanza el catch y se envia un error de servidor (500)

			//* creacion nueva categoria
			const nuevaCategoria = new Categoria({nombre: nombreCategoria, imagenPortada: imagenCategoria.filename});
			await nuevaCategoria.save();

			return res.status(200);
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	},
	eliminarCategoria: async (req,res) => {
		try {
			//? verificacion categoria existe
			const categoriaAEliminar = await Categoria.findById(req.params.id);
			if(!categoriaAEliminar) return res.status(404).json({mensaje: "¡La categoria no existe!"}); //404: Not Found

			//* eliminacion imagen asociada
			fs.unlink(`./imagenes/categorias/${categoriaAEliminar.imagenPortada}`, err => {
				return; //no importa si la imagen no existe
			});

			//* eliminacion documento de la categoria
			await Categoria.findByIdAndDelete(req.params.id);

			return res.status(200);
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	}
}

module.exports = controladorCategoria;