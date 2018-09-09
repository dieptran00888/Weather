import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import weather from '~/domain/reducers/weather';
import cities from '~/domain/reducers/cities';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['weather', 'cities'],
};

const rootReducer = combineReducers({
  weather,
  cities,
});

export default persistReducer(rootPersistConfig, rootReducer);
