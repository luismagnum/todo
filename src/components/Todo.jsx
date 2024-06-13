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
    <div className="flex justify-center items-center min-h-screen px-4">
          <div className="bg-white w-full max-w-md flex flex-col p-6 sm:p-4 min-h-[550px] rounded-xl shadow-lg overflow-x-hidden">
            <div className='flex items-center mb-4'>
              <img src={tarea} alt='tarea' className='w-8'/>
              <h1 className='text-2xl font-semibold ml-2'>TAREAS</h1>
            </div>
            <div className='flex items-center mb-6 bg-gray-700 rounded-full overflow-x-hidden'>
              <input ref={inputRef} className='bg-transparent border-0 outline-none text-white flex-1 h-12 pl-4 pr-2 placeholder:text-slate-600' type='text' placeholder='Add your task'/>
              <button onClick={add} className='border-none rounded-full bg-orange-600 px-6 h-12 text-white text-lg font-medium'>ADD</button>
            </div>
            <div className='space-y-4'>
              {todolist.map((item, index) => {
                return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
              })}
            </div>
          </div>
        </div>
  )
}

export default Todo
