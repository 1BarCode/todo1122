import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ item, todos, setTodos }) => {
	const { id, task } = item;

	const handleEdit = (idToEdit) => {
		setTodos((prev) => {
			// find the todo with matching id to toggle edit state to true
			const updatedTodos = prev.map((t) => (t.id === idToEdit ? { ...t, edit: true } : t));
			return updatedTodos;
		});
	};

	const handleDelete = (idToDelete) => {
		// find the todo with matching id to delete from current todos list
		const updatedTodos = todos.filter((t) => t.id !== idToDelete);
		localStorage.setItem("todos", JSON.stringify(updatedTodos));
		setTodos(updatedTodos);
	};

	return (
		<li key={id}>
			<span>{task}</span>
			<span className="actions-container">
				<button className="action-btn" onClick={() => handleEdit(id)}>
					<FontAwesomeIcon icon={faPen} />
				</button>
				<button className="action-btn" onClick={() => handleDelete(id)}>
					<FontAwesomeIcon icon={faTrashCan} />
				</button>
			</span>
		</li>
	);
};

export default TodoItem;
