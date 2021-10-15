import React from 'react';
import {
    StackedBarChart,
} from 'react-native-chart-kit'
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

// const chartConfig = {
//     backgroundColor: "#e26a00",
//     backgroundGradientFrom: "#fb8c00",
//     backgroundGradientTo: "#ffa726",
//     decimalPlaces: 2, // optional, defaults to 2dp
//     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//     style: {
//         borderRadius: 16
//     },
//     propsForDots: {
//         r: "6",
//         strokeWidth: "2",
//         stroke: "#ffa726"
//     }
// }

const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
}
  
const graphStyle = {
    marginVertical: 16,
    marginHorizontal: 16,
    ...chartConfig.style
}

const height = 350;

export function TasksBarChart({tasks}) {
    return (
        <StackedBarChart
            style={graphStyle}
            data={dataFromTasks(tasks)}
            width={screenWidth}
            height={height}
            chartConfig={chartConfig}
        />
    )
}

function monthsNamesInSemester(tasks) {
    let monthsOfTheYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let areInFirstSemester = tasks[0].dateBegin.getMonth() <= 6
    return areInFirstSemester ? monthsOfTheYear.slice(0, 6) : monthsOfTheYear.slice(6)
}

// Given a list of tasks, returns an object where keys are months and values are tasks created/completed in the given month
function tasksGroupedByMonth(tasks, monthsNames) {
    let monthsOfTheYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let validMonths = monthsOfTheYear.filter(m => monthsNames.includes(m))
    var tasksForMonth = validMonths.reduce((obj, name) => {
        obj[name] = [];
        return obj;
    }, {});
    
    for (let task of tasks) {
        //  Find out in which month it was completed and update tasksForMonth
        const monthName = task.dateEnd.toLocaleString('en-us', { month: 'short' });
        tasksForMonth[monthName] = tasksForMonth[monthName].concat([task])
    }

    return tasksForMonth
}

// Given a list of tasks, returns an object where keys are courses and values are tasks of the given course
function tasksGroupedByCourse(tasks, coursesNames) {
    var tasksForCourse = coursesNames.reduce((obj, name) => {
        obj[name] = [];
        return obj;
    }, {});

    for (let task of tasks) {
        let courseName = task.course.name
        tasksForCourse[courseName] = tasksForCourse[courseName].concat([task])
    }

    return tasksForCourse
}

function dataFromTasks(tasks) {
    // TODO: Make sure all tasks are within the semester interval

    // Parse course information from tasks
    let colorsForCourses = {}
    let coursesOccurrences = {}
    for (let task of tasks) {
        let courseName = task.course.name
        coursesOccurrences[courseName] = courseName in coursesOccurrences ? coursesOccurrences[courseName] + 1 : 1;
        colorsForCourses[courseName] = task.course.color;
    }

    let coursesNames = Object.keys(coursesOccurrences)
    let coursesColors = Object.values(colorsForCourses)

    // Parse month names
    let monthsNames = monthsNamesInSemester(tasks)

    // Construct data structure named tasksGroupedByMonthAndCourse with required data. Format: {'monthName1': {'courseName1': [task1, task2...]}}
    let tasksByMonth = tasksGroupedByMonth(tasks, monthsNames)
    var tasksGroupedByMonthAndCourse = {}
    for (let month in tasksByMonth) {
        let tasksInMonth = tasksByMonth[month]
        tasksGroupedByMonthAndCourse[month] = tasksGroupedByCourse(tasksInMonth, coursesNames)
    }

    // Parse graph data from tasksGroupedByMonthAndCourse
    let tasksData = []
    for (let month in tasksGroupedByMonthAndCourse) {
        let monthData = []
        let tasksInMonthByCourse = tasksGroupedByMonthAndCourse[month]
        for (let course in tasksInMonthByCourse) { // Courses must be in same order
            let tasksInCourse = tasksInMonthByCourse[course]
            monthData.push(tasksInCourse.length)
        }
        tasksData.push(monthData)
    }

    return {
        labels: monthsNames,
        legend: coursesNames,
        data: tasksData,
        barColors: coursesColors//["#dfe4ea", "#ced6e0", "#a4b0be", "#dfe4ea", "#ced6e0", "#a4b0be"]
    }
}