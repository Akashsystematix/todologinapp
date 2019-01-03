import React, { Component} from 'react'
import { StyleSheet, Text, View ,Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
let {width, height} = Dimensions.get('window')

export default class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = { timer: 0 }

        setInterval(() => {
            this.setState({ timer: this.state.timer + 1 })
        }, 1000)

    }
    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#654ea3', '#eaafc8', '#196666']} style={styles.gradient} >


                    <Text style={styles.title}>{`Private Notes`}</Text>

                </LinearGradient>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        height: height,
        width: width,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: 'white'
    }
})