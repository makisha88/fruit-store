import React from 'react';
import { FruitProps } from '../../types/types';
import classes from './UI.module.css';

type ItemProps = {
  item: FruitProps;
};
const ListItem: React.FC<ItemProps> = ({ item }) => {
  return (
    <div className={classes.ListItem}>
      <div className={classes.ListItemImage}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={classes.ListItemContent}>
        <p className={classes.ListItemName}>{item.name}</p>
        <p className={classes.ListItemDescription}>{item.description}</p>
        <p className={classes.ListItemPrice}>$ {item.price}</p>
      </div>
    </div>
  );
};

export default ListItem;
