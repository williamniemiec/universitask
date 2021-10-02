import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Container from '../../components/template/Container';
import Task from '../../components/Task';
import { Area, Title } from './styled';

function HomeScreen({ route }) {
  
  const navigation = useNavigation();

  function handleConfigScreen() {
    navigation.navigate('ConfigScreen');
  }

  return (
    <Container>
      <Title>Tasks</Title>
        <Task refresh={route.params?.new}/>
    </Container>
  );
}

export default HomeScreen;
