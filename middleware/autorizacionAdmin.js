const jwt = require("jsonwebtoken");

const Usuario = require("../modelos/modeloUsuario");

const autorizacionAdmin = async (req, res, next) => {
	try {
		//? verificacion usuario existe y es administrador
		const usuario = await Usuario.findById(req.usuario.id);
		if(!usuario) return res.status(401).end(); //401: Unauthorized.
		if(!usuario.esAdmin) return res.status(401).end(); //401: Unauthorized.

		next();
	} catch (error) {
		return res.status(500).json({mensajeError: error.message});
	}
}

module.exports = autorizacionAdmin;