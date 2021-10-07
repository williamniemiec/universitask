import React from 'react';
import { Heading } from 'native-base';
import Container from '../../components/template/Container';
import Task from '../../components/Task';
import styles from './styles';

const HomeScreen = ({ route }) => {
  
  return (
    <Container>
      <Heading style={styles.title}>Tasks</Heading>
        <Task refresh={route.params?.new}/>
    </Container>
  );
}

export default HomeScreen;
