import firebase from 'firebase';
import React, {Component} from 'react';
import {Dimensions, ListView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ConnectionItem from './ConnectionItem';

let {width, height} = Dimensions.get('window')

export default class ConnectionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('users');
  }

  getRef() {
    return firebase.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      var users = [];
      snap.forEach((child) => {
        users.push({
          name: child.val().name,
          email: child.val().email,
          bio: child.val().bio,
          _key: child.key
        });
      });
      this.setState({dataSource: this.state.dataSource.cloneWithRows(users)});
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
      return (
      <View style={styles.container}>
              <LinearGradient colors={['#E8CBC0', '#636FA4']} style={styles.gradient} >

          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            style={
      styles.listview}/>
            </LinearGradient>
      </View>
      );
  };

  _renderItem(user) {
      return (
        <ConnectionItem user={user} />
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:'3%'

  },
  listview: {
    flex: 1,
  },
  gradient: {
    height: height,
    width: width,
    flex: 1,

  }
});