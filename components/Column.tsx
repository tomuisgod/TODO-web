
import React, { useState } from 'react';
import { Task, TaskStatus, Label } from '../types';
import { STATUS_CONFIG } from '../constants';
import TaskCard from './TaskCard';

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  allLabels: Label[];
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ status, tasks, allLabels, onUpdateStatus, onDeleteTask }) => {
  const [isOver, setIsOver] = useState(false);
  const config = STATUS_CONFIG[status];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow drop
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onUpdateStatus(taskId, status);
    }
  };

  return (
    <div 
      className={`flex flex-col w-80 h-full rounded-2xl transition-colors duration-200 ${isOver ? 'bg-indigo-50/50 ring-2 ring-indigo-200 ring-inset' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4 px-2 pt-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${config.bg.replace('bg-', 'bg-').replace('50', '500')}`}></span>
          <h2 className="font-semibold text-slate-700 uppercase tracking-wider text-xs">{config.label}</h2>
          <span className="ml-2 px-2 py-0.5 text-xs font-bold text-slate-400 bg-slate-200 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 pb-4">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            allLabels={allLabels}
            onUpdateStatus={onUpdateStatus}
            onDeleteTask={onDeleteTask}
          />
        ))}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-slate-200 rounded-xl m-2">
            <p className="text-sm text-slate-400 font-medium">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
