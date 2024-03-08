import React from 'react';
import classes from './UI.module.css';
import { ReactComponent as WarningIcon } from '../../assets/icons/warning.svg';
import Button from './Button';

type BubbleProps = {
  ok?: () => void;
  cancel?: () => void;
  label: string;
};
const Bubble: React.FC<BubbleProps> = ({ ok, cancel, label }) => {
  return (
    <div className={classes.BubbleWrapper}>
      <div className={classes.BubbleLabel}>
        <WarningIcon />
        <p>{label}</p>
      </div>
      <div className={classes.BubbleButtons}>
        {cancel && <button onClick={() => cancel()}>Cancel</button>}
        {ok && <button onClick={() => ok()}>OK</button>}
      </div>
      <div className={classes.BubblePin} />
    </div>
  );
};

export default Bubble;
