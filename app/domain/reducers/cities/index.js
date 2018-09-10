import types from '~/domain/types';

const initData = {
  result: [],
  citiesAdded: [
    {
      cityId: '353412',
      cityName: 'Hà Nội',
    },
  ],
};

export default (state = initData, { type, payload }) => {
  switch (type) {
    case types.city.searchSuccess:
      return {
        ...state,
        result: payload.cities,
      };
    case types.city.addCity:
      if (state.citiesAdded.filter(city => city.cityId === payload.cityId).length > 0) {
        return {
          ...state,
          citiesAdded: [...state.citiesAdded],
        };
      }
      return {
        ...state,
        citiesAdded: [...state.citiesAdded, payload],
      };
    default:
      return state;
  }
};
