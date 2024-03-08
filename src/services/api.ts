import axios from 'axios';
import { Fruit } from '../types/types';
import { BASE_URL } from '../constants/constants';

export const getFruits = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/fruits`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching fruits:', error);
    return [];
  }
};

export const createFruit = async (fruitData: Fruit) => {
  try {
    const response = await axios.post(`${BASE_URL}/fruits`, fruitData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating fruit:', error);
    return null;
  }
};

export const deleteFruit = async (fruitId: string) => {
  try {
    await axios.delete(`${BASE_URL}/fruits/${fruitId}`);
    console.log('Fruit deleted successfully');
  } catch (error) {
    console.error('Error deleting fruit:', error);
  }
};
