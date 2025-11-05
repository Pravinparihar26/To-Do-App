
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import PrioritySelect from "./PrioritySelect";

function AddTodo({
    todo,
    settodo,
    priority,
    setPriority,
    duedate,
    setduedate,
    addtodo,
}) {
    const [mobileViewAddTodo, setMobileViewAddTodo] = useState(false);

    return (
        <>
            <div className="justify-center hidden lg:flex gap-3 items-center my-3 ">
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

            {/* Add todo Mobile View */}
            <div className="lg:hidden flex justify-center items-center my-3">
                <button
                    onClick={() => setMobileViewAddTodo(true)}
                    className="bg-green-400 hover:bg-green-500 text-black p-3 rounded-full fixed bottom-6 right-6"
                >
                    <IoMdAdd size={28} />
                </button>
            </div>

            {
                mobileViewAddTodo && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-30">
                        <div className="bg-white text-black rounded flex flex-col">
                            <input
                                className="p-2 m-2 border-b rounded-lg focus:outline-none focus:bg-gray-100"
                                type="text"
                                value={todo}
                                onChange={(e) => settodo(e.target.value)}
                                placeholder="Enter To Do"
                            />

                            <div className="flex flex-col m-2">
                                <label className="text-sm text-gray-400 font-semibold mb-1 mx-2">Set Due Date</label>
                                <input
                                    className="p-2 border-b rounded-lg min-w-fit focus:outline-none"
                                    type="date"
                                    value={duedate}
                                    onChange={(e) => setduedate(e.target.value)}
                                />
                            </div>

                            <PrioritySelect priority={priority} setPriority={setPriority} />
                            <button
                                disabled={!todo.trim()}
                                className={`m-auto my-2 px-2 py-1 rounded w-1/2  ${todo.trim()
                                    ? "bg-green-400 hover:bg-green-500 text-black"
                                    : "bg-gray-500 cursor-not-allowed text-gray-300"
                                    }`}
                                onClick={() => {
                                    addtodo();
                                    setMobileViewAddTodo(false)
                                }}
                            >
                                Add
                            </button>
                            <hr className="border-t border-gray-300" />
                            <button
                                onClick={() => setMobileViewAddTodo(false)}
                                className="text-red-500 p-2 font-bold"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AddTodo;