import React from "react";
import ToDoList from "./ToDoList"
import Task from "./Task";
import "./Task.css";

//create your first component
const Home = () => {
	return (
		<div className="text-center" id="home">
			<h2 id="todotext"> To Do List </h2>
			<ToDoList/>
		</div>
	);
};

export default Home;
