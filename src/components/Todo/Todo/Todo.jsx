import React from 'react'
import './Todo.css'
export const Todo = ({ task, deleteTodo, changeCompleteTodo, editTodo }) => {
    return (
        <div className={`todo ${task.completed ? 'completed' : ''}`}>
            <p >{task.task}</p>
            <div className='todo_icons'>
                <input className='todo_comlete_box' type='checkbox' onChange={(e) => { changeCompleteTodo(task.id, e.target.checked) }} checked={task.completed} />
                <img className="todo_edit_btn" src='./assets/todoApp/edit.png' onClick={() => editTodo(task.id)} alt='edit_todo_icon'/>
                <img className="todo_delete_btn" src='./assets/todoApp/delete.png' onClick={() => deleteTodo(task.id)} alt='delete_todo_icon'/>
            </div>
        </div>
    )
}
