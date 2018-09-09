import React, { Component } from 'react';
import {
  Container, Header, Left, Button, Icon, Body, Title, Right, Input, Text, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import citySelector from '~/domain/selectors/city';
import { searchCity } from '~/domain/actions/city';

@connect(
  state => ({
    cities: citySelector.searchCity(state),
  }),
  { searchCity },
)
export default class LocationSearching extends Component {
  constructor(props) {
    super(props);
    this.state = { isSearching: false };
  }

  render() {
    return (
      <Container>
        {this.renderHeader()}
        {this.renderSearchBar()}
        {this.renderSearchingText()}
        {this.renderLocationsResults()}
      </Container>
    );
  }

  backToHome() {
    Actions.pop();
  }

  renderHeader() {
    return (
      <Header
        style={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
          marginHorizontal: 10,
        }}
      >
        <Left>
          <Button
            transparent
            onPress={() => this.backToHome()}
          >
            <Icon name='arrow-back' style={{ color: 'black', fontSize: 25 }}></Icon>
          </Button>
        </Left>
        <Body>
          <Title style={{ color: '#f44336', fontSize: 20 }}>Add City</Title>
        </Body>
        <Right></Right>
      </Header>
    );
  }

  onChangeText = (text) => {
    if (text.trim()) {
      this.props.searchCity({ cityName: text });
      this.setState({
        isSearching: true,
      });
    } else {
      this.setState({
        isSearching: false,
      });
    }
  }

  renderSearchBar() {
    return (
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 10,
          height: 42,
        }}
      >
        <Input
          placeholder='Enter city name'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => this.onChangeText(text)}
          // onEndEditing={() => this.setState({ isSearching: false })}
          style={{
            borderColor: '#e0e0e0',
            borderWidth: 1,
            borderRadius: 21,
            paddingLeft: 15,
          }}
        />
      </View>
    );
  }

  renderSearchingText() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 15,
        }}
      >
        <Text style={{ color: '#b1b1b1' }}>{this.state.isSearching ? 'searching...' : ''}</Text>
      </View>
    );
  }

  onPress = city => (
    Actions
  )

  renderCity = item => (
    <View style={{ marginBottom: 15 }}>
      <Text
        style={{
          color: '#fe574b',
          fontSize: 24,
        }}
        onPress={() => this.onPress(item)}
      >
        {item.cityName}
      </Text>
    </View>
  )

  renderLocationsResults() {
    return (
      <FlatList
        data={this.props.cities}
        renderItem={({ item }) => this.renderCity(item)}
        keyExtractor={item => item.cityId}
        style={{
          marginHorizontal: 15,
        }}
      />
    );
  }
}
