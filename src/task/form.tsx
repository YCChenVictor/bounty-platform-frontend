import React, { useState } from 'react';
import { TaskModal } from './modal';

interface TaskFormProps {
  onTaskCreate: (name: string, repo: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreate }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  };

  const handleNewTaskSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleRepoSubmit = (repo: string) => {
    onTaskCreate(newTaskName, repo);
    setNewTaskName('');
    setIsModalOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleNewTaskSubmit}>
        <input type="text" value={newTaskName} onChange={handleNewTaskNameChange} />
        <button type="submit">Create Task</button>
      </form>
      <TaskModal isOpen={isModalOpen} onRepoSubmit={handleRepoSubmit} />
    </div>
  );
};
