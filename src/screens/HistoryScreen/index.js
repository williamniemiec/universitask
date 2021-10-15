import React from 'react';
import Container from '../../components/template/Container';
import { useSelector } from 'react-redux';
import {
  Heading,
} from 'native-base';
import {
  PieChart,
} from 'react-native-chart-kit'
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
}

const graphStyle = {
  marginVertical: 8,
  ...chartConfig.style
}

const height = 220;

//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const HistoryScreen = ({ route }) => {

  // const persistedCourses = useSelector(state => state.UserReducer.courses);
  // const persistedTasks = useSelector(state => state.UserReducer.tasks);  
  
  // const coursesView = getCoursesView(persistedCourses, persistedTasks);
  // const deadlines = getDeadlines(persistedTasks);

  return (
    <Container>
      <Heading>This Semester</Heading>
      <PieChart
      data={getPieChartData([])}
      height={height}
      width={screenWidth}
      chartConfig={chartConfig}
      accessor="count"
      style={graphStyle}
      />
    </Container>
  );
}

export default HistoryScreen;


//-----------------------------------------------------------------------------
//		Functions
//-----------------------------------------------------------------------------
function getCoursesView(persistedCourses, persistedTasks) {
  let coursesView = [];

  for (let course of persistedCourses) {
    let totalTasks = persistedTasks.filter(t => t.course == course.id).length;
    coursesView.push({name: course.name, total: totalTasks});
  }

  return coursesView
}

function getPieChartData(persistedTasks) {
  let courseColors = ['rgba(131, 167, 234, 1)', 'brown', 'red', 'orange', 'rgb(0, 0, 255)']
  let courseNumbers = Array(5).fill().map((x,i)=>i)
  let courses = courseNumbers.map(i => {
    return {
      id: i,
      name: `Course + ${i}`,
      color: courseColors[i % courseColors.length],
    }
  })
  let taskNumbers = Array(15).fill().map((x,i)=>i)
  let tasks = taskNumbers.map(i => {
    return {
      id: i,
      name: `task + ${i}`,
      course: courses[i % courseNumbers.length],
    }
  })
    
  let coursesOccurrences = {}
  for (let task of tasks) {
    coursesOccurrences[task.course.name] = task.course.name in coursesOccurrences ? coursesOccurrences[task.course.name] + 1 : 1;
  }

  let legendFontColor = "#000"
  return courses.map(course => {
      return {
        name: course.name,
        count: coursesOccurrences[course.name],
        color: course.color,
        legendFontColor: legendFontColor,
        legendFontSize: 15,
      }
    }
  )
}

// id: courseId,
// name: payload.name,
// color: payload.color

// id: taskId,
// name: payload.name,
// course: payload.course,
// dateBegin: payload.dateBegin,
// dateEnd: payload.dateEnd
