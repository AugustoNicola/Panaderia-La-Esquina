const router = require("express").Router();
const controladorCategoria = require("../controladores/controladorCategoria");

router.route("/categorias")
	.get(controladorCategoria.obtenerCategorias)
	.post(controladorCategoria.crearCategoria)

module.exports = router;