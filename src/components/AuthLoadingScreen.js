import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View,} from 'react-native';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }


  _bootstrapAsync = async () => {
    
debugger
    const user = await AsyncStorage.getItem('userData');

    if (user == null) {
      this.props.navigation.navigate('AuthStack');
    } else {
      this.props.navigation.navigate('AppStack',{user:user});
    }
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