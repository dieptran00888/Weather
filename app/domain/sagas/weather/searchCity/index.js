import { call, put } from 'redux-saga/effects';
import { api, APIKEY } from '~/configs';
import { searchSuccess } from '~/domain/actions/city';

function* searchCity(cityName) {
  try {
    const cities = yield call(
      api.get,
      `/locations/v1/cities/autocomplete?apikey=${APIKEY}&q=${cityName}&language=vi`,
    );
    if (cities && cities.status === 200 && cities.data.length > 0) {
      return cities.data.map(response => ({
        cityId: response.Key,
        cityName: response.LocalizedName,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export default function* (action) {
  const { cityName } = action.payload;
  try {
    const citiesData = yield call(searchCity, cityName);
    yield put(
      searchSuccess({
        cities: citiesData,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}
