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
    
    return (
        <div className='w-full grid grid-cols-3 items-center'>
            {/* dark and light mode */}
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

            <div className='flex justify-end items-center gap-2 mr-3'>
                <Filter
                    filter={filter}
                    handlefilter={handlefilter}
                    clearFilter={clearFilter}
                />
                <Search searchvalue={searchvalue} setsearchvalue={setsearchvalue} />
            </div>
        </div>
    )
}

export default TodoControls;