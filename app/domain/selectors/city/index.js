export const searchCity = state => state.cities.result || [];
export const getCitiesAdded = state => state.cities.citiesAdded || [];

export default {
  searchCity,
  getCitiesAdded,
};
