import React from 'react';
import { Button } from 'native-base';
import colors from '../colors';

const PrimaryButton = ({ children, ...baseProps }) => (
  <Button 
      backgroundColor={colors.secondary}
      { ...baseProps }
    >
      {children}
    </Button> 
);

export default PrimaryButton;
