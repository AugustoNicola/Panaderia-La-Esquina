const router = require("express").Router();
const controladorCategoria = require("../controladores/controladorCategoria");

const multer = require("multer");
var upload = multer({dest: "./imagenes/categorias"});

router.route("/categorias")
	.get(controladorCategoria.obtenerCategorias)
	.post(upload.single("imagenCategoria"), controladorCategoria.crearCategoria)

router.route("/categorias/:id")
	//.put(controladorCategoria.modificarCategoria)
	.delete(controladorCategoria.eliminarCategoria)

module.exports = router;