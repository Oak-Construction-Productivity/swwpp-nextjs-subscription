// components/ProjectButton.tsx
import Link from 'next/link';
//import PropTypes from 'prop-types';
import React, { FC } from 'react';

interface ProjectButtonProps {
  redirectTo: string;
  color?: string;
  size?: string;
  click?: boolean;
  className?: string;
  buttonDescription: string; // Add className prop
}

const ProjectButton: FC<ProjectButtonProps> = ({
  redirectTo,
  color,
  size,
  click,
  className,
  buttonDescription
}) => {
  // Define a default gradient class if color is not provided
  const gradientClass =
    color || 'bg-gradient-to-r from-orange-500 via-red-600 to-pink-500';

  return (
    <>
      {click ? <Link href={redirectTo}>
      <div
          className={`${
            className ? className : '' // Allow custom classes
          } ${gradientClass} w-${size || '100'} h-${
            size || '100'
          } rounded-full flex flex-col justify-center items-center text-white text-center cursor-pointer text-lg font-bold`}
        >
          <div style={{ fontSize: '30px' }}>+</div>
          <div>Add Project</div>
        </div>
      </Link> :
      <>
        <div
        className={`${
          className ? className : '' // Allow custom classes
        } ${gradientClass} w-${size || '100'} h-${
          size || '100'
        } rounded-full flex flex-col justify-center items-center text-white text-center cursor-pointer text-lg font-bold`}
        >
          <div style={{ fontSize: '30px' }}>+</div>
          <div>{buttonDescription}</div>
        </div>
      </>}
    </>
  );
};

export default ProjectButton;
