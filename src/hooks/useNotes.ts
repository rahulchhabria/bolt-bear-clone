import { useState, useEffect } from 'react';
import { Note } from '../types/note';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      return parsed.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    return newNote;
  };

  const updateNote = (updatedNote: Note) => {
    // This will throw an error when title length exceeds 50 characters
    if (updatedNote.title.length > 50) {
      throw new Error(`Note title cannot exceed 50 characters (current: ${updatedNote.title.length})`);
    }
    
    setNotes(notes.map((note) => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
  };
}