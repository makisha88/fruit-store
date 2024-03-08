import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import FruitForm from '../Form/Form';
import DeleteFruits from '../DeleteFruits/DeleteFruits';
import Button from '../UI/Button';
import TabView from '../TabView/TabView';
import { getFruits, deleteFruit } from '../../services/api';
import { FruitProps } from '../../types/types';
import classes from './MainIndex.module.css';

const tabs: string[] = ['Hot', 'New', 'Recommend', 'All'];

const MainIndex: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [fruits, setFruits] = useState<FruitProps[]>([]);
  const [showTabs, setShowTabs] = useState<boolean>(false);

  const openModal = (value: string) => {
    setContent(value);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchFruits = async () => {
    const fruitsData = await getFruits();
    setFruits(fruitsData);
  };

  const deleteOneFruit = async (fruitId: string) => {
    await deleteFruit(fruitId);
    fetchFruits();
  };
  useEffect(() => {
    if (!modalIsOpen) {
      fetchFruits();
    }
  }, [modalIsOpen]);

  const ModalContent =
    content == 'Add' ? (
      <FruitForm closeModal={closeModal} />
    ) : content == 'Delete' ? (
      <DeleteFruits
        closeModal={closeModal}
        fruits={fruits}
        deleteFruit={deleteOneFruit}
      />
    ) : (
      <span />
    );

  return (
    <div
      className={classes.Wrapper}
      style={{
        overflow: modalIsOpen && content == 'Add' ? 'hidden' : 'unset',
        height: modalIsOpen && content == 'Add' ? '100vh' : 'auto',
      }}
    >
      <div className={classes.Header}>
        <h1>Fruit Store</h1>
        <div className={classes.ButtonsWrapper}>
          <Button label="Load" onClick={() => setShowTabs(true)} />
          <Button label="Add" onClick={() => openModal('Add')} />
          <Button label="Delete" onClick={() => openModal('Delete')} />
        </div>
      </div>
      {showTabs && (
        <div className={classes.TabsWrapper}>
          <h3>Fruit list</h3>
          <TabView tabs={tabs} data={fruits} />
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Fruit Modal"
        content={content}
      >
        {ModalContent}
      </Modal>
    </div>
  );
};

export default MainIndex;
