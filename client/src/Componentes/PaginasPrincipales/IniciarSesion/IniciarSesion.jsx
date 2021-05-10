import React, {useContext} from 'react';
import axios from 'axios';

import { EstadoGlobal } from "../../../EstadoGlobal";
import "./IniciarSesion.css";


const IniciarSesion = () => {
	const estado = useContext(EstadoGlobal);
	const iniciarSesion = estado.usuarioAPI.iniciarSesion;
	
	return (
		//usar credenciales de verdad
		<button onClick={() => {iniciarSesion("xxx@xxx.com", "xxxxxx")}}></button>
	)
};

export default IniciarSesion;
