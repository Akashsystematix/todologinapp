import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image, Alert,
    StatusBar, ScrollView,
    SafeAreaView, TouchableOpacity,Dimensions,
    KeyboardAvoidingView
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
let { width, height } = Dimensions.get('window')
var snap = '';

export default class Details extends Component {
    static navigationOptions = {
        title: 'Details',
      };


    constructor(props) {
        super(props);
        this.state = {
            titleText: '',
            bodyText: '',
            date: '',

        };
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete() {

        return firebase.database().ref('todos').child(snap).set(null);
        console.log("deleted" + snap);

    }
    // componentWillUnmount() {

    //     snap.replace(null);
    //     console.log('unmountcall' + snap);


    // }

    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'some default value');
        const data = navigation.getParam('data', 'item value');
        const date = navigation.getParam('date', 'some date');
        snap = navigation.getParam('snap');
        console.log("snapfound" + snap);





        return (
            <SafeAreaView style={styles.container}>
                            <LinearGradient colors={['#FFEFBA', '#FFFFFF']} style={styles.gradient} >

                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View>
                        <Text style={styles.title}>{JSON.stringify(title)}</Text>
                    </View>
                    <ScrollView>

                        <View style={styles.container}>


                            <Text style={styles.baseText}>
                                <Text style={styles.titleText}>
                                    {this.state.titleText}{'\n'}{'\n'}
                                </Text>
                                <Text numberOfLines={20}>
                                    {JSON.stringify(data)}
                                    {this.state.bodyText}
                                </Text>



                            </Text>

                        </View>
                        <View style={styles.dateContainer}>

                            <Text>
                                {JSON.stringify(date)}
                                {this.state.date}
                            </Text>



                        </View>




                    </ScrollView>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText} onPress={() => this.delete()} >DELETE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.editItem(title, data, date)}
                    >
                        <Text style={styles.buttonText}>EDIT</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                </LinearGradient>
            </SafeAreaView>
        );

    }
    delete() {
        Alert.alert(
            'Delete Todo',
            'Do you Want to Delete',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { this.handleDelete } },
            ],
            { cancelable: false }
        )

    }

    editItem(title, data, date) {

        this.props.navigation.navigate('EditTodo', { title: title, data: data, date: date,snap }

        )



    }
}
const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
        fontSize:20,
    },
    container: {
        flex: 1,
        justifyContent: "center",

        flexDirection: 'column',
    },
    title: {
        color: 'black',
        fontSize: 18,
        fontWeight:'bold',
        textAlign: 'center',
        marginTop: 5,
        opacity: 1
    },



    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    dateContainer:
    {

       fontSize:12,
        paddingVertical: 0,
        left: 2,
        right: 2,


    },


    buttonContainer: {
        backgroundColor: '#1D2571',
        paddingVertical: 10,
        left: 0,
        right: 0,
        bottom: 0

    }, gradient: {
        height: height,
        width: width,
        flex: 1,


    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13
    }
});
