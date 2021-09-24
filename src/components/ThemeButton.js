import React from 'react';
import ActionButton from '@wniemiec-component-reactnative/action-button';

const ThemeButton = ({ title, onPress, full }) => (
  <ActionButton 
    title={title}
    onPress={onPress}
    bgColor="#A200C5"
    fgColor="#FFFFFF"
    full={full}
  />
);

export default ThemeButton;
