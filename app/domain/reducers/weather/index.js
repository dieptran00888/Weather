import types from '~/domain/types';

const initData = {
  currentData: {
    temp: 20,
    minTemp: 21,
    maxTemp: 30,
    icon: 1,
    area: 'Ho Chi Minh',
    status: 'Cloudy',
  },
  forecastData: [
    1: {
      name: 'Thứ ba',
      minTemp: 21,
      maxTemp: 30,
      icon: 1,
    },
    2: {
      name: 'Thứ tư',
      minTemp: 21,
      maxTemp: 30,
      icon: 2,
    },
    3: {
      name: 'Thứ năm',
      minTemp: 21,
      maxTemp: 30,
      icon: 3,
    },
    4: {
      name: 'Thứ sáu',
      minTemp: 21,
      maxTemp: 30,
      icon: 4,
    },
    5: {
      name: 'Thứ bảy',
      minTemp: 21,
      maxTemp: 30,
      icon: 5,
    },
    6: {
      name: 'Chủ nhật',
      minTemp: 21,
      maxTemp: 30,
      icon: 6,
    },
  ],
  isFetching: false,
};

export default (state = initData, { type, payload }) => {
  switch (type) {
    case types.weather.repeatData:
      return {
        ...state,
        currentData: payload.currentData,
        forecastData: payload.forecastData,
      };
    case types.weather.repeatFetching:
      return { ...state, isFetching: payload };
    default:
      return state;
  }
};
