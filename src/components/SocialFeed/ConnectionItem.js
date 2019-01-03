import React, { Component } from 'react';
import { ReactNative, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import styles from './styles1';
import { Gravatar, GravatarApi } from 'react-native-gravatar';

export default class ConnectionItem extends Component {

  render() {
    user = this.props.user;
    return (
      <TouchableHighlight >
        <View style={styles.connectionsli}>

          <Gravatar options={{
            email: user.email,
            parameters: { "size": "50", "d": "mm" },
            secure: true
          }}
            style={styles.roundedProfileImage} />

          <View>
            <Text style={{ fontSize: 20, color: 'white', paddingLeft: 10 }}> {user.name}</Text>
            <Text style={{ fontSize: 10, color: 'white', paddingLeft: 10, paddingTop: 5 }}> {user.bio}</Text>

          </View>
        </View>
      </TouchableHighlight>
    );
  }
}