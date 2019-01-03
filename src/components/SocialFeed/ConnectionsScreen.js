import React, {Component} from 'react';
import {StyleSheet, View, ListView, } from 'react-native';
import ConnectionItem from './ConnectionItem';

import firebase from 'firebase';


export default class ConnectionsScreen extends Component {
  static route = {
      navigationBar: {
        title: 'Connections',
        backgroundColor: '#33cccc',
        tintColor: 'white',
      }
    }
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
          name:child.val().name,
          email: child.val().email,
          bio: child.val().bio,
          _key: child.key
          });
      });
  this.setState({
      dataSource: this.state.dataSource.cloneWithRows(users)
          });
      });
  }
  
  componentDidMount() {
      this.listenForItems(this.itemsRef);
  }

  render() { 
      return (
      <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            style={styles.listview}/>
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
      backgroundColor: '#3B2571',
      flex: 1,
    },
    listview: {
      flex: 1,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#c33764',
      height: '80%',
    },
    innerContainer: {
      alignItems: 'center',
    },
    regInput:{
      height: 30, 
      width:300, 
      margin:10, 
      padding:5, 
      borderWidth: 1, 
      borderColor: "rgba(0,0,0,0.5)",
      backgroundColor:'#1d2671',
    },
    multiInput:{
      height: 150, 
      width:300, 
      margin:10,
      padding:5,  
      borderWidth: 1, 
      borderColor: "rgba(0,0,0,0.5)", 
      backgroundColor:'#1d2671',
    },
  
  })