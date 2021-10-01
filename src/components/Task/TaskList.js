import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { 
  Progress, 
  Text, 
  Box, 
  Container, 
  Center, 
  Flex,
  Image,
  Pressable
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const {vw, vh, vmin, vmax} = require('react-native-expo-viewport-units');

function removeTask(index, tasks, setTasks) {
  const newList = tasks.filter((e, idx) => idx != index);
  setTasks(newList);
}

const TaskList = ({ tasks, setTasks }) => {

  const navigation = useNavigation();

  function handleTaskSelection() {
    navigation.navigate('TaskScreen');
  }
  
  const RemoveTaskIcon = () => (
    <Flex
      maxHeight={86}
      backgroundColor='#f90233'
      alignItems='center'
      flex={1}
      flexDirection='row'
      justifyContent='space-between'
      paddingLeft={5}
      marginRight={5}
    >
      <Image
        source={require('../../assets/img/icon/trash.png')}
        alt='remove task icon'
        style={{
          maxHeight: 40,
          maxWidth: 40
        }}
      />
    </Flex>
  );

  const ListItem = ({data}) => (
    <Pressable onPress={handleTaskSelection}>
      <Box
        borderWidth={1}
        borderColor='#707070'
        backgroundColor='#FFFFFF'
        flexDirection='row'
        marginBottom={30}
        justifyContent='space-between'
        padding={3}
      >
        <LeftArea data={data} />
        <RightArea />
      </Box>
    </Pressable>
  );

  const LeftArea = ({ data }) => (
    <Container>
      <Row>
        {data.item.name}
      </Row>
      <Row>
        MLP
      </Row>
      <Row>
        <Progress 
          colorScheme="light" 
          size="xs" 
          marginTop={2} 
          mb={2} 
          value={50} 
        />
      </Row>
    </Container>
  );

  const RightArea = () => (
    <Center width={70}>
      <Container>
        <Text>
          60% · 3d
        </Text>
      </Container>
    </Center>
  );

  const Row = ({ children }) => (
    <Box
      width={vw(50)}
      _text={{
        fontSize: "sm",
        color: "#222",
        letterSpacing: "lg",
      }}
    >
      { children }
    </Box>
  );


  return (
    <SwipeListView
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      style={{flex: 1, width: '100%', height: vh(70)}}
      leftOpenValue={70}
      renderItem={(item, index) => <ListItem data={item} onPress={() => alert('DONE!')} />}
      renderHiddenItem={({item, index}) => <RemoveTaskIcon />}
      disableLeftSwipe={true}
      stopLeftSwipe={80}
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      onRowOpen={(rowKey, rowMap) => {
        const target = rowMap[rowKey].props.item
        const idx = tasks.indexOf(target);

        rowMap[rowKey].closeRow();
        removeTask(idx, tasks, setTasks);
      }}
    />
  );
}

export default TaskList;
