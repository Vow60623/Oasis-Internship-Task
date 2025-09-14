import React, { useState } from "react";
import './App.css'


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add a Task
  const addTask = () =>{
    if(newTask.trim() === "") return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      createdAt: new Date().toLocaleString(),
      completedAt: null,
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  //Toggle complete
  const toggleComplete = (id) =>{
    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task,
          completed: !task.completed,
          completedAt: task.completed ? null : new Date().toLocaleString(),
        }
        : task
      )
    );
  };

  //Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Edit a task
  const StartEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  //Save edited task
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, text: editText} :task
      )
    );
    setEditId(null);
    setEditText("");
  };

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return(
    <div className='max-w-2xl mx-auto p-6 bg-purple-400 rounded-xl '>
      <h1 className='text- 3xl font-bold mb-6 text-center'>To-Do App</h1>

    {/* Add Task */}
    <div className='flex gap-2 mb-6'>
      <input type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Enter a new task..'
        className='border rounded p-2 flex-1'
      />
      <button onClick={addTask} 
       className='bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded'>Add</button>
    </div>

    {/* Pending Task */}
     <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">⏳ Pending Tasks</h2>
        {pendingTasks.length === 0 && (
          <p className="text-black">No pending tasks 🎉</p>
        )}
        <ul className="space-y-2">
          {pendingTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border p-3 rounded"
            >
              {editId === task.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border p-2 rounded flex-1"
                  />
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p>{task.text}</p>
                    <small className="text-black">
                      Added: {task.createdAt}
                    </small>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      ✔ Done
                    </button>
                    <button
                      onClick={() => startEdit(task)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      ❌ Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Completed Tasks */}
      <div>
        <h2 className="text-xl font-semibold mb-3">✅ Completed Tasks</h2>
        {completedTasks.length === 0 && (
          <p className="text-black">No completed tasks yet</p>
        )}
        <ul className="space-y-2">
          {completedTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border p-3 rounded "
            >
              <div>
                <p className="line-through">{task.text}</p>
                <small className="text-black">
                  Completed: {task.completedAt}
                </small>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  ↩ Undo
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  ❌ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    
    
    
  

  )

}

export default App
