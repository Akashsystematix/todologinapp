import React, { Component } from 'react'
import {
    StyleSheet, Text, View,
    StatusBar,
    TextInput, SafeAreaView, TouchableOpacity, Dimensions,
    KeyboardAvoidingView
} from 'react-native'
import firebase from 'firebase'
import DatePicker from 'react-native-datepicker'
//import { editItem } from '../sevices/Itemservice';
import LinearGradient from 'react-native-linear-gradient';
let { width, height } = Dimensions.get('window')

var title;
var data;
var date;
var snap=[];
export default class EditTodo extends Component {
    static navigationOptions = {
        title: "EditTodo"
    };

    
    constructor(props) {
        super(props)
        this.state = {
            title:JSON.stringify(title),
            data: JSON.stringify(data),
            date: JSON.stringify(date)

        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeTitle(e) {
        this.setState({
            title: e.nativeEvent.text,

        });
    }
    handleChangeData(e) {

        this.setState({
            data: e.nativeEvent.text,


        });


    }



    handleSubmit() {
        let items = {
            title: this.state.title,
            data: this.state.data,
            date: this.state.date
        }
        this.editItem(items);
    }

   editItem = (items) => {
      firebase.database().ref('todos').child(snap)
          .set(items)
          .then(() => this.props.navigation.navigate('TabStack'))
          .catch((error) => {console.log('error ', error)});
    }



    render() {


        const { navigation } = this.props;
        title = navigation.getParam('title');
         data = navigation.getParam('data');
         date = navigation.getParam('date');
         snap = navigation.getParam('snap');
         console.log("snapfoundedit" + snap);


        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.gradient} >

                    <StatusBar barStyle="light-content" />
                    <KeyboardAvoidingView behavior='padding' style={styles.container}>

                        <View style={styles.infoContainer}>
                            <TextInput style={styles.input}
                                value={this.state.title}
                                placeholder="Add title to your note"
                                keyboardType='default'
                                returnKeyType='next'
                                autoCorrect={true}
                                onChange={this.handleChangeTitle}
                                numberOfLines={1}/>
                           
                              <TextInput numberOfLines={20}
                                value={this.state.data}

                                style={styles.baseText}
                                placeholder="Add data to your note"
                                keyboardType='default'
                                returnKeyType='next'
                                autoCorrect={true}
                                onChange={this.handleChangeData}/> 
                                </View>





                    </KeyboardAvoidingView>


                    <DatePicker
                                style={styles.dateInput}
                                date={this.state.date}
                                mode="datetime"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="1900-05-01"
                                maxDate="2018-06-01"
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
                                onDateChange={(date) => { this.setState({ date: date }) }}
                           />
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={this.handleSubmit}
                    >
                        <Text style={styles.buttonText}>SAVE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.props.navigation.navigate('Details')}
                    >
                        <Text style={styles.buttonText}>CANCEL</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        flexDirection: 'column',
    },

    title: {
        color: 'purple',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        marginTop: 10,
        left: 2,
        right: 2,
        bottom: 2,
        borderColor: "black",
        paddingVertical: 15
        // backgroundColor: 'red'
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'black',
        fontSize: 20,
        fontWeight: "500",
        marginTop: 10,


    },
    dateInput: {
        alignSelf: 'center', color: 'white',
        width: width,
        bottom:100,
        backgroundColor:"grey"
      },

    titleText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    }, gradient: {
        height: height,
        width: width,
        flex: 1,


    },baseText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },


    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 10,
        left: 2,
        right: 2,
        bottom: 0
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 14
    }
})