import React from 'react';
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

export function TasksPieChart({tasks}) {
    return (
        <PieChart
        data={dataFromTasks(tasks)}
        height={height}
        width={screenWidth}
        chartConfig={chartConfig}
        accessor={"count"}
        style={graphStyle}
        />
    )
}

function dataFromTasks(tasks) {      
    let coursesOccurrences = {}
    let coursesByName = {}
    for (let task of tasks) {
        let courseName = task.course.name
        coursesOccurrences[courseName] = courseName in coursesOccurrences ? coursesOccurrences[courseName] + 1 : 1;
        coursesByName[courseName] = task.course
    }

    let legendFontColor = "#000"
    let courses = Object.values(coursesByName)
    return courses.map(course => {
        return {
            name: course.name,
            count: coursesOccurrences[course.name],
            color: course.color,
            legendFontColor: legendFontColor,
            legendFontSize: 15,
        }
    })
}