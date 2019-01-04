const React = require('react-native')
import{Dimensions} from 'react-native';
const {StyleSheet} = React
let {width, height} = Dimensions.get('window')
const constants = {
  actionColor: '#1C246F'
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    top: '4%',
    justifyContent: 'center',

  },
  listview: {
    flex: 1,

  },
  gradient: {
    height: height,
    width: width,
    flex: 1,


  },
})

module.exports = styles
module.exports.constants = constants;
