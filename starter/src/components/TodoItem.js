import React, { useState } from 'react';
import { toggleComplete, deleteTodo, editTodo, toggleCompleteTodoAsync, deleteTodoAsync, editTodoAsync } from '../redux/todoSlice';
import { useDispatch } from 'react-redux';

const TodoItem = ({ id, title, completed }) => {
	const [isEdited, setIsEdited] = useState({ state: false, value: title });

	const dispatch = useDispatch();

	const handleComplete = () => {
		dispatch(toggleCompleteTodoAsync({ id: id, completed: !completed }));
		// dispatch(toggleComplete({ id: id, completed: !completed }));
	};

	const handleDelete = () => {
		dispatch(deleteTodoAsync({ id: id }));
		// dispatch(deleteTodo({ id: id }));
	};

	const handleEdit = () => {
		if (isEdited.state) {
			// dispatch(editTodo({ id: id, title: isEdited.value }));
			dispatch(editTodoAsync({ id: id, title: isEdited.value }));
		}
		setIsEdited({ ...isEdited, state: !isEdited.state });
	};

	const handleEditValue = (e) => {
		setIsEdited({ ...isEdited, value: e.target.value });
	};

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' className='mr-3' checked={completed} onChange={handleComplete} />
					{isEdited.state ? <input type="text" className='form-control mb-2 mr-sm-2' defaultValue={isEdited.value} onChange={handleEditValue} /> : completed ? <s>{title}</s> : title}
				</span>
				<div>
					<button className='btn btn-sm btn-success mx-1' onClick={handleEdit}>{isEdited.state ? "Done" : "Edit"}</button>
					<button className='btn btn-sm btn-danger' onClick={handleDelete}>Delete</button>
				</div>
			</div>
		</li >
	);
};

export default TodoItem;
