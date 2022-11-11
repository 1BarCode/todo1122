import React, { useEffect, useRef, useState } from "react";

const EditTodo = ({ item, todos, setTodos }) => {
	const { id, task } = item;
	const [edit, setEdit] = useState(task);
	const editRef = useRef();

	useEffect(() => {
		editRef.current.focus();
	}, []);

	const handleEdit = (e) => setEdit(e.target.value);

	const handleSave = (idToSave) => {
		if (edit.length > 0 && edit.length < 26) {
			// Find the todo with matching id to update the task & edit state
			const updatedTodos = todos.map((t) => (t.id === idToSave ? { ...t, task: edit, edit: false } : t));
			localStorage.setItem("todos", JSON.stringify(updatedTodos));
			setTodos(updatedTodos);
		} else {
			editRef.current.focus();
		}
	};

	return (
		<li key={id} className="edit-item">
			<input ref={editRef} className="edit-text" type="text" value={edit} onChange={handleEdit} />
			<span className="save-container">
				<button className="save-btn" onClick={() => handleSave(id)}>
					Save
				</button>
			</span>
		</li>
	);
};

export default EditTodo;
