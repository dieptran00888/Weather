import React, { Component } from 'react';
import {
  Container, Header, Left, Button, Icon, Body, Title, Right, Content, Input, Text, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FlatList } from 'react-native';
import { gray } from 'kleur';

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
            onPress={() => Actions.pop()}
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
            // height: 30,
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

  renderLocation = item => (
    <View style={{ marginBottom: 15 }}>
      <Text
        style={{
          color: '#fe574b',
          fontSize: 24,
        }}
      >
        {item.key}
      </Text>
    </View>
  )

  renderLocationsResults() {
    return (
      <FlatList
        data={[{ key: 'a' }, { key: 'b' }]}
        renderItem={({ item }) => this.renderLocation(item)}
        keyExtractor={item => item.key}
        style={{
          marginHorizontal: 15,
        }}
      />
    );
  }
}
