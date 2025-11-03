import { useState, useRef, useEffect } from "react";
import { MdFilterListAlt, MdFilterAltOff, MdPendingActions } from "react-icons/md";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { GiChecklist } from "react-icons/gi";
import { TbFilterEdit } from "react-icons/tb";

function Filter({ filter, handlefilter, clearFilter }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("pointerdown", handleClickOutside);
        
        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className="relative group">
            {/* Filter button */}
            <button
                className="text-blue-500 p-1 rounded hover:text-green-300"
                onClick={() => setOpen((prev) => !prev)}
            >
                {filter ? <TbFilterEdit size={24} /> : <MdFilterListAlt size={24} />}
            </button>

            {/* Dropdown menu */}
            <div
                className={`absolute right-0 mt-2 bg-gray-500 rounded divide-y divide-black z-10 transition-all duration-200 
                    ${open ? "visible" : "invisible"} md:group-hover:visible
                    `}
            >
                <div>
                    <ul className="p-2 space-y-2 text-sm text-white">
                        <li>
                            <button
                                name="completed"
                                className={`flex w-full text-left hover:bg-gray-700 px-2 py-1 rounded cursor-pointer ${filter === "completed" && "bg-gray-900"
                                    }`}
                                onClick={handlefilter}
                            >
                                <GiChecklist size={24} className="text-green-500 mr-1" />
                                Completed
                            </button>
                        </li>
                        <li>
                            <button
                                name="remaining"
                                className={`flex w-full text-left hover:bg-gray-700 px-2 py-1 rounded cursor-pointer ${filter === "remaining" && "bg-gray-900"
                                    }`}
                                onClick={handlefilter}
                            >
                                <MdPendingActions size={20} className="text-yellow-500 mr-2" />
                                Remaining
                            </button>
                        </li>
                        <li>
                            <button
                                name="priority"
                                className={`flex w-full text-left hover:bg-gray-700 px-2 py-1 rounded cursor-pointer ${filter === "priority" && "bg-gray-900"
                                    }`}
                                onClick={handlefilter}
                            >
                                <FaArrowUpRightDots size={16} className="text-cyan-400 mr-3" />
                                Priority
                            </button>
                        </li>
                    </ul>
                </div>

                <button
                    onClick={() => {
                        clearFilter();
                        setOpen(false);
                    }}
                    className="flex justify-center w-full p-2 text-red-500 hover:text-red-400 text-sm"
                >
                    <MdFilterAltOff size={20} />
                    <span className="ml-1">Clear Filter</span>
                </button>
            </div>
        </div>
    );
}

export default Filter;
