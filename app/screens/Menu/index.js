import React, { Component } from 'react';
import {
  Container, Text, Content, Button, Icon, Footer, View, FlatList,
} from 'native-base';
import { SafeAreaView } from 'react-native';

export default class Menu extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          {this.renderHeader()}
          {this.renderAddCityButton()}
          {this.renderFooter()}
        </Container>
      </SafeAreaView>
    );
  }

  renderHeader() {
    return (
      <Content scrollEnabled={false}>
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
          <Text style={{ fontSize: 36, color: 'red', fontWeight: '700' }}>Weather</Text>
        </View>
      </Content>
    );
  }

  renderFooter() {
    return (
      <Footer
        style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
      >
        <Text style={{ color: '#C0C0C0', fontSize: 14 }}>Weather ver 1.0</Text>
    </Footer>
    );
  }

  renderLocations() {
    return (
      // TODO: Fill locations here
      <FlatList/>
    );
  }

  renderAddCityButton() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 30,
          flex: 1,
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
        >
          <Icon name='add-circle' style={{ color: 'red' }}></Icon>
          <Text style={{ color: 'red', marginLeft: -10, fontSize: 24 }}>Add city</Text>
        </Button>
      </View>
    );
  }
}
