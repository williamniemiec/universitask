import React from 'react';
import { Button } from 'native-base';
import style from './style';

const PlusButton = ({ color, onPress }) => (
  <Button 
    height={46} 
    _text={{
      color: color,
      fontSize: 30
    }}
    style={style}
    onPress={onPress}
  >
    +
  </Button>
);

export default PlusButton;
