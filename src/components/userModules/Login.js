import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar, AsyncStorage,
    TextInput, TouchableOpacity, Dimensions,

} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';


import firebase from 'firebase';
import TodoView from '../TodoModules/TodoView';

let { width, height } = Dimensions.get('window')
export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            email: '',
            emailVal: true,
            password: '',
            errorMessage: null
        };
    }

    validate(text, type) {
        this.setState({ email: text })
        alph = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


        if (type == 'email') {
            if (alph.test(text)) {
                // this.setState({ email: text })
                this.setState({
                    emailVal: true,

                })

            } else {
                this.setState({
                    emailVal: false,
                })
                console.warn("invalid email")
            }
        }
    }

    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userData) => {
                this.setState({
                    loading: false
                });
                AsyncStorage.setItem('userData', JSON.stringify(userData));
                console.log("userData" + JSON.stringify(userData));
                this.props.navigation.navigate("TodoView");
            }
            ).catch(error => this.setState({ errorMessage: error.message }))

    }


    handleEmail = (text) => {
        // this.setState({
        //     email:text})

    }


    render() {
        return (


            <View style={styles.container}>
                <LinearGradient colors={['#654ea3', '#eaafc8', '#196666']} style={styles.gradient} >

                    <StatusBar barStyle="light-content" />

                    <View style={styles.logoContainer}>
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo}
                                source={require('../resources/todologo.png')}>
                            </Image>
                            <Text style={styles.title}>Welcome to Secure Todo</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <TextInput style={[styles.input, !this.state.emailVal ? styles.error : null]}
                                onChangeText={(text) => this.validate(text, 'email')}
                                // onChangeText={(text) => this.setState({ email: text })}
                                // value={this.state.email}
                                placeholder="Email"
                                placeholderTextColor='rgba(255,255,255,0.8)'
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCorrect={false}
                            />
                            <TextInput style={styles.input}
                                placeholder="Password"
                                value={this.state.password}
                                placeholderTextColor='rgba(255,255,255,0.8)'
                                onChangeText={
                                    (text) => this.setState({ password: text })

                                }

                                returnKeyType='go'
                                secureTextEntry
                                autoCorrect={false}
                                ref={"txtPassword"}
                            />
                        </View>
                    </View>

                    <View>
                        <Text />
                        {this.state.errorMessage &&
                            <Text style={{ color: 'red' }}>
                                {this.state.errorMessage}
                            </Text>}
                    </View>

                    <TouchableOpacity style={styles.buttonContainer}
                         onPress={() => this.handleLogin()} >
                         {/* onPress={() => this.loginNavigate()} > */}
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.registrationNavigate()} >
                        {/* onPress={() => this.onRegister()} > */}

                        <Text style={styles.buttonText}>REGISTER</Text>
                    </TouchableOpacity>


                </LinearGradient>
            </View>

        )
    }

    registrationNavigate() {
        this.props.navigation.navigate('Register')

    }
    loginNavigate() {

        this.props.navigation.navigate('TodoView')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 128,
        height: 128,
    },
    title: {
        color: '#302b63',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        fontWeight: 'bold',
        opacity: 0.9
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor: '#1D2571',
        borderWidth: 1,
        color: 'purple',
        fontSize: 20,
        fontWeight: "500",
        marginTop: 10,
        opacity: 0.75
    },

    error: {

        borderWidth: 1,
        borderColor: 'red'


    },

    buttonContainer: {
        backgroundColor: '#1D2571',
        paddingVertical: 10,
        left: 0,
        right: 0,
        bottom: 0

    },
    gradient: {
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
})

