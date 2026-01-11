
import React, { useState } from 'react';
import { BoardState, Task, TaskStatus, Label } from '../types';
import Column from './Column';
import TaskModal from './TaskModal';
import LabelModal from './LabelModal';
import { Icons } from '../constants';

interface DashboardProps {
  username: string;
  boardData: BoardState;
  onLogout: () => void;
  onAddTask: (task: Task) => void;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  onAddLabel: (label: Label) => void;
  onDeleteLabel: (labelId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  username,
  boardData, 
  onLogout, 
  onAddTask, 
  onUpdateStatus, 
  onDeleteTask,
  onAddLabel,
  onDeleteLabel
}) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);

  const columns: TaskStatus[] = ['todo', 'working', 'review', 'finished'];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold">M</div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-none">My TODO</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{username}'s Workspace</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsLabelModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Manage Labels
          </button>
          
          <button 
            onClick={() => setIsTaskModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Icons.Plus /> New Task
          </button>
          
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          
          <button 
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Board area */}
      <main className="flex-1 overflow-x-auto board-scroll bg-slate-50 p-6">
        <div className="flex h-full gap-6 min-w-max">
          {columns.map(status => (
            <Column 
              key={status} 
              status={status} 
              tasks={boardData.tasks.filter(t => t.status === status)}
              allLabels={boardData.labels}
              onUpdateStatus={onUpdateStatus}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      </main>

      {isTaskModalOpen && (
        <TaskModal 
          labels={boardData.labels}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={onAddTask}
        />
      )}

      {isLabelModalOpen && (
        <LabelModal 
          labels={boardData.labels}
          onClose={() => setIsLabelModalOpen(false)}
          onAdd={onAddLabel}
          onDelete={onDeleteLabel}
        />
      )}
    </div>
  );
};

export default Dashboard;
