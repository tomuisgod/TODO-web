
import React, { useState, useEffect } from 'react';
import { ViewState, Task, TaskStatus, Label, User } from './types';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

const USERS_STORAGE_KEY = 'mytodo_users_v2';
const CURRENT_USER_ID_KEY = 'mytodo_current_user_id';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('auth');
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Load users on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (e) {
        console.error("Failed to parse users", e);
      }
    }

    const savedId = localStorage.getItem(CURRENT_USER_ID_KEY);
    if (savedId) {
      setCurrentUserId(savedId);
      setView('dashboard');
    }
  }, []);

  // Save users whenever they change
  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const currentUser = users.find(u => u.id === currentUserId);

  const handleLogin = (username: string, passcode: string) => {
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.passcode === passcode);
    if (user) {
      setCurrentUserId(user.id);
      localStorage.setItem(CURRENT_USER_ID_KEY, user.id);
      setView('dashboard');
      return true;
    }
    return false;
  };

  const handleRegister = (username: string, passcode: string) => {
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return false; // User exists
    }
    const newUser: User = {
      id: Date.now().toString(),
      username,
      passcode,
      boardData: {
        tasks: [],
        labels: [
          { id: 'l1', name: 'Design', color: 'bg-pink-100 text-pink-700' },
          { id: 'l2', name: 'Feature', color: 'bg-indigo-100 text-indigo-700' },
          { id: 'l3', name: 'Bug', color: 'bg-rose-100 text-rose-700' }
        ]
      }
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUserId(newUser.id);
    localStorage.setItem(CURRENT_USER_ID_KEY, newUser.id);
    setView('dashboard');
    return true;
  };

  const handleLogout = () => {
    setCurrentUserId(null);
    localStorage.removeItem(CURRENT_USER_ID_KEY);
    setView('auth');
  };

  // Update logic to modify specific user's board
  const updateCurrentUserBoard = (updater: (prev: User) => User) => {
    if (!currentUserId) return;
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUserId ? updater(u) : u));
  };

  const addTask = (task: Task) => {
    updateCurrentUserBoard(user => ({
      ...user,
      boardData: { ...user.boardData, tasks: [...user.boardData.tasks, task] }
    }));
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    updateCurrentUserBoard(user => ({
      ...user,
      boardData: {
        ...user.boardData,
        tasks: user.boardData.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
      }
    }));
  };

  const deleteTask = (taskId: string) => {
    updateCurrentUserBoard(user => ({
      ...user,
      boardData: {
        ...user.boardData,
        tasks: user.boardData.tasks.filter(t => t.id !== taskId)
      }
    }));
  };

  const addLabel = (label: Label) => {
    updateCurrentUserBoard(user => ({
      ...user,
      boardData: { ...user.boardData, labels: [...user.boardData.labels, label] }
    }));
  };

  const deleteLabel = (labelId: string) => {
    updateCurrentUserBoard(user => ({
      ...user,
      boardData: {
        ...user.boardData,
        labels: user.boardData.labels.filter(l => l.id !== labelId),
        tasks: user.boardData.tasks.map(t => ({
          ...t,
          labels: t.labels.filter(id => id !== labelId)
        }))
      }
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {view === 'auth' || !currentUser ? (
        <AuthPage onLogin={handleLogin} onRegister={handleRegister} />
      ) : (
        <Dashboard 
          username={currentUser.username}
          boardData={currentUser.boardData} 
          onLogout={handleLogout} 
          onAddTask={addTask}
          onUpdateStatus={updateTaskStatus}
          onDeleteTask={deleteTask}
          onAddLabel={addLabel}
          onDeleteLabel={deleteLabel}
        />
      )}
    </div>
  );
};

export default App;
