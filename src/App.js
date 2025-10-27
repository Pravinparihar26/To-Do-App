import React, { useState, useEffect, useMemo } from 'react';
import { FaCalendarAlt, FaTrash, FaEdit, FaCheckCircle, FaClock, FaCalendarTimes } from "react-icons/fa";
import { MdSaveAs, MdDeleteSweep, MdFilterListAlt, MdFilterAltOff, MdPendingActions } from "react-icons/md";
import { FaArrowUpWideShort, FaArrowDownShortWide, FaArrowDownUpAcrossLine, FaArrowUpRightDots } from "react-icons/fa6";
import { GiChecklist } from "react-icons/gi";

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
  const [searchvalue, setsearchvalue] = useState('');
  const [priority, setPriority] = useState('High');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addtodo = () => {
    if (!todo.trim()) return;
    settodos([...todos, { text: todo, done: false, enddate: duedate, priority }]);
    settodo('');
    setduedate('');
    setPriority('High');
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

  const clearall = () => settodos([]);

  const handlefilter = (e) => {
    setFilter(e.target.name);
  }

  const displayTodos = useMemo(() => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };

    let result = todos.map((todo, index) => ({ ...todo, originalIndex: index }));

    if (filter === 'completed') {
      result = result.filter(todo => todo.done);
    } else if (filter === 'remaining') {
      result = result.filter(todo => !todo.done);
    } else if (filter === 'priority') {
      result = result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    if (searchvalue.trim() !== '') {
      result = result.filter(todo =>
        todo.text.toLowerCase().includes(searchvalue.toLowerCase())
      );
    }

    return result;
  }, [todos, filter, searchvalue]);

  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col items-center text-white">
      {/* Header */}
      <h1 className="text-emerald-400 font-bold text-center my-4 text-4xl">
        MindList
      </h1>


      {/* Input Section */}
      <div className='relative w-full items-center justify-center flex'>
        <div className="justify-center flex flex-col gap-3 items-center my-3 sm:flex-row">
          <div className="relative">
            {/* Todo Input */}
            <input
              className="px-3 py-1 text-black pr-52 rounded-lg min-w-40 text-sm h-8 border-none focus:outline-none sm:min-w-72 sm:py-2 sm:text-base"
              type="text"
              value={todo}
              onChange={(e) => settodo(e.target.value)}
              placeholder="Enter To Do"
            />

            {/* Priority Select */}
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="absolute bg-red-500 text-black focus:outline-none text-xs px-1 right-32 h-5 rounded-md top-1/2 -translate-y-1/2 sm:h-6">
              <option value="High" className="bg-red-500">High</option>
              <option value="Medium" className="bg-yellow-300">Medium</option>
              <option value="Low" className="bg-green-400">Low</option>
            </select>

            {/* Due Date Input */}
            <input
              className="absolute bg-green-400 hover:bg-green-300 rounded-md px-1 py-1 right-2 text-xs top-1/2 -translate-y-1/2 h-5 text-black sm:right-3 sm:h-6"
              type="date"
              value={duedate}
              onChange={(e) => setduedate(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <button
            disabled={!todo.trim()}
            className={`px-3 py-1 min-w-20 max-h-7 text-sm rounded-lg font-bold sm:min-w-40 sm:min-h-8 sm:py-1 sm:text-base ${todo.trim()
              ? "bg-green-400 hover:bg-green-500 text-black"
              : "bg-gray-500 cursor-not-allowed text-gray-300"
              }`}
            onClick={addtodo}
          >
            Add
          </button>
        </div>

        {/* Filter and search input */}
        <div className='absolute flex right-6 gap-2'>
          <div className='relative group '>
            <button className='text-white p-1 rounded hover:text-green-300'>
              <MdFilterListAlt size={24} />
            </button>
            <div className='absolute right-0 mt-2 bg-gray-500 rounded invisible group-hover:visible duration-200 transition-all divide-y divide-black'>
              <div>
                <ul className='p-2 space-y-2 text-sm text-white'>
                  <li>
                    <button
                      value={filter}
                      name='completed'
                      className='flex w-full text-left hover:bg-gray-700 px-2 py-1 rounded'
                      onClick={handlefilter}>
                      <GiChecklist size={24} className='text-green-500 mr-1' />
                      Completed
                    </button>
                  </li>
                  <li>
                    <button
                      value={filter}
                      name='remaining'
                      className='flex w-full text-left hover:bg-gray-700 px-2 py-1 rounded'
                      onClick={handlefilter}>
                      <MdPendingActions size={20} className='text-yellow-500 mr-2' />
                      Remaining
                    </button>
                  </li>
                  <li>
                    <button
                      value={filter}
                      name='priority'
                      onClick={handlefilter}
                      className='flex w-full items-center text-left px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-150'
                    >
                      <FaArrowUpRightDots
                        size={16}
                        className='text-cyan-400 mr-3'
                      />
                      Priority
                    </button>
                  </li>
                </ul>
              </div>
              <button
                // onClick={clearFilter}
                className='flex justify-center w-full p-2 text-red-500 hover:text-red-400 text-sm'
              >
                <MdFilterAltOff size={20} />
                <span className='ml-1'>Clear Filter</span>
              </button>

            </div>
          </div>

          <input
            type="search"
            className='bg-white rounded px-2 py-1 text-black focus:outline-none'
            placeholder="Search..."
            value={searchvalue}
            onChange={(e) => setsearchvalue(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-gray-500 rounded p-2 text-center font-bold">
        <p>
          Completed Tasks: {todos.filter((todo) => todo.done).length} / {todos.length}
        </p>
        <p>
          Remaining Tasks: {todos.filter((todo) => !todo.done).length} / {todos.length}
        </p>
      </div>

      {/* Todos Display Section */}
      <div className="my-4 flex flex-col mx-3 w-fit">
        <h3 className="text-emerald-400 font-bold text-lg text-center mb-4 sm:text-2xl">{searchvalue.trim() ? "Your Searched MindList" : "Your MindList"}</h3>
        <ul className="space-y-3">
          {displayTodos.map((todo, index) => {
            const realIndex = todo.originalIndex;
            return (
              <li
                className="bg-zinc-700 px-4 py-2 text-xs rounded-lg flex flex-col justify-between sm:py-2 sm:text-sm sm:min-h-10 sm:flex-row"
                key={index}
              >
                {/* Todo Text or Update Input */}
                {update && updateindex === realIndex ? (
                  <input
                    className="text-black rounded-lg px-2 outline-none"
                    type="text"
                    value={updatevalue}
                    placeholder="Enter updated To Do"
                    onChange={(e) => setupdatevalue(e.target.value)}
                  />
                ) : (
                  <span
                    value={updatevalue}
                    className={
                      todo.done
                        ? "line-through text-gray-400 text-sm sm:text-base break-words flex-1"
                        : "text-sm sm:text-base break-words flex-1"
                    }
                  >
                    {todo.text}
                  </span>
                )}

                {/* Date Display or Edit */}
                <span className="bg-gray-300 flex items-center text-black text-xs rounded p-1 mt-1 w-fit sm:ml-2 sm:mt-0">
                  {update && updateindex === realIndex ? (
                    <input
                      type="date"
                      value={updatedate}
                      onChange={(e) => setupdatedate(e.target.value)}
                      className="bg-transparent outline-none"
                    />
                  ) : todo.enddate ? (
                    <>
                      <FaCalendarAlt className="mr-1" /> {todo.enddate}
                    </>
                  ) : (
                    <>
                      <FaCalendarTimes />
                      <span className="ml-1 text-gray-700">No Due Date</span>
                    </>
                  )}
                </span>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-2 justify-center items-center sm:mt-0">
                  {/* Priority */}
                  <span className='sm:ml-4 px-2'>
                    {
                      todo.priority === 'High'
                        ? (<FaArrowUpWideShort className='text-red-500' />)
                        : todo.priority === 'Medium'
                          ? <FaArrowDownUpAcrossLine className='text-yellow-500' />
                          : <FaArrowDownShortWide className='text-green-500' />
                    }
                  </span>

                  {/* Complete */}
                  <button
                    className="px-2"
                    onClick={() => completed(realIndex)}
                  >
                    {todo.done ? (
                      <FaCheckCircle className="text-green-500 hover:text-green-300" />
                    ) : (
                      <FaClock className="text-yellow-500 hover:text-yellow-300 animate-spin" />
                    )}
                  </button>

                  {/* Edit / Save */}
                  <button
                    className={`px-2 ${update && updateindex === realIndex
                      ? "text-green-500 hover:text-green-300"
                      : "text-blue-500 hover:text-blue-300"
                      }`}
                    onClick={() =>
                      update && updateindex === realIndex
                        ? saveupdate(realIndex)
                        : updatetodo(realIndex)
                    }
                  >
                    {update && updateindex === realIndex ? <MdSaveAs /> : <FaEdit />}
                  </button>

                  {/* Delete */}
                  <button
                    className="text-red-500 hover:text-red-300 px-2"
                    onClick={() => deletetodo(realIndex)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Clear All Button */}
        <button
          className={`bg-red-500 hover:bg-red-400 rounded flex mx-auto justify-center items-center my-3 font-bold px-2 py-[3px] max-h-5 mb-2 sm:min-h-7 sm:w-20 ${todos.length === 0 || searchvalue.trim() ? "invisible" : "visible"
            }`}
          onClick={() => clearall()}
        >
          <MdDeleteSweep className="text-lg" />
        </button>
      </div>
    </div>
  );

}

export default App;
