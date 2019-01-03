import React, { Component } from 'react';
import { ReactNative, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import styles from './styles1';
const constants = styles.constants;

export default class ActionButton extends Component {
  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight
          underlayColor={constants.actionColor}
          onPress={this.props.onPress}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


