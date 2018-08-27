import React, { Component } from 'react';
import {
  View, Image, StyleSheet, Text,
} from 'react-native';
import icons from '~/assets/images/weather';

export default class Weekly extends Component {
  render() {
    return (
      <View style={styles.weeklyContainer}>
        <View style={styles.day}>
          <Image source={icons[this.props.item.icon]} style={{ width: 29, height: 29, resizeMode: 'contain' }} />
          <Text style={{ marginLeft: 10, marginTop: 5 }}>{this.props.item.name}</Text>
        </View>
        <View style={styles.weeklyMaxMinTemp}>
          <View style={styles.weeklyMaxMinTemp}>
            <Text style={styles.arrow}>&darr;</Text>
            <Text>{this.props.item.minTemp}&deg;</Text>
          </View>
          <View style={styles.weeklyMaxMinTemp}>
            <Text style={styles.arrow}>&uarr;</Text>
            <Text>{this.props.item.maxTemp}&deg;</Text>
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
  },

  weeklyContainer: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
});
