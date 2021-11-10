import React from 'react';
import { Image, Flex, Text } from 'native-base';
import translate from '../locales';


const NoTasksMessage = () => (
  <Flex flex={1} justifyContent='center' alignItems='center'>
    <Image 
      source={require('../assets/img/characters/mavin.png')} 
      resizeMode='contain' 
      style={{height: 200, width: 200, marginBottom: 20}}
      alt='mavin'
    />
    <Text>{translate('NO_TASKS_PRIMARY')}</Text>
    <Text>{translate('NO_TASKS_SECONDARY')}</Text>
  </Flex>
);

export default NoTasksMessage;
