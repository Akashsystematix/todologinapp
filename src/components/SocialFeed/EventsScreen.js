import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, TextInput, View, Button, ListView, AlertIOS, Modal } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker'

import ActionButton from './ActionButton';
import EventItem from './EventItem';

import LinearGradient from 'react-native-linear-gradient';
let { width, height } = Dimensions.get('window')

export default class EventsScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Events',
      backgroundColor: '#33cccc',
      tintColor: 'white',
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      date: '',
      time: '',
      location: '',
      rsvp: '',
      invitedby: '',
      modalVisible: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('events');
  }

  getRef() {
    return firebase.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var events = [];
      snap.forEach((child) => {
        events.push({
          title: child.val().title,
          desc: child.val().desc,
          date: child.val().date,
          time: child.val().time,
          location: child.val().location,
          rsvp: child.val().rsvp,
          invitedby: child.val().invitedby,
          rsvpby: child.val().rsvpby,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(events)
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  handleSubmit = () => {
    // event.preventDefault();
    this.itemsRef.push({ title: this.state.title, desc: this.state.desc, date: this.state.date, time: this.state.time, location: this.state.location, invitedby: firebase.auth().currentUser.displayName, rsvp: false });
    this.setState({ modalVisible: false });
  }

  render() {

    return (
      <View style={styles.container}>
        <LinearGradient colors={['#E8CBC0', '#636FA4']} style={styles.gradient} >

          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            style={styles.listview} />

          <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            onRequestClose={() => this.closeModal()}>

            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <View>
                  <Text style={{ color: '#ffffff', fontSize: 30, textAlign: 'center', }}> Create an Event! </Text>
                  <TextInput
                    style={styles.regInput}
                    placeholder={'Title'}
                    placeholderTextColor={"grey"}
                    name="title"
                    ref="title"
                    onChangeText={text => {
                      this.setState({ title: text });
                    }}

                  />
                  <TextInput
                    style={styles.multiInput}
                    placeholder={'Description'}
                    multiline={true}
                    placeholderTextColor={"grey"}
                    name="desc"
                    ref="desc"
                    onChangeText={text => {
                      this.setState({ desc: text });
                    }}
                  />
                  {/* <TextInput
                  style={styles.regInput}
                  placeholder={'Date (ex. March 3rd)'}
                  placeholderTextColor={"grey"}
                  name="date"
                  ref="date"
                  onChangeText={text => {
                    this.setState({ date: text });
                  }}
                /> */}
                  <DatePicker
                    style={styles.dateInput}
                    date={this.state.date}
                    mode="datetime"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-05-01"
                    maxDate="2500-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 2,
                        right: 2,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 0,
                        marginRight: 0
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={text => {
                      this.setState({ date: text });
                    }}
                  ></DatePicker>

                  <TextInput
                    style={styles.regInput}
                    placeholder={'Location'}
                    placeholderTextColor={"grey"}
                    name="location"
                    ref="location"
                    onChangeText={text => {
                      this.setState({ location: text });
                    }}
                  />
                </View>

              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Button onPress={() => this.closeModal()} color="white" title="Cancel" />
                <Button onPress={this.handleSubmit.bind(this)} color="white" title="Submit" />
              </View>
            </View>
          </Modal>

          <ActionButton onPress={() => this.openModal()} title="Invite contacts for event" />
        </LinearGradient>
      </View>
    )
  }

  _renderItem(item) {
    const onPress = () => {
      AlertIOS.alert(
        'Remove?',
        null,
        [
          { text: 'Remove', onPress: (text) => this.itemsRef.child(item._key).remove() },
          { text: 'Cancel', onPress: (text) => console.log('Cancelled') }
        ]
      );
    };
    const onRsvp = () => {
      this.getRef().child('events').child(item._key).child('rsvpby').push({
        rsvpby: firebase.auth().currentUser.email
      })
    };

    const onUnRsvp = () => {
      let ref = firebase.database().ref('events').child(item._key).child('rsvpby');
      ref.orderByChild('rsvpby').equalTo(currentUser.email).once('value', snapshot => {
        let updates = {};
        snapshot.forEach(child => updates[child.key] = null);
        ref.update(updates);
      });
    };

    return (
      <EventItem event={item} onPress={onPress} onRsvp={onRsvp} onUnRsvp={onUnRsvp} />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },

  modalContainer: {
    paddingTop: 200,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0f0c29',
    height: '200%',
  },
  innerContainer: {
    alignItems: 'center',
  },
  regInput: {
    height: 20,
    width: 300,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  dateInput: {
    alignSelf: 'center', color: 'white',
    width: 300,
    backgroundColor: "white"
  },
  gradient: {
    height: height,
    width: width,
    flex: 1,


  },
  multiInput: {
    height: 50,
    width: 300,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    backgroundColor: 'white',
  },
})



