import React from 'react';
import { Note } from '../types/note';

interface EditorProps {
  note: Note | null;
  onUpdateNote: (note: Note) => void;
}

export function Editor({ note, onUpdateNote }: EditorProps) {
  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white text-gray-400">
        <p>Select a note or create a new one</p>
      </div>
    );
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({
      ...note,
      title: e.target.value,
      updatedAt: new Date(),
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNote({
      ...note,
      content: e.target.value,
      updatedAt: new Date(),
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <input
        type="text"
        value={note.title}
        onChange={handleTitleChange}
        placeholder="Note title"
        className="px-8 py-6 text-3xl font-medium focus:outline-none"
      />
      <textarea
        value={note.content}
        onChange={handleContentChange}
        placeholder="Start writing..."
        className="flex-1 px-8 py-4 text-lg text-gray-800 resize-none focus:outline-none"
      />
    </div>
  );
}