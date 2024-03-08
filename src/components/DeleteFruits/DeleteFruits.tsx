import React, { useState } from 'react';
import { FruitProps } from '../../types/types';
import classes from './DeleteFruits.module.css';
import { VscChromeClose } from 'react-icons/vsc';
import Bubble from '../UI/Bubble';

type FormProps = {
  fruits: FruitProps[];
  closeModal: () => void;
  deleteFruit: (fruitId: string) => Promise<void>;
};

const DeleteFruits: React.FC<FormProps> = ({
  closeModal,
  fruits,
  deleteFruit,
}) => {
  const [toggleBubble, setToggleBubble] = useState<string>('');
  const closeBubble = () => {
    setToggleBubble('');
  };
  const handleDeleteFruit = () => {
    deleteFruit(toggleBubble);
  };
  return (
    <div className={classes.Wrapper}>
      <button onClick={closeModal}>
        <VscChromeClose color="#fff" size={20} />
      </button>
      <p className={classes.Title} style={{}}>
        Delete Fruit
      </p>
      <div className={classes.TableWrapper}>
        <table>
          <thead>
            <tr>
              <th>
                <p>Tab</p>
              </th>
              <th>
                <p>Country</p>
              </th>
              <th>
                <p>Fruit</p>
              </th>
              <th>
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {fruits?.map((fruit) => {
              return (
                <tr key={fruit.id}>
                  <th>
                    <p>{fruit.status ? fruit.status : 'All'}</p>
                  </th>
                  <th>
                    <p>{fruit.country.substring(5)}</p>
                  </th>
                  <th>
                    <p>{fruit.name}</p>
                  </th>
                  <th>
                    {fruit.id === toggleBubble && (
                      <Bubble
                        cancel={closeBubble}
                        ok={handleDeleteFruit}
                        label="Are you sure to delete this Fruit?"
                      />
                    )}
                    <p onClick={() => setToggleBubble(fruit.id)}>Delete</p>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteFruits;
