import React from 'react';
import { TodoCounter } from '../TodoCounter/TodoCounter';
import { TodoSearch } from '../TodoSearch/TodoSearch';
import { TodoList } from '../TodoList/TodoList';
import { TodoItem } from '../TodoItem/TodoItem';
import { CreateTodoButton } from '../CreateTodoButton/CreateTodoButton';
import './App.css';

const defaultTodos = [
	{ text: 'Cortar cebolla', completed: false },
	{ text: 'Tomar el curso de introduccion a React', completed: false },
	{ text: 'Llorar con la llorona', completed: false },
	{ text: 'Testing', completed: true },
];

function App() {
	const [todos, setTodos] = React.useState(defaultTodos);
	const [searchValue, setSearchValue] = React.useState('');

	const completedTodos = todos.filter((todo) => !!todo.completed).length;
	const totalTodos = todos.length;

	let searchedTodos = [];

	if (!searchValue.length >= 1) {
		searchedTodos = todos;
	} else {
		searchedTodos = todos.filter((todo) => {
			const todoText = todo.text.toLowerCase();
			const searchText = searchValue.toLowerCase();
			return todoText.includes(searchText);
		});
	}

	const completeTodo = (text) => {
		const todoIndex = todos.findIndex((todo) => todo.text === text);
		const newTodos = [...todos];
		newTodos[todoIndex].completed = true;
		setTodos(newTodos);
	};

	const deleteTodo = (text) => {
		const todoIndex = todos.findIndex((todo) => todo.text === text);
		const newTodos = [...todos];
		newTodos.splice(todoIndex, 1);
		setTodos(newTodos);
	};

	return (
		<div className="container">
			<TodoCounter total={totalTodos} completed={completedTodos} />

			<TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

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

			<CreateTodoButton />
		</div>
	);
}

export default App;
