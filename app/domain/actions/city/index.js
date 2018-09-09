import types from '~/domain/types';

export const searchCity = payload => ({
  type: types.city.searchCity,
  payload,
});

export const searchSuccess = payload => ({
  type: types.city.searchSuccess,
  payload,
});

export default {
  searchCity,
};
