import { takeLatest, all } from 'redux-saga/effects';

import types from '~/domain/types';
import doFetchData from '~/domain/sagas/weather/doFetchData';
import searchCity from '~/domain/sagas/weather/searchCity';

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest(types.weather.doFetchData, doFetchData),
      takeLatest(types.city.searchCity, searchCity),
    ]);
  },
];
