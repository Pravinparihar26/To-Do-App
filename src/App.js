import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaTrash, FaEdit, FaCheckCircle, FaClock, FaCalendarTimes } from "react-icons/fa";
import { MdSaveAs, MdDeleteSweep } from "react-icons/md";

function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState(() => {
    const storedData = localStorage.getItem('todos');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [update, setupdate] = useState(false);
  const [updatevalue, setupdatevalue] = useState('');
  const [updateindex, setupdateindex] = useState(null);
  const [duedate, setduedate] = useState('');
  const [updatedate, setupdatedate] = useState('');

  const handlechange = (e) => {
    settodo(e.target.value);
  }

  const addtodo = () => {
    if (!todo.trim()) return;
    settodos([...todos, { text: todo, done: false, enddate: duedate }]);
    settodo('');
    setduedate('');
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

  const updatetodo = (index) => {
    setupdate(true);
    setupdateindex(index);
    setupdatevalue(todos[index].text);
    setupdatedate(todos[index].enddate);
  }

  const saveupdate = (index) => {
    if (!updatevalue.trim()) return;
    const updated = [...todos];
    updated[index] = { ...updated[index], text: updatevalue, enddate: updatedate };
    settodos(updated);
    setupdate(false);
    setupdateindex(null);
    setupdatevalue('');
    setupdatedate('');
  }

  const clearall = () => {
    settodos([]);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col items-center text-white">
      <h1 className="font-bold text-2xl my-5 sm:text-5xl">To Do App</h1>

      <div className='flex flex-col gap-3 items-center my-3 sm:flex-row'>
        <div className='relative'>
          <input className='px-3 py-1 text-black pr-36 rounded-lg min-w-40 text-sm h-8 border-none focus:outline-none sm:min-w-72 sm:py-2 sm:text-base' type="text" value={todo} onChange={handlechange} placeholder="Enter To Do" />
          <input className='absolute bg-green-400 hover:bg-green-300 rounded-md px-1 py-1 right-2 text-xs top-1/2 -translate-y-1/2 h-5 text-black opacity-90 sm:right-3 sm:h-6' type="date" value={duedate} onChange={(e) => setduedate(e.target.value)} />
        </div>
        <button disabled={!todo.trim()} className={`px-3 py-1 min-w-20 max-h-7 text-sm rounded-lg font-bold sm:min-w-40 sm:min-h-10 sm:py-2 sm:text-base ${todo.trim()
          ? 'bg-green-400 hover:bg-green-500 text-black'
          : 'bg-gray-500 cursor-not-allowed text-gray-300'}`}
          onClick={addtodo}> Add
        </button>
      </div>

      <div className='bg-gray-500 rounded p-2 text-center font-bold'>
        <p>
          Completed Tasks: {todos.filter(todo => todo.done).length} / {todos.length}
        </p>
        <p>
          Remaining Tasks: {todos.filter(todo => !todo.done).length} / {todos.length}
        </p>
      </div>

      <div className='my-4 mx-2'>
        <h3 className='font-bold text-lg text-center mb-4 sm:text-2xl'>Your Todos</h3>
        <ul className='space-y-3'>
          {todos.map((todo, index) => (
            <li className='bg-zinc-700 px-4 py-2 text-xs rounded-lg flex flex-col justify-between sm:py-2 sm:text-sm sm:min-h-10 sm:flex-row' key={index}>

              {update && updateindex === index
                ? (<input className='text-black rounded-lg px-2 outline-none' type="text" value={updatevalue} placeholder="Enter updated To Do" onChange={(e) => setupdatevalue(e.target.value)} />)
                : (<span value={updatevalue} className={todo.done ? 'line-through text-gray-400 text-sm sm:text-base break-words flex-1' : 'text-sm sm:text-base break-words flex-1'}>{todo.text}</span>)}

              <span className='bg-gray-300 flex items-center text-black text-xs rounded p-1 mt-1 w-fit sm:ml-2 sm:mt-0'>
                {update && updateindex === index
                  ? (<input type="date" value={updatedate} onChange={(e) => setupdatedate(e.target.value)} className='bg-transparent outline-none' />)
                  : (todo.enddate ? (<><FaCalendarAlt className='mr-1' /> {todo.enddate}</>) : (<><FaCalendarTimes /> <span className="ml-1 text-gray-700">No Due Date</span></>))
                }
              </span>

              <div className='flex gap-2 mt-2 justify-center items-center sm:mt-0'>
                <button className='max-h-5 px-2 text-xs rounded font-semibold sm:min-h-6 sm:text-sm sm:ml-4' onClick={() => completed(index)}>{todo.done ? <FaCheckCircle className='text-green-500 hover:text-green-300' /> : <FaClock className='text-yellow-500 hover:text-yellow-300 animate-spin' />}</button>
                <button className={`max-h-5 px-2 text-xs rounded font-semibold sm:min-h-6 sm:text-sm ${update && updateindex === index
                  ? 'text-green-500 hover:text-green-300'
                  : 'text-blue-500 hover:text-blue-300'
                  }`} onClick={() => update && updateindex === index
                    ? saveupdate(index) : updatetodo(index)}>
                  {update && updateindex === index ? <MdSaveAs /> : <FaEdit />} </button>
                <button className='text-red-500 hover:text-red-300 max-h-5 px-2 py-1 rounded font-semibold sm:min-h-6' onClick={() => deletetodo(index)}><FaTrash /></button>
              </div>

            </li>
          ))}
        </ul>
      </div>
      <button className={`bg-red-500 hover:bg-red-400 rounded flex justify-center items-center font-bold px-2 py-[3px] max-h-5 mb-2 sm:min-h-7 sm:w-20 ${todos.length === 0 ? 'invisible' : 'visible'}`} onClick={() => clearall()}><MdDeleteSweep className='text-lg' /></button>
    </div >
  );
}

export default App;
