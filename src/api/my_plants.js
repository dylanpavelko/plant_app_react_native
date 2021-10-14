import { get, post } from './fetch';

export const getMyPlants = () => {
  return get('/my_plants_api');
};

export const getPlant = (plant_id) => {
  return get('/plants/' + plant_id + ".json");
};

export const getPlantInstance = (plant_instance_id) => {
  return get('/plant_instances/' + plant_instance_id + ".json");
};

export const add_plant_instance = (plant_id, planted_date, propagation_type, location_id, new_location_name, new_location_indoors, new_location_high_level_location) => {
  return post('/add_plant_instance', {
      plant_id, planted_date, propagation_type, location_id, new_location_name, new_location_indoors, new_location_high_level_location
    });
};


// export const add_observation = (plant_instance_id, observation_date, bbch_stage_id, picture, fileName) => {
//   if(picture != ''){
//     let uriParts = picture.uri.split('.');
//     let fileType = 'image/' + uriParts[uriParts.length - 1];
//     let uriParts2 = picture.uri.split('/');
//     //let fileName = 'photo.'+uriParts2[uriParts2.length - 1];
//     let image = {uri: picture, name: fileName, type: fileType};
//     let image_data = picture;
//     console.log('image data');
//     console.log(picture.data);
//     return post('/add_growth_observation_from_api', {
//       plant_instance_id, observation_date, bbch_stage_id, picture: {picture, name: fileName, type: fileType},
//     });
//   }else{
//     return post('/add_growth_observation_from_api', {
//       plant_instance_id, observation_date, bbch_stage_id,
//     });
//   }
// };
//   