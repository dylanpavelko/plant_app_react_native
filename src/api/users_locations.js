import { get } from './fetch';

export const getUsersLocations = () => {
  return get('/get_locations_for_user');
};
