import React from 'react';
import { Image, Flex, Text } from 'native-base';

const NoTasksMessage = () => (
  <Flex flex={1} justifyContent='center' alignItems='center'>
    <Image 
      source={require('../assets/img/characters/mavin.png')} 
      resizeMode='contain' 
      style={{height: 200, width: 200, marginBottom: 20}}
      alt='mavin'
    />
    <Text>Uau, não existem tarefas!</Text>
    <Text>Aproveite e vá viver um pouco!</Text>
  </Flex>
);

export default NoTasksMessage;
