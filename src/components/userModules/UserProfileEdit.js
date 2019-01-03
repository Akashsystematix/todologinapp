import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    StatusBar,
    TextInput,
    TouchableOpacity, Dimensions
} from 'react-native';
import Icon from 'react-native-ionicons'
import ImagePicker from 'react-native-customized-image-picker';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';
import { updateUser } from '../sevices/Itemservice';
import ActionButton from '../SocialFeed/ActionButton';
var snapuser = '';
let { width, height } = Dimensions.get('window')

export default class UserProfileEdit extends Component {


    static navigationOptions = {
        title: "Profile Edit"
    };
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            number: '',
            date: "2016-05-15"




        }

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);


    }
    handleChangeName(e) {
        this.setState({
            name: e.nativeEvent.text,

        });
    }
    handleChangeEmail(e) {

        this.setState({
            email: e.nativeEvent.text,


        });


    }
    handleChangeNumber(e) {

        this.setState({
            number: e.nativeEvent.text,


        });


    }

    handleUpdate() {
        let user = {
            name: this.state.name,
            email: this.state.email,
            date: this.state.date,
            number: this.state.number
        }
        updateUser(user);

    }


    render() {



        const { navigation } = this.props;
        const name = navigation.getParam('name');
        const date = navigation.getParam('date');
        const number = navigation.getParam('name');

        const email = navigation.getParam('email');
        snapuser = navigation.getParam('snapuser');
        console.log("snapfounduser" + snapuser);




        return (
            <View style={styles.container}>
              <LinearGradient colors={['#E8CBC0', '#636FA4']} style={styles.gradient} >

                    <StatusBar barStyle="light-content" />
                    <View style={styles.container}>
                        <View style={styles.header}>

                            <View style={styles.headerContent}>


                                <Text>Name:</Text>
                                <TextInput value={this.state.name}
                                    placeholder={"Name"}
                                    onChange={this.handleChangeName}
                                    placeholderTextColor='white'

                                    style={styles.name} >{JSON.stringify(name)}</TextInput>

                            </View>
                        </View>

                        <View style={styles.body}>
                            <View style={styles.item}>


                            </View>

                            <View style={styles.item}>
                                <View style={styles.iconContent}>
                                <Icon name="body"></Icon>
                                </View>
                                <View style={styles.infoContent}>
                                    <DatePicker
                                        style={{ alignSelf: 'stretch', color: 'white' }}
                                        date={this.state.date}
                                        mode="date"
                                        placeholderTextColor='white'
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
                                                marginLeft: 0,
                                                color: 'white'
                                            },
                                            dateInput: {
                                                marginLeft: 0,
                                                marginRight: 0,



                                            }
                                            // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(date) => { this.setState({ date: date }) }}
                                    />
                                </View>
                            </View>

                            <View style={styles.item}>
                                <View style={styles.iconContent}>
                                <Icon name="mail"></Icon>
                                </View>
                                <View style={styles.infoContent}>

                                    <TextInput placeholder="email" value={this.state.email}
                                        keyboardType='default'
                                        placeholderTextColor='white'

                                        onChange={this.handleChangeEmail}
                                        autoCorrect={false}
                                        style={styles.info}></TextInput>
                                </View>
                            </View>

                            <View style={styles.item}>
                                <View style={styles.iconContent}>
                                <Icon name="calculator"></Icon>

                                </View>
                                <View style={styles.infoContent}>
                                    <TextInput
                                        placeholder="Number"
                                        value={this.state.number}
                                        onChange={this.handleChangeNumber}

                                        placeholderTextColor='white'
                                        keyboardType='numeric'
                                        returnKeyType='next'

                                        autoCorrect={false}
                                    />


                                </View>
                            </View>
                            
                        </View>
                    </View>
                    <ActionButton style={styles.buttonContainer}
                                        title="SAVE"
                                    onPress={this.handleUpdate}/>
                </LinearGradient>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#DECCC9",
    },
    title: {
        color: '#f7c744',
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
        color: "white",
        fontWeight: '600',
    },


    body: {

        height: 500,
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'white'
    },
    infoContent: {
        flex: 1,
        color:'white',
        flexDirection: 'column'

    },

    info: {
        fontSize: 18,
        marginTop: 20,
        alignItems: 'center',
        color: "white",
    },
    buttonContainer: {

        backgroundColor: '#f7c744',
        padding: 10,
        left: 0,
        right: 0,
        bottom: 0

    },
    gradient: {
        height: height,
        width: width,
        flex: 1,


    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 13
    }
});
