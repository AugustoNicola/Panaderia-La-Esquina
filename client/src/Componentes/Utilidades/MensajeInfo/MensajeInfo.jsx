import React from 'react';

const MensajeInfo = ({tipo, mensaje}) => {
	if(mensaje)
	{
		return (
			<div className={`mensaje-info ${tipo}`}>
				{mensaje}
			</div>
		)
	}
	return (<></>);
};

export default MensajeInfo;
