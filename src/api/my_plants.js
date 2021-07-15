import { get } from './fetch';

export const getMyPlants = () => {
  return get('/my_plants_api');
};

export const getPlant = (plant_id) => {
  return get('/plants/' + plant_id + ".json");
};

  