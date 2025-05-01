import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Tasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === '') return;
    
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: editText } : task
    ));
    
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      
      <form onSubmit={addTask} className="mb-6 flex">
        <input
          type="text"
          className="input flex-grow mr-2"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="btn btn-primary flex items-center">
          <PlusIcon className="h-5 w-5 mr-1" />
          Add
        </button>
      </form>
      
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No tasks yet. Add one above!
          </p>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className="card flex items-center justify-between"
            >
              {editingId === task.id ? (
                <div className="flex-grow flex">
                  <input
                    type="text"
                    className="input flex-grow mr-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                  />
                  <button 
                    onClick={() => saveEdit(task.id)}
                    className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={cancelEdit}
                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center flex-grow">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="h-5 w-5 mr-3 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className={`${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                      {task.text}
                    </span>
                  </div>
                  <div className="flex">
                    <button 
                      onClick={() => startEditing(task)}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      disabled={task.completed}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;