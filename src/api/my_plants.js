import { get } from './fetch';

export const getMyPlants = () => {
  return get('/my_plants_api');
};

export const getPlant = (plant_id) => {
  return get('/plants/' + plant_id + ".json");
};

export const getPlantInstance = (plant_instance_id) => {
  return get('/plant_instances/' + plant_instance_id + ".json");
};

  