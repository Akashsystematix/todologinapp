import React, { Component } from 'react'
import {
    StyleSheet, Text, View,
    StatusBar,
    TextInput, SafeAreaView, TouchableOpacity, Dimensions,
    KeyboardAvoidingView
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { editItem } from '../sevices/Itemservice';
import LinearGradient from 'react-native-linear-gradient';
let { width, height } = Dimensions.get('window')

export default class EditTodo extends Component {
    static navigationOptions = {
        title: "EditTodo"
    };


    constructor(props) {
        super(props)
        this.state = {
            title: '',
            data: '',
            date: ''

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
        editItem(items);
    }





    render() {


        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const data = navigation.getParam('data');
        const date = navigation.getParam('date');



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

                                numberOfLines={1}>


                                {JSON.stringify(title)}

                            </TextInput>




                            <TextInput numberOfLines={20}
                                value={this.state.data}

                                style={styles.baseText}
                                placeholder="Add data to your note"
                                keyboardType='default'
                                returnKeyType='next'
                                autoCorrect={true}
                                onChange={this.handleChangeData}>
                                {JSON.stringify(data)}
                            </TextInput>


                            
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
                            >{JSON.stringify(date)}</DatePicker>
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