import React from 'react';
import { CloudOff } from 'lucide-react';
import { showToast } from '../utils/toast';

export function AsyncErrorTrigger() {
  const triggerAsyncError = async () => {
    showToast('Triggering async error...');
    try {
      const response = await fetch('https://non-existent-api.example.com/data');
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      throw new Error('Failed to fetch data: Network request failed');
    }
  };

  return (
    <button
      onClick={() => triggerAsyncError()}
      className="fixed bottom-4 left-40 bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-lg"
      aria-label="Trigger async error"
    >
      <CloudOff size={18} />
      <span>Trigger API Error</span>
    </button>
  );
}