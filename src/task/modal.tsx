import React, { useState } from 'react';

interface TaskModal {
  isOpen: boolean;
  onRepoSubmit: (repo: string) => void;
}

export const TaskModal: React.FC<TaskModal> = ({ isOpen, onRepoSubmit }) => {
  const [standard, setStandard] = useState('');

  const handleStandardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStandard(event.target.value);
  };

  const handleModalSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onRepoSubmit(standard);
    setStandard('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleModalSubmit}>
        <input type="text" value={standard} onChange={handleStandardChange} placeholder="Standard" />
        <button type="submit">Create Standard</button>
      </form>
    </div>
  );
};
