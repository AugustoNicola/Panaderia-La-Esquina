require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

// ==================== middleware ====================
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ==================== conexion a la BBDD ====================
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
	useCreateIndex: true,
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => {
	if(err) throw err;
	console.log("Conectado a la BBDD de MongoDB!");
});

// ==================== rutas ====================
app.use("/api/categorias", require("./rutas/rutaCategoria"));
app.use("/api/productos", require("./rutas/rutaProducto"));
app.use("/api/usuario", require("./rutas/rutaUsuario"));

// ==================== inicializacion de servidor ====================
app.get("/test", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.get("/imagenes/:seccion/:img", (req, res) => {
	res.sendFile(`${__dirname}/imagenes/${req.params.seccion}/${req.params.img}`);
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log("Servidor iniciado en el puerto ", PORT);
});