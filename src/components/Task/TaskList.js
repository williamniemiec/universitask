import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { 
  Progress, 
  Text, 
  Box, 
  Container, 
  Center, 
  Flex,
  Image 
} from 'native-base';

const {vw, vh, vmin, vmax} = require('react-native-expo-viewport-units');

const TaskList = ({ tasks, setTasks }) => (
  <SwipeListView
    data={tasks}
    keyExtractor={(item) => item.id}
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
      const newList = tasks.filter((e, index) => index != idx);
      setTasks(newList);
    }}
  />
);

const RemoveTaskIcon = () => (
  <Flex
    maxHeight={88}
    backgroundColor='#f90233'
    alignItems='center'
    flex={1}
    flexDirection='row'
    justifyContent='space-between'
    paddingLeft={5}
    marginRight={5}
  >
    <Image
      source={require('../../../assets/img/icon/trash.png')}
      alt='remove task icon'
      style={{
        maxHeight: 40,
        maxWidth: 40
      }}
    />
  </Flex>
);

const ListItem = ({data}) => (
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

export default TaskList;
