const router = require("express").Router();
const controladorProducto = require("../controladores/controladorProducto");

const multer = require("multer");
var upload = multer({dest: "./imagenes/productos"});

router.route("/productos")
	.get(controladorProducto.obtenerProductos)
	//.post(upload.single("imagenCategoria"), controladorProducto.crearProducto)

router.route("/productos/:id")
	//.put(upload.none(), controladorProducto.modificarProducto)
	//.delete(controladorProducto.eliminarProducto)

router.route("/productos/img/:id")
	//.put(upload.single("imagenCategoria"), controladorProducto.modificarProductoConImagen)

module.exports = router;