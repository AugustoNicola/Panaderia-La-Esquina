import React, {useContext} from 'react';

import { EstadoGlobal } from "../../../EstadoGlobal";
import "./IniciarSesion.css";


const IniciarSesion = () => {
	const estado = useContext(EstadoGlobal);
	const iniciarSesion = estado.usuarioAPI.iniciarSesion;
	
	return (
		<button onClick={() => {iniciarSesion("admin@admin.com", "123456")}}></button>
	)
};

export default IniciarSesion;
