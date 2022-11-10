import React from "react";
import TodosList from "./TodosList";

const Todos = () => {
	return (
		<section className="todos-page">
			<h1 className="todos-title">My To-Do List</h1>
			<TodosList />
		</section>
	);
};

export default Todos;
