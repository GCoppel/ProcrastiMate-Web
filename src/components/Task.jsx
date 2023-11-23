import React from "react";
import "../styles/Home.css";

const Task = (props) => {
  return (
    <div className="taskItem" style={props.task.taskCompleted? {borderColor: "grey"}:{borderColor: "white"}}>
      <button
        onClick={() => props.setChecked(props.taskKey)}
        className="taskCheckbox"
        style={props.task.taskCompleted ? { backgroundColor: "white" } : null}
      ></button>
      <div className="taskItemInfo">
        <h3  style={props.task.taskCompleted? {color: "grey"}:{color: "white"}}>Name: {props.task.taskName}</h3>
        <h4  style={props.task.taskCompleted? {color: "grey"}:{color: "white"}}>Priority: {props.task.taskPriority}</h4>
      </div>
      <button onClick={() => props.editTaskHandler(props.taskKey)} className="taskEditButton"  style={props.task.taskCompleted? {borderColor: "grey", color: "grey"}:{borderColor: "white", color: "white"}}>Edit</button>
    </div>
  );
};

export default Task;
