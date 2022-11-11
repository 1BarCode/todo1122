import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";
import NewTodo from "./NewTodo";
import Search from "./Search";

const TodosList = () => {
	const [todos, setTodos] = useState([]);
	const [showNew, setShowNew] = useState(false);
	const [query, setQuery] = useState("");

	useEffect(() => {
		const todosFromStorage = JSON.parse(localStorage.getItem("todos"));
		if (todosFromStorage?.length > 0) {
			// Adding 'id' and 'edit' property to each todo item
			const todosModified = todosFromStorage?.map((t) => ({ ...t, edit: false }));
			setTodos(todosModified);
		}
	}, []);

	return (
		<div className="todos-list">
			<div className="search-new-container">
				<Search query={query} setQuery={setQuery} />
				<button className="new-btn" onClick={() => setShowNew(!showNew)}>
					{!showNew ? "New" : "Cancel"}
				</button>
			</div>
			{showNew && <NewTodo todos={todos} setTodos={setTodos} setShowNew={setShowNew} />}
			<ul>
				{todos
					?.filter((item) => item.task.toLowerCase().includes(query.trimStart().toLowerCase()))
					?.map((item) =>
						item.edit ? (
							<EditTodo key={item.id} item={item} todos={todos} setTodos={setTodos} />
						) : (
							<TodoItem key={item.id} item={item} todos={todos} setTodos={setTodos} />
						)
					)}
			</ul>
		</div>
	);
};

export default TodosList;
