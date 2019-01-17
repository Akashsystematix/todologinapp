import React, { Component } from 'react';
import { ReactNative, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import styles from './styles1';
import LinearGradient from 'react-native-linear-gradient';

const constants = styles.constants;



  
export default class ActionButton extends Component {
  render() {
    return (
      <View style={styles.action}>

<LinearGradient colors={[' #40e0d0', '#ff8c00', '#ff0080']} direction='ltr' style={styles.linearGradient}>
<TouchableHighlight
          underlayColor={constants.actionColor}
          onPress={this.props.onPress}>
          <Text style={styles.actionText}>
            {this.props.title}</Text>
        </TouchableHighlight>
        </LinearGradient>
      </View>
    );
  }
}


