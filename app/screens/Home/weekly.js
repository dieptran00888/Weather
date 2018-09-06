import React, { Component } from 'react';
import {
  View, Image, StyleSheet, Text,
} from 'react-native';
import icons from '~/assets/images/weather';
import moment from 'moment';
import { getTemperatureFromUnit } from '~/utils';

export default class Weekly extends Component {
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { item, unit, currentLanguage } = this.props;
    moment.locale(currentLanguage, require('moment/locale/vi'));
    const tempMin = getTemperatureFromUnit(item.tempMin, unit);
    const tempMax = getTemperatureFromUnit(item.tempMax, unit);
    const dayName = this.capitalize(moment(item.day).format('dddd'));
    const currentHour = 12;
    const iconUri = currentHour >= 17 || currentHour <= 6 ? icons[item.iconNight] : [item.iconDay];
    return (
      <View style={styles.weeklyContainer}>
        <View style={styles.day}>
          <Image source={icons[iconUri]} style={{ width: 29, height: 29, resizeMode: 'contain' }} />
          <Text style={{ marginLeft: 10, marginTop: 5 }}>{dayName}</Text>
        </View>
        <View style={styles.weeklyMaxMinTemp}>
          <View style={styles.weeklyMaxMinTemp}>
            <Text style={styles.arrow}>&darr;</Text>
            <Text>{tempMin}&deg;</Text>
          </View>
          <View style={styles.weeklyMaxMinTemp}>
            <Text style={styles.arrow}> &uarr;</Text>
            <Text>{tempMax} &deg;</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  day: {
    flexDirection: 'row',
    flex: 1,
  },

  weeklyMaxMinTemp: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },

  arrow: {
    color: '#F44336',
    marginRight: 5,
  },

  weeklyContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 15,
  },
});
