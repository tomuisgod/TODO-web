
import React from 'react';
import { Task, TaskStatus, Label } from '../types';
import { STATUS_CONFIG, Icons } from '../constants';

interface TaskCardProps {
  task: Task;
  allLabels: Label[];
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, allLabels, onUpdateStatus, onDeleteTask }) => {
  const taskLabels = allLabels.filter(l => task.labels.includes(l.id));

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
    // Visual feedback handled by browser, but we can style the dragging element if needed
  };

  const priorityColor = {
    low: 'text-blue-500',
    medium: 'text-amber-500',
    high: 'text-rose-500'
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      className="group relative p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] active:rotate-1 cursor-grab active:cursor-grabbing hover:border-indigo-200"
    >
      <div className="flex flex-wrap gap-1.5 mb-3">
        {taskLabels.map(label => (
          <span 
            key={label.id} 
            className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md tracking-wider ${label.color}`}
          >
            {label.name}
          </span>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-1">{task.title}</h3>
      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className={`text-[10px] font-bold uppercase tracking-widest ${priorityColor[task.priority]}`}>
          {task.priority} Priority
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onDeleteTask(task.id)}
            className="p-1 text-slate-400 hover:text-rose-600 transition-all"
            title="Delete task"
          >
            <Icons.Trash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
