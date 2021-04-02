const router = require("express").Router();
const controladorCategoria = require("../controladores/controladorCategoria");

router.route("/categorias")
	.get(controladorCategoria.obtenerCategorias)
	.post(controladorCategoria.crearCategoria)

router.route("/categorias/:id")
	//.put(controladorCategoria.modificarCategoria)
	.delete(controladorCategoria.eliminarCategoria)

module.exports = router;