import React from 'react';
import { Note } from '../types/note';

interface EditorProps {
  note: Note | null;
  onUpdateNote: (note: Note) => void;
}

const Editor: React.FC<EditorProps> = ({ note, onUpdateNote }) => {
  if (!note) {
    return <div>Select a note, or create a new one</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={note.title}
        onChange={(e) => onUpdateNote({ ...note, title: e.target.value })}
      />
      <textarea
        value={note.content}
        onChange={(e) => onUpdateNote({ ...note, content: e.target.value })}
      />
    </div>
  );
};

export default Editor;