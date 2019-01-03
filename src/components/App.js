import React, { Component } from 'react';
import Login from './userModules/Login'
import Splash from './userModules/Splash'
import Register from './userModules/Register'
import Details from './TodoModules/Details'
import AppNavigation from './AppNavigation'
import firebase from 'firebase'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentScreen: 'Splash' };
    setTimeout(() => {
      this.setState({ currentScreen: 'AppNavigation' })
    }, 1000)
  }
  render() {
    console.disableYellowBox = true;
    const { currentScreen } = this.state
    let mainScreen = currentScreen === 'Splash' ? <Splash /> : <AppNavigation />
    return (
      mainScreen
    );
  }

}

export default App;