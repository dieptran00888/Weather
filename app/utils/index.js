export const getTemperatureFromUnit = (temperature, unit) => {
  if (!temperature) return '--';
  if (unit === 'C') {
    return temperature.c;
  }
  return temperature.f;
};
