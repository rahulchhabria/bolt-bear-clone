import React from 'react';
import { createRoot } from 'react-dom/client';
import { X } from 'lucide-react';

export function showToast(message: string) {
  const toast = document.createElement('div');
  document.body.appendChild(toast);

  const root = createRoot(toast);

  root.render(
    <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 animate-fade-in z-50">
      <span>{message}</span>
      <button
        onClick={() => {
          document.body.removeChild(toast);
        }}
        className="p-1 hover:bg-gray-700 rounded-full"
      >
        <X size={16} />
      </button>
    </div>
  );

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 3000);
}