import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Container from '../../components/template/Container';
import Task from '../../components/Task';
import { Area } from './styled';

function HomeScreen() {
  
  const navigation = useNavigation();

  function handleConfigScreen() {
    navigation.navigate('ConfigScreen');
  }

  return (
    <Container>
      <Area>
        <Task />
      </Area>
    </Container>
  );
}

export default HomeScreen;
