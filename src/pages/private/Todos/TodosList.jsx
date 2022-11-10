import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";
import NewTodo from "./NewTodo";
import Search from "./Search";

const TodosList = () => {
	const [todos, setTodos] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [showNew, setShowNew] = useState(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const todosFromStorage = JSON.parse(localStorage.getItem("todos"));
		if (todosFromStorage?.length > 0) {
			// adding id and edit property
			const todosModified = todosFromStorage?.map((t) => ({ ...t, edit: false }));
			setTodos(todosModified);
			setFiltered(todosModified);
		}
	}, []);

	useEffect(() => {
		if (search.length === 0) {
			return setFiltered(todos);
		}

		const f = todos.filter((t) => {
			const tc = t.task.toLowerCase();
			const sc = search.toLowerCase();
			return tc.indexOf(sc) !== -1;
		});

		setFiltered(f);
	}, [search]);

	return (
		<div className="todos-list">
			<div className="search-new-container">
				<Search search={search} setSearch={setSearch} />
				<button className="new-btn" onClick={() => setShowNew(!showNew)}>
					{!showNew ? "New" : "Cancel"}
				</button>
			</div>
			{showNew && <NewTodo todos={todos} setTodos={setTodos} setShowNew={setShowNew} />}
			<ul>
				{filtered?.map((item) =>
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
