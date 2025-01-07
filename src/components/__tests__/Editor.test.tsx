import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Editor from '../Editor';
import { Note } from '../../types/note';

describe('Editor component', () => {
  const mockNote: Note = {
    id: '1',
    title: 'Test Note',
    content: 'Test Content',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockOnUpdateNote = jest.fn();

  it('renders empty state when no note is selected', () => {
    render(<Editor note={null} onUpdateNote={mockOnUpdateNote} />);
    expect(screen.getByText('Select a note, or create a new one')).toBeInTheDocument();
  });

  it('renders note content when note is provided', () => {
    render(<Editor note={mockNote} onUpdateNote={mockOnUpdateNote} />);
    expect(screen.getByDisplayValue('Test Note')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument();
  });

  it('calls onUpdateNote when editing', async () => {
    const user = userEvent.setup();
    render(<Editor note={mockNote} onUpdateNote={mockOnUpdateNote} />);
    
    const titleInput = screen.getByDisplayValue('Test Note');
    await user.type(titleInput, ' Updated');
    
    expect(mockOnUpdateNote).toHaveBeenCalledWith({
      ...mockNote,
      title: 'Test Note Updated'
    });
  });
});