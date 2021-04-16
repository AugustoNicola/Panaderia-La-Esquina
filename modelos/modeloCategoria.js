const mongoose = require("mongoose");

const esquemaCategoria = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	esFemenino: {
		type: Boolean,
		required: true
	},
	imagenPortada: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

module.exports = mongoose.model("Categoria", esquemaCategoria);