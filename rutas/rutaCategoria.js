const router = require("express").Router();
const controladorCategoria = require("../controladores/controladorCategoria");
const autorizacionUsuario = require("../middleware/autorizacionUsuario");
const autorizacionAdmin = require("../middleware/autorizacionAdmin");

const multer = require("multer");
var upload = multer({dest: "./imagenes/categorias"});

router.route("/")
	.get(controladorCategoria.obtenerCategorias)
	.post(upload.single("imagenCategoria"), autorizacionUsuario, autorizacionAdmin, controladorCategoria.crearCategoria)

router.route("/:id")
	.put(upload.none(), autorizacionUsuario, autorizacionAdmin, controladorCategoria.modificarCategoria)
	.delete(autorizacionUsuario, autorizacionAdmin, controladorCategoria.eliminarCategoria)

router.route("/img/:id")
	.put(upload.single("imagenCategoria"), autorizacionUsuario, autorizacionAdmin, controladorCategoria.modificarCategoriaConImagen)

module.exports = router;