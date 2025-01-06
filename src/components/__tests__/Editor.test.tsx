import { render, screen, fireEvent } from '@testing-library/react';
import { Editor } from '../Editor';
import { Note } from '../../types/note';

describe('Editor', () => {
  const mockNote: Note = {
    id: '1',
    title: 'Test Note',
    content: 'Test Content',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOnUpdateNote = vi.fn();

  it('renders empty state when no note is selected', () => {
    render(<Editor note={null} onUpdateNote={mockOnUpdateNote} />);
    expect(screen.getByText('Select a note or create a new one')).toBeInTheDocument();
  });

  it('renders note content when note is provided', () => {
    render(<Editor note={mockNote} onUpdateNote={mockOnUpdateNote} />);
    expect(screen.getByDisplayValue('Test Note')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument();
  });

  it('calls onUpdateNote when title is changed', () => {
    render(<Editor note={mockNote} onUpdateNote={mockOnUpdateNote} />);
    const titleInput = screen.getByDisplayValue('Test Note');
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    expect(mockOnUpdateNote).toHaveBeenCalled();
  });
});