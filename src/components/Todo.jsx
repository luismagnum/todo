import React, { useEffect, useRef, useState } from 'react'
import TodoItems from './TodoItems'
import tarea from '../assets/tarea.png'

const Todo = () => {
    const [todolist, setTodoList] = useState(localStorage.getItem("todos")?
     JSON.parse(localStorage.getItem("todos")):[]);

    const inputRef = useRef();
    const add = () => {
        const inputText = inputRef.current.value.trim();

        if(inputText === ""){
            return null;
        }
        
        const newTodo = {
            id:Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev)=> [...prev, newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        setTodoList((prvTodos)=>{
           return prvTodos.filter((todo)=> todo.id !== id) 
        })
    }

    const toggle = (id)=>{
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todolist))
    },[todolist])

  return (
    <div className="flex justify-center items-center min-h-screen">
     <div className = "bg-white place-self-center w-full max-w-md flex flex-col p-4 sm:p-6 min-h-[550px] rounded-xl shadow-lg mx-2">
      <div className='flex items-center ml-4 mt-7 gap-2'>
        <img src={tarea} alt='tarea' className='w-8'/>
        <h1 className='text-2xl font-semibold'>TAREAS</h1>
      </div>
        <div className='flex items-center mx-4 md:my-6 mt-6 bg-gray-700 rounded-full p-1'>
          <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type='text' placeholder='Add your task'/>
          <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer sm:mt-1 md:mt-0 md:ml-4'>ADD +</button>
        </div>

        <div className='ml-4 mr-4'>
            {todolist.map((item, index)=>{
                return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
            })}
            
        </div>
      </div>
    </div>
  )
}

export default Todo
