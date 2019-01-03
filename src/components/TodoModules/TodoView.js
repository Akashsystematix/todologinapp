import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableHighlight,
  FlatList, AsyncStorage,
  Button, ScrollView, Dimensions,
} from 'react-native';
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';

var snap = [];
let { width, height } = Dimensions.get('window')
export default class TodoView extends Component {
  


  constructor(props) {
    super(props)


    this.state = {
      todos: [],

      currentUser: null
    }



  }

  renderItem = ({ item }) => {

    console.log('itemslength=====>' + item.length);
    if (item.length != 0) {
      console.log('items=====>' + JSON.stringify(item));

      return (
        <TouchableHighlight onPress={() => this.detailsItem(item.title, item.data, item.date, snap)}
        >
          <View style={{ flex: 1, backgroundColor: 'white'}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.baseText}>{item.data}</Text>
            <Text style={styles.date}>{item.date}</Text>

          </View>
        </TouchableHighlight>
      )

    }
    else {
      alert("No data found")
    }


  }

  renderSeperator = () => {

    return (

      <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
      </View>
    )
  }

  componentWillMount() {

    const userData = firebase.auth().currentUser;
    AsyncStorage.getItem('userData').then((user_data_json) => {
      let userData = JSON.parse(user_data_json);
      this.setState({
        currentUser: userData,
        loading: false
      });
    });
  }



  componentDidMount() {
    firebase
      .database().ref()
      .child("todos")

      .on("child_added", snapshot => {
        let data = snapshot.val();
        let keys = Object.keys(data);
        keys.forEach((key) => { console.log('Snapshotkey=====>' + snapshot.key) });
        snap = snapshot.key;
        console.log('Snap' + snap);
        if (data) {
          this.setState(prevState => ({
            todos: [data, ...prevState.todos]
          }))
        }
      });

    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    console.log("currentUser1" + JSON.stringify(currentUser));

  }


  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.gradient} >

          {/* <Button title='Add' onPress={this.addItem} /> */}
          <Button style={styles.addbutton}
            title='Add'
            onPress={() => this.addItem()} />

          <FlatList
            data={this.state.todos}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={this.renderSeperator}

          />
        </LinearGradient>
      </View>

    );
  }
  addItem() {
    this.props.navigation.navigate('AddTodo')

  }
  detailsItem(title, data, date, snap) {
    this.props.navigation.navigate('Details', { title: title, data: data, date: date, snap, returnData: this.returnData() })

  }

  returnData() {
    snap = '';
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: 'column',
  },
  baseText: {
    fontFamily: 'Courier',
    fontSize:15,
},
  title: {
    color: '#3b8d99',
    fontSize: 18,
    
    opacity: 1,
    fontFamily:"Cochin-Bold"

  },
  date: {
    color: '#000046',
    fontSize: 10,
    left:width-70,
    opacity: 1,
    fontFamily:"Optima"

  },
  gradient: {
    height: height,
    width: width,
    flex: 1,


  },
  infoContainer: {
    marginTop: 10,
    left: 2,
    right: 2,
    bottom: 0,
    borderColor: "black",
    paddingVertical: 15
  },

  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5
  },
  listItem: {
    fontSize: 20,
    padding: 10
  },
  buttonContainer: {
    backgroundColor: '#f7c744',
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(32, 53, 70)',
    fontWeight: 'bold',
    fontSize: 18
  },
  addbutton: {
    right: 5
  }
})






