import React, { useState } from 'react'
import { selectAllTodo, deleteAllTodo } from '../redux/todoSlice';
import { useDispatch } from 'react-redux';

const QuickAction = () => {
    const [select, setSelect] = useState(true)
    const dispatch = useDispatch();

    const handleSelect = () => {
        setSelect(prevState => !prevState)
        dispatch(selectAllTodo({ completed: select }));
    };

    const handleDelete = () => {
        dispatch(deleteAllTodo());
    };
    return (
        <div>
            <button type='submit' className='btn btn-sm btn-primary m-1' onClick={handleSelect}>{select ? "Select All" : "UnSelect All"}</button>
            <button type='submit' className='btn btn-sm btn-danger m-1' onClick={handleDelete}>Delete Selected</button>
        </div>
    )
}

export default QuickAction