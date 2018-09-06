import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import moment from 'moment';
import { create } from 'apisauce';
import { repeatData, repeatFetching } from '~/domain/actions/weather';
import weatherSelector from '~/domain/selectors/weather';

const APIKEY = 'dgDtGR2Q74nEccZzXPrJ52GWbPAl8zm6';

const api = create({
  baseURL: 'http://dataservice.accuweather.com',
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
});

function* getCurrentData(cityId) {
  try {
    const currentWeatherData = yield yield call(
      api.get, `/currentconditions/v1/${cityId}?apikey=${APIKEY}&language=vi-vn&details=true`,
    );
    if (
      currentWeatherData
      && currentWeatherData.status === 200
      && currentWeatherData.data.length > 0
    ) {
      const data = currentWeatherData.data[0];
      return {
        temp: { c: data.Temperature.Metric.Value, f: data.Temperature.Imperial.Value },
        tempMin: {
          c: data.TemperatureSummary.Past24HourRange.Minimum.Metric.Value,
          f: data.TemperatureSummary.Past24HourRange.Minimum.Imperial.Value,
        }, // { c: 30, f: 70 }
        tempMax: {
          c: data.TemperatureSummary.Past24HourRange.Maximum.Metric.Value,
          f: data.TemperatureSummary.Past24HourRange.Maximum.Imperial.Value,
        }, // { c: 30, f: 70 }
        text: data.WeatherText,
        icon: data.WeatherIcon,
      };
    }
  } catch (err) {
    console.log(err);
  }
}

function dailyObjectToItem(it) {
  return {
    tempMin: {
      c: Math.round(it.Temperature.Minimum.Value),
      f: Math.round(it.Temperature.Minimum.Value * 1.8 + 32),
    },
    tempMax: {
      c: Math.round(it.Temperature.Maximum.Value),
      f: Math.round(it.Temperature.Maximum.Value * 1.8 + 32),
    },
    day: it.Date,
    iconDay: it.Day.Icon,
    iconNight: it.Night.Icon,
  };
}

function* getDailyForecastsData(cityId) {
  try {
    const dailyForecastsData = yield call(
      api.get,
      `/forecasts/v1/daily/5day/${cityId}?apikey=${APIKEY}&language=vi-vn&details=true&metric=true`,
    );
    if (dailyForecastsData && dailyForecastsData.status === 200) {
      const data = dailyForecastsData.data.DailyForecasts;
      const dataList = data.map(it => dailyObjectToItem(it));
      return dataList;
    }
  } catch (error) {
    // Empty
    console.log({ error });
  }
  return null;
}

export default function* (action) {
  const { isForceUpdate } = action.payload || { isForceUpdate: false };
  const lastUpdate = (yield select(weatherSelector.getLastUpdate)) || 0;
  const cityId = yield select(weatherSelector.getCityId);
  const hasUpdateData = moment().unix() - lastUpdate > 1000 * 60 * 15; // Update every 15 min
  if (!hasUpdateData && !isForceUpdate) return;
  try {
    const currentData = yield call(getCurrentData, cityId);
    yield delay(1000);
    const forecastData = yield call(getDailyForecastsData, cityId);
    if (!currentData || !forecastData) {
      yield put(
        repeatData({
          currentData,
          forecastData,
        }),
      );
    } else {
      yield put(
        repeatData({
          currentData,
          forecastData,
          lastUpdate: moment().unix(),
        }),
      );
    }
  } catch (error) {
    console.error(error);
  }
}
