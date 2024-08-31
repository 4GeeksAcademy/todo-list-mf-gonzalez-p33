import React, { useState } from "react";
import Task from "./Task";

const ToDoList = () => {
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const colors = ["#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", "#BBDEFB", "#B3E5FC", "#B2EBF2",
         "#B2DFDB", "#C8E6C9", "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFECB3", "#FFE0B2", "#FFCCBC"];

    return (
        <div className="container" >
            <input
                className="col-8" type="text" value={newTask} placeholder="what do you want to do next?" id= "placeholder"
                onChange={(event) => setNewTask(event.target.value)}
                onKeyUp={(event) => {
                    if (event.key === "Enter") {
                        setTaskList([{ text: newTask, color: colors[taskList.length % colors.length] }, ...taskList]);
                        setNewTask("");
                    }
                }}
            />
            <div id="textotask">
                {taskList.length === 0 && <div>No task, add a task</div>}
                {taskList.map((tarea, indice) => (
                    <Task task={tarea.text} color={tarea.color} key={indice} 
                        onRemove={() => {
                            setTaskList(taskList.filter((_tarea, indiceABorrar) => indice !== indiceABorrar));
                        }}
                    />
                ))}
                <p>{taskList.length} items left</p>
            </div>
        </div>
    );
};

export default ToDoList;