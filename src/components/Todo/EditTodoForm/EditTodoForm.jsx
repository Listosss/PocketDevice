import React, {useState} from 'react'
import './EditTodoForm.css'

export const EditTodoForm = ({editTask, task}) => {
    const [value, setValue]=useState(task.task)
    const handleSubmit = e=>{
        e.preventDefault();
        if(value) editTask(value, task.id);
        setValue("")
    }
    return (
        <form className='todo_form edit_form' onSubmit={handleSubmit}>
            <input type='text' className='todo-input' value={value}
            placeholder='Update task...' 
            onChange={(e)=>setValue(e.target.value)}/>
            <button type='submit' className='todo-btn'>Update</button>
        </form>
    )
}
