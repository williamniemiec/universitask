import React from 'react';
import { 
  CharacterImage,
  NoTasksMessageArea,
  CharacterMessage
} from './styled';

const NoTasksMessage = () => (
  <NoTasksMessageArea>
    <CharacterImage source={require('../../../assets/img/characters/mavin.png')} resizeMode='contain' />
    <CharacterMessage>Uau, não existem tarefas!</CharacterMessage>
    <CharacterMessage>Aproveite e vá viver um pouco!</CharacterMessage>
  </NoTasksMessageArea>
);

export default NoTasksMessage;
