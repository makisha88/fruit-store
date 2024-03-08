import React from 'react';
import classes from './UI.module.css';

type ButtonProps = {
  label: string;
  onClick: (value?: string | undefined) => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className={classes.ButtonStyle} onClick={() => onClick()}>
      {label}
    </button>
  );
};

export default Button;
