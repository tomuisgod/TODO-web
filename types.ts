
export type TaskStatus = 'todo' | 'working' | 'review' | 'finished';

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  labels: string[]; // IDs of labels
  createdAt: number;
  priority: 'low' | 'medium' | 'high';
}

export interface BoardState {
  tasks: Task[];
  labels: Label[];
}

export interface User {
  id: string;
  username: string;
  passcode: string;
  boardData: BoardState;
}

export type ViewState = 'auth' | 'dashboard';
