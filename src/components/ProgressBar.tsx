import React from 'react';

interface ProgressBarProps {
  percentage: number;
  status?: 'danger' | 'warning' | 'success';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, status = 'success' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'danger':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      case 'success':
        return 'bg-emerald-500';
      default:
        return 'bg-purple-600';
    }
  };

  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="progress-bar">
      <div 
        className={`progress-fill ${getStatusColor()}`} 
        style={{ width: `${safePercentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;