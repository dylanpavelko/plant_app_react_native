//import { API_URL } from '../../secrets';
import { getToken } from './token';
import config from './../../config';

const API_URL = config.PLANT_DB_URL_HOST

const getHeaders = async () => {
  const token = await getToken();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  console.log("headers with token " + token)
  if (token) {
    console.log('adding token ' + token)
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const post = async (destination, body) => {
  const headers = await getHeaders();
  //console.log("destination " + destination)
  console.log("body" + JSON.stringify(headers))
  const result = await fetch(`${API_URL}${destination}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (result.ok) {
    console.log("Result was ok");
    return await result.json();
  }
  throw { error: result.status };
};

export const get_with_params = async (destination, body) => {
  const headers = await getHeaders();
  console.log("destination - " + destination)
  //console.log("getting headers & token " + await getToken())
  const result = await fetch(`${API_URL}${destination}`, {
    method: 'GET',
    headers,
    body: JSON.stringify(body),
  });

  if (result.ok) {
    console.log("get result ok1")
    return await result.json();
  }

  throw { error: result.status };
};

export const get = async (destination) => {
  const headers = await getHeaders();
  console.log("destination - " + destination)
  //console.log("getting headers & token " + await getToken())
  const result = await fetch(`${API_URL}${destination}`, {
    method: 'GET',
    headers,
  });

  if (result.ok) {
    console.log("get result ok2")
    return await result.json();
  }

  throw { error: result.status };
};