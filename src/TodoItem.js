import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
	return (
		<li className="TodoItem">
			<span
				className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
			>
				<i class="far fa-check-circle"></i>
			</span>
			<p className={`TodoItem-p ${props.completed && 'TodoItem-p--completed'}`}>
				{props.text}
			</p>
			<span className="Icon Icon-delete">
				<i class="fas fa-trash-alt"></i>
			</span>
		</li>
	);
}

export { TodoItem };
