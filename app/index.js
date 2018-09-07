/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import redux from '~/data/store/redux';
import Home from '~/screens/Home';
import { Router, Scene } from 'react-native-router-flux';
import LocationSearching from '~/screens/LocationSearching';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={redux.store}>
        <PersistGate persistor={redux.persistor}>
        <Router>
          <Scene key='root' hideNavBar>
            <Scene key='home' component={Home} initial></Scene>
            <Scene key='locationSearching' component={LocationSearching}></Scene>
          </Scene>
        </Router>
        </PersistGate>
      </Provider>
    );
  }
}
