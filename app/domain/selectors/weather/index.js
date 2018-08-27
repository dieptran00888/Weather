export const getCurrentData = state => state.weather.currentData || null;
export const getForecastData = state => state.weather.forecastData || [];
export const isFetching = state => state.weather.isFetching || false;

export default {
  getCurrentData,
  getForecastData,
  isFetching,
};
