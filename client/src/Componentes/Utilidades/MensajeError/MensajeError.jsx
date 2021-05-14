import React from 'react';

const MensajeError = ({mensaje}) => {
	if(mensaje)
	{
		return (
			<div className="mensaje-error">
				{mensaje}
			</div>
		)
	}
	return (<></>);
};

export default MensajeError;
