const Categoria = require("../modelos/modeloCategoria");

const controladorCategoria = {
	obtenerCategorias: async(req, res) => {
		try {
			//* obtencion de categorias
			const categorias = await Categoria.find();
			res.status(200).json({
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
			
			//? verificacion categoria unica
			const categoriaCoincidente = await Categoria.findOne({nombre: nombreCategoria});
			if(categoriaCoincidente) res.status(409).json({mensajeError: "¡La categoría ya existe!"}); //409: Conflict

			//* creacion nueva categoria
			const nuevaCategoria = new Categoria({nombre: nombreCategoria});
			await nuevaCategoria.save();

			res.status(200).json({mensaje: "Categoria creada"});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	}
}

module.exports = controladorCategoria;