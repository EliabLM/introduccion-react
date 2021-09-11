import React from 'react';

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

export { useLocalStorage };
