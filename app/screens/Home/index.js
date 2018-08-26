import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Image, TouchableOpacity,
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
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: 46,
        }}
      >
        {/* TODO: Header view - Current */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginHorizontal: 80,
            height: 200,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              width: 95,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  color: '#F44336',
                  fontSize: 20,
                  paddingRight: 23,
                }}
              >
                &#8451;
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: '#E5E5E5',
                fontSize: 20,
              }}
            >
              |
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#999999',
                  fontSize: 20,
                  paddingLeft: 23,
                }}
              >
                &#8457;
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 24 }}>Location dell hieu tai sao</Text>
          <Text
            style={{
              color: '#F44336',
              fontSize: 98,
              fontFamily: 'Helvetica',
              letterSpacing: -1.45,
            }}
          >
            {this.props.currentData && this.props.currentData.temp}&#8451;
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={styles}>
              <Text style={{ color: '#F44336' }}>&darr;</Text>
              <Text>{this.props.currentData.minTemp}&deg;</Text>
            </View>
            <View style={styles}>
              <Text style={{ color: '#F44336' }}>&uarr;</Text>
              <Text>{this.props.currentData.maxTemp}&deg;</Text>
              <Image />
            </View>
            <View style={styles}>
              <Image
                source={icons[this.props.currentData.icon]}
                style={{ width: 24, height: 24, marginRight: 5 }}
              />
              <Text>{this.props.currentData.status}</Text>
            </View>
          </View>
        </View>
        {/* TODO: Mang thoi tiet */}
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}
            >
              <Image source={icons[2]} style={{ width: 24, height: 24 }} />
              <Text style={{ paddingLeft: 10 }}>Thứ 3</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              >
                <Text style={{ color: '#F44336' }}>&darr;</Text>
                <Text>21&deg;</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              >
                <Text style={{ color: '#F44336' }}>&uarr;</Text>
                <Text>30&deg;</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
};
