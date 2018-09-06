import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl,
} from 'react-native';

import weatherSelector from '~/domain/selectors/weather';

import { doFetchData, switchUnit } from '~/domain/actions/weather';
import { getTemperatureFromUnit } from '~/utils';
import icons from '~/assets/images/weather';
import Weekly from '~/screens/Home/weekly';

@connect(
  state => ({
    weather: weatherSelector.getWeather(state),
    // forecastData: weatherSelector.getForecastData(state),
  }),
  { doFetchData, switchUnit },
)

export default class Home extends Component {
  componentDidMount() {
    this.props.doFetchData();
  }

  changeUnit = (unit) => {
    const { weather } = this.props;
    if (weather.unit !== unit) {
      this.props.switchUnit(unit);
    }
  }

  onRefresh() {
    this.props.doFetchData({ isForceUpdate: true });
  }

  renderCurrentData() {
    const { weather } = this.props;
    const currentUnit = weather.unit;
    const currentTemperature = getTemperatureFromUnit(weather.currentData.temp, currentUnit);
    const currentMaxTemperature = getTemperatureFromUnit(weather.currentData.tempMax, currentUnit);
    const currentMinTemperature = getTemperatureFromUnit(weather.currentData.tempMin, currentUnit);
    const currentText = weather.currentData.text || '--';
    const currentCityName = weather.cityName || '--';
    const currentIconUri = icons[weather.currentData.icon];
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.location}>{currentCityName}</Text>
        <Text style={styles.todayTemp}>
          {currentTemperature}˚{currentUnit}
        </Text>
        <View style={styles.maxMinTemp}>
          <View style={styles.item}>
            <Text style={styles.arrow}>&darr;</Text>
            <Text>{currentMinTemperature}&deg;</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.arrow}>&uarr;</Text>
            <Text>{currentMaxTemperature}&deg;</Text>
          </View>
          <View style={styles.item}>
            <Image
              source={currentIconUri}
              style={{ width: 24, height: 24, marginRight: 5 }}
            />
            <Text>{currentText}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderTemperatureSwitching() {
    const { weather } = this.props;
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => this.changeUnit('C')}>
          <Text style={{ fontSize: 20, color: weather.unit === 'C' ? '#F44336' : '#999999', paddingRight: 23 }}>&#8451;</Text>
        </TouchableOpacity>
        <Text style={styles.verticalBar}>|</Text>
        <TouchableOpacity onPress={() => this.changeUnit('F')}>
          <Text style={{ fontSize: 20, color: weather.unit === 'F' ? '#F44336' : '#999999', paddingLeft: 23 }}>&#8457;</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderDailyForeCastItem = (item) => {
    const { currentLanguage, unit } = this.props.weather;
    return (
      <Weekly item = {item} currentLanguage={currentLanguage} unit={unit}></Weekly>
    );
  }

  renderDailyForecast() {
    const { forecastData, unit } = this.props.weather;
    return (
      <FlatList
        unit={unit}
        data={forecastData}
        renderItem={({ item }) => this.renderDailyForeCastItem(item)}
        keyExtractor={item => item.day}
        style={styles.weeklyTemp}
        scrollEnabled={false}
      />
    );
  }

  render() {
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => this.onRefresh()}
          title='Updating'
        />
      }>
        <View style={styles.container} >
          {/* TODO: Header view - Current */}
          <View style={styles.header}>
            {this.renderTemperatureSwitching()}
            {this.renderCurrentData()}
          </View>
          {/* TODO: Mang thoi tiet */}
          {this.renderDailyForecast(this.props.weather.unit)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 46,
  },

  // Header styles
  header: {
    alignItems: 'center',
    marginHorizontal: 80,
  },

  headerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: 95,
  },

  activeDegree: {
    color: '#F44336',
    fontSize: 20,
    paddingRight: 23,
  },

  deactiveDegree: {
    color: '#999999',
    fontSize: 20,
    paddingLeft: 23,
  },

  verticalBar: {
    color: '#E5E5E5',
    fontSize: 20,
  },

  location: {
    marginTop: 24,
    fontSize: 18,
  },

  todayTemp: {
    color: '#F44336',
    fontSize: 70,
    fontFamily: 'Helvetica',
    letterSpacing: -1.45,
  },

  maxMinTemp: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  weeklyTemp: {
    width: '100%',
    marginTop: 30,
    marginHorizontal: 20,
  },

  arrow: {
    color: '#F44336',
  },
});
