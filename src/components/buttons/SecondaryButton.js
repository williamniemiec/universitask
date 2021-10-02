import React from 'react';
import { Button } from 'native-base';

const SecondaryButton = ({ children, ...baseProps }) => {
	return (
		<Button
			backgroundColor='transparent'
      _text={{
        color: '#555'
      }}
			{ ...baseProps }
		>
			{ children }
		</Button>
	);
};

export default SecondaryButton;
