import React, { Component } from 'react';
import {
  Container, Text, Content, Button, Icon, Footer, View, H1,
} from 'native-base';
import { SafeAreaView, FlatList } from 'react-native';
import citySelector from '~/domain/selectors/city';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

@connect(
  state => ({
    cities: citySelector.getCitiesAdded(state),
  }),
  {},
)

export default class Menu extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          {this.renderHeader()}
          <Content>
            {this.renderDefaultCity()}
            {this.renderCitiesAdded()}
            {this.renderAddCityButton()}
          </Content>
          {this.renderFooter()}
        </Container>
      </SafeAreaView>
    );
  }

  renderHeader() {
    return (
      <View style={{ marginBottom: 15 }}>
        <Button
          transparent
          style={{
            width: 50, height: 50, justifyContent: 'center', marginLeft: 10, marginTop: 10,
          }}
          onPress={() => this.props.closeDrawer()}
        >
          <Icon name='close' style={{ color: '#ADADAD', fontSize: 40 }}></Icon>
        </Button>
        <View style={{ marginHorizontal: 40, alignItems: 'center' }}>
          <H1 style={{ color: '#fe574b', fontWeight: '700' }}>Weather</H1>
        </View>
      </View>
    );
  }

  renderDefaultCity = () => (
    <View
      style={{
        backgroundColor: '#f7f7f9',
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
      }}
    >
      <Icon name='star' style={{ color: '#fe574b' }}></Icon>
      <Text style={{ marginLeft: 10, color: '#fe574b', fontSize: 20 }}>{this.props.cities[0].cityName}</Text>
    </View>
  )

  renderFooter() {
    return (
      <Footer
        style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
      >
        <Text style={{ color: '#C0C0C0', fontSize: 14 }}>Weather ver 1.0</Text>
      </Footer>
    );
  }

  renderCitiesAdded() {
    return (
      <View>
        <FlatList
          data={this.props.cities}
          keyExtractor={item => item.cityId}
          renderItem={({ item }) => this.renderCity(item)}
        />
      </View>
    );
  }

  renderCity = city => (
    <View
      style={{
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
      }}
    >
      <Icon name='star' style={{ color: '#3a3a3a' }}></Icon>
      <Text style={{ marginLeft: 10, color: '#3a3a3a', fontSize: 20 }}>{city.cityName}</Text>
    </View>
  )

  renderAddCityButton() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 30,
          marginTop: 25,
        }}
      >
        <Button
          transparent
          bordered
          light
          style={{
            borderColor: '#e0e0e0',
            borderWidth: 1,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}
          onPress={() => this.addCity()}
        >
          <Icon name='add-circle' style={{ color: 'red' }}></Icon>
          <Text style={{ color: 'red', marginLeft: -10, fontSize: 24 }}>Add city</Text>
        </Button>
      </View>
    );
  }

  addCity() {
    Actions.citySearching();
  }
}
