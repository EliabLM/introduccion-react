import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter/TodoCounter';
import { TodoSearch } from '../TodoSearch/TodoSearch';
import { TodoList } from '../TodoList/TodoList';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoForm } from '../TodoForm/TodoForm';
import { CreateTodoButton } from '../CreateTodoButton/CreateTodoButton';
import { Modal } from '../Modal/index';
import './AppUI.css';

function AppUI() {
	const { searchedTodos, completeTodo, deleteTodo, openModal, setOpenModal } =
		React.useContext(TodoContext);

	return (
		<div className="container">
			<TodoCounter />

			<TodoSearch />

			<TodoList>
				{searchedTodos.map((todo) => (
					<TodoItem
						key={todo.text}
						text={todo.text}
						completed={todo.completed}
						onComplete={() => completeTodo(todo.text)}
						onDelete={() => deleteTodo(todo.text)}
					/>
				))}
			</TodoList>

			{openModal && (
				<Modal>
					<TodoForm />
				</Modal>
			)}

			<CreateTodoButton setOpenModal={setOpenModal} />
		</div>
	);
}

export { AppUI };
