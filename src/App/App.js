import React from 'react';
import { TodoCounter } from '../TodoCounter/TodoCounter';
import { TodoSearch } from '../TodoSearch/TodoSearch';
import { TodoList } from '../TodoList/TodoList';
import { TodoItem } from '../TodoItem/TodoItem';
import { CreateTodoButton } from '../CreateTodoButton/CreateTodoButton';
import './App.css';

// const defaultTodos = [
// 	{ text: 'Cortar cebolla', completed: false },
// 	{ text: 'Tomar el curso de introduccion a React', completed: false },
// 	{ text: 'Llorar con la llorona', completed: false },
// 	{ text: 'Testing', completed: true },
// ];

function useLocalStorage(itemName, initialValue) {
	// Llamar desde localStorage
	const localStorageItem = localStorage.getItem(itemName);
	let parsedItem;

	// verificar si hay información en el local storage
	if (!localStorageItem) {
		localStorage.setItem(itemName, JSON.stringify(initialValue));
		parsedItem = initialValue;
	} else {
		parsedItem = JSON.parse(localStorageItem);
	}

	const [item, setItem] = React.useState(parsedItem);

	// Persistencia en local storage
	const saveItem = (newItem) => {
		const stringifiedItem = JSON.stringify(newItem);
		localStorage.setItem(itemName, stringifiedItem);
		setItem(newItem);
	};

	return [item, saveItem];
}

function App() {
	const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);

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
		saveTodos(newTodos);
	};

	const deleteTodo = (text) => {
		const todoIndex = todos.findIndex((todo) => todo.text === text);
		const newTodos = [...todos];
		newTodos.splice(todoIndex, 1);
		saveTodos(newTodos);
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
