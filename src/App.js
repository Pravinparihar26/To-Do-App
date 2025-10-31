import React, { useState, useEffect, useMemo } from 'react';
import Header from './Components/Header';
import TodoControls from './Components/TodoControls'
import CompletedPercent from './Components/CompletedPercent';
import DisplayTodo from './Components/DisplayTodo';


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
  const [nightMode, setnightMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (nightMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [nightMode]);

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

  const clearFilter = () => setFilter('');

  const complete = todos.filter((t) => t.done).length;
  const total = todos.length;
  const percentage = total > 0 ? Math.round((complete / total) * 100) : 0;


  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 min-h-screen flex flex-col items-center text-white">
      <Header />
      <TodoControls
        nightMode={nightMode}
        setnightMode={setnightMode}
        todo={todo}
        settodo={settodo}
        priority={priority}
        setPriority={setPriority}
        duedate={duedate}
        setduedate={setduedate}
        addtodo={addtodo}
        filter={filter}
        handlefilter={handlefilter}
        clearFilter={clearFilter}
        searchvalue={searchvalue}
        setsearchvalue={setsearchvalue}
      />
      <CompletedPercent nightMode={nightMode} percentage={percentage} />
      <DisplayTodo
        todos={todos}
        searchvalue={searchvalue}
        displayTodos={displayTodos}
        update={update}
        updateindex={updateindex}
        updatevalue={updatevalue}
        setupdatevalue={setupdatevalue}
        updatedate={updatedate}
        setupdatedate={setupdatedate}
        saveupdate={saveupdate}
        updatetodo={updatetodo}
        deletetodo={deletetodo}
        completed={completed}
        clearall={clearall}
      />
    </div>
  );

}

export default App;
