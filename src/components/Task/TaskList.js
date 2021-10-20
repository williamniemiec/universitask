import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';

const {vw, vh, vmin, vmax} = require('react-native-expo-viewport-units');

function removeTask(id, tasks, setTasks, dispatch) {
  dispatch({
    type: 'REMOVE_TASK',
    payload: {
      id: id
    }
  })

  const newList = tasks.filter(task => task.id !== id);
  setTasks(newList);
}

const TaskList = ({ tasks, setTasks }) => {

  const [refreshing, setRefreshing] = useState(false);
  const [visibleTasks, setVisibleTasks] = useState(tasks);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const courses = useSelector(state => state.UserReducer.courses);

  function handleTaskSelection() {
    navigation.navigate('TaskScreen');
  }

  function getCourseName(courseId) {
    const course = courses.filter(c => c.id == courseId)[0];

    return course ? course.name : '';
  }
  
  function getCompletenessPrediction(dateBegin, dateEnd) {
    const now = new Date().getTime();
    
    if (now <= dateBegin)
      return 0.0;

    if (now >= dateEnd)
      return 1.0;

    const prediction = now - dateBegin;

    if (dateEnd === dateBegin)
      return 1.0;

    return Math.abs(prediction / (dateEnd - dateBegin));
  }

  function getCompletenessPredictionInDays(dateBegin, dateEnd) {
    const now = new Date().getTime();

    if (now >= dateEnd)
      return '0d';
      
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.round(Math.abs((now - dateEnd) / oneDay));

    return `${diffDays}d`;
  }

  function handleRefresh() {
    setVisibleTasks([]);
    setRefreshing(false);
    setTimeout(() => {
      const orderedTasks = tasks.sort((task1, task2) => getCompletenessPrediction(task2.dateBegin, task2.dateEnd) - getCompletenessPrediction(task1.dateBegin, task1.dateEnd))
      setVisibleTasks(orderedTasks)
    }, 10); // Forces update
  }

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
    <Pressable onPress={handleTaskSelection} height={86} marginBottom={30}>
      <Box
        borderWidth={1}
        borderColor={data.item.dateEnd <= new Date() ? '#f90233' : '#707070'}
        backgroundColor='#FFFFFF'
        flexDirection='row'
        justifyContent='space-between'
        padding={3}
      >
        <LeftArea data={data} />
        <RightArea data={data} />
      </Box>
    </Pressable>
  );

  const LeftArea = ({ data }) => (
    <Container>
      <Row>
        <Text numberOfLines={1}>{data.item.name}</Text>
      </Row>
      <Row>
        <Text numberOfLines={1}>{getCourseName(data.item.course)}</Text>
      </Row>
      <Row>
        <Progress 
          colorScheme="light" 
          size="xs" 
          marginTop={2} 
          mb={2} 
          value={getCompletenessPrediction(data.item.dateBegin, data.item.dateEnd) * 100} 
        />
      </Row>
    </Container>
  );

  const RightArea = ({ data }) => (
    <Center width={70}>
      <Container>
        <Text>
          {`${(getCompletenessPrediction(data.item.dateBegin, data.item.dateEnd) * 100).toFixed(2)}% · ${getCompletenessPredictionInDays(data.item.dateBegin, data.item.dateEnd)}`}
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
        letterSpacing: "lg"
      }}
    >
      { children }
    </Box>
  );

  return (
    <SwipeListView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      data={visibleTasks}
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
        removeTask(tasks[idx].id, tasks, setTasks, dispatch);
      }}
    />
  );
}

export default TaskList;
