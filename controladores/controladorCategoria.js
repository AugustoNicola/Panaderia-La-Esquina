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

			return res.status(200).json({categoria: nuevaCategoria});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	},
	modificarCategoria: async(req, res) => {
		try {
			const nuevoNombreCategoria = req.body.nombre;
			
			//* modficacion categoria
			//? y verificacion categoria existe
			const categoriaModificada = await Categoria.findByIdAndUpdate(req.params.id, {nombre: nuevoNombreCategoria}, {new: true});
			if(!categoriaModificada) return res.status(404).json({mensajeError: "¡La categoría no existe!"});

			return res.status(200).json({categoria: categoriaModificada});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	},
	modificarCategoriaConImagen: async(req, res) => {
		try {
			const nuevoNombreCategoria = req.body.nombre;
			const nuevaImagenCategoria = req.file;
			
			//? verificacion categoria existe
			const categoriaAModificar = await Categoria.findById(id);
			if(!categoriaAModificar) return res.status(404).json({mensajeError: "¡La categoría no existe!"});

			//* eliminacion imagen previa
			fs.unlink(`./imagenes/categorias/${categoriaAModificar.imagenPortada}`, err => {
				return; //no importa si la imagen no existe
			});

			//# la verificacion de imagen se hace en el frontend antes de enviar el request
			//# en caso de error, se alcanza el catch y se envia un error de servidor (500)

			//* modificacion categoria
			categoriaAModificar.nombre = nuevoNombreCategoria;
			categoriaAModificar.imagenPortada = nuevaImagenCategoria.filename;
			await categoriaAModificar.save();

			return res.status(200).json({categoria: categoriaAModificar});
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

			return res.status(200).json({categoria: categoriaAEliminar});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	}
}

module.exports = controladorCategoria;