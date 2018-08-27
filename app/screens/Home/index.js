import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Image, TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';

import weatherSelector from '~/domain/selectors/weather';

import { doFetchData } from '~/domain/actions/weather';
import icons from '~/assets/images/weather';
@connect(
  state => ({
    currentData: weatherSelector.getCurrentData(state),
  }),
  { doFetchData },
)
export default class Home extends Component {
  componentDidMount() {
    this.props.doFetchData();
  }

  render() {
    return (
      <View style={styles.container} >
        {/* TODO: Header view - Current */}
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <TouchableOpacity>
              <Text style={styles.activeDegree}>&#8451;</Text>
            </TouchableOpacity>
            <Text style={styles.verticalBar}>|</Text>
            <TouchableOpacity>
              <Text style={styles.deactiveDegree}>&#8457;</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.location}>{this.props.currentData.area}</Text>
          <Text style={styles.todayTemp}>
            {this.props.currentData && this.props.currentData.temp}&#8451;
          </Text>
          <View style={styles.maxMinTemp}>
            <View style={styles.item}>
              <Text style={styles.arrow}>&darr;</Text>
              <Text>{this.props.currentData.minTemp}&deg;</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.arrow}>&uarr;</Text>
              <Text>{this.props.currentData.maxTemp}&deg;</Text>
              <Image />
            </View>
            <View style={styles.item}>
              <Image
                source={icons[this.props.currentData.icon]}
                style={{ width: 24, height: 24, marginRight: 5 }}
              />
              <Text>{this.props.currentData.status}</Text>
            </View>
          </View>
        </View>
        {/* TODO: Mang thoi tiet */}
        <View style={styles.weeklyTemp}>
          <View style={styles.weeklyContainer}>
            <View style={styles.day}>
              <Image source={icons[2]} style={{ width: 24, height: 24 }} />
              <Text style={{ paddingLeft: 10 }}>Thu ba</Text>
            </View>
            <View style={styles.weeklyMaxMinTemp}>
              <View style={styles.weeklyMaxMinTemp}>
                <Text style={styles.arrow}>&darr;</Text>
                <Text>21&deg;</Text>
              </View>
              <View style={styles.weeklyMaxMinTemp}>
                <Text style={styles.arrow}>&uarr;</Text>
                <Text>30&deg;</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 80,
    height: 200,
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
    fontSize: 98,
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

  // Weekly temperature container
  weeklyTemp: {
    flex: 2,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
  },

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
