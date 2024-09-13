import React, { useState, useEffect } from "react";
import Task from "./Task";

const ToDoList = () => {
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const colors = ["#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", "#BBDEFB", "#B3E5FC", "#B2EBF2",
         "#B2DFDB", "#C8E6C9", "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFECB3", "#FFE0B2", "#FFCCBC"];
         

    const createUser = async () => {
        const urlApi = 'https://playground.4geeks.com/todo/users/mafergonzalez'
        const resp = await fetch(urlApi);
        
        if (! resp.ok) {
            const response = await fetch ('https://playground.4geeks.com/todo/users/mafergonzalez', {
                method: 'POST',
            })
        }
    }

    const loadTasks = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/users/mafergonzalez");
        const data = await response.json();

        console.log(data);
        setTaskList(data.todos);
    }

    const postTask = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/todos/mafergonzalez", {
            method: "POST",
            body: JSON.stringify({
                label: newTask, 
                is_done: false,
            }),
            headers: { "Content-Type": "application/json"} 
        });

        const data = await response.json();
        console.log(data);
        loadTasks(); 
    }

    const deleteTask = async (taskId, indice) => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setTaskList(taskList.filter((_tarea, indiceABorrar) => indice !== indiceABorrar));
        } else {
            console.error(`Error: ${response.statusText}`);
        }
    }

    
    const deleteAll = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/mafergonzalez", {
                method: 'DELETE'
            });


            if (response.ok) {
                await createUser(); 
                setTaskList([])
            }} 

            catch (error) {
              console.error(error);}
    }; 

    useEffect(() => {
        loadTasks();
        createUser ();
    },[])

    return (
        <div className="container" >
            <input
                className="col-8" type="text" value={newTask} placeholder="what do you want to do next?" id= "placeholder"
                onChange={(event) => setNewTask(event.target.value)}
                onKeyUp={(event) => {
                    if (event.key === "Enter") {
                        postTask();
                        setNewTask("");
                    }
                }}
            />

            <div id="textotask">
                {taskList.length === 0 && <div>No task, add a task</div>}


                {taskList.map((tarea, indice) => (
                    <Task task={tarea.label} color={colors[indice % colors.length]} key={tarea.id} 
                        onRemove={() => {
                            deleteTask(tarea.id, indice);
                        }}
                    />
                ))}

                <div> 
                    <p className= "mb-1">{taskList.length} items left</p>
                    
                    <button className="btn btn-light mt-1" 
                        onClick={() => {deleteAll();}}>
                        Delete all
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ToDoList;

