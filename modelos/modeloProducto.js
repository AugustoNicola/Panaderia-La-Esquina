const mongoose = require("mongoose");

const esquemaProducto = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	precio: {
		type: Number,
		required: true,
		default: 0
	},
	nombreUnitario: {
		type: String,
		required: true,
		trim: true,
		default: "unidad"
	},
	descripcion: {
		type: String,
		required: true,
		trim: true,
		default: ""
	},
	categorias: {
		type: Array,
		default: []
	},
	imagenProducto: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

module.exports = mongoose.model("Producto", esquemaProducto);