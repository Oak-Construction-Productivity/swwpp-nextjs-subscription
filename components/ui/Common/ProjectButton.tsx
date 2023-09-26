// components/ProjectButton.tsx
import { useNavigation } from 'next/navigation';
import PropTypes from 'prop-types';
import React, { FC } from 'react';

interface ProjectButtonProps {
  redirectTo: string;
  color?: string;
  size?: string;
}

const ProjectButton: FC<ProjectButtonProps> = ({ redirectTo, color, size }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate(redirectTo);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: color || 'orange',
        width: size || '100px',
        height: size || '100px',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
      }}
    >
      <div style={{ fontSize: '30px' }}>+</div>
      <div>Add Project</div>
    </button>
  );
};

export default ProjectButton;
