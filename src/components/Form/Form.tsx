import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SelectOption } from '../../types/types';
import Select from '../UI/Select';
import { ReactComponent as ImageIcon } from '../../assets/icons/image_icon.svg';
import { createFruit } from '../../services/api';
import { VscChromeClose } from 'react-icons/vsc';
import classes from './Form.module.css';

type FormData = {
  image_url: string;
  price: number;
  description: string;
  name: string;
};

const tabOptions: SelectOption[] = [
  { label: 'Hot', value: 'hot' },
  { label: 'New', value: 'new' },
  { label: 'Recommend', value: 'recommend' },
];

const countryOptions: SelectOption[] = [
  { label: '🇬🇧 England', value: '🇬🇧 england' },
  { label: '🇯🇵 Japan', value: '🇯🇵 japan' },
  { label: '🇺🇸 America', value: '🇺🇸 america' },
];

type FormProps = {
  closeModal: () => void;
};

const Form: React.FC<FormProps> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [tabValue, setTabValue] = useState<string>(tabOptions[0].label);
  const [countryValue, setCountryValue] = useState<string>(
    countryOptions[0].label
  );
  const [base64String, setBase64String] = useState<string>('');
  const [error, setError] = useState<string>('');
  const onSubmit = (data: FormData) => {
    if (!data.description || !data.name || !data.price || !base64String) {
      setError('Check your inputs, something is missing.');
      return null;
    }
    const allData = {
      ...data,
      price:
        typeof data.price == 'number' ? data.price : parseFloat(data.price),
      status: tabValue,
      country: countryValue,
      image: base64String ? base64String : data.image_url,
    };
    createFruit(allData);
    closeModal();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          setBase64String(e.target.result as string);
        } else {
          setBase64String('');
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.Wrapper}>
      <button onClick={closeModal} className={classes.X}>
        <VscChromeClose color="#fff" size={20} />
      </button>
      <p className={classes.FormTitle}>Add Fruit</p>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
        <div className={classes.InputHolder}>
          <label className={classes.Label}>Name:</label>
          <input
            className={classes.TextInput}
            type="text"
            placeholder="Name of product"
            {...register('name')}
          />
        </div>
        <div className={classes.SelectHolder}>
          <label className={classes.Label}>Tab:</label>
          <Select
            options={tabOptions}
            setValue={setTabValue}
            value={tabValue}
          />
        </div>
        <div className={classes.SelectHolder}>
          <label className={classes.Label}>Country:</label>
          <Select
            options={countryOptions}
            setValue={setCountryValue}
            value={countryValue}
          />
        </div>

        <div className={classes.InputHolder}>
          <label className={classes.Label}>Price</label>
          <input
            {...register('price')}
            className={classes.TextInput}
            type="text"
            placeholder="Enter price value"
          />
        </div>
        <div className={classes.UpdateHolder}>
          <label className={classes.Label}>Icon:</label>
          <div className={classes.UpdateButtonHolder}>
            <button>upload icon</button>
            <input
              type="file"
              placeholder="upload icon"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className={classes.SelectHolder}>
          {base64String ? (
            <div className={classes.ImagePreview}>
              <img src={base64String} alt="Converted" />
            </div>
          ) : (
            <div className={classes.IconPreview}>
              <ImageIcon />
              icon preview
            </div>
          )}
        </div>
        <div className={classes.InputHolder}>
          <label className={classes.Label}>Icon URL:</label>
          <input
            className={classes.TextInput}
            type="text"
            placeholder="If you don`t have local picture, please input icon URL."
            {...register('image_url')}
          />
        </div>
        <div className={classes.InputHolder}>
          <label className={classes.Label}>Description</label>
          <textarea
            className={classes.TextArea}
            placeholder="Description"
            {...register('description')}
          />
        </div>
        <div className={classes.ButtonsHolder}>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
        {error && <h3 style={{ color: 'white' }}>{error}</h3>}
      </form>
    </div>
  );
};

export default Form;
