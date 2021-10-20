import React, { useState, useEffect } from 'react';
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

//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const {vw, vh, vmin, vmax} = require('react-native-expo-viewport-units');

const TaskList = ({ tasks, setTasks }) => {

  const [refreshing, setRefreshing] = useState(false);
  const [visibleTasks, setVisibleTasks] = useState(tasks);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const courses = useSelector(state => state.UserReducer.courses);

  function handleTaskSelection() {
    navigation.navigate('TaskScreen');
  }

  function handleRefresh() {
    setVisibleTasks([]);
    setRefreshing(false);
    setTimeout(() => {
      const orderedTasks = sortTasksByDeadline(tasks);
      setVisibleTasks(orderedTasks)
    }, 10); // Forces update
  }

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <SwipeListView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      data={visibleTasks}
      keyExtractor={(item) => String(item.id)}
      style={{flex: 1, width: '100%', height: vh(70)}}
      leftOpenValue={70}
      rightOpenValue={-70}
      renderItem={(item, index) => <ListItem data={item} courses={courses} handleTaskSelection={handleTaskSelection} />}
      renderHiddenItem={({item, index}) => <RemoveTaskIcon />}
      stopLeftSwipe={80}
      stopRightSwipe={-80}
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      onRowOpen={(rowKey, rowMap) => {
        const target = rowMap[rowKey].props.item
        const idx = tasks.indexOf(target);

        rowMap[rowKey].closeRow();

        if (rowMap[rowKey].currentTranslateX > 0)
          removeTask(tasks[idx].id, tasks, setTasks, dispatch);
        else
          markTaskAsDone(tasks[idx].id, tasks, setTasks, dispatch);
      }}
    />
  );
}

export default TaskList;

const ListItem = ({ data, courses, handleTaskSelection }) => (
  <Pressable onPress={handleTaskSelection} height={86} marginBottom={30}>
    <Box
      borderWidth={1}
      borderColor={data.item.dateEnd <= new Date() ? '#f90233' : '#707070'}
      backgroundColor='#FFFFFF'
      flexDirection='row'
      justifyContent='space-between'
      padding={3}
    >
      <LeftArea data={data} courses={courses} />
      <RightArea data={data} />
    </Box>
  </Pressable>
);

const LeftArea = ({ data, courses }) => (
  <Container>
    <Row>
      <Text numberOfLines={1}>{data.item.name}</Text>
    </Row>
    <Row>
      <Text numberOfLines={1}>{getCourseName(data.item.course, courses)}</Text>
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

const RightArea = ({ data }) => (
  <Center width={70}>
    <Container>
      <Text>
        {`${(getCompletenessPrediction(data.item.dateBegin, data.item.dateEnd) * 100).toFixed(2)}% · ${getCompletenessPredictionInDays(data.item.dateBegin, data.item.dateEnd)}`}
      </Text>
    </Container>
  </Center>
);

const RemoveTaskIcon = () => (
  <Flex
    height={88}
    maxHeight={88}
    backgroundColor='#000000'
    alignItems='center'
    flex={1}
    flexDirection='row'
    justifyContent='space-between'
  >
    <Flex 
      height={88}
      width={20}
      alignItems='center'
      justifyContent='center'
      backgroundColor='#f90233'
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
    <Flex 
      height={88}
      width={20}
      alignItems='center'
      justifyContent='center'
      backgroundColor='#5ac18e'
    >
      <Image
        source={require('../../assets/img/icon/check.png')}
        alt='mask as done'
        style={{
          maxHeight: 40,
          maxWidth: 40
        }}
      />
    </Flex>
  </Flex>
);


//-----------------------------------------------------------------------------
//		Functions
//-----------------------------------------------------------------------------
function sortTasksByDeadline(tasks) {
  return tasks.sort((task1, task2) => 
    getCompletenessPrediction(task2.dateBegin, task2.dateEnd) 
    - getCompletenessPrediction(task1.dateBegin, task1.dateEnd)
  );
}

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

function markTaskAsDone(id, tasks, setTasks, dispatch) {
  dispatch({
    type: 'MARK_AS_DONE',
    payload: {
      id: id
    }
  })

  const newList = tasks.filter(task => task.id !== id);
  setTasks(newList);
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

function getCourseName(courseId, courses) {
  const course = courses.filter(c => c.id == courseId)[0];

  return course ? course.name : '';
}
