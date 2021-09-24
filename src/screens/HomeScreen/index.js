import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Container from '../../components/template/Container';
import ThemeButton from '../../components/ThemeButton';
import { Area } from './styled';

function HomeScreen() {
  
  const navigation = useNavigation();

  function handleConfigScreen() {
    navigation.navigate('ConfigScreen');
  }

  return (
    <Container>
      <Area>
        <ThemeButton 
          title="Ir para config screen"
          full={true}
          onPress={handleConfigScreen}
        />
      </Area>
    </Container>
  );
}

export default HomeScreen;
