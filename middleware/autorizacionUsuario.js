const jwt = require("jsonwebtoken");

const autorizacionUsuario = (req, res, next) => {
	try {
		//? verificacion header activo
		const tokenAcceso = req.header("Authorization");
		if (!tokenAcceso) return res.status(401).end(); //401: Unauthorized.

		//? verificacion token genuino
		jwt.verify(tokenAcceso, process.env.SECRETO_TOKEN_ACCESO, (error, usuario) => {
			if(error) return res.status(401).end(); //401: Unauthorized.
			req.usuario = usuario;
			next();
		});
	} catch (error) {
		return res.status(500).json({mensajeError: error.message});
	}
}

module.exports = autorizacionUsuario;