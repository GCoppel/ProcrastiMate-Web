import React, {useState, useEffect} from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import {GetTasks, EditFirestoreTask, MarkFirestoreTaskComplete} from "../firebase/FireBaseFirestore"
import { NavBar } from "../components/NavBar";

const Home = () => {
  // Navigation stuff:
  const navigate = useNavigate();
  const handleLeavePage = (e) => {
    navigate(e);
  };

  // Task List stuff:
  const [listData, setListData] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await GetTasks();

      if (!data) {
        return;
      }

      // Transform the data and update the state
      const updatedListData = Object.keys(data).map((key) => ({
        taskID: data[key].id,
        taskName: data[key].name,
        taskEstimatedValue: 0,
        taskPriority: data[key].priority,
        taskEstimatedTime: data[key].estimatedTime,
        taskDifficulty: data[key].difficulty,
        taskCompleted: data[key].complete,
        taskDeadline: data[key].deadline,
        taskGroup: data[key].group,
        taskLocation: data[key].location,
        collapsed: true,
      }));

      setListData(updatedListData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // On load in, fetch task data from firebase:
  useEffect(() => {
    fetchTasks();
  }, []);

  // Used for cheap refresh calling:
  const [forceRefreshCheat, setForceRefreshCheat] = React.useState(false);
  useEffect(() => {
    // Do nothing
  }, [forceRefreshCheat]);

  // Set task as completed:
  const setTaskCompleted = (taskIndex) => {
    let isComplete = !listData[taskIndex].taskCompleted;
    MarkFirestoreTaskComplete(listData[taskIndex].taskID, isComplete);
    listData[taskIndex].taskCompleted = isComplete;
    setForceRefreshCheat(!forceRefreshCheat); // Call a refresh to make the TaskList update its appearance
  };

  const [editTaskIndex, setEditTaskIndex] = useState(0);
  const [editingTask, setEditingTask] = useState(false);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskPriority, setEditTaskPriority] = useState("");
  const [editTaskDifficulty, setEditTaskDifficulty] = useState("");
  const [editTaskEstimatedTime, setEditTaskEstimatedTime] = useState("");
  const [editTaskDeadline, setEditTaskDeadline] = useState("");
  const [editTaskGroup, setEditTaskGroup] = useState("");
  const [editTaskLocation, setEditTaskLocation] = useState("");

  const editTask = (taskIndex) => {
    setEditTaskIndex(taskIndex);
    setEditTaskName(listData[taskIndex].taskName);
    setEditTaskPriority(listData[taskIndex].taskPriority);
    setEditTaskDifficulty(listData[taskIndex].taskDiffisetEditTaskDifficulty);
    setEditTaskEstimatedTime(listData[taskIndex].taskEstimatedTime);
    setEditTaskDeadline(listData[taskIndex].taskDeadline);
    setEditTaskGroup(listData[taskIndex].taskGroup);
    setEditTaskLocation(listData[taskIndex].taskLocation);
    setEditingTask(!editingTask);
  }

  const saveEditChanges = () => {
    EditFirestoreTask(
      listData[editTaskIndex].taskID,
      editTaskName,
      editTaskPriority,
      editTaskDifficulty,
      editTaskEstimatedTime,
      editTaskDeadline,
      editTaskLocation,
      editTaskGroup
    );
  }

  return (
    <>
    <div className="editPanel" style={editingTask? {display: "flex"}:{display: "none"}}>
      <h2 className="editHeader">Edit Task:</h2>
        <div className="editField">
            <h2>Name:</h2>
            <input
                type="text"
                name="taskName"
                value={editTaskName}
                onChange={(e) => setEditTaskName(e.target.value)}
                placeholder="Task Name"
            />
        </div>
        <div className="editField">
            <h2>Priority:</h2>
            <input
                type="number"
                name="taskPriority"
                value={editTaskPriority}
                onChange={(e) => setEditTaskPriority(e.target.value)}
                placeholder="Task Priority"
                max={9}
                min={0}
            />
        </div>
        <div className="editField">
            <h2>Difficulty:</h2>
            <input
                type="number"
                name="taskDifficulty"
                value={editTaskDifficulty}
                onChange={(e) => setEditTaskDifficulty(e.target.value)}
                placeholder="Task Difficulty"
                max={9}
                min={0}
            />
        </div>
        <div className="editField">
            <h2>EstimatedTime:</h2>
            <input
                type="number"
                name="taskEstimatedTime"
                value={editTaskEstimatedTime}
                onChange={(e) => setEditTaskEstimatedTime(e.target.value)}
                placeholder="Task Estimated Time"
                max={999}
                min={0}
            />
        </div>
        <div className="editField">
            <h2>Deadline:</h2>
            <input
                type="text"
                name="taskDeadline"
                value={editTaskDeadline}
                onChange={(e) => setEditTaskDeadline(e.target.value)}
                placeholder="Task Deadline/Date"
            />
        </div>
        <div className="editField">
            <h2>Group:</h2>
            <input
                type="text"
                name="taskGroup"
                value={editTaskGroup}
                onChange={(e) => setEditTaskGroup(e.target.value)}
                placeholder="Task Group"
            />
        </div>
        <div className="editField">
            <h2>Location:</h2>
            <input
                type="text"
                name="taskLocation"
                value={editTaskLocation}
                onChange={(e) => setEditTaskLocation(e.target.value)}
                placeholder="Task Location"
            />
        </div>
        <div className="editButtons">
            <button onClick={() => {setEditingTask(false); saveEditChanges();}}>Save Changes</button>
            <button onClick={() => setEditingTask(false)}>Cancel</button>
        </div>
    </div>
      <h1>ProcrastiMate</h1>
      <div>
        <TaskList tasks={listData} setChecked={setTaskCompleted} editTask={editTask}/>
      </div>
      <NavBar />
    </>
  );
};

export default Home;
