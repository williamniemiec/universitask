import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Image, Text, View, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Progress } from 'native-base';


const Task = () => {
  
  const list = [
    {id: '1', name: 'Assignment 2'}, 
    {id: '2', name: 'Exam'},
    {id: '3', name: 'Assignment 2'}, 
    {id: '4', name: 'Exam'},
    {id: '5', name: 'Assignment 2'}, 
    {id: '6', name: 'Exam'},
    {id: '7', name: 'Assignment 2'}, 
    {id: '8', name: 'Exam'},
  ]

  const {vw, vh, vmin, vmax} = require('react-native-expo-viewport-units');
  const [tasks, setTasks] = useState([]);

  

  const ListItemArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: #FFFFFF;
    border-color: #707070;
    border-width: 1px;
    height: 85px;
    width: ${vw(85)}px;
    margin-bottom: 30px;
    padding: 10px;
  `; 

  const LeftArea = styled.View`
    flex: 1;
    justify-content: center;
  `;

  const Row = styled.View`
    height: 20px;
  `;

  const RightArea = styled.View`
    width: 80px;
    justify-content: center;
    align-items: center;
  `;

  const ListItem = ({data}) => (
    <ListItemArea>
      <LeftArea>
        <Row>
          <Text>{data.item.name}</Text>
        </Row>
        <Row>
          <Text>MLP</Text>
        </Row>
        <Row>
          <Progress colorScheme="light" size="xs" marginTop={2} mb={4} value={50} />
        </Row>
      </LeftArea>
      <RightArea>
        <Text>60% · 3d</Text>
      </RightArea>
    </ListItemArea>
  );

  const RowBack = styled.View`
    height: 85px;
    max-height: 85px;
    background-color: #f90233;
    align-items: center;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 20px;
    margin-right: 5px;
  `;

  const RowBackicon = styled.Image`
    max-height: 40px;
    max-width: 40px;
  `;

  const CharacterImage = styled.Image`
    height: 200px;
    width: 200px;
    margin-bottom: 20px;
  `;

  const NoTasksMessageArea = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
  `;

  const CharacterMessage = styled.Text`
    font-size: 20px;
    text-align: center;
    color: #333;
  `;

  const NoTasksMessage = () => (
    <NoTasksMessageArea>
      <CharacterImage source={require('../../assets/img/characters/mavin.png')} resizeMode='contain' />
      <CharacterMessage>Uau, não existem tarefas!</CharacterMessage>
      <CharacterMessage>Aproveite e vá viver um pouco!</CharacterMessage>
    </NoTasksMessageArea>
  );

  const TaskList = () => (
    <SwipeListView
      data={tasks}
      keyExtractor={(item) => item.id}
      style={{flex: 1, width: '100%', height: vh(70)}}
      leftOpenValue={70}
      renderItem={(item, index) => <ListItem data={item} onPress={() => alert('DONE!')} />}
      renderHiddenItem={({item, index}) => (
        <RowBack>
          <RowBackicon source={require('../../assets/img/icon/trash.png')}/>
        </RowBack>
      )}
      disableLeftSwipe={true}
      stopLeftSwipe={80}
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      onRowOpen={(rowKey, rowMap) => {
        const target = rowMap[rowKey].props.item
        const idx = tasks.indexOf(target);

        rowMap[rowKey].closeRow();
        const newList = tasks.filter((e, index) => index != idx);
        setTasks(newList);
      }}
    />
  );

  useEffect(() => {
    setTasks(list);
  }, []);

  return (
    tasks.length == 0
    ? <NoTasksMessage />
    : <TaskList />
  );
}

export default Task;
