import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
    let initTodo;
    if (localStorage.getItem("todos") === null) {
        initTodo = [];
    } else {
        initTodo = JSON.parse(localStorage.getItem("todos"));
    }
    const [todos, setTodos] = useState(initTodo);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
        let getUpdate = JSON.parse(localStorage.getItem("todos"));
        const newTodo = getUpdate.map(item => (item.id === todoId ? newValue : item));
        localStorage.setItem("todos", JSON.stringify(newTodo));
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removedArr);
        localStorage.setItem("todos", JSON.stringify(removedArr));
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
        let getUpdate = JSON.parse(localStorage.getItem("todos"));
        const newTodo = getUpdate.map(item => {
            if (item.id === id) {
                item.isComplete = !item.isComplete;
            }
            return item;
        });
        localStorage.setItem("todos", JSON.stringify(newTodo));
    };

    return (
        <>
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </>
    );
}

export default TodoList;