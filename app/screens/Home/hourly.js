import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import moment from 'moment';
import { getTemperatureFromUnit } from '~/utils';
import icons from '~/assets/images/weather/index';

export default class Hourly extends Component {
  render() {
    const { item, unit } = this.props;
    const hourString = moment(item.hour).locale('en').format('LT');
    const temp = getTemperatureFromUnit(item.temp, unit);
    return (
      <View style={{
        flexDirection: 'column', marginHorizontal: 8, justifyContent: 'center', alignItems: 'center',
      }}>
        <Text>{temp}˚</Text>
        <Image source={icons['2']} style={{ width: 29, height: 29, marginVertical: 5 }} />
        <Text>{hourString}</Text>
      </View>
    );
  }
}
