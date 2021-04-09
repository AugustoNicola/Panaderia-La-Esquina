const mongoose = require("mongoose");

const esquemaUsuario = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
		default: ""
	},
	apellido: {
		type: String,
		required: true,
		trim: true,
		default: ""
	},
	contrasena: {
		type: String,
		required: true,
		default: ""
	},
	email: {
		type: String,
		required: true,
		trim: true,
		default: ""
	},
	esAdmin: {
		type: Boolean,
		default: false
	},
	carrito: {
		type: Array,
		default: []
	}
}, {
	timestamps: true
});

module.exports = mongoose.model("Usuario", esquemaUsuario);