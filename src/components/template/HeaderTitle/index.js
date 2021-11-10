import React from 'react';
import { Heading } from 'native-base';
import styles from './style';

const HeaderTitle = ({ children }) => {
  return (
    <Heading style={styles.title}>
      { children }
    </Heading>
  );
}

export default HeaderTitle;
