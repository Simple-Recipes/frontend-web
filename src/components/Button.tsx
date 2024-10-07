import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'disabled';
  width?: string;
  padding?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant = 'default',
  width = 'auto',
  padding = '10px 20px',
  type = 'button',
  children,
}) => {
  let className = `cursor-pointer text-center flex justify-center items-center rounded-lg transition-all ease-linear duration-200 ${width} ${padding}`;

  switch (variant) {
    case 'primary':
      className += ' bg-blue-500 text-white hover:bg-blue-700';
      break;
    case 'secondary':
      className += ' bg-gray-500 text-white hover:bg-gray-700';
      break;
    case 'disabled':
      className += ' bg-gray-300 text-gray-500 cursor-not-allowed';
      break;
    default:
      className += ' bg-gray-100 text-gray-700 hover:bg-gray-200';
      break;
  }

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={variant === 'disabled'}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
