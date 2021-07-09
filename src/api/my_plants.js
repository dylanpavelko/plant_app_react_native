import { get } from './fetch';

export const getMyPlants = () => {
  return get('/my_plants_api');
};