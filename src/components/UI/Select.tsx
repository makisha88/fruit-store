import React, { useState } from 'react';
import { SelectOption } from '../../types/types';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { LiaCheckSolid } from 'react-icons/lia';
import classes from './UI.module.css';

type SelectProps = {
  options: SelectOption[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Select: React.FC<SelectProps> = ({ options, value, setValue }) => {
  const [open, setopen] = useState<boolean>(false);
  return (
    <div className={classes.Select}>
      <div onClick={() => setopen(!open)} className={classes.SelectArrow}>
        {value}
        {open ? (
          <SlArrowUp size={14} color="white" />
        ) : (
          <SlArrowDown size={14} color="white" />
        )}
      </div>
      {open && (
        <div onClick={() => setopen(false)} className={classes.SelectOptions}>
          {options.map((option) => {
            return (
              <button
                onClick={() => setValue(option.label)}
                className={classes.SelectOption}
              >
                {option.label}
                {value === option.label && <LiaCheckSolid />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
