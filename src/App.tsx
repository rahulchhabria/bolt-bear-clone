import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { FeedbackTrigger } from './components/FeedbackTrigger';
import { ErrorTrigger } from './components/ErrorTrigger';
import { AsyncErrorTrigger } from './components/AsyncErrorTrigger';
import { useNotes } from './hooks/useNotes';
import { Note } from './types/note';

export function App() {
  const { notes, createNote, updateNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const handleNewNote = () => {
    const newNote = createNote();
    setSelectedNoteId(newNote.id);
  };

  const handleNoteSelect = (id: string) => {
    setSelectedNoteId(id);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    updateNote(updatedNote);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onNoteSelect={handleNoteSelect}
        onNewNote={handleNewNote}
      />
      <Editor
        note={selectedNote}
        onUpdateNote={handleUpdateNote}
      />
      <FeedbackTrigger />
      <ErrorTrigger />
      <AsyncErrorTrigger />
    </div>
  );
}

export default App;