import types from '~/domain/types';

export const searchCity = payload => ({
  type: types.city.searchCity,
  payload,
});

export const searchSuccess = payload => ({
  type: types.city.searchSuccess,
  payload,
});

export const addCity = payload => ({
  type: types.city.addCity,
  payload,
});

export const deleteCity = payload => ({
  type: types.city.deleteCity,
  payload,
});

export default {
  searchCity,
  searchSuccess,
  addCity,
  deleteCity,
};
