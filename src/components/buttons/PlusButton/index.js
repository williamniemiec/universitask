import React from 'react';
import { Button } from 'native-base';
import style from './style';

const PlusButton = ({ onPress }) => (
  <Button 
    height={46} 
    _text={{
      color: "#888",
      fontSize: 30
    }}
    style={style}
    onPress={onPress}
  >
    +
  </Button>
);

export default PlusButton;
