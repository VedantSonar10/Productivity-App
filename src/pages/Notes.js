import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') return;
    
    if (editingId) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingId ? { ...note, title, content, updatedAt: new Date().toISOString() } : note
      ));
      setEditingId(null);
    } else {
      // Add new note
      const note = {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes([...notes, note]);
    }
    
    setTitle('');
    setContent('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Notes</h1>
      
      <form onSubmit={addNote} className="mb-6 card">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="input"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-medium">
            Content
          </label>
          <textarea
            id="content"
            className="input min-h-[100px]"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-2">
          {editingId && (
            <button 
              type="button" 
              onClick={cancelEdit}
              className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary flex items-center">
            {editingId ? 'Update Note' : (
              <>
                <PlusIcon className="h-5 w-5 mr-1" />
                Add Note
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4 col-span-full">
            No notes yet. Create one above!
          </p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="card">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => editNote(note)}
                    className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => deleteNote(note.id)}
                    className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                {note.content}
              </p>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {note.updatedAt !== note.createdAt ? (
                  <p>Updated: {formatDate(note.updatedAt)}</p>
                ) : (
                  <p>Created: {formatDate(note.createdAt)}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;