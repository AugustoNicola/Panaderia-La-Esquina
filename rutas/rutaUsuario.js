const router = require("express").Router();
const controladorUsuario = require("../controladores/controladorUsuario");
const autorizacionUsuario = require("../middleware/autorizacionUsuario");

router.post('/registro', controladorUsuario.registro);
router.post('/iniciarSesion', controladorUsuario.iniciarSesion);
router.post('/cerrarSesion', controladorUsuario.cerrarSesion);

router.get('/tokenReacceso', controladorUsuario.tokenReacceso);

router.get('/', autorizacionUsuario, controladorUsuario.obtenerUsuario);
router.put('/modificarCarrito', autorizacionUsuario, controladorUsuario.modificarCarrito);

module.exports = router;