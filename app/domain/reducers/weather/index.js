import types from '~/domain/types';

const initData = {
  cityId: '353412',
  cityName: 'Hà Nội',
  unit: 'C',
  currentData: {
    temp: null,
    minTemp: null,
    maxTemp: null,
    icon: null,
    text: null,
  },
  forecastData: [],
  hourlyForecastsData: [],
  isFetching: false,
  lastUpdate: null,
};

export default (state = initData, { type, payload }) => {
  switch (type) {
    case types.weather.repeatData:
      return {
        ...state,
        currentData: payload.currentData,
        forecastData: payload.forecastData,
        hourlyForecastsData: payload.hourlyData,
        lastUpdate: payload.lastUpdate,
      };
    case types.weather.switchUnit:
      return {
        ...state,
        unit: payload,
      };
    case types.weather.repeatFetching:
      return { ...state, isFetching: payload };
    default:
      return state;
  }
};
