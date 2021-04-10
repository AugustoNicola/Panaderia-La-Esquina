const router = require("express").Router();
const controladorCategoria = require("../controladores/controladorCategoria");

const multer = require("multer");
var upload = multer({dest: "./imagenes/categorias"});

router.route("/")
	.get(controladorCategoria.obtenerCategorias)
	.post(upload.single("imagenCategoria"), controladorCategoria.crearCategoria)

router.route("/:id")
	.put(upload.none(), controladorCategoria.modificarCategoria)
	.delete(controladorCategoria.eliminarCategoria)

router.route("/img/:id")
	.put(upload.single("imagenCategoria"), controladorCategoria.modificarCategoriaConImagen)

module.exports = router;