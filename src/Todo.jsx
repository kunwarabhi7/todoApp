import React from 'react'
import { BsTrash } from "react-icons/bs";


const Todo = ({todos,toggleTodo , deleteTodo}) => {
  return (
    <li className={todos.completed ? 'flex justify-between bg-slate-400 p-4 my-2 capitalize' : 'flex justify-between bg-slate-200 p-4 my-2 capitalize'}>
      <div className='flex'>
        <input type="checkbox" onChange={()=> toggleTodo(todos)} checked={todos.completed? 'checked' : ''} />
        <p onClick={()=> toggleTodo(todos)} className={todos.completed?'ml-2 cursor-pointer line-through':'ml-2 cursor-pointer'}>{todos.text}</p>
      </div>
      <button onClick={()=> deleteTodo(todos.id)} className='cursor-pointer flex items-center'><BsTrash /></button>
    </li>
  )
}

export default Todo
