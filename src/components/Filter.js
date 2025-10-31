import { MdFilterListAlt, MdFilterAltOff, MdPendingActions } from "react-icons/md";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { GiChecklist } from "react-icons/gi";
import { TbFilterEdit } from "react-icons/tb";

function Filter({filter, handlefilter, clearFilter}) {
    return (
        <div className='relative group'>
            <button className='text-blue-500 p-1 rounded hover:text-green-300'>
                {filter ? <TbFilterEdit size={24} /> : <MdFilterListAlt size={24} />}
            </button>
            <div className='absolute right-0 mt-2 bg-gray-500 rounded invisible group-hover:visible duration-200 transition-all divide-y divide-black'>
                <div>
                    <ul className='p-2 space-y-2 text-sm text-white'>
                        <li>
                            <button
                                value={filter}
                                name='completed'
                                className={`flex w-full text-left hover:bg-gray-700 px-2 py-1 rounded cursor-pointer ${filter === 'completed' && "bg-gray-900"}`}
                                onClick={handlefilter}>
                                <GiChecklist size={24} className='text-green-500 mr-1' />
                                Completed
                            </button>
                        </li>
                        <li>
                            <button
                                value={filter}
                                name='remaining'
                                className={`flex w-full text-left hover:bg-gray-700 px-2 py-1 rounded cursor-pointer ${filter === 'remaining' && "bg-gray-900"}`}
                                onClick={handlefilter}>
                                <MdPendingActions size={20} className='text-yellow-500 mr-2' />
                                Remaining
                            </button>
                        </li>
                        <li>
                            <button
                                value={filter}
                                name='priority'
                                className={`flex w-full text-left hover:bg-gray-700 px-2 py-1 rounded cursor-pointer ${filter === 'priority' && "bg-gray-900"}`}
                                onClick={handlefilter}>
                                <FaArrowUpRightDots size={16} className='text-cyan-400 mr-3' />
                                Priority
                            </button>
                        </li>
                    </ul>
                </div>
                <button
                    onClick={clearFilter}
                    className='flex justify-center w-full p-2 text-red-500 hover:text-red-400 text-sm'
                >
                    <MdFilterAltOff size={20} />
                    <span className='ml-1'>Clear Filter</span>
                </button>

            </div>
        </div>
    )
}

export default Filter;