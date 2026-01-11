
import React, { useState } from 'react';
import { Label } from '../types';
import { Icons } from '../constants';

interface LabelModalProps {
  labels: Label[];
  onClose: () => void;
  onAdd: (label: Label) => void;
  onDelete: (id: string) => void;
}

const COLOR_OPTIONS = [
  { bg: 'bg-pink-100', text: 'text-pink-700' },
  { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
  { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-violet-100', text: 'text-violet-700' },
  { bg: 'bg-slate-200', text: 'text-slate-700' },
];

const LabelModal: React.FC<LabelModalProps> = ({ labels, onClose, onAdd, onDelete }) => {
  const [newName, setNewName] = useState('');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    
    const color = COLOR_OPTIONS[selectedColorIdx];
    onAdd({
      id: 'l' + Date.now(),
      name: newName.trim(),
      color: `${color.bg} ${color.text}`
    });
    setNewName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Manage Labels</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleAdd} className="mb-8 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Create New Label</h3>
            <div className="flex gap-2">
              <input 
                autoFocus
                placeholder="Label name..."
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button 
                type="submit"
                disabled={!newName.trim()}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {COLOR_OPTIONS.map((color, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${color.bg} ${
                    selectedColorIdx === idx ? 'border-indigo-600 scale-110 shadow-md' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </form>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Existing Labels</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {labels.map(label => (
                <div key={label.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl group">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${label.color}`}>
                    {label.name}
                  </span>
                  <button 
                    onClick={() => onDelete(label.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Icons.Trash />
                  </button>
                </div>
              ))}
              {labels.length === 0 && (
                <p className="text-center py-4 text-sm text-slate-400">No labels yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabelModal;
