import React from 'react';
import Container from '../../components/template/Container';
import Task from './Task';
import HeaderTitle from '../../components/template/HeaderTitle';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const HomeScreen = ({ route }) => {
  
  return (
    <Container>
      <HeaderTitle>Tasks</HeaderTitle>
        <Task refresh={route.params?.new}/>
    </Container>
  );
}

export default HomeScreen;
