import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Note } from '../types/note';

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onNewNote: () => void;
}

export function Sidebar({ notes, selectedNoteId, onNoteSelect, onNewNote }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-gray-800">Notes</h1>
          <button
            onClick={onNewNote}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors"
            aria-label="New note"
          >
            <Plus size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => onNoteSelect(note.id)}
            className={`p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-100 transition-colors ${
              selectedNoteId === note.id ? 'bg-orange-50' : ''
            }`}
          >
            <h3 className="font-medium text-gray-800 mb-1 truncate">
              {note.title || 'Untitled Note'}
            </h3>
            <p className="text-sm text-gray-500 truncate">{note.content || 'No content'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}