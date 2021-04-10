const router = require("express").Router();
const controladorProducto = require("../controladores/controladorProducto");
const autorizacionUsuario = require("../middleware/autorizacionUsuario");
const autorizacionAdmin = require("../middleware/autorizacionAdmin");

const multer = require("multer");
var upload = multer({dest: "./imagenes/productos"});

router.route("/")
	.get(controladorProducto.obtenerProductos)
	.post(upload.single("imagenProducto"), autorizacionUsuario, autorizacionAdmin, controladorProducto.crearProducto)

router.route("/:id")
	.put(upload.none(), autorizacionUsuario, autorizacionAdmin, controladorProducto.modificarProducto)
	.delete(autorizacionUsuario, autorizacionAdmin, controladorProducto.eliminarProducto)

router.route("/img/:id")
	.put(upload.single("imagenProducto"), autorizacionUsuario, autorizacionAdmin, controladorProducto.modificarProductoConImagen)

module.exports = router;