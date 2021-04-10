const router = require("express").Router();
const controladorUsuario = require("../controladores/controladorUsuario");

router.post('/registro', controladorUsuario.registro);
router.post('/iniciarSesion', controladorUsuario.iniciarSesion);
router.post('/cerrarSesion', controladorUsuario.cerrarSesion);

router.get('/tokenReacceso', controladorUsuario.tokenReacceso);

//router.get('/', controladorUsuario.obtenerUsuario);
//router.put('/modificarCarrito', controladorUsuario.modificarCarrito);

module.exports = router;