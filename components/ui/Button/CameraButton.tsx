// components/CameraButton.tsx

import React from 'react';
import { FaCamera } from 'react-icons/fa';

interface CameraButtonProps {
  onClick: () => void;
}

const CameraButton: React.FC<CameraButtonProps> = ({ onClick }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4caf50', // Green color
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle: React.CSSProperties = {
    marginRight: '8px',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      <FaCamera style={iconStyle} />
      Capture Photo
    </button>
  );
};

export default CameraButton;