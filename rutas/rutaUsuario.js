const router = require("express").Router();
const controladorUsuario = require("../controladores/controladorUsuario");

router.post('/usuarios/registro', controladorUsuario.registro);
router.post('/usuarios/iniciarSesion', controladorUsuario.iniciarSesion);
router.post('/usuarios/cerrarSesion', controladorUsuario.cerrarSesion);

router.get('/usuarios/tokenReacceso', controladorUsuario.tokenReacceso);

//router.get('/usuarios',  controladorUsuario.obtenerUsuario);
//router.put('/usuarios/modificarCarrito', controladorUsuario.modificarCarrito);

module.exports = router;