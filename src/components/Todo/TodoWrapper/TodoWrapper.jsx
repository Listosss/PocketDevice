import React, {useState, useEffect } from 'react'
import { TodoForm } from '../TodoForm/TodoForm'
import { Todo } from '../Todo/Todo';
import { EditTodoForm } from '../EditTodoForm/EditTodoForm';
import { v4 as uuidv4 } from 'uuid';
import './TodoWrapper.css'

uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState(localStorage.getItem('todos')? JSON.parse(localStorage.getItem('todos')):[])
    useEffect(()=>{ localStorage.setItem('todos', JSON.stringify(todos))}, [todos])
    const addTodo = todo => {
        todo !== "" && setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }])
    }
    const deleteTodo = id=>{
        setTodos(todos.filter(elem => elem.id!== id))
    }
    const changeCompleteTodo =( id, status) =>{
        setTodos(todos.map((todo)=> todo.id===id ? {...todo, completed: status }: todo))
    }
    const editTodo = id =>{
        setTodos(todos.map((todo)=> todo.id===id ? {...todo, isEditing: !todo.isEditing }: todo))
    }
    const editTask = (newValue, id) =>{
        setTodos(todos.map((todo)=> todo.id===id ? {...todo, task: newValue, isEditing: !todo.isEditing  }: todo))
    }
    return (
        <div className='todo_wrapper'>
            <h1 className='todo_title'>To-Do List</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) => 
                ( todo.isEditing? (<EditTodoForm editTask={editTask} task={todo} key={todo.id}/>)
                :  (<Todo task={todo} deleteTodo={deleteTodo} changeCompleteTodo = {changeCompleteTodo} editTodo={editTodo} key={todo.id} />))  
            )}
        </div>
    )
}
