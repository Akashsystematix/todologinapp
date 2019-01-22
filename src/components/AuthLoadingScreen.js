import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View,} from 'react-native';
import firebase from 'firebase'
export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

checkUser(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("userAuthenticated==>"+JSON.stringify(user))
      this.props.navigation.navigate('AppStack');
    } else {
      this.props.navigation.navigate('AuthStack');
    }
    });
    }

    _bootstrapAsync = async () => {
    
   // const user = await AsyncStorage.getItem('userData');
    this.checkUser();

  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
  }});