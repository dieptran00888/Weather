import { create } from 'apisauce';

export const APIKEY = 'iimqpJjhBMQnbmU23KoeYOfeVLjQuCI8';
export const api = create({
  baseURL: 'http://dataservice.accuweather.com',
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
});
export const HANOI_ID = '353412';
