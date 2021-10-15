let courseColors = ['rgba(131, 167, 234, 1)', 'brown', 'red', 'orange', 'rgb(0, 0, 255)']
let courseNumbers = Array(5).fill().map((x,i)=>i)
export let mockCourses = courseNumbers.map(i => {
    return {
    id: i,
    name: `Course ${i}`,
    color: courseColors[i % courseColors.length],
    }
})

let taskNumbers = Array(15).fill().map((x,i)=>i)
export let mockTasks = taskNumbers.map(i => {
    return {
        id: i,
        name: `task ${i}`,
        course: mockCourses[i % courseNumbers.length],
        dateBegin: new Date(),
        dateEnd: new Date(),
    }
})

// id: courseId,
// name: payload.name,
// color: payload.color

// id: taskId,
// name: payload.name,
// course: payload.course,
// dateBegin: payload.dateBegin,
// dateEnd: payload.dateEnd