import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NewTodo = ({ todos, setTodos, setShowNew }) => {
	const [text, setText] = useState("");
	const textRef = useRef();

	useEffect(() => {
		textRef.current.focus();
	}, []);

	const handleEdit = (e) => setText(e.target.value);

	const handleSave = () => {
		// Validate length & append new todo to current list then save
		if (text.length > 0 && text.length < 26) {
			const newTodos = [...todos, { id: uuidv4(), task: text }];
			localStorage.setItem("todos", JSON.stringify(newTodos));
			setTodos(newTodos);
			setShowNew((prev) => !prev);
		} else {
			textRef.current.focus();
		}
	};

	return (
		<div className="new-item">
			<input ref={textRef} className="edit-text" type="text" value={text} onChange={handleEdit} />
			<span className="save-container">
				<button className="save-btn" type="button" onClick={handleSave}>
					Save
				</button>
			</span>
		</div>
	);
};

export default NewTodo;
