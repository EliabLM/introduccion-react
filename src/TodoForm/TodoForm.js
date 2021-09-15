import React, { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext/index';
import './TodoForm.css';

function TodoForm() {
	const [newTodoValue, setNewTodoValue] = useState('');
	const { addTodo, setOpenModal } = useContext(TodoContext);

	const onChange = (event) => {
		setNewTodoValue(event.target.value);
	};

	const onCancel = () => {
		setOpenModal(false);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		addTodo(newTodoValue);
		setOpenModal(false);
	};

	return (
		<form onSubmit={onSubmit}>
			<label>Escribe tu nuevo ToDo</label>
			<textarea
				onChange={onChange}
				value={newTodoValue}
				placeholder="Agregar ToDo"
			/>
			<div className="TodoForm-buttonContainer">
				<button
					className="TodoForm-button TodoForm-button--cancel"
					type="button"
					onClick={onCancel}
				>
					Cancelar
				</button>
				<button className="TodoForm-button TodoForm-button--add" type="submit">
					Añadir
				</button>
			</div>
		</form>
	);
}

export { TodoForm };
