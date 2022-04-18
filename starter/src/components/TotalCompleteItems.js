import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {
	const completedTodos = useSelector((state) => {
		return state.todos.filter(todo => todo.completed === true);
	});

	const remainingTodos = useSelector((state) => {
		return state.todos.filter(todo => todo.completed === false);
	});

	return (
		<div className='d-flex justify-content-between'>
			<h6 className='mt-3'>Completed Todo: {completedTodos.length}</h6>
			<h6 className='mt-3'>Remaining Todo: {remainingTodos.length}</h6>
		</div>
	);
};

export default TotalCompleteItems;
