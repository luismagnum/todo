import React from 'react'
import del from '../assets/del.png'
import yes from '../assets/yes.png'
import no_yes from '../assets/no_yes.png'

const TodoItems = ({text, id, isComplete, deleteTodo, toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
       <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer text-orange-500'>
        <img src={isComplete ? yes: no_yes} alt='' className='w-7'/>
       <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500
        ${isComplete ? "line-through" : ""}`}>
            {text}</p>
       </div>
        <img onClick={()=>{deleteTodo(id)}}src={del} alt='del' className='w-6 cursor-pointer'/>
    </div>
  )
}

export default TodoItems
