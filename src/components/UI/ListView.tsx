import React from 'react';
import { FruitProps } from '../../types/types';
import ListItem from './Listitem';
import classes from './UI.module.css';

type ListViewProps = {
  items: FruitProps[];
};

const ListView: React.FC<ListViewProps> = ({ items }) => {
  const sortedFruits = items.sort((a, b) => a.country.localeCompare(b.country));
  return (
    <div className={classes.ListView}>
      {sortedFruits.map((item) => {
        return (
          <>
            {sortedFruits.find((country) => item.country === country.country)
              ?.id === item.id && (
              <p className={classes.ListViewCountry}>{item.country}</p>
            )}
            <ListItem key={item.id} item={item} />
          </>
        );
      })}
    </div>
  );
};

export default ListView;
