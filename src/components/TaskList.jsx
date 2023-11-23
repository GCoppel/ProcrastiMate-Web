import React from "react";
import Task from "./Task";

const TaskList = (props) => {
    const handleCheckboxClick = () => {
        console.log("press");
    }
    //console.log("here"+props.tasks.length);
    return (
        <div id={"tasks"}>
            <h2>Your Tasks:</h2>
            {props.tasks.map(function(task, index) {
                return(<Task 
                    key={index}
                    task={task}
                    taskKey={index}
                    editTaskHandler={props.editTask}
                    setChecked={props.setChecked}
                />)
            })}
        </div>
    )
}

export default TaskList;