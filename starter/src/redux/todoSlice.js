import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodoAsync = createAsyncThunk('todo/getTodoAsync', async () => {
    const response = await fetch('http://localhost:7000/todos');
    if (response.ok) {
        const todos = await response.json();
        return { todos }
    }
})

export const addTodoAsync = createAsyncThunk('todo/addTodoAsync', async (payload) => {
    const response = await fetch('http://localhost:7000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: payload.title })
    });
    if (response.ok) {
        const todo = await response.json();
        return { todo }
    }
})

export const toggleCompleteTodoAsync = createAsyncThunk('todo/toggleCompleteTodoAsync', async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: payload.completed })
    });

    if (response.ok) {
        const todo = await response.json();
        return { ...todo }
    }
})

export const editTodoAsync = createAsyncThunk('todo/editTodoAsync', async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: payload.title })
    });

    if (response.ok) {
        const todo = await response.json();
        return { ...todo }
    }
})

export const deleteTodoAsync = createAsyncThunk('todo/deleteTodoAsync', async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const todo = await response.json();
        return { todo }
    }
})

const todoSlice = createSlice({
    name: "todo",
    initialState: [
        { id: 1, title: 'todo1', completed: false },
        { id: 2, title: 'todo2', completed: false },
        { id: 3, title: 'todo3', completed: true },
        { id: 4, title: 'todo4', completed: false },
        { id: 5, title: 'todo5', completed: false },
    ],
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            })
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id);
        },
        editTodo: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index].title = action.payload.title;
        },
        deleteAllTodo: (state, action) => {
            return state.filter(todo => todo.completed !== true);
            // return state = []
        },
        selectAllTodo: (state, action) => {
            state.forEach(todo => todo.completed = action.payload.completed)
        }
    },
    extraReducers: {
        [getTodoAsync.pending]: (state, action) => {
            console.log("fetching data....")
        },

        [getTodoAsync.fulfilled]: (state, action) => {
            console.log("fetching data successfully....");
            return action.payload.todos
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            console.log("add data successfully....");
            state.push(action.payload.todo);
        },
        [toggleCompleteTodoAsync.fulfilled]: (state, action) => {
            console.log("toggle Complete data successfully....");
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        [editTodoAsync.fulfilled]: (state, action) => {
            console.log("edit data successfully....");
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index].title = action.payload.title;
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            console.log("delete data successfully....");
            return action.payload.todo
        },
    }
})

export const { addTodo, toggleComplete, deleteTodo, editTodo, selectAllTodo, deleteAllTodo } = todoSlice.actions

export default todoSlice.reducer