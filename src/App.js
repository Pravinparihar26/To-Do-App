import React, { useState } from 'react';

function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState([]);

  const handlechange = (e) => {
    settodo(e.target.value);
  }

  const addtodo = () => {
    if (!todo.trim()) return;
    settodos([...todos, { text: todo, done: false }]);
    settodo('');
  }

  const deletetodo = (deleteindex) => {
    const updatedTodos = todos.filter((_, index) => index !== deleteindex);
    settodos(updatedTodos);
  }

  const completed = (completedindex) => {
    const updatedTodos = todos.map((item, i) =>
      i === completedindex ? { ...item, done: !item.done } : item
    );
    settodos(updatedTodos);
  }

  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col items-center text-white">
      <h1 className="font-bold text-2xl my-5 sm:text-5xl">To Do App</h1>

      <div className='flex flex-col gap-3 items-center sm:flex-row'>
        <input className='px-3 py-1 text-black rounded-lg min-w-40 text-sm max-h-6 border-none focus:outline-none sm:min-w-72 sm:min-h-10 sm:py-2 sm:text-base' type="text" value={todo} onChange={handlechange} placeholder="Enter To Do" />
        <button disabled={!todo.trim()} className={`my-3 px-3 py-1 min-w-20 max-h-7 text-sm rounded-lg font-bold sm:min-w-40 sm:min-h-10 sm:py-2 sm:text-base ${todo.trim() 
          ? 'bg-green-400 hover:bg-green-500 text-black' 
          : 'bg-gray-500 cursor-not-allowed text-gray-300'}`} 
          onClick={addtodo}> Add 
        </button>
      </div>

      <div className='my-4 mx-2'>
        <h3 className='font-bold text-lg text-center mb-4 sm:text-2xl'>Your Todos</h3>
        <ul className='space-y-3'>
          {todos.map((todo, index) => (
            <li className='bg-zinc-700 px-4 py-2 text-xs rounded-lg flex flex-col justify-between sm:py-2 sm:text-sm sm:min-h-10 sm:flex-row' key={index}>
              <span className='text-sm sm:text-base break-words flex-1'>{todo.text}</span>

              <div className='flex gap-2 mt-2 justify-center sm:mt-0'>
                <button className='bg-yellow-400 hover:bg-yellow-300 text-black max-h-5 px-2 text-xs rounded font-semibold sm:min-h-6 sm:text-sm sm:ml-4' onClick={() => completed(index)}>{todo.done ? 'Completed' : 'Not Completed'}</button>
                <button className='bg-red-500 hover:bg-red-400 text-black max-h-5 px-2 text-xs rounded font-semibold sm:min-h-6 sm:text-sm' onClick={() => deletetodo(index)}>Delete</button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
