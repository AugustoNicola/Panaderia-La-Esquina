const mongoose = require("mongoose");

const esquemaCategoria = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	imagen_portada: {
		type: String,
		required: false
	}
}, {
	timestamps: true
});

module.exports = mongoose.model("Categoria", esquemaCategoria);