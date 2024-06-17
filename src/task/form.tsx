import React, { useState } from 'react';

interface TaskFormProps {
  onTaskCreate: (name: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreate }) => {
  const [newTaskName, setNewTaskName] = useState('');

  const handleNewTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  };

  const handleNewTaskSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onTaskCreate(newTaskName);
  };

  return (
    <div>
      <form onSubmit={handleNewTaskSubmit}>
        <input type="text" value={newTaskName} onChange={handleNewTaskNameChange} />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};
