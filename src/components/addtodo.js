function AddTodo({
    todo,
    settodo,
    priority,
    setPriority,
    duedate,
    setduedate,
    addtodo,
}) {
    return (
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
    )
}

export default AddTodo;