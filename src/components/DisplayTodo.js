import { FaCalendarAlt, FaTrash, FaEdit, FaCheckCircle, FaClock, FaCalendarTimes } from "react-icons/fa";
import { MdSaveAs, MdDeleteSweep } from "react-icons/md";
import { FaArrowUpWideShort, FaArrowDownShortWide, FaArrowDownUpAcrossLine } from "react-icons/fa6";

function DisplayTodo({
    todos,
    searchvalue,
    displayTodos,
    update,
    updateindex,
    updatevalue,
    setupdatevalue,
    updatedate,
    setupdatedate,
    saveupdate,
    updatetodo,
    deletetodo,
    completed,
    clearall,
}) {
    return (
        <div className="my-4 flex flex-col mx-5 w-fit flex-1">
            {todos.length ? (
                <div>
                    <h3 className="text-green-500 font-bold text-lg text-center mb-4 sm:text-2xl">{searchvalue.trim() ? "Your Searched MindList" : "Your MindList"}</h3>
                    <ul className="space-y-3">
                        {displayTodos.map((todo, index) => {
                            const realIndex = todo.originalIndex;
                            return (
                                <li
                                    className="bg-white dark:bg-zinc-700 px-4 py-2 text-xs rounded-lg flex flex-col justify-between sm:py-2 sm:text-sm sm:min-h-10 sm:flex-row"
                                    key={index}
                                >
                                    {/* Todo Text or Update Input */}
                                    {update && updateindex === realIndex ? (
                                        <input
                                            className="bg-gray-300 dark:bg-white text-black min-h-6 rounded px-2 outline-none"
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
                                                    : "text-gray-600 dark:text-white text-sm sm:text-base break-words flex-1"
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
                        className={`bg-red-500 hover:bg-red-400 rounded flex mx-auto justify-center items-center my-3 font-bold px-2 py-3 max-h-5 mb-2 w-20 sm:min-h-7 ${todos.length === 0 || searchvalue.trim() ? "invisible" : "visible"
                            }`}
                        onClick={() => clearall()}
                    >
                        <MdDeleteSweep size={22} className="text-lg" />
                    </button>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <h3 className="text-gray-400 font-bold text-xl text-center">
                        Your MindList is Empty
                    </h3>
                </div>
            )}

        </div>
    )
}

export default DisplayTodo;