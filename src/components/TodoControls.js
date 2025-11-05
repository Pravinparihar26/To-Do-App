import { useEffect, useRef, useState } from "react";
import DarkMode from "./DarkMode";
import AddTodo from "./AddTodo";
import Filter from "./Filter";
import Search from "./Search";

function TodoControls({
    nightMode,
    setnightMode,
    todo,
    settodo,
    priority,
    setPriority,
    duedate,
    setduedate,
    addtodo,
    filter,
    handlefilter,
    clearFilter,
    searchvalue,
    setsearchvalue
}) {
    const [isAtTop, setIsAtTop] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!navRef.current) return;

            const { top } = navRef.current.getBoundingClientRect();

            if (top <= 0) {
                setIsAtTop(true);
            }
            else {
                setIsAtTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={navRef}
            className={`w-full grid grid-cols-3 items-center sticky top-0 z-10 transition-all duration-300 p-2 ${isAtTop && "bg-gray-200 dark:bg-zinc-800 shadow-md"
                }`}
        >
            <DarkMode nightMode={nightMode} setnightMode={setnightMode} />
            <AddTodo
                todo={todo}
                settodo={settodo}
                priority={priority}
                setPriority={setPriority}
                duedate={duedate}
                setduedate={setduedate}
                addtodo={addtodo}
            />
            <div className="flex justify-end items-center gap-2 mr-3">
                <Filter
                    filter={filter}
                    handlefilter={handlefilter}
                    clearFilter={clearFilter}
                />
                <Search searchvalue={searchvalue} setsearchvalue={setsearchvalue} />
            </div>
        </div>
    );
}

export default TodoControls;
