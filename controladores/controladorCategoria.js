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
			const nombre = req.body.nombre;
			const imagenPortada = req.file.filename;
			
			//? verificacion categoria unica
			const categoriaCoincidente = await Categoria.findOne({nombre});
			if(categoriaCoincidente) return res.status(409).end(); //409: Conflict.

			//# la verificacion de imagen se hace en el frontend antes de enviar el request
			//# en caso de error, se alcanza el catch y se envia un error de servidor (500)

			//* creacion nueva categoria
			const nuevaCategoria = new Categoria({nombre, imagenPortada});
			await nuevaCategoria.save();
			
			return res.status(200).json({categoria: nuevaCategoria});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	},
	modificarCategoria: async(req, res) => {
		try {
			const nombre = req.body.nombre;
			
			//* modficacion categoria
			//? y verificacion categoria existe
			const categoriaModificada = await Categoria.findByIdAndUpdate(req.params.id, {nombre}, {new: true});
			if(!categoriaModificada) return res.status(404).end(); //404: Not Found.
			
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
			const categoriaAModificar = await Categoria.findById(req.params.id);
			if(!categoriaAModificar) return res.status(404).end(); //404: Not Found.

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
			//* eliminacion documento de la categoria
			//? y verificacion categoria existe
			const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
			if(!categoriaEliminada) return res.status(404).end(); //404: Not Found.

			//* eliminacion imagen asociada
			fs.unlink(`./imagenes/categorias/${categoriaEliminada.imagenPortada}`, err => {
				return; //no importa si la imagen no existe
			});

			return res.status(200).json({categoria: categoriaEliminada});
		} catch (error) {
			return res.status(500).json({mensajeError: error.message});
		}
	}
}

module.exports = controladorCategoria;