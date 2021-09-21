import React from 'react';
import styled from 'styled-components/native';
import Container from '../components/template/Container';

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

function HomeScreen() {
  return (
    <Container>
      <Title>HomeScreen</Title>
    </Container>
  );
}

export default HomeScreen;
