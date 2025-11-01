import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function PrioritySelect({priority, setPriority}) {
    const [open, setOpen] = useState(false);

    const options = [
        { value: "High", color: "bg-red-500 text-black" },
        { value: "Medium", color: "bg-yellow-300 text-black" },
        { value: "Low", color: "bg-green-400 text-black" },
    ];

    return (
        <div className="relative mx-2">
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center justify-between w-full p-2 rounded-lg text-gray-600 ${options.find((o) => o.value === priority)?.color || ""
                    }`}
            >
                <span>{priority}</span>
                <FaChevronDown className="w-4 h-4 ml-2" />
            </button>

            {/* Dropdown menu */}
            {open && (
                <div className="absolute mt-2 w-full bg-white rounded-lg overflow-hidden">
                    <div className="px-3 py-2 text-sm font-semibold text-center text-gray-600 bg-gray-200 border-b border-gray-200 cursor-default select-none">
                        Select Priority
                    </div>
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                setPriority(opt.value);
                                setOpen(false);
                            }}
                            className={`cursor-pointer px-3 py-2 hover:opacity-80 ${opt.color}`}
                        >
                            {opt.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
