const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require("../modelos/modeloUsuario");

const controladorUsuario = {
	registro: async(req, res) => {
		try {
			const {nombre, apellido, email, contrasena} = req.body;

			//? verificacion usuario no existe
			const usuarioExiste = await Usuario.findOne({email});
			if(usuarioExiste) return res.status(409).end(); //409: Conflict.

			//? verificacion contrasena es adecuada
			if(contrasena.length < 6) 
				return res.status(422).end(); //422: Unprocessable Entity

			//* Encriptado de contrasena
			const hashContrasena = await bcrypt.hash(contrasena, 10);
			const nuevoUsuario = new Usuario({
				nombre, apellido, email, contrasena: hashContrasena
			});

			//* Guardar en la BBDD
			await nuevoUsuario.save();

			//* Crear tokens de autenticacion
			const tokenAcceso = crearTokenAcceso({id: nuevoUsuario._id});
			const tokenReacceso = crearTokenReacceso({id: nuevoUsuario._id});

			res.cookie('tokenReacceso', tokenReacceso, {
				httpOnly: true,
				path: '/api/usuarios/tokenReacceso',
				maxAge: 7*24*60*60*1000 //# 7 dias
			});

			return res.status(200).json({tokenAcceso});

		} catch (err) {
			return res.status(500).json({mensajeError: err.message})
		}
	},
	tokenReacceso: async(req, res) => {
		return res.status(200).end();
	}
}

const crearTokenAcceso = (idUsuario) =>{
    return jwt.sign(idUsuario, process.env.SECRETO_TOKEN_ACCESO, {expiresIn: '11m'})
}
const crearTokenReacceso = (idUsuario) =>{
    return jwt.sign(idUsuario, process.env.SECRETO_TOKEN_REACCESO, {expiresIn: '7d'})
}

module.exports = controladorUsuario;