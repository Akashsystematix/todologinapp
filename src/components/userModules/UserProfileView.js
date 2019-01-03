import firebase from 'firebase';
import React, {Component} from 'react';
import {Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ActionButton from '../SocialFeed/ActionButton';

var userdata = [];
var snapuser = [];
let {width, height} = Dimensions.get('window')

export default class UserProfileView extends Component {
  constructor(props) {
    super(props)


        this.state = {
      users: []
    }
  }
  componentDidMount() {
    firebase.database()
        .ref()

        .child('users')

        .on('value', snapshot => {
          let data = snapshot.val();
          let keys = Object.keys(data);
          keys.forEach(
              (key) => {console.log('Snapshotkeyuser=====>' + snapshot.key)});
          snapuser = snapshot.key;
          console.log('Snap' + snapuser);
          if (data) {
            this.setState(prevState => ({
                            users: [data, ...prevState.users]

                          }))
          }
          console.log('data' + JSON.stringify(data));

          userdata = data;
          console.log('userdata' + JSON.stringify(userdata));
        });
  }



  handleLogout =
      () => {
        firebase.auth()
            .signOut()
            .then(() => this.props.navigation.navigate('Login'))

            .catch(error => this.setState({errorMessage: error.message}))
      }

  render() {
    user = firebase.auth().currentUser;
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#E8CBC0', '#636FA4']} style={styles.gradient} >

          <StatusBar barStyle='light-content'/>
          <View style={styles.container}>


            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Profile</Text>
              </View>
              <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={
      require('../resources/profile.png')} />
                <Text>Name:</Text>
                <Text value={this.state.name} style={styles.name}>{userdata.name}</Text>

              </View>
            </View>

            <View style={styles.body}>
              <View style={styles.item}>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Text>Date of Birth:</Text>
                </View>
                <View style={styles.infoContent}>


                  <Text value={this.state.date} style={styles.info}>{userdata.date}</Text>
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Text>Email:</Text>
                </View>
                <View style={styles.infoContent}>


                  <Text value={this.state.email} style={styles.info}>{user.email}</Text>

                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Text>Number:</Text>
                </View>
                <View style={styles.infoContent}>


                  <Text value={this.state.number} style={styles.info}>{userdata.number}</Text>

                </View>
              </View>
 </View>
          </View>

          <ActionButton onPress={() => this.editProfileNavigate()} 
          title="EDIT"/>



           <ActionButton title='LOGOUT'onPress={
      () => this.handleLogout()}/>

        </LinearGradient>
      </SafeAreaView>
    )




  }

  editProfileNavigate(name, email, date, number) {

    this.props.navigation.navigate('UserProfileEdit', { name: name, email: email, date: date, number: number, snapuser })
  }

  LogoutNavigate() {

    this.props.navigation.navigate('Login')

  }
}



const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  title: {
    color: 'purple',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  iconContent: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 2,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
  },
  gradient: {
    height: height,
    width: width,
    flex: 1,


  },

  body: {
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'

  },

  info: {
    fontSize: 18,
    marginTop: 20,
    alignItems: 'center',
    color: "#FFFFFF",
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
